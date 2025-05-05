const fs = require('fs');
const path = require('path');

const cityImages = {
  'bellevue-downtown': 'Bellevue Downtown',
  'redmond-microsoft': 'Redmond Microsoft Campus',
  'mercer-island-waterfront': 'Mercer Island Waterfront',
  'issaquah-mountains': 'Issaquah Alps',
  'shoreline-park': 'Shoreline Park',
  'lake-forest-park-trees': 'Lake Forest Park',
  'edmonds-waterfront': 'Edmonds Waterfront',
  'mountlake-terrace-park': 'Mountlake Terrace',
  'burien-downtown': 'Burien Downtown',
  'tukwila-center': 'Tukwila Center',
  'renton-landing': 'Renton Landing',
  'kent-valley': 'Kent Valley',
  'maple-valley-lake': 'Maple Valley Lake',
  'covington-park': 'Covington Park',
  'seatac-center': 'SeaTac Center'
};

const hardscapingImages = {
  'patio-main': 'Patio Installation',
  'walkway-main': 'Walkways & Pathways',
  'retaining-wall-main': 'Retaining Walls',
  'driveway-main': 'Driveway Installation',
  'fire-feature-main': 'Outdoor Fire Features',
  'steps-main': 'Steps & Stairs',
  'seating-main': 'Built-in Seating',
  'water-feature-main': 'Water Features'
};

function createPlaceholderImage(filename, title, directory) {
  const svgContent = `
    <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#2C5282"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${title}
      </text>
    </svg>
  `;

  const outputPath = path.join(process.cwd(), 'public/images', directory, `${filename}.jpg`);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath.replace('.jpg', '.svg'), svgContent);
  console.log(`Created: ${filename}.svg`);
}

// Create city images
Object.entries(cityImages).forEach(([filename, title]) => {
  createPlaceholderImage(filename, title, 'cities');
});

// Create hardscaping images
Object.entries(hardscapingImages).forEach(([filename, title]) => {
  createPlaceholderImage(filename, title, 'hardscaping');
});

console.log('All placeholder images created successfully!'); 