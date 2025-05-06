#!/bin/bash
set -e

# Debug information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Install tailwindcss explicitly with the package.json approach
echo "Installing tailwindcss with dedicated package.json..."
npm install --no-save --package-lock=false --prefix ./tailwind-temp --install-links=false -g --omit=dev --omit=peer --omit=optional --no-package-lock -f --ignore-scripts --no-audit tailwindcss postcss autoprefixer

# Create a dedicated node_modules folder for tailwindcss if needed
echo "Creating dedicated tailwindcss module..."
mkdir -p tailwind-node-modules
cp -r node_modules/tailwindcss tailwind-node-modules/
cp -r node_modules/postcss tailwind-node-modules/
cp -r node_modules/autoprefixer tailwind-node-modules/

# Show node_modules content to debug
echo "Verifying installed modules..."
find node_modules -name "tailwindcss" -type d
find node_modules -name "postcss" -type d
find node_modules -name "autoprefixer" -type d

# Build the application with explicit NODE_PATH to include our modules
echo "Building the application..."
export NODE_PATH="$NODE_PATH:$(pwd)/node_modules:$(pwd)/tailwind-node-modules"
export NODE_ENV=production
npm run build

# Verify the build directory exists
if [ -d ".next" ]; then
  echo "Build directory '.next' found successfully"
  ls -la .next
else
  echo "ERROR: '.next' directory not found after build"
  exit 1
fi 