# Quick Test - Multi-Agent & PR Automation

## Bước 1: Clean và Rebuild

```bash
# Trong terminal, chạy từng lệnh:

# 1. Clean build cũ
npm run clean:build

# 2. Build webview
npm run build:webview

# 3. Build extension
node esbuild.mjs --production
```

## Bước 2: Test trong VS Code

### Option A: Debug Mode (Nhanh nhất)

1. Mở VS Code với project cline-vi
2. Nhấn `F5` (hoặc Run > Start Debugging)
3. Cửa sổ mới sẽ mở (Extension Development Host)
4. Trong cửa sổ mới:
   - Mở Cline sidebar
   - Click Settings (⚙️)
   - Kéo xuống **Experimental**
   - Bạn sẽ thấy:
     ```
     Experimental
     ├─ Yolo Mode
     ├─ Double-Check Completion  
     ├─ Multi-Agent ← PHẢI CÓ
     └─ PR Automation ← PHẢI CÓ
     ```

### Option B: Install VSIX

```bash
# 1. Build VSIX
npx vsce package

# 2. Cài file claude-dev-3.66.0.vsix
# Extensions > ... > Install from VSIX

# 3. Reload VS Code
# Ctrl+Shift+P > "Developer: Reload Window"
```

## Bước 3: Verify

### Check Console

1. Trong Extension Development Host
2. `Help > Toggle Developer Tools`
3. Console tab
4. Không có errors về `multiAgentEnabled` hoặc `prAutomationEnabled`

### Check State

Trong Console, chạy:
```javascript
// Xem state
console.log(window.__CLINE_STATE__)

// Tìm multiAgentEnabled và prAutomationEnabled
```

## Nếu vẫn không thấy

### Debug Step 1: Check Build Output

```bash
# Check feature flags trong build
grep -A 5 "MULTI_AGENT" dist/extension.js
grep -A 5 "PR_AUTOMATION" dist/extension.js
```

Phải thấy:
```javascript
MULTI_AGENT: true
PR_AUTOMATION: true
```

### Debug Step 2: Check Source

```bash
# Verify source code
cat src/shared/services/feature-flags/feature-flags.ts | grep -A 2 "MULTI_AGENT"
```

Phải thấy:
```typescript
[FeatureFlag.MULTI_AGENT]: true,
[FeatureFlag.PR_AUTOMATION]: true,
```

### Debug Step 3: Force Rebuild

```bash
# Nuclear option - xóa hết và build lại
rm -rf dist dist-standalone webview-ui/build node_modules/.cache
npm run build:webview
node esbuild.mjs --production
```

## Troubleshooting

### Error: "Cannot find module"

```bash
npm install
cd webview-ui && npm install && cd ..
npm run build:webview
node esbuild.mjs
```

### Error: TypeScript errors

```bash
npm run protos
npm run check-types
```

### Toggles vẫn không hiện

1. **Stop tất cả debug sessions** (Shift+F5)
2. **Close tất cả VS Code windows**
3. **Rebuild:**
   ```bash
   npm run clean:build
   npm run build:webview
   node esbuild.mjs --production
   ```
4. **Start lại:** Mở VS Code, nhấn F5

## Expected Result

Khi thành công, trong Settings > Experimental bạn sẽ thấy:

```
┌─────────────────────────────────────┐
│ Experimental                        │
├─────────────────────────────────────┤
│ Yolo Mode                      [ ]  │
│ Execute tasks without...            │
│                                     │
│ Double-Check Completion        [ ]  │
│ Rejects the first...                │
│                                     │
│ Multi-Agent                    [ ]  │ ← MỚI
│ Enable multiple AI agents...        │
│                                     │
│ PR Automation                  [ ]  │ ← MỚI
│ Enable automatic Pull Request...    │
└─────────────────────────────────────┘
```

## Next Steps

Sau khi thấy toggles:

1. ✅ Bật Multi-Agent
2. ✅ Bật PR Automation  
3. 📖 Đọc `MULTI_AGENT_GUIDE_VI.md` để sử dụng
4. 🧪 Test tạo agents
5. 🚀 Test PR automation

## Still Having Issues?

1. Check `TROUBLESHOOTING.md`
2. Check console logs (Help > Toggle Developer Tools)
3. Check Output panel (View > Output > Cline)
4. Report issue: https://github.com/nhincainit65286-blip/cline-vi/issues

Include:
- VS Code version
- Extension version
- Console errors
- Steps you tried
