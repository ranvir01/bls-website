#!/bin/bash

# Debug information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Install critical CSS dependencies explicitly
echo "Installing critical CSS dependencies..."
npm install --no-save tailwindcss postcss autoprefixer

# Build the application
echo "Building the application..."
npm run build

# Verify the build directory exists
if [ -d ".next" ]; then
  echo "Build directory '.next' found successfully"
else
  echo "ERROR: '.next' directory not found after build"
  exit 1
fi 