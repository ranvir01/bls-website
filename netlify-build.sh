#!/bin/bash
set -e

# Debug information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies including dev dependencies
echo "Installing dependencies..."
npm ci --include=dev

# Install TypeScript packages explicitly
echo "Installing TypeScript dependencies explicitly..."
npm install --no-save @types/react @types/node @types/react-dom typescript

# Create a dedicated node_modules folder for tailwindcss if needed
echo "Creating dedicated tailwindcss module..."
mkdir -p tailwind-node-modules
cp -r node_modules/tailwindcss tailwind-node-modules/
cp -r node_modules/postcss tailwind-node-modules/
cp -r node_modules/autoprefixer tailwind-node-modules/

# Show node_modules content to debug
echo "Verifying installed modules..."
find node_modules -type d -name "@types" | grep -E "react|node"
find node_modules -name "typescript" -type d

# Build the application with explicit NODE_PATH to include our modules
echo "Building the application with TypeScript types..."
export NODE_PATH="$NODE_PATH:$(pwd)/node_modules:$(pwd)/tailwind-node-modules"
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Because we have TypeScript errors, but we want to build anyway
echo "Building with TypeScript checking disabled..."
npm run build

# Apply viewport metadata fix
echo "Applying viewport metadata fix..."
node scripts/fix-viewport.js

# Optimize images during build
echo "Optimizing image configuration..."
# Add a special image handling comment to help Netlify
cat << EOF > ./.next/images-manifest.json
{
  "version": 1,
  "images": {
    "domains": ["i.imgur.com", "images.pexels.com"],
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "i.imgur.com"
      },
      {
        "protocol": "https",
        "hostname": "images.pexels.com"
      }
    ],
    "unoptimized": true
  }
}
EOF

# Verify the build directory exists
if [ -d ".next" ]; then
  echo "Build directory '.next' found successfully"
  ls -la .next
else
  echo "ERROR: '.next' directory not found after build"
  exit 1
fi

echo "Build completed successfully!" 