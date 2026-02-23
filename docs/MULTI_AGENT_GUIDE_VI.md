# Hướng dẫn sử dụng Multi-Agent và PR Automation (Tiếng Việt)

## 🎯 Tính năng mới là gì?

### Multi-Agent (Nhiều AI cùng làm việc)
Giống như một công ty có nhiều nhân viên, giờ bạn có thể cho nhiều AI agents làm việc cùng lúc:
- Agent A làm tính năng đăng nhập
- Agent B làm tính năng thanh toán  
- Agent C viết tests
- Tất cả chạy song song, không chờ đợi!

### PR Automation (Tự động tạo Pull Request)
Sau khi agents hoàn thành, tự động:
- Tạo branch mới
- Commit code
- Tạo Pull Request trên GitHub
- Bạn chỉ cần review và merge!

## 🚀 Cách bật tính năng

### Bước 1: Mở Settings
1. Click vào Cline icon ở sidebar
2. Click vào icon **Settings** (⚙️) góc trên bên phải
3. Kéo xuống phần **Experimental Features**

### Bước 2: Bật toggles
- ✅ **Multi-Agent** - Bật để chạy nhiều AI cùng lúc
- ✅ **PR Automation** - Bật để tự động tạo PR

### Bước 3: Setup GitHub Token (cho PR Automation)
```bash
# Tạo GitHub Personal Access Token tại:
# https://github.com/settings/tokens

# Thêm vào .env file:
GITHUB_TOKEN=ghp_your_token_here
```

Token cần quyền: `repo` (Full control of private repositories)

## 💡 Cách sử dụng Multi-Agent

### Ví dụ 1: Làm nhiều tính năng cùng lúc

**Trước đây (1 agent):**
```
Task 1: Làm login (10 phút)
  ↓ đợi xong
Task 2: Làm signup (10 phút)  
  ↓ đợi xong
Task 3: Làm profile (10 phút)
= Tổng: 30 phút
```

**Bây giờ (multi-agent):**
```
Task 1: Làm login (10 phút) ──┐
Task 2: Làm signup (10 phút) ─┼─ Chạy song song
Task 3: Làm profile (10 phút) ┘
= Tổng: 10 phút!
```

### Ví dụ 2: Trong code

```typescript
import { AgentManager } from "@core/multi-agent"

const manager = AgentManager.getInstance()

// Tạo 3 agents
const loginAgent = await manager.createAgent({
  name: "Login Developer",
  task: "Tạo trang đăng nhập với form username/password"
})

const signupAgent = await manager.createAgent({
  name: "Signup Developer",
  task: "Tạo trang đăng ký với validation email"
})

const profileAgent = await manager.createAgent({
  name: "Profile Developer",
  task: "Tạo trang profile hiển thị thông tin user"
})

// Start tất cả cùng lúc
await manager.startAgent(loginAgent.id)
await manager.startAgent(signupAgent.id)
await manager.startAgent(profileAgent.id)

console.log("3 agents đang làm việc song song!")
```

## 🤝 Agents giao tiếp như thế nào?

### 1. Tự động tránh xung đột
```typescript
// Agent A bắt đầu edit file
manager.on("file:locked", (data) => {
  console.log(`${data.agentId} đang edit ${data.filePath}`)
  // Agent B sẽ thấy và KHÔNG edit file này
})
```

### 2. Chia sẻ thông tin
```typescript
// Agent A hoàn thành
manager.on("agent:completed", (data) => {
  console.log(`${data.agentId} đã xong!`)
  
  // Agent B có thể dùng kết quả của Agent A
  const resultFromA = data.result
})
```

### 3. Thông báo trạng thái
```typescript
// Theo dõi tất cả agents
manager.on("agent:started", (agent) => {
  console.log(`✅ ${agent.name} bắt đầu làm việc`)
})

manager.on("agent:completed", (data) => {
  console.log(`🎉 Agent ${data.agentId} hoàn thành!`)
})

manager.on("agent:failed", (data) => {
  console.log(`❌ Agent ${data.agentId} gặp lỗi: ${data.error}`)
})
```

## 📝 Cách sử dụng PR Automation

### Workflow tự động

```typescript
import { GitHubService } from "@services/github"

const github = new GitHubService({
  owner: "your-username",
  repo: "your-repo",
  token: process.env.GITHUB_TOKEN
})

// Khi agent hoàn thành
manager.on("agent:completed", async (data) => {
  console.log("Agent xong rồi, tạo PR thôi!")
  
  // 1. Tạo branch mới
  const branchName = `feature/agent-${data.agentId}`
  await github.createBranch(branchName, "main")
  
  // 2. Commit code
  await github.commitChanges(
    branchName,
    `feat: ${data.task}`,
    [
      { path: "src/login.ts", content: "..." },
      { path: "src/login.test.ts", content: "..." }
    ]
  )
  
  // 3. Tạo PR
  const pr = await github.createPullRequest({
    title: `✨ ${data.task}`,
    body: `
## Mô tả
Tính năng được implement bởi AI Agent

## Changes
- Thêm login form
- Thêm validation
- Thêm tests

## Agent Info
- Agent ID: ${data.agentId}
- Task: ${data.task}
    `,
    head: branchName,
    base: "main"
  })
  
  console.log(`🎉 PR đã tạo: ${pr.html_url}`)
})
```

### Quản lý PRs

```typescript
// Xem tất cả PRs đang mở
const openPRs = await github.listPullRequests("open")
console.log(`Có ${openPRs.length} PRs cần review`)

// Merge PR
await github.mergePullRequest(123, {
  merge_method: "squash",
  commit_title: "feat: add login feature"
})

console.log("✅ PR đã được merge!")
```

## 🎨 Workflows thực tế

### Workflow 1: Feature Development Team

```typescript
// Giả sử bạn cần làm hệ thống authentication
const tasks = [
  "Tạo login form với validation",
  "Tạo signup form với email verification", 
  "Tạo forgot password flow",
  "Tạo user profile page",
  "Viết unit tests cho tất cả"
]

// Tạo team gồm 5 agents
const team = await Promise.all(
  tasks.map((task, i) => 
    manager.createAgent({
      name: `Developer ${i + 1}`,
      task: task
    })
  )
)

// Start cả team
await Promise.all(
  team.map(agent => manager.startAgent(agent.id))
)

// Đợi tất cả xong
let completed = 0
manager.on("agent:completed", async (data) => {
  completed++
  console.log(`✅ ${completed}/${tasks.length} tasks hoàn thành`)
  
  if (completed === tasks.length) {
    console.log("🎉 Tất cả xong! Tạo PR tổng hợp...")
    
    await github.createPullRequest({
      title: "feat: Complete authentication system",
      body: `
## 🎯 Tổng quan
Hoàn thành toàn bộ hệ thống authentication

## ✨ Features
${tasks.map((t, i) => `- [x] ${t}`).join('\n')}

## 🤖 Developed by
${team.length} AI Agents working in parallel
      `,
      head: "feature/auth-system",
      base: "main"
    })
  }
})
```

### Workflow 2: Code Review Chain

```typescript
// Agent 1: Viết code
const developer = await manager.createAgent({
  name: "Developer",
  task: "Implement payment integration with Stripe"
})

await manager.startAgent(developer.id)

manager.on("agent:completed", async (data) => {
  if (data.agentId === developer.id) {
    console.log("Code xong rồi, gọi reviewer...")
    
    // Agent 2: Review code
    const reviewer = await manager.createAgent({
      name: "Code Reviewer",
      task: "Review payment integration code, check security và best practices"
    })
    
    await manager.startAgent(reviewer.id)
  }
})
```

### Workflow 3: Test-Driven Development

```typescript
// Agent 1: Viết tests trước
const tester = await manager.createAgent({
  name: "Test Writer",
  task: "Viết unit tests cho user authentication"
})

await manager.startAgent(tester.id)

manager.on("agent:completed", async (data) => {
  if (data.agentId === tester.id) {
    console.log("Tests đã sẵn sàng, bắt đầu implement...")
    
    // Agent 2: Implement để pass tests
    const developer = await manager.createAgent({
      name: "Developer",
      task: "Implement authentication để pass tất cả tests"
    })
    
    await manager.startAgent(developer.id)
  }
})
```

## ⚠️ Lưu ý quan trọng

### 1. Chia task hợp lý

✅ **TốT:**
- "Tạo login form với username và password"
- "Thêm validation cho email field"
- "Viết test cho login function"

❌ **Không tốt:**
- "Làm toàn bộ hệ thống authentication" (quá lớn)
- "Fix bugs" (quá mơ hồ)
- "Làm gì đó với database" (không rõ ràng)

### 2. Tránh xung đột files

Agents tự động lock files khi edit, nhưng bạn nên:
- Chia tasks theo modules khác nhau
- Tránh cho nhiều agents edit cùng 1 file
- Nếu cần edit cùng file, chạy tuần tự (sequential)

### 3. Monitor agents

```typescript
// Set timeout để tránh agents chạy mãi
manager.createAgent({
  name: "Feature Dev",
  task: "...",
  timeout: 5 * 60 * 1000 // 5 phút
})

// Cancel agent nếu cần
manager.cancelAgent(agentId)

// Check trạng thái
const registry = AgentRegistry.getInstance()
const active = registry.getActiveAgents()
console.log(`Đang có ${active.length} agents làm việc`)
```

## 🐛 Troubleshooting

### Agents không chạy?
1. ✅ Check feature flag đã bật chưa (Settings > Experimental)
2. ✅ Check console logs có lỗi không
3. ✅ Verify AgentManager đã được khởi tạo

### File conflicts?
```typescript
// Check file nào đang bị lock
const registry = AgentRegistry.getInstance()
const locked = registry.getLockedFiles()

console.log("Files đang được edit:")
locked.forEach((agentId, filePath) => {
  console.log(`- ${filePath} by ${agentId}`)
})
```

### PR creation fails?
1. ✅ Check GitHub token có quyền `repo`
2. ✅ Verify network connection
3. ✅ Check branch name hợp lệ (không có ký tự đặc biệt)
4. ✅ Ensure có changes để commit

## 📚 Tài liệu thêm

- [API Reference](./API_REFERENCE.md)
- [Examples](../examples/multi-agent/)
- [GitHub Issues](https://github.com/nhincainit65286-blip/cline-vi/issues)

## 🎓 Tips & Tricks

### Tip 1: Parallel + Sequential
```typescript
// Làm 3 features song song
const [feat1, feat2, feat3] = await Promise.all([
  createAndStartAgent("Feature 1"),
  createAndStartAgent("Feature 2"),
  createAndStartAgent("Feature 3")
])

// Sau đó viết tests tuần tự
manager.on("agent:completed", async (data) => {
  if (allFeaturesCompleted()) {
    await createAndStartAgent("Write integration tests")
  }
})
```

### Tip 2: Progress tracking
```typescript
manager.on("agent:progress", (data) => {
  console.log(`${data.agentId}: ${data.progress}%`)
  
  // Update UI progress bar
  updateProgressBar(data.agentId, data.progress)
})
```

### Tip 3: Error recovery
```typescript
manager.on("agent:failed", async (data) => {
  console.error(`Agent ${data.agentId} failed:`, data.error)
  
  // Retry với task đơn giản hơn
  await manager.createAgent({
    name: "Recovery Agent",
    task: `Fix the issue: ${data.error.message}`
  })
})
```

## 🎉 Kết luận

Multi-Agent và PR Automation giúp bạn:
- ⚡ Làm việc nhanh hơn (parallel execution)
- 🤝 Agents tự phối hợp với nhau
- 🔄 Tự động hóa workflow (auto PR)
- 🎯 Tập trung vào review thay vì code

Chúc bạn code vui vẻ! 🚀
