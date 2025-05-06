# Netlify Build Command Fix

The build command in `netlify.toml` has been updated to address syntax issues. The changes include:

1. Simplified the build command to `npm ci && npm run build`
2. Properly set environment variables in the `[build.environment]` section
3. Removed environment variables from the build script in `package.json`

These changes should fix the syntax error in the build command that was causing the build to fail. 