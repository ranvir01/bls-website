// Script to install tailwindcss and related dependencies
const { execSync } = require('child_process');

console.log('Installing tailwindcss and dependencies...');

try {
  // Force install tailwindcss and related packages globally in the node_modules
  execSync('npm install tailwindcss postcss autoprefixer --no-save', { stdio: 'inherit' });
  
  // Verify installation
  const tailwindVersion = execSync('npx tailwindcss --version').toString().trim();
  console.log(`Successfully installed tailwindcss: ${tailwindVersion}`);
  
  process.exit(0);
} catch (error) {
  console.error('Error installing tailwindcss:', error.message);
  process.exit(1);
} 