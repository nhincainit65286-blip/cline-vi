# Hướng dẫn test Multi-Agent và PR Automation

## Cách test extension trong VS Code

### Phương pháp 1: Debug Mode (Khuyến nghị)

1. **Mở project trong VS Code**
   ```bash
   cd cline-vi
   code .
   ```

2. **Cài dependencies (nếu chưa)**
   ```bash
   npm install
   cd webview-ui && npm install && cd ..
   ```

3. **Build extension**
   ```bash
   npm run build:webview
   node esbuild.mjs
   ```

4. **Start debug**
   - Nhấn `F5` hoặc
   - Vào Run > Start Debugging
   - Hoặc click vào Debug icon bên trái và nhấn "Run Extension"

5. **Cửa sổ mới sẽ mở** (Extension Development Host)
   - Đây là VS Code instance với extension của bạn đã load
   - Mở Cline sidebar
   - Click Settings (⚙️)
   - Kéo xuống phần **Experimental**
   - Bạn sẽ thấy:
     - Multi-Agent
     - PR Automation

### Phương pháp 2: Cài VSIX file

1. **Build VSIX**
   ```bash
   npm run package  # hoặc
   npx vsce package
   ```

2. **Cài VSIX**
   - Mở VS Code
   - Extensions view (Ctrl+Shift+X)
   - Click "..." menu
   - Chọn "Install from VSIX..."
   - Chọn file `claude-dev-3.66.0.vsix`

3. **Reload VS Code**
   - Ctrl+Shift+P
   - "Developer: Reload Window"

4. **Check Settings**
   - Mở Cline
   - Settings > Experimental
   - Tìm Multi-Agent và PR Automation

## Troubleshooting

### Không thấy toggles trong Settings

**Nguyên nhân:** Extension đang chạy từ build cũ

**Giải pháp:**

1. **Stop debug session hiện tại**
   - Nhấn Shift+F5
   - Hoặc click nút Stop trong debug toolbar

2. **Clean build**
   ```bash
   npm run clean:build
   ```

3. **Rebuild**
   ```bash
   npm run build:webview
   node esbuild.mjs
   ```

4. **Start lại debug** (F5)

### Toggles vẫn không hiện

**Kiểm tra console logs:**

1. Trong Extension Development Host window
2. Help > Toggle Developer Tools
3. Console tab
4. Tìm errors liên quan đến:
   - `multiAgentEnabled`
   - `prAutomationEnabled`
   - `FeatureFlag`

**Kiểm tra state:**

Trong Console, chạy:
```javascript
// Check if feature flags are loaded
console.log(window.__CLINE_STATE__)
```

### Extension không load

**Kiểm tra:**

1. **Output panel**
   - View > Output
   - Chọn "Cline" từ dropdown
   - Xem có errors không

2. **Extension Host log**
   - Help > Toggle Developer Tools
   - Console tab
   - Tìm errors khi extension activate

## Verify feature flags

### Check trong code

Mở file: `src/shared/services/feature-flags/feature-flags.ts`

Verify:
```typescript
export const FeatureFlagDefaultValue: Partial<Record<FeatureFlag, FeatureFlagPayload>> = {
  // ...
  [FeatureFlag.MULTI_AGENT]: true,  // ← Phải là true
  [FeatureFlag.PR_AUTOMATION]: true, // ← Phải là true
}
```

### Check trong build output

```bash
# Check if feature flags are in the built extension
grep -r "MULTI_AGENT.*true" dist/
grep -r "PR_AUTOMATION.*true" dist/
```

## Test Multi-Agent functionality

Sau khi thấy toggles và bật chúng:

### Test 1: Create agents

```typescript
// Trong VS Code console (Help > Toggle Developer Tools)
const { AgentManager } = require('./dist/extension.js')
const manager = AgentManager.getInstance()

// Tạo agent
const agent = await manager.createAgent({
  name: "Test Agent",
  task: "Create a hello world function"
})

console.log("Agent created:", agent.id)
```

### Test 2: Check registry

```typescript
const { AgentRegistry } = require('./dist/extension.js')
const registry = AgentRegistry.getInstance()

console.log("Active agents:", registry.getActiveAgents())
```

## Test PR Automation

### Setup GitHub token

1. Tạo token tại: https://github.com/settings/tokens
2. Quyền cần: `repo` (Full control)
3. Thêm vào `.env`:
   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   ```

### Test PR creation

```typescript
const { GitHubService } = require('./dist/extension.js')

const github = new GitHubService({
  owner: "your-username",
  repo: "your-repo",
  token: process.env.GITHUB_TOKEN
})

// Test tạo branch
const branch = await github.createBranch("test-branch", "main")
console.log("Branch created:", branch)
```

## Debug tips

### Enable verbose logging

Thêm vào `.env`:
```bash
DEBUG=cline:*
LOG_LEVEL=debug
```

### Watch mode

Để tự động rebuild khi code thay đổi:

Terminal 1:
```bash
cd webview-ui
npm run dev
```

Terminal 2:
```bash
npm run watch
```

Sau đó nhấn F5 để debug.

### Check extension is loaded

Trong Extension Development Host:
1. Ctrl+Shift+P
2. "Developer: Show Running Extensions"
3. Tìm "Cline" trong list
4. Check status = "Activated"

## Common issues

### Issue: "Cannot find module '@core/multi-agent'"

**Fix:**
```bash
# Rebuild với đầy đủ dependencies
npm run clean:all
npm install
npm run build:webview
node esbuild.mjs
```

### Issue: TypeScript errors

**Fix:**
```bash
# Regenerate proto files
npm run protos

# Check types
npm run check-types
```

### Issue: Webview không load

**Fix:**
```bash
# Rebuild webview
cd webview-ui
rm -rf build node_modules
npm install
npm run build
cd ..
node esbuild.mjs
```

## Success checklist

Khi test thành công, bạn sẽ thấy:

- ✅ Extension Development Host window mở
- ✅ Cline sidebar hiển thị
- ✅ Settings > Experimental có 4 options:
  - Yolo Mode
  - Double-Check Completion
  - Multi-Agent ← MỚI
  - PR Automation ← MỚI
- ✅ Có thể bật/tắt toggles
- ✅ Console không có errors
- ✅ Output panel (Cline) không có errors

## Next steps

Sau khi verify toggles hiển thị:

1. Bật Multi-Agent toggle
2. Bật PR Automation toggle
3. Test tạo agents (xem MULTI_AGENT_GUIDE_VI.md)
4. Test PR automation (xem MULTI_AGENT_GUIDE_VI.md)

## Need help?

- Check TROUBLESHOOTING.md
- Check console logs
- Check Output panel
- Report issue: https://github.com/nhincainit65286-blip/cline-vi/issues
