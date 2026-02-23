import { FeatureFlag } from "@/shared/services/feature-flags/feature-flags"
import { featureFlagsService } from "@/services/feature-flags"

export { AgentEventBus, AgentEventType } from "./EventBus"
export type { AgentEvent, AgentStatus, SharedContext } from "./EventBus"

export { AgentRegistry } from "./AgentRegistry"
export type { AgentInfo } from "./AgentRegistry"

export { AgentManager } from "./AgentManager"
export type { AgentConfig, CreateAgentResult } from "./AgentManager"

export function isMultiAgentEnabled(): boolean {
	return featureFlagsService.getBooleanFlagEnabled(FeatureFlag.MULTI_AGENT)
}

export function isPRAutomationEnabled(): boolean {
	return featureFlagsService.getBooleanFlagEnabled(FeatureFlag.PR_AUTOMATION)
}
