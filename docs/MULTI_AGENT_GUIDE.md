# Hướng dẫn sử dụng Multi-Agent và PR Automation

## Tổng quan

Cline giờ đây hỗ trợ chạy nhiều AI agents cùng lúc (multi-agent) và tự động tạo Pull Request trên GitHub.

## Bật tính năng

### Cách 1: Qua Settings UI (Khuyến nghị)

1. Mở Cline sidebar
2. Click vào icon **Settings** (⚙️) ở góc trên
3. Kéo xuống phần **Experimental Features**
4. Bật các tính năng:
   - ✅ **Multi-Agent** - Cho phép chạy nhiều AI agents đồng thời
   - ✅ **PR Automation** - Tự động tạo Pull Request

### Cách 2: Qua Feature Flags (Cho developers)

Thêm vào environment variables:
```bash
FEATURE_MULTI_AGENT=true
FEATURE_PR_AUTOMATION=true
```

## Multi-Agent System

### Cách sử dụng

#### 1. Tạo nhiều tasks cùng lúc

```typescript
import { AgentManager } from "@core/multi-agent"

const manager = AgentManager.getInstance()

// Tạo agent 1 - Làm feature A
const agent1 = await manager.createAgent({
  name: "Feature A Developer",
  task: "Implement user authentication"
})

// Tạo agent 2 - Làm feature B
const agent2 = await manager.createAgent({
  name: "Feature B Developer", 
  task: "Add payment integration"
})

// Start cả 2 agents
await manager.startAgent(agent1.id)
await manager.startAgent(agent2.id)
```

#### 2. Agents tự động giao tiếp

Agents sẽ tự động:
- **Chia sẻ context**: Biết agent khác đang làm gì
- **Tránh xung đột**: Không edit cùng file
- **Thông báo**: Báo khi bắt đầu/hoàn thành task

```typescript
// Agent A đang edit file
manager.on("file:locked", (data) => {
  console.log(`${data.agentId} đang edit ${data.filePath}`)
})

// Agent B sẽ biết và tránh file đó
```

#### 3. Theo dõi trạng thái

```typescript
import { AgentRegistry } from "@core/multi-agent"

const registry = AgentRegistry.getInstance()

// Xem tất cả agents đang chạy
const activeAgents = registry.getActiveAgents()
console.log(`Có ${activeAgents.length} agents đang làm việc`)

// Xem agent đang edit file nào
const lockedFiles = registry.getLockedFiles()
console.log("Files đang được edit:", lockedFiles)
```

### Events có thể lắng nghe

```typescript
const manager = AgentManager.getInstance()

// Khi agent bắt đầu
manager.on("agent:started", (agent) => {
  console.log(`Agent ${agent.name} đã bắt đầu`)
})

// Khi agent hoàn thành
manager.on("agent:completed", (data) => {
  console.log(`Agent ${data.agentId} hoàn thành:`, data.result)
})

// Khi agent gặp lỗi
manager.on("agent:failed", (data) => {
  console.error(`Agent ${data.agentId} lỗi:`, data.error)
})

// Khi agent bị hủy
manager.on("agent:cancelled", (data) => {
  console.log(`Agent ${data.agentId} đã bị hủy`)
})

// Khi file bị lock
manager.on("file:locked", (data) => {
  console.log(`File ${data.filePath} bị lock bởi ${data.agentId}`)
})

// Khi file được unlock
manager.on("file:unlocked", (data) => {
  console.log(`File ${data.filePath} đã được unlock`)
})
```

## PR Automation

### Cách sử dụng

#### 1. Tự động tạo PR sau khi hoàn thành task

```typescript
import { GitHubService } from "@services/github"

const github = new GitHubService({
  owner: "your-username",
  repo: "your-repo",
  token: process.env.GITHUB_TOKEN
})

// Sau khi agent hoàn thành
manager.on("agent:completed", async (data) => {
  // Tạo branch mới
  const branch = await github.createBranch(
    `feature/${data.agentId}`,
    "main"
  )
  
  // Commit changes
  await github.commitChanges(
    branch,
    "feat: implement new feature",
    [
      { path: "src/feature.ts", content: "..." }
    ]
  )
  
  // Tạo PR
  const pr = await github.createPullRequest({
    title: `[Agent ${data.agentId}] New Feature`,
    body: `Completed by AI Agent\n\nTask: ${data.task}`,
    head: branch,
    base: "main"
  })
  
  console.log(`PR created: ${pr.html_url}`)
})
```

#### 2. Quản lý PRs

```typescript
// List tất cả PRs
const prs = await github.listPullRequests("open")
console.log(`Có ${prs.length} PRs đang mở`)

// Merge PR
await github.mergePullRequest(123, {
  merge_method: "squash",
  commit_title: "feat: new feature"
})

// Lấy commit history
const commits = await github.getCommitHistory("feature-branch")
```

## Workflow đề xuất

### Workflow 1: Parallel Development

```typescript
// Chia task lớn thành nhiều task nhỏ
const tasks = [
  "Implement user login",
  "Add password reset",
  "Create user profile page"
]

// Tạo agent cho mỗi task
const agents = await Promise.all(
  tasks.map(task => 
    manager.createAgent({ name: task, task })
  )
)

// Start tất cả agents
await Promise.all(
  agents.map(agent => manager.startAgent(agent.id))
)

// Đợi tất cả hoàn thành
manager.on("agent:completed", async (data) => {
  const remaining = registry.getActiveAgents().length
  
  if (remaining === 0) {
    console.log("Tất cả agents đã hoàn thành!")
    
    // Tạo PR tổng hợp
    await github.createPullRequest({
      title: "feat: User authentication system",
      body: "Implemented by multiple AI agents",
      head: "feature/auth",
      base: "main"
    })
  }
})
```

### Workflow 2: Sequential with Review

```typescript
// Agent 1: Viết code
const dev = await manager.createAgent({
  name: "Developer",
  task: "Implement feature X"
})

await manager.startAgent(dev.id)

manager.on("agent:completed", async (data) => {
  if (data.agentId === dev.id) {
    // Agent 2: Review code
    const reviewer = await manager.createAgent({
      name: "Code Reviewer",
      task: "Review the implementation of feature X"
    })
    
    await manager.startAgent(reviewer.id)
  }
})
```

## Best Practices

### 1. Chia task hợp lý
- ✅ Task nhỏ, rõ ràng: "Add login button to navbar"
- ❌ Task lớn, mơ hồ: "Build entire authentication system"

### 2. Tránh xung đột
- Agents tự động lock files khi edit
- Nếu cần edit cùng file, chạy tuần tự (sequential)

### 3. Monitor agents
```typescript
// Set timeout cho agents
manager.createAgent({
  name: "Feature Dev",
  task: "...",
  timeout: 5 * 60 * 1000 // 5 phút
})

// Cancel agent nếu cần
manager.cancelAgent(agentId)
```

### 4. Error handling
```typescript
manager.on("agent:failed", async (data) => {
  console.error(`Agent ${data.agentId} failed:`, data.error)
  
  // Retry hoặc notify user
  if (data.retryable) {
    await manager.startAgent(data.agentId)
  }
})
```

## Troubleshooting

### Agents không giao tiếp được
- Kiểm tra EventBus đã được khởi tạo
- Verify agents đang dùng cùng AgentManager instance

### File conflicts
- Check `registry.getLockedFiles()` để xem file nào đang bị lock
- Đợi agent khác hoàn thành hoặc cancel

### PR creation fails
- Verify GitHub token có quyền `repo`
- Check network connection
- Ensure branch name hợp lệ (không có ký tự đặc biệt)

## API Reference

### AgentManager

```typescript
class AgentManager {
  static getInstance(): AgentManager
  
  createAgent(config: AgentConfig): Promise<Agent>
  startAgent(agentId: string): Promise<void>
  completeAgent(agentId: string, result?: unknown): void
  failAgent(agentId: string, error: Error): void
  cancelAgent(agentId: string): void
  updateProgress(agentId: string, progress: number): void
  
  on(event: string, callback: Function): void
  off(event: string, callback: Function): void
}
```

### AgentRegistry

```typescript
class AgentRegistry {
  static getInstance(): AgentRegistry
  
  register(agent: Agent): void
  unregister(agentId: string): void
  getAgent(agentId: string): Agent | undefined
  getActiveAgents(): Agent[]
  lockFile(agentId: string, filePath: string): void
  unlockFile(filePath: string): void
  getLockedFiles(): Map<string, string>
}
```

### GitHubService

```typescript
class GitHubService {
  constructor(config: GitHubConfig)
  
  createBranch(branchName: string, fromBranch: string): Promise<string>
  commitChanges(branch: string, message: string, files: FileChange[]): Promise<void>
  createPullRequest(options: PROptions): Promise<PullRequest>
  listPullRequests(state: "open" | "closed" | "all"): Promise<PullRequest[]>
  mergePullRequest(prNumber: number, options?: MergeOptions): Promise<void>
  getCommitHistory(branch: string): Promise<Commit[]>
}
```

## Examples

Xem thêm examples trong:
- `examples/multi-agent/` - Multi-agent workflows
- `examples/pr-automation/` - PR automation examples

## Support

Nếu gặp vấn đề:
1. Check logs trong Output panel
2. Verify feature flags đã bật
3. Report issue tại: https://github.com/nhincainit65286-blip/cline-vi/issues
