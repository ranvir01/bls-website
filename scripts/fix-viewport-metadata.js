/**
 * This script finds all page files with viewport in metadata
 * and moves it to a separate viewport export
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function findPageFiles(dir) {
  const files = await readdir(dir);
  const pageFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      const subDirPageFiles = await findPageFiles(filePath);
      pageFiles.push(...subDirPageFiles);
    } else if (file === 'page.tsx' || file === 'page.jsx' || file === 'page.js') {
      pageFiles.push(filePath);
    }
  }

  return pageFiles;
}

async function fixViewportMetadata(filePath) {
  const content = await readFile(filePath, 'utf8');

  if (content.includes('viewport:') || content.includes('"viewport":') || content.includes("'viewport':")) {
    console.log(`Fixing viewport metadata in ${filePath}`);

    // Extract viewport value
    let viewportValue = null;
    const viewportRegex = /viewport:\s*['"]([^'"]+)['"]/;
    const match = content.match(viewportRegex);

    if (match) {
      viewportValue = match[1];
    }

    // Remove viewport from metadata
    let updatedContent = content.replace(/(\s*)(viewport:[^,}]+[,]?)/, '');

    // Add viewport export if a value was found
    if (viewportValue) {
      // Parse the viewport value
      const width = viewportValue.match(/width=([^,]+)/) ? viewportValue.match(/width=([^,]+)/)[1] : 'device-width';
      const initialScale = viewportValue.match(/initial-scale=([^,]+)/) ? viewportValue.match(/initial-scale=([^,]+)/)[1] : '1.0';
      const maximumScale = viewportValue.match(/maximum-scale=([^,]+)/) ? viewportValue.match(/maximum-scale=([^,]+)/)[1] : '5.0';
      const viewportFit = viewportValue.match(/viewport-fit=([^,]+)/) ? viewportValue.match(/viewport-fit=([^,]+)/)[1] : 'cover';

      // Find where to insert the viewport export
      const metadataIndex = updatedContent.indexOf('export const metadata');
      const metadataEndRegex = /export const metadata[^;]*};/;
      const metadataEndMatch = metadataEndRegex.exec(updatedContent);

      if (metadataEndMatch) {
        const insertPoint = metadataEndMatch.index + metadataEndMatch[0].length;
        const viewportExport = `

export const viewport = {
  width: ${JSON.stringify(width)},
  initialScale: ${initialScale},
  maximumScale: ${maximumScale},
  viewportFit: ${JSON.stringify(viewportFit)}
};
`;
        updatedContent = 
          updatedContent.substring(0, insertPoint) + 
          viewportExport + 
          updatedContent.substring(insertPoint);
      }
    }

    await writeFile(filePath, updatedContent);
  }
}

async function main() {
  const appDir = path.join(process.cwd(), 'app');
  const pageFiles = await findPageFiles(appDir);

  for (const filePath of pageFiles) {
    await fixViewportMetadata(filePath);
  }

  console.log('Viewport metadata fix completed!');
}

main().catch(console.error); 