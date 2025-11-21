/**
 * This script will update productsData.ts with correct image mappings
 * 
 * USAGE:
 * 1. Use the image-matcher.html tool to identify correct mappings
 * 2. Create a file called 'correct_mappings.json' with this format:
 *    {
 *      "Small Chocolate": "WhatsApp Image 2025-11-03 at 20.53.48_8153f9b8.jpg",
 *      "Chocolate Bar": "WhatsApp Image 2025-11-03 at 20.53.48_9cd4b6f9.jpg",
 *      ...
 *    }
 * 3. Run: node update_image_mappings.js
 */

const fs = require('fs');
const path = require('path');

// Read the correct mappings
let mappings = {};
try {
  const mappingsFile = path.join(__dirname, 'correct_mappings.json');
  if (fs.existsSync(mappingsFile)) {
    mappings = JSON.parse(fs.readFileSync(mappingsFile, 'utf-8'));
    console.log(`Loaded ${Object.keys(mappings).length} mappings from correct_mappings.json`);
  } else {
    console.log('ERROR: correct_mappings.json not found!');
    console.log('\nPlease create correct_mappings.json with the format:');
    console.log(JSON.stringify({
      "Small Chocolate": "WhatsApp Image 2025-11-03 at 20.53.48_8153f9b8.jpg",
      "Chocolate Bar": "WhatsApp Image 2025-11-03 at 20.53.48_9cd4b6f9.jpg"
    }, null, 2));
    process.exit(1);
  }
} catch (error) {
  console.error('Error reading mappings:', error);
  process.exit(1);
}

// Read productsData.ts
const productsDataPath = path.join(__dirname, 'src/lib/productsData.ts');
let content = fs.readFileSync(productsDataPath, 'utf-8');

// Product to image variable mapping
const productToImageVar = {
  'Small Chocolate': 'chocolate',
  'Chocolate Bar': 'chocolate2',
  'Nut Chocolate Bar': 'chocolate3',
  'Vanilla Muffin': 'muffin',
  'Chocolate Muffin': 'muffin2',
  'Vanilla Cupcake': 'cupcake',
  'Chocolate Cupcake': 'cupcake2',
  'Vanilla Glasscake': 'glasscake',
  'Strawberry Glasscake': 'glasscake2',
  'Pineapple Glasscake': 'glasscake3',
  'Chocolate Glasscake': 'glasscake4',
  'Truffle Glasscake': 'truffle',
  'Vanilla Jarcake': 'jarcake',
  'Strawberry Jarcake': 'jarcake2',
  'Pineapple Jarcake': 'jarcake3',
  'Chocolate Jarcake': 'jarcake4',
  'Truffle Jarcake': 'truffle',
  'Blueberry Cheesecake': 'cheesecake',
  'Chocolate Cheesecake': 'cheesecake2',
  'Brownie (40gm)': 'brownie',
  'Brownie (500gm)': 'brownie2',
  'Vanilla Cake (500gm)': 'cake',
  'Vanilla Cake (1kg)': 'cake2',
  'Vanilla Cake (Bento)': 'cake3',
  'Strawberry Cake (500gm)': 'cake4',
  'Strawberry Cake (1kg)': 'cake5',
  'Strawberry Cake (Bento)': 'cake6',
  'Chocolate Cake (500gm)': 'cake7',
  'Chocolate Cake (1kg)': 'cake8',
  'Chocolate Cake (Bento)': 'extra3',
  'Pineapple Cake (500gm)': 'extra1',
  'Pineapple Cake (1kg)': 'extra2',
  'Pineapple Cake (Bento)': 'cake3', // This might need adjustment
  'Truffle Cake (500gm)': 'truffle',
  'Truffle Cake (1kg)': 'truffle',
  'Truffle Cake (Bento)': 'truffle',
  'Chocolate Loaf': 'loaf',
  'Vanilla Loaf': 'loaf2',
  'Tooti Frooti Loaf': 'loaf3',
  'Nankhatai (500gms)': 'nankhatai',
};

// Create a reverse mapping: image filename -> which image variables use it
const imageUsage = {};
Object.entries(mappings).forEach(([productName, imageFile]) => {
  const imageVar = productToImageVar[productName];
  if (imageVar && imageFile) {
    if (!imageUsage[imageFile]) {
      imageUsage[imageFile] = [];
    }
    imageUsage[imageFile].push({ product: productName, var: imageVar });
  }
});

console.log('\nImage Usage Summary:');
Object.entries(imageUsage).forEach(([image, usages]) => {
  console.log(`\n${image}:`);
  usages.forEach(u => console.log(`  - ${u.product} (${u.var})`));
});

// Now we need to update the images object in productsData.ts
// This is complex because we need to map products to the right image variables
// and then update the image assignments

console.log('\n\nTo complete the update, you need to:');
console.log('1. Review the image usage above');
console.log('2. Update the images object in productsData.ts manually, OR');
console.log('3. Provide the mapping in a format I can use to auto-update\n');

// For now, let's create a helper output
const updateInstructions = Object.entries(mappings).map(([product, image]) => {
  const imageVar = productToImageVar[product];
  return `  ${imageVar}: getImagePath('${image}'), // ${product}`;
}).join('\n');

fs.writeFileSync('image_update_instructions.txt', 
  'Update the images object in productsData.ts with these mappings:\n\n' + 
  updateInstructions
);

console.log('Instructions saved to image_update_instructions.txt');



