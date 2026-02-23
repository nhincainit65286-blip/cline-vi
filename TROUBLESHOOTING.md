# Troubleshooting Guide

## Service Worker Error

### Error Message
```
Error loading webview: Error: Could not register service worker: 
InvalidStateError: Failed to register a ServiceWorker: The document is in an invalid state.
```

### Cause
This error occurs when a dependency or build tool tries to register a Service Worker, which is not supported in VS Code webviews.

### Solutions

#### Solution 1: Reload VS Code Window
1. Press `F1` or `Ctrl+Shift+P`
2. Type "Developer: Reload Window"
3. Press Enter

#### Solution 2: Clear VS Code Cache
1. Close VS Code completely
2. Delete cache directories:
   - Windows: `%APPDATA%\Code\Cache`, `%APPDATA%\Code\CachedData`
   - macOS: `~/Library/Application Support/Code/Cache`
   - Linux: `~/.config/Code/Cache`
3. Restart VS Code

#### Solution 3: Rebuild Extension
```bash
cd cline-vi

# Clean build artifacts
npm run clean:build

# Rebuild
npm run build:webview
node esbuild.mjs --production
```

#### Solution 4: Check for Service Worker in Dependencies
Some dependencies might try to register service workers. Check:

```bash
# Search for service worker registration
grep -r "serviceWorker.register" node_modules/
grep -r "navigator.serviceWorker" node_modules/
```

If found, you may need to:
1. Update the dependency
2. Use a different dependency
3. Configure the dependency to disable service worker

#### Solution 5: Disable Service Worker in Vite Config
Add to `webview-ui/vite.config.ts`:

```typescript
export default defineConfig({
  // ... existing config
  build: {
    // ... existing build config
    rollupOptions: {
      // ... existing rollupOptions
      plugins: [
        {
          name: 'no-service-worker',
          generateBundle(options, bundle) {
            // Remove any service worker files
            for (const fileName in bundle) {
              if (fileName.includes('sw.js') || fileName.includes('service-worker')) {
                delete bundle[fileName]
              }
            }
          }
        }
      ]
    }
  }
})
```

#### Solution 6: Development Mode
If the error only occurs in production build, try running in development mode:

```bash
cd webview-ui
npm run dev
```

Then in another terminal:
```bash
cd cline-vi
npm run watch
```

Press `F5` in VS Code to start debugging.

### Prevention

To prevent this issue in the future:

1. **Avoid dependencies that use Service Workers**
   - Check dependency documentation before installing
   - Look for "service worker" mentions in package README

2. **Use VS Code-compatible libraries**
   - Prefer libraries designed for VS Code webviews
   - Check if library has a "no-service-worker" build

3. **Test in VS Code webview context**
   - Always test builds in actual VS Code extension
   - Don't rely only on browser testing

## Other Common Issues

### TypeScript Errors After Adding Features

**Error:** `Property 'multiAgentEnabled' does not exist on type...`

**Solution:**
1. Regenerate proto files:
   ```bash
   npm run protos
   ```

2. Check types are updated in:
   - `src/shared/proto/cline/state.ts`
   - `webview-ui/src/services/grpc-client.ts`

### Feature Toggles Not Showing

**Solution:**
1. Rebuild webview:
   ```bash
   npm run build:webview
   ```

2. Rebuild extension:
   ```bash
   node esbuild.mjs --production
   ```

3. Reload VS Code window

### Multi-Agent Not Working

**Checklist:**
- ✅ Feature flag enabled in Settings > Experimental
- ✅ Extension reloaded after enabling
- ✅ Check console for errors (Help > Toggle Developer Tools)
- ✅ Verify `AgentManager.getInstance()` is called

### PR Automation Fails

**Common causes:**
1. **Missing GitHub token**
   - Add `GITHUB_TOKEN` to `.env`
   - Token needs `repo` scope

2. **Invalid branch name**
   - Branch names can't have spaces or special chars
   - Use kebab-case: `feature/my-feature`

3. **No changes to commit**
   - Ensure files were actually modified
   - Check git status

4. **Network issues**
   - Check internet connection
   - Verify GitHub API is accessible
   - Check for rate limiting

### Build Errors

**Error:** `Cannot find module '@core/multi-agent'`

**Solution:**
Check import paths in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["./src/core/*"],
      "@services/*": ["./src/services/*"]
    }
  }
}
```

**Error:** `Lint errors in GeneralSettingsSection.tsx`

**Solution:**
```bash
npm run format:fix
```

## Getting Help

If none of these solutions work:

1. **Check logs:**
   - Help > Toggle Developer Tools > Console
   - Output panel > Cline

2. **Report issue:**
   - Go to: https://github.com/nhincainit65286-blip/cline-vi/issues
   - Include:
     - Error message
     - VS Code version
     - Extension version
     - Steps to reproduce

3. **Debug mode:**
   ```bash
   # Set debug environment
   export DEBUG=cline:*
   
   # Run extension in debug mode
   # Press F5 in VS Code
   ```
