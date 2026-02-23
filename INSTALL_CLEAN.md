# Hướng dẫn cài đặt sạch (Fix Service Worker Error)

## Vấn đề

VS Code đang cache webview cũ, gây ra lỗi Service Worker ngay cả sau khi đã fix.

## Giải pháp: Cài đặt sạch

### Bước 1: Uninstall extension cũ hoàn toàn

```bash
# Uninstall qua CLI
code --uninstall-extension saoudrizwan.claude-dev
```

Hoặc qua UI:
1. Extensions view (Ctrl+Shift+X)
2. Tìm "Cline" hoặc "Claude Dev"
3. Click Uninstall
4. **ĐÓNG TẤT CẢ VS CODE WINDOWS**

### Bước 2: Clear VS Code cache

#### Windows:
```powershell
# Đóng tất cả VS Code windows trước!

# Xóa cache
Remove-Item -Recurse -Force "$env:APPDATA\Code\Cache"
Remove-Item -Recurse -Force "$env:APPDATA\Code\CachedData"
Remove-Item -Recurse -Force "$env:APPDATA\Code\CachedExtensions"
Remove-Item -Recurse -Force "$env:APPDATA\Code\CachedExtensionVSIXs"

# Xóa service worker cache
Remove-Item -Recurse -Force "$env:APPDATA\Code\Service Worker"

# Xóa webview cache
Remove-Item -Recurse -Force "$env:APPDATA\Code\User\workspaceStorage"
```

#### macOS:
```bash
# Đóng tất cả VS Code windows trước!

rm -rf ~/Library/Application\ Support/Code/Cache
rm -rf ~/Library/Application\ Support/Code/CachedData
rm -rf ~/Library/Application\ Support/Code/CachedExtensions
rm -rf ~/Library/Application\ Support/Code/Service\ Worker
rm -rf ~/Library/Application\ Support/Code/User/workspaceStorage
```

#### Linux:
```bash
# Đóng tất cả VS Code windows trước!

rm -rf ~/.config/Code/Cache
rm -rf ~/.config/Code/CachedData
rm -rf ~/.config/Code/CachedExtensions
rm -rf ~/.config/Code/Service\ Worker
rm -rf ~/.config/Code/User/workspaceStorage
```

### Bước 3: Cài extension mới

```bash
# Cài VSIX mới
code --install-extension "C:\Users\laptop\Pictures\project\cline-vi\claude-dev-3.66.0.vsix"
```

Hoặc qua UI:
1. Mở VS Code (cửa sổ mới, sạch)
2. Extensions > ... > Install from VSIX
3. Chọn `claude-dev-3.66.0.vsix`

### Bước 4: Verify

1. Reload window (Ctrl+Shift+P > "Developer: Reload Window")
2. Mở Developer Tools (Help > Toggle Developer Tools)
3. Console tab - KHÔNG còn lỗi "Service Worker"
4. Mở Cline sidebar
5. Settings > Experimental
6. Thấy Multi-Agent và PR Automation toggles

## Nếu vẫn lỗi

### Option 1: Hard reset VS Code

```bash
# Windows
code --user-data-dir "%TEMP%\vscode-clean"

# macOS/Linux  
code --user-data-dir /tmp/vscode-clean
```

Cài extension trong instance sạch này.

### Option 2: Reinstall VS Code

1. Uninstall VS Code hoàn toàn
2. Xóa tất cả cache folders (xem Bước 2)
3. Download VS Code mới từ https://code.visualstudio.com
4. Cài lại
5. Cài extension

### Option 3: Debug mode

Thay vì cài VSIX, chạy extension trong debug mode:

1. Clone repo:
   ```bash
   git clone https://github.com/nhincainit65286-blip/cline-vi.git
   cd cline-vi
   ```

2. Install dependencies:
   ```bash
   npm install
   cd webview-ui && npm install && cd ..
   ```

3. Build:
   ```bash
   npm run build:webview
   node esbuild.mjs
   ```

4. Mở project trong VS Code:
   ```bash
   code .
   ```

5. Nhấn F5 để start debug

6. Extension Development Host window sẽ mở với extension đã load

## Verify thành công

Khi cài đặt thành công, bạn sẽ thấy:

✅ Console KHÔNG có lỗi "Service Worker"
✅ Extension host KHÔNG unresponsive
✅ Cline sidebar mở được
✅ Settings > Experimental có:
   - Multi-Agent toggle
   - PR Automation toggle
✅ Console có log: `🔍 Feature Settings Debug:`

## Troubleshooting

### Lỗi: "Extension is not compatible"

Kiểm tra VS Code version:
```bash
code --version
```

Cần: VS Code >= 1.84.0

### Lỗi: "Cannot find module"

```bash
cd cline-vi
npm install
npm run build:webview
node esbuild.mjs --production
npx vsce package
```

### Extension không activate

1. Check Output panel (View > Output > Cline)
2. Check Extension Host log (Help > Toggle Developer Tools > Console)
3. Look for activation errors

### Webview trống

1. Clear cache (Bước 2)
2. Reinstall extension
3. Hard reload (Ctrl+Shift+P > "Developer: Reload Window")

## Support

Nếu vẫn gặp vấn đề:

1. Collect logs:
   - Console logs (Help > Toggle Developer Tools)
   - Output panel (View > Output > Cline)
   - Extension Host logs

2. Report issue:
   - https://github.com/nhincainit65286-blip/cline-vi/issues
   - Include:
     - VS Code version
     - OS version
     - Steps tried
     - Error messages
     - Screenshots

## Quick Commands

```bash
# Full clean reinstall (Windows)
code --uninstall-extension saoudrizwan.claude-dev
Remove-Item -Recurse -Force "$env:APPDATA\Code\Cache"
Remove-Item -Recurse -Force "$env:APPDATA\Code\Service Worker"
code --install-extension "path\to\claude-dev-3.66.0.vsix"

# Full clean reinstall (macOS/Linux)
code --uninstall-extension saoudrizwan.claude-dev
rm -rf ~/Library/Application\ Support/Code/Cache
rm -rf ~/Library/Application\ Support/Code/Service\ Worker
code --install-extension "path/to/claude-dev-3.66.0.vsix"
```
