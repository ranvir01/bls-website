const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const areas = [
  { name: 'seattle', query: 'seattle skyline' },
  { name: 'capitol-hill', query: 'capitol hill seattle neighborhood' },
  { name: 'belltown', query: 'belltown seattle urban' },
  { name: 'magnolia', query: 'magnolia seattle residential' },
  { name: 'west-seattle', query: 'west seattle waterfront' },
  { name: 'bellevue', query: 'bellevue washington skyline' },
  { name: 'kirkland', query: 'kirkland washington waterfront' },
  { name: 'redmond', query: 'redmond washington tech campus' },
  { name: 'issaquah', query: 'issaquah washington mountains' },
  { name: 'mercer-island', query: 'mercer island washington luxury homes' },
  { name: 'shoreline', query: 'shoreline washington residential' },
  { name: 'edmonds', query: 'edmonds washington waterfront' },
  { name: 'lake-forest-park', query: 'lake forest park washington nature' },
  { name: 'mountlake-terrace', query: 'mountlake terrace washington' },
  { name: 'burien', query: 'burien washington' },
  { name: 'tukwila', query: 'tukwila washington' },
  { name: 'renton', query: 'renton washington lake' },
  { name: 'kent', query: 'kent washington valley' },
  { name: 'auburn', query: 'auburn washington' },
  { name: 'federal-way', query: 'federal way washington' },
  { name: 'des-moines', query: 'des moines washington waterfront' },
  { name: 'maple-valley', query: 'maple valley washington forest' },
  { name: 'covington', query: 'covington washington suburban' },
  { name: 'seatac', query: 'seatac washington' },
  { name: 'seattle-skyline', query: 'seattle downtown aerial' },
];

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const IMAGE_DIR = path.join(__dirname, '../public/images/areas');

// Ensure the directory exists
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(path.join(IMAGE_DIR, filename));
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Failed to download image: ${response.statusCode}`);
      }
    }).on('error', reject);
  });
}

async function getUnsplashImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape`;
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    }, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            resolve(result.results[0].urls.regular);
          } else {
            reject('No images found');
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const area of areas) {
    try {
      console.log(`Downloading image for ${area.name}...`);
      const imageUrl = await getUnsplashImage(area.query);
      await downloadImage(imageUrl, `${area.name}.jpg`);
      console.log(`✓ Downloaded ${area.name}.jpg`);
      // Wait a bit to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`× Failed to download ${area.name}.jpg:`, error);
    }
  }
  
  console.log('Finished downloading images!');
}

// Only run if called directly
if (require.main === module) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Please set UNSPLASH_ACCESS_KEY in your .env file!');
    process.exit(1);
  }
  
  downloadAllImages().catch(console.error);
} 