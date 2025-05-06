// Script to add viewport export to all relevant pages
const fs = require('fs');
const path = require('path');

// Add viewport export to the root layout
const layoutPath = path.join(__dirname, '../app/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Remove viewport from metadata
layoutContent = layoutContent.replace(/viewport:[^,]*,/g, '');

// Add viewport export if not already present
if (!layoutContent.includes('export const viewport')) {
  const viewportExport = `
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  viewportFit: 'cover',
};
`;

  // Find a good spot to insert the viewport export (after metadata)
  const metadataEndIndex = layoutContent.indexOf('};', layoutContent.indexOf('export const metadata'));
  if (metadataEndIndex !== -1) {
    layoutContent = 
      layoutContent.substring(0, metadataEndIndex + 2) + 
      viewportExport + 
      layoutContent.substring(metadataEndIndex + 2);
  }

  fs.writeFileSync(layoutPath, layoutContent);
  console.log('Updated layout.tsx with viewport export');
}

console.log('Viewport metadata fix completed!'); 