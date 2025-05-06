#!/bin/bash

# Ensure tailwindcss and other PostCSS dependencies are installed
echo "Installing critical dependencies..."
npm install --no-save tailwindcss postcss autoprefixer

# Verify installation
echo "Verifying tailwindcss installation..."
npx tailwindcss --help

echo "Build environment prepared successfully!" 