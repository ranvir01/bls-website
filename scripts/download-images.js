const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

// Import fetch for Node.js < 18
let fetch;
if (!globalThis.fetch) {
  fetch = require('node-fetch');
} else {
  fetch = globalThis.fetch;
}

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const cityImages = {
  'bellevue-downtown': 'bellevue washington skyline',
  'redmond-microsoft': 'microsoft redmond campus',
  'mercer-island-waterfront': 'mercer island waterfront',
  'issaquah-mountains': 'issaquah alps',
  'shoreline-park': 'richmond beach shoreline',
  'lake-forest-park-trees': 'lake forest park washington',
  'edmonds-waterfront': 'edmonds washington waterfront',
  'mountlake-terrace-park': 'mountlake terrace recreation',
  'burien-downtown': 'burien washington downtown',
  'tukwila-center': 'tukwila washington',
  'renton-landing': 'renton landing washington',
  'kent-valley': 'kent valley washington',
  'maple-valley-lake': 'lake wilderness maple valley',
  'covington-park': 'covington washington park',
  'seatac-center': 'seatac washington city'
};

const hardscapingImages = {
  'patio-main': 'luxury outdoor patio design',
  'walkway-main': 'garden pathway landscaping',
  'retaining-wall-main': 'stone retaining wall landscaping',
  'driveway-main': 'luxury driveway design',
  'fire-feature-main': 'outdoor fire pit design',
  'steps-main': 'outdoor stone steps landscaping',
  'seating-main': 'built in outdoor seating stone',
  'water-feature-main': 'outdoor water feature design'
};

async function downloadImage(query, filename, directory) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Please set UNSPLASH_ACCESS_KEY environment variable');
    process.exit(1);
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });
    
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      console.error(`No images found for query: ${query}`);
      return;
    }

    const imageUrl = data.results[0].urls.regular;
    const outputPath = path.join(process.cwd(), 'public/images', directory, `${filename}.jpg`);

    const imageResponse = await fetch(imageUrl);
    await pipeline(imageResponse.body, fs.createWriteStream(outputPath));

    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
  }
}

async function main() {
  // Create directories if they don't exist
  const directories = ['cities', 'hardscaping'];
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), 'public/images', dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  // Download city images
  for (const [filename, query] of Object.entries(cityImages)) {
    await downloadImage(query, filename, 'cities');
  }

  // Download hardscaping images
  for (const [filename, query] of Object.entries(hardscapingImages)) {
    await downloadImage(query, filename, 'hardscaping');
  }
}

main().catch(console.error); 