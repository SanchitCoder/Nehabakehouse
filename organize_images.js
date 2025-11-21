/**
 * Image Organization Script
 * Creates a better mapping of images to products based on logical organization
 */

const fs = require('fs');
const path = require('path');

// Get all image files
function getAllImages() {
  const rootDir = '.';
  const files = fs.readdirSync(rootDir);
  return files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  ).sort();
}

// Product definitions matching the codebase
const PRODUCTS = [
  // CHOCOLATE
  { name: 'Small Chocolate', category: 'chocolate', type: 'small' },
  { name: 'Chocolate Bar', category: 'chocolate', type: 'bar' },
  { name: 'Nut Chocolate Bar', category: 'chocolate', type: 'bar', hasNuts: true },
  
  // MUFFINS
  { name: 'Vanilla Muffin', category: 'muffin', flavor: 'vanilla' },
  { name: 'Chocolate Muffin', category: 'muffin', flavor: 'chocolate' },
  
  // CUPCAKES
  { name: 'Vanilla Cupcake', category: 'cupcake', flavor: 'vanilla' },
  { name: 'Chocolate Cupcake', category: 'cupcake', flavor: 'chocolate' },
  
  // GLASSCAKES
  { name: 'Vanilla Glasscake', category: 'glasscake', flavor: 'vanilla' },
  { name: 'Strawberry Glasscake', category: 'glasscake', flavor: 'strawberry' },
  { name: 'Pineapple Glasscake', category: 'glasscake', flavor: 'pineapple' },
  { name: 'Chocolate Glasscake', category: 'glasscake', flavor: 'chocolate' },
  { name: 'Truffle Glasscake', category: 'glasscake', flavor: 'truffle' },
  
  // JARCAKES
  { name: 'Vanilla Jarcake', category: 'jarcake', flavor: 'vanilla' },
  { name: 'Strawberry Jarcake', category: 'jarcake', flavor: 'strawberry' },
  { name: 'Pineapple Jarcake', category: 'jarcake', flavor: 'pineapple' },
  { name: 'Chocolate Jarcake', category: 'jarcake', flavor: 'chocolate' },
  { name: 'Truffle Jarcake', category: 'jarcake', flavor: 'truffle' },
  
  // CHEESECAKES
  { name: 'Blueberry Cheesecake', category: 'cheesecake', flavor: 'blueberry' },
  { name: 'Chocolate Cheesecake', category: 'cheesecake', flavor: 'chocolate' },
  
  // BROWNIES
  { name: 'Brownie (40gm)', category: 'brownie', size: 'small' },
  { name: 'Brownie (500gm)', category: 'brownie', size: 'large' },
  
  // CAKES - Vanilla
  { name: 'Vanilla Cake (500gm)', category: 'cake', flavor: 'vanilla', size: 'medium' },
  { name: 'Vanilla Cake (1kg)', category: 'cake', flavor: 'vanilla', size: 'large' },
  { name: 'Vanilla Cake (Bento)', category: 'cake', flavor: 'vanilla', size: 'small', style: 'bento' },
  
  // CAKES - Strawberry
  { name: 'Strawberry Cake (500gm)', category: 'cake', flavor: 'strawberry', size: 'medium' },
  { name: 'Strawberry Cake (1kg)', category: 'cake', flavor: 'strawberry', size: 'large' },
  { name: 'Strawberry Cake (Bento)', category: 'cake', flavor: 'strawberry', size: 'small', style: 'bento' },
  
  // CAKES - Chocolate
  { name: 'Chocolate Cake (500gm)', category: 'cake', flavor: 'chocolate', size: 'medium' },
  { name: 'Chocolate Cake (1kg)', category: 'cake', flavor: 'chocolate', size: 'large' },
  { name: 'Chocolate Cake (Bento)', category: 'cake', flavor: 'chocolate', size: 'small', style: 'bento' },
  
  // CAKES - Pineapple
  { name: 'Pineapple Cake (500gm)', category: 'cake', flavor: 'pineapple', size: 'medium' },
  { name: 'Pineapple Cake (1kg)', category: 'cake', flavor: 'pineapple', size: 'large' },
  { name: 'Pineapple Cake (Bento)', category: 'cake', flavor: 'pineapple', size: 'small', style: 'bento' },
  
  // CAKES - Truffle
  { name: 'Truffle Cake (500gm)', category: 'cake', flavor: 'truffle', size: 'medium' },
  { name: 'Truffle Cake (1kg)', category: 'cake', flavor: 'truffle', size: 'large' },
  { name: 'Truffle Cake (Bento)', category: 'cake', flavor: 'truffle', size: 'small', style: 'bento' },
  
  // LOAVES
  { name: 'Chocolate Loaf', category: 'loaf', flavor: 'chocolate' },
  { name: 'Vanilla Loaf', category: 'loaf', flavor: 'vanilla' },
  { name: 'Tooti Frooti Loaf', category: 'loaf', flavor: 'tooti_frooti' },
  
  // NANKHATAI
  { name: 'Nankhatai (500gms)', category: 'nankhatai' },
];

function createMapping() {
  const images = getAllImages();
  console.log(`Found ${images.length} images`);
  console.log(`Found ${PRODUCTS.length} products\n`);
  
  // Separate images by type
  const whatsappImages = images.filter(img => img.includes('WhatsApp'));
  const geminiImages = images.filter(img => img.includes('Gemini'));
  const trufflesImage = images.find(img => img.includes('truffles'));
  
  console.log(`WhatsApp images: ${whatsappImages.length}`);
  console.log(`Gemini images: ${geminiImages.length}`);
  console.log(`Truffles image: ${trufflesImage ? 'Found' : 'Not found'}\n`);
  
  // Create mapping - this is a logical organization
  // The actual matching would require visual analysis
  const mapping = {};
  let whatsappIndex = 0;
  let geminiIndex = 0;
  
  for (const product of PRODUCTS) {
    let imageFile = null;
    
    // Special handling for truffle products
    if (product.flavor === 'truffle' || product.category === 'truffle') {
      imageFile = trufflesImage;
    }
    // Use Gemini images for specific products
    else if (product.category === 'loaf' && geminiIndex < geminiImages.length) {
      imageFile = geminiImages[geminiIndex++];
    }
    else if (product.category === 'nankhatai' && geminiIndex < geminiImages.length) {
      imageFile = geminiImages[geminiIndex++];
    }
    // Use WhatsApp images for others
    else if (whatsappIndex < whatsappImages.length) {
      imageFile = whatsappImages[whatsappIndex++];
    }
    // Fallback to any available image
    else if (geminiIndex < geminiImages.length) {
      imageFile = geminiImages[geminiIndex++];
    }
    
    if (imageFile) {
      mapping[product.name] = imageFile;
    }
  }
  
  return mapping;
}

// Generate the mapping
const mapping = createMapping();

// Save to JSON
fs.writeFileSync('image_product_mapping.json', JSON.stringify(mapping, null, 2));
console.log('\nMapping saved to image_product_mapping.json');
console.log(`Total products mapped: ${Object.keys(mapping).length}`);

// Display mapping
console.log('\nProduct to Image Mapping:');
console.log('='.repeat(80));
for (const [product, image] of Object.entries(mapping)) {
  console.log(`${product.padEnd(40)} -> ${image}`);
}



