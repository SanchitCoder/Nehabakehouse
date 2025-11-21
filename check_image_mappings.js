/**
 * Check which products have renamed images and which still need mapping
 */

const fs = require('fs');
const path = require('path');

// Get all image files
function getAllImages() {
  const rootDir = __dirname;
  const files = fs.readdirSync(rootDir);
  return files
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => file.toLowerCase());
}

// Products from the codebase
const products = [
  'Small Chocolate',
  'Chocolate Bar',
  'Nut Chocolate Bar',
  'Vanilla Muffin',
  'Chocolate Muffin',
  'Vanilla Cupcake',
  'Chocolate Cupcake',
  'Vanilla Glasscake',
  'Strawberry Glasscake',
  'Pineapple Glasscake',
  'Chocolate Glasscake',
  'Truffle Glasscake',
  'Vanilla Jarcake',
  'Strawberry Jarcake',
  'Pineapple Jarcake',
  'Chocolate Jarcake',
  'Truffle Jarcake',
  'Blueberry Cheesecake',
  'Chocolate Cheesecake',
  'Brownie (40gm)',
  'Brownie (500gm)',
  'Vanilla Cake (500gm)',
  'Vanilla Cake (1kg)',
  'Vanilla Cake (Bento)',
  'Strawberry Cake (500gm)',
  'Strawberry Cake (1kg)',
  'Strawberry Cake (Bento)',
  'Chocolate Cake (500gm)',
  'Chocolate Cake (1kg)',
  'Chocolate Cake (Bento)',
  'Pineapple Cake (500gm)',
  'Pineapple Cake (1kg)',
  'Pineapple Cake (Bento)',
  'Truffle Cake (500gm)',
  'Truffle Cake (1kg)',
  'Truffle Cake (Bento)',
  'Chocolate Loaf',
  'Vanilla Loaf',
  'Tooti Frooti Loaf',
  'Nankhatai (500gms)',
];

const images = getAllImages();

console.log('='.repeat(80));
console.log('Image-Product Mapping Status');
console.log('='.repeat(80));
console.log(`\nTotal Products: ${products.length}`);
console.log(`Total Images: ${images.length}\n`);

// Find renamed images (those that match product names)
const renamedImages = [];
const productNameVariations = products.map(p => ({
  original: p,
  variations: [
    p.toLowerCase().replace(/\s+/g, ' '),
    p.toLowerCase().replace(/\s+/g, ''),
    p.toLowerCase().replace(/[()]/g, ''),
    p.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ''),
  ]
}));

images.forEach(img => {
  const imgLower = img.replace(/\.(jpg|jpeg|png)$/i, '').toLowerCase();
  
  productNameVariations.forEach(({ original, variations }) => {
    variations.forEach(variation => {
      if (imgLower.includes(variation) || variation.includes(imgLower)) {
        renamedImages.push({
          product: original,
          image: img,
          match: 'exact'
        });
      }
    });
    
    // Check for partial matches (e.g., "chocolate cake" in filename)
    const keywords = original.toLowerCase().split(/\s+/);
    if (keywords.length > 1) {
      const mainKeyword = keywords.find(k => k.length > 4); // Find main keyword
      if (mainKeyword && imgLower.includes(mainKeyword)) {
        // Check if it's not already matched
        if (!renamedImages.find(r => r.product === original && r.image === img)) {
          renamedImages.push({
            product: original,
            image: img,
            match: 'partial'
          });
        }
      }
    }
  });
});

// Remove duplicates
const uniqueRenamed = [];
const seen = new Set();
renamedImages.forEach(item => {
  const key = `${item.product}-${item.image}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueRenamed.push(item);
  }
});

console.log('Renamed Images Found:');
console.log('-'.repeat(80));
if (uniqueRenamed.length > 0) {
  uniqueRenamed.forEach(({ product, image, match }) => {
    console.log(`✓ ${product.padEnd(40)} → ${image} (${match})`);
  });
} else {
  console.log('No renamed images found that match product names.');
}

console.log('\n\nProducts that might need renamed images:');
console.log('-'.repeat(80));
const matchedProducts = new Set(uniqueRenamed.map(r => r.product));
products.forEach(product => {
  if (!matchedProducts.has(product)) {
    // Suggest a filename
    const suggestedName = product
      .replace(/[()]/g, '')
      .replace(/\s+/g, ' ')
      .trim() + '.jpg';
    console.log(`  ${product.padEnd(40)} → Suggested: ${suggestedName}`);
  }
});

console.log('\n\nCurrent renamed images in project:');
console.log('-'.repeat(80));
const renamedFiles = images.filter(img => {
  const imgLower = img.toLowerCase();
  return !imgLower.includes('whatsapp') && 
         !imgLower.includes('gemini_generated') &&
         !imgLower.includes('truffles');
});
renamedFiles.forEach(img => {
  console.log(`  - ${img}`);
});




