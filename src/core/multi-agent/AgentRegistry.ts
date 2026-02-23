import { Logger } from "@/shared/services/Logger"
import { type AgentEvent, AgentEventBus, AgentEventType, AgentStatus } from "./EventBus"

export interface AgentInfo {
	id: string
	name: string
	status: AgentStatus["status"]
	currentTask?: string
	workspace: string
	createdAt: number
	updatedAt: number
	metadata?: Record<string, unknown>
}

export class AgentRegistry {
	private static instance: AgentRegistry
	private agents: Map<string, AgentInfo> = new Map()
	private fileLocks: Map<string, string> = new Map()

	static getInstance(): AgentRegistry {
		if (!AgentRegistry.instance) {
			AgentRegistry.instance = new AgentRegistry()
		}
		return AgentRegistry.instance
	}

	constructor() {
		AgentEventBus.getInstance().onAgentEvent(this.handleAgentEvent.bind(this))
	}

	private handleAgentEvent(event: AgentEvent): void {
		switch (event.type) {
			case AgentEventType.FILE_LOCKED:
				const lockedPayload = event.payload as { filePath: string }
				this.fileLocks.set(lockedPayload.filePath, event.agentId)
				break
			case AgentEventType.FILE_RELEASED:
				const releasedPayload = event.payload as { filePath: string }
				this.fileLocks.delete(releasedPayload.filePath)
				break
		}
	}

	registerAgent(agent: AgentInfo): void {
		this.agents.set(agent.id, {
			...agent,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
		Logger.log(`[AgentRegistry] Registered agent: ${agent.id}`)
	}

	unregisterAgent(agentId: string): void {
		this.agents.delete(agentId)
		const lockedFiles = Array.from(this.fileLocks.entries())
			.filter(([, agentIdLock]) => agentIdLock === agentId)
			.map(([filePath]) => filePath)

		for (const file of lockedFiles) {
			this.fileLocks.delete(file)
		}
		Logger.log(`[AgentRegistry] Unregistered agent: ${agentId}`)
	}

	getAgent(agentId: string): AgentInfo | undefined {
		return this.agents.get(agentId)
	}

	getAllAgents(): AgentInfo[] {
		return Array.from(this.agents.values())
	}

	getActiveAgents(): AgentInfo[] {
		return Array.from(this.agents.values()).filter((agent) => agent.status === "running")
	}

	updateAgentStatus(agentId: string, status: AgentStatus): void {
		const agent = this.agents.get(agentId)
		if (agent) {
			agent.status = status.status
			agent.currentTask = status.currentTask
			agent.updatedAt = Date.now()
		}
	}

	isFileLocked(filePath: string): boolean {
		return this.fileLocks.has(filePath)
	}

	getFileLocker(filePath: string): string | undefined {
		return this.fileLocks.get(filePath)
	}

	lockFile(agentId: string, filePath: string): boolean {
		if (this.fileLocks.has(filePath)) {
			return false
		}
		this.fileLocks.set(filePath, agentId)
		AgentEventBus.getInstance().notifyFileLocked(agentId, filePath)
		return true
	}

	unlockFile(agentId: string, filePath: string): void {
		if (this.fileLocks.get(filePath) === agentId) {
			this.fileLocks.delete(filePath)
			AgentEventBus.getInstance().notifyFileReleased(agentId, filePath)
		}
	}

	getLockedFilesByAgent(agentId: string): string[] {
		return Array.from(this.fileLocks.entries())
			.filter(([, id]) => id === agentId)
			.map(([filePath]) => filePath)
	}
}
