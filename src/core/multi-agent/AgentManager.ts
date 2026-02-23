import { ulid } from "ulid"
import { Logger } from "@/shared/services/Logger"
import { type AgentInfo, AgentRegistry } from "./AgentRegistry"
import { type AgentEvent, AgentEventBus, AgentEventType, AgentStatus } from "./EventBus"

export interface AgentConfig {
	name?: string
	workspace: string
	task?: string
	images?: string[]
	files?: string[]
	metadata?: Record<string, unknown>
}

export interface CreateAgentResult {
	agentId: string
	agentInfo: AgentInfo
}

export class AgentManager {
	private static instance: AgentManager
	private agentCallbacks: Map<
		string,
		{
			onStatusChange?: (status: AgentStatus) => void
			onComplete?: (result: unknown) => void
			onError?: (error: Error) => void
		}
	> = new Map()

	static getInstance(): AgentManager {
		if (!AgentManager.instance) {
			AgentManager.instance = new AgentManager()
		}
		return AgentManager.instance
	}

	constructor() {
		AgentEventBus.getInstance().onAgentEvent(this.handleAgentEvent.bind(this))
	}

	private handleAgentEvent(event: AgentEvent): void {
		const callbacks = this.agentCallbacks.get(event.agentId)
		if (!callbacks) return

		switch (event.type) {
			case AgentEventType.AGENT_STATUS_CHANGE:
				callbacks.onStatusChange?.(event.payload as AgentStatus)
				break
			case AgentEventType.AGENT_COMPLETED:
				callbacks.onComplete?.(event.payload)
				break
			case AgentEventType.AGENT_FAILED:
				callbacks.onError?.(event.payload as Error)
				break
		}
	}

	createAgent(config: AgentConfig): CreateAgentResult {
		const agentId = ulid()

		const agentInfo: AgentInfo = {
			id: agentId,
			name: config.name || `Agent ${agentId.slice(-4)}`,
			status: "idle",
			workspace: config.workspace,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			metadata: config.metadata,
		}

		AgentRegistry.getInstance().registerAgent(agentInfo)
		Logger.log(`[AgentManager] Created agent: ${agentId}`)

		return { agentId, agentInfo }
	}

	async startAgent(
		agentId: string,
		task: string,
		callbacks?: {
			onStatusChange?: (status: AgentStatus) => void
			onComplete?: (result: unknown) => void
			onError?: (error: Error) => void
		},
	): Promise<void> {
		const registry = AgentRegistry.getInstance()
		const agent = registry.getAgent(agentId)

		if (!agent) {
			throw new Error(`Agent ${agentId} not found`)
		}

		this.agentCallbacks.set(agentId, callbacks || {})

		const status: AgentStatus = {
			agentId,
			status: "running",
			currentTask: task,
			progress: 0,
			startedAt: Date.now(),
		}

		registry.updateAgentStatus(agentId, status)
		AgentEventBus.getInstance().broadcastStatus(status)

		const event: AgentEvent = {
			agentId,
			type: AgentEventType.AGENT_STARTED,
			payload: { task },
			timestamp: Date.now(),
		}
		AgentEventBus.getInstance().emitAgentEvent(event)
		Logger.log(`[AgentManager] Started agent: ${agentId} with task: ${task}`)
	}

	completeAgent(agentId: string, result?: unknown): void {
		const registry = AgentRegistry.getInstance()
		const agent = registry.getAgent(agentId)

		if (!agent) {
			Logger.error(`[AgentManager] Agent ${agentId} not found for completion`)
			return
		}

		const status: AgentStatus = {
			agentId,
			status: "completed",
			currentTask: agent.currentTask,
			progress: 100,
			completedAt: Date.now(),
		}

		registry.updateAgentStatus(agentId, status)
		AgentEventBus.getInstance().broadcastStatus(status)

		const event: AgentEvent = {
			agentId,
			type: AgentEventType.AGENT_COMPLETED,
			payload: result,
			timestamp: Date.now(),
		}
		AgentEventBus.getInstance().emitAgentEvent(event)
		Logger.log(`[AgentManager] Completed agent: ${agentId}`)
	}

	failAgent(agentId: string, error: Error): void {
		const registry = AgentRegistry.getInstance()
		const agent = registry.getAgent(agentId)

		if (!agent) {
			Logger.error(`[AgentManager] Agent ${agentId} not found for failure`)
			return
		}

		const status: AgentStatus = {
			agentId,
			status: "failed",
			currentTask: agent.currentTask,
			progress: 0,
			completedAt: Date.now(),
		}

		registry.updateAgentStatus(agentId, status)
		AgentEventBus.getInstance().broadcastStatus(status)

		const event: AgentEvent = {
			agentId,
			type: AgentEventType.AGENT_FAILED,
			payload: error,
			timestamp: Date.now(),
		}
		AgentEventBus.getInstance().emitAgentEvent(event)
		Logger.log(`[AgentManager] Failed agent: ${agentId}, error: ${error.message}`)
	}

	cancelAgent(agentId: string): void {
		const registry = AgentRegistry.getInstance()
		const agent = registry.getAgent(agentId)

		if (!agent) {
			Logger.error(`[AgentManager] Agent ${agentId} not found for cancellation`)
			return
		}

		const lockedFiles = registry.getLockedFilesByAgent(agentId)
		for (const file of lockedFiles) {
			registry.unlockFile(agentId, file)
		}

		const status: AgentStatus = {
			agentId,
			status: "cancelled",
			currentTask: agent.currentTask,
			progress: 0,
			completedAt: Date.now(),
		}

		registry.updateAgentStatus(agentId, status)
		AgentEventBus.getInstance().broadcastStatus(status)

		const event: AgentEvent = {
			agentId,
			type: AgentEventType.AGENT_CANCELLED,
			payload: null,
			timestamp: Date.now(),
		}
		AgentEventBus.getInstance().emitAgentEvent(event)
		Logger.log(`[AgentManager] Cancelled agent: ${agentId}`)
	}

	removeAgent(agentId: string): void {
		this.cancelAgent(agentId)
		AgentRegistry.getInstance().unregisterAgent(agentId)
		this.agentCallbacks.delete(agentId)
		Logger.log(`[AgentManager] Removed agent: ${agentId}`)
	}

	getAgent(agentId: string): AgentInfo | undefined {
		return AgentRegistry.getInstance().getAgent(agentId)
	}

	getAllAgents(): AgentInfo[] {
		return AgentRegistry.getInstance().getAllAgents()
	}

	getActiveAgents(): AgentInfo[] {
		return AgentRegistry.getInstance().getActiveAgents()
	}

	updateProgress(agentId: string, progress: number): void {
		const registry = AgentRegistry.getInstance()
		const agent = registry.getAgent(agentId)

		if (!agent) return

		const status: AgentStatus = {
			agentId,
			status: "running",
			currentTask: agent.currentTask,
			progress: Math.min(100, Math.max(0, progress)),
		}

		registry.updateAgentStatus(agentId, status)
		AgentEventBus.getInstance().broadcastStatus(status)
	}
}
