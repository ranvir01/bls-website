// Custom Netlify plugin to fix tailwindcss installation
module.exports = {
  onPreBuild: async ({ utils }) => {
    try {
      console.log('Installing tailwindcss and related packages...');
      await utils.run.command('npm install --no-save tailwindcss postcss autoprefixer');
      console.log('Successfully installed tailwindcss dependencies');
    } catch (error) {
      console.error('Error installing tailwindcss:', error);
      utils.build.failBuild('Failed to install tailwindcss dependencies');
    }
  }
};
