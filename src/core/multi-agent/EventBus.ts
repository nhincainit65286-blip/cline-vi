import { EventEmitter } from "events"

export interface AgentEvent {
	agentId: string
	type: AgentEventType
	payload: unknown
	timestamp: number
}

export enum AgentEventType {
	AGENT_STARTED = "agent_started",
	AGENT_COMPLETED = "agent_completed",
	AGENT_FAILED = "agent_failed",
	AGENT_CANCELLED = "agent_cancelled",
	AGENT_MESSAGE = "agent_message",
	AGENT_STATUS_CHANGE = "agent_status_change",
	FILE_LOCKED = "file_locked",
	FILE_RELEASED = "file_released",
	TASK_REQUEST = "task_request",
	TASK_ASSIGNED = "task_assigned",
	CONTEXT_SHARED = "context_shared",
}

export interface AgentStatus {
	agentId: string
	status: "idle" | "running" | "completed" | "failed" | "cancelled"
	currentTask?: string
	progress: number
	startedAt?: number
	completedAt?: number
}

export interface SharedContext {
	filesBeingEdited: Map<string, string>
	completedTasks: string[]
	activeAgents: string[]
	customData: Map<string, unknown>
}

class AgentEventBusClass extends EventEmitter {
	private static instance: AgentEventBusClass

	static getInstance(): AgentEventBusClass {
		if (!AgentEventBusClass.instance) {
			AgentEventBusClass.instance = new AgentEventBusClass()
		}
		return AgentEventBusClass.instance
	}

	emitAgentEvent(event: AgentEvent): void {
		this.emit("agent_event", event)
	}

	onAgentEvent(callback: (event: AgentEvent) => void): void {
		this.on("agent_event", callback)
	}

	removeAgentEventListener(callback: (event: AgentEvent) => void): void {
		this.removeListener("agent_event", callback)
	}

	broadcastStatus(status: AgentStatus): void {
		const event: AgentEvent = {
			agentId: status.agentId,
			type: AgentEventType.AGENT_STATUS_CHANGE,
			payload: status,
			timestamp: Date.now(),
		}
		this.emitAgentEvent(event)
	}

	notifyFileLocked(agentId: string, filePath: string): void {
		const event: AgentEvent = {
			agentId,
			type: AgentEventType.FILE_LOCKED,
			payload: { filePath },
			timestamp: Date.now(),
		}
		this.emitAgentEvent(event)
	}

	notifyFileReleased(agentId: string, filePath: string): void {
		const event: AgentEvent = {
			agentId,
			type: AgentEventType.FILE_RELEASED,
			payload: { filePath },
			timestamp: Date.now(),
		}
		this.emitAgentEvent(event)
	}

	shareContext(agentId: string, key: string, data: unknown): void {
		const event: AgentEvent = {
			agentId,
			type: AgentEventType.CONTEXT_SHARED,
			payload: { key, data },
			timestamp: Date.now(),
		}
		this.emitAgentEvent(event)
	}
}

// Export the class, not the instance
// Users should call AgentEventBusClass.getInstance() to get the singleton
export { AgentEventBusClass as AgentEventBus }
