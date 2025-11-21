/**
 * Image Analysis and Auto-Matching Script
 * This script will help analyze and match images to products
 */

const fs = require('fs');
const path = require('path');

// Read the current productsData.ts to understand the structure
function readProductsData() {
  const filePath = path.join(__dirname, 'src/lib/productsData.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
}

// Get all image files
function getAllImages() {
  const rootDir = __dirname;
  const files = fs.readdirSync(rootDir);
  return files
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .map(file => ({
      filename: file,
      path: path.join(rootDir, file),
      size: fs.statSync(path.join(rootDir, file)).size
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

// Product definitions - we need to match images to these
const PRODUCTS = [
  // CHOCOLATE
  { name: 'Small Chocolate', keywords: ['chocolate', 'small', 'piece'], category: 'chocolate' },
  { name: 'Chocolate Bar', keywords: ['chocolate', 'bar', 'rectangular'], category: 'chocolate' },
  { name: 'Nut Chocolate Bar', keywords: ['chocolate', 'bar', 'nuts', 'almonds'], category: 'chocolate' },
  
  // MUFFINS
  { name: 'Vanilla Muffin', keywords: ['muffin', 'vanilla', 'light', 'cream'], category: 'muffin' },
  { name: 'Chocolate Muffin', keywords: ['muffin', 'chocolate', 'brown', 'dark'], category: 'muffin' },
  
  // CUPCAKES
  { name: 'Vanilla Cupcake', keywords: ['cupcake', 'vanilla', 'frosting', 'white'], category: 'cupcake' },
  { name: 'Chocolate Cupcake', keywords: ['cupcake', 'chocolate', 'frosting', 'brown'], category: 'cupcake' },
  
  // GLASSCAKES
  { name: 'Vanilla Glasscake', keywords: ['glass', 'vanilla', 'white', 'cream', 'layered'], category: 'glasscake' },
  { name: 'Strawberry Glasscake', keywords: ['glass', 'strawberry', 'red', 'pink', 'fruit'], category: 'glasscake' },
  { name: 'Pineapple Glasscake', keywords: ['glass', 'pineapple', 'yellow', 'tropical'], category: 'glasscake' },
  { name: 'Chocolate Glasscake', keywords: ['glass', 'chocolate', 'brown', 'dark'], category: 'glasscake' },
  { name: 'Truffle Glasscake', keywords: ['glass', 'truffle', 'chocolate', 'premium'], category: 'glasscake' },
  
  // JARCAKES
  { name: 'Vanilla Jarcake', keywords: ['jar', 'vanilla', 'white', 'cream', 'layered'], category: 'jarcake' },
  { name: 'Strawberry Jarcake', keywords: ['jar', 'strawberry', 'red', 'pink', 'fruit'], category: 'jarcake' },
  { name: 'Pineapple Jarcake', keywords: ['jar', 'pineapple', 'yellow', 'tropical'], category: 'jarcake' },
  { name: 'Chocolate Jarcake', keywords: ['jar', 'chocolate', 'brown', 'dark'], category: 'jarcake' },
  { name: 'Truffle Jarcake', keywords: ['jar', 'truffle', 'chocolate', 'premium'], category: 'jarcake' },
  
  // CHEESECAKES
  { name: 'Blueberry Cheesecake', keywords: ['cheesecake', 'blueberry', 'blue', 'purple', 'berries'], category: 'cheesecake' },
  { name: 'Chocolate Cheesecake', keywords: ['cheesecake', 'chocolate', 'brown'], category: 'cheesecake' },
  
  // BROWNIES
  { name: 'Brownie (40gm)', keywords: ['brownie', 'square', 'chocolate', 'small'], category: 'brownie' },
  { name: 'Brownie (500gm)', keywords: ['brownie', 'large', 'chocolate', 'square', 'tray'], category: 'brownie' },
  
  // CAKES - Vanilla
  { name: 'Vanilla Cake (500gm)', keywords: ['cake', 'vanilla', 'white', 'cream', 'layered'], category: 'cake', flavor: 'vanilla' },
  { name: 'Vanilla Cake (1kg)', keywords: ['cake', 'vanilla', 'white', 'large', 'layered'], category: 'cake', flavor: 'vanilla' },
  { name: 'Vanilla Cake (Bento)', keywords: ['cake', 'vanilla', 'bento', 'small', 'decorated'], category: 'cake', flavor: 'vanilla' },
  
  // CAKES - Strawberry
  { name: 'Strawberry Cake (500gm)', keywords: ['cake', 'strawberry', 'red', 'pink', 'fruit'], category: 'cake', flavor: 'strawberry' },
  { name: 'Strawberry Cake (1kg)', keywords: ['cake', 'strawberry', 'red', 'large'], category: 'cake', flavor: 'strawberry' },
  { name: 'Strawberry Cake (Bento)', keywords: ['cake', 'strawberry', 'bento', 'small'], category: 'cake', flavor: 'strawberry' },
  
  // CAKES - Chocolate
  { name: 'Chocolate Cake (500gm)', keywords: ['cake', 'chocolate', 'brown', 'dark'], category: 'cake', flavor: 'chocolate' },
  { name: 'Chocolate Cake (1kg)', keywords: ['cake', 'chocolate', 'brown', 'large'], category: 'cake', flavor: 'chocolate' },
  { name: 'Chocolate Cake (Bento)', keywords: ['cake', 'chocolate', 'bento', 'small'], category: 'cake', flavor: 'chocolate' },
  
  // CAKES - Pineapple
  { name: 'Pineapple Cake (500gm)', keywords: ['cake', 'pineapple', 'yellow', 'tropical'], category: 'cake', flavor: 'pineapple' },
  { name: 'Pineapple Cake (1kg)', keywords: ['cake', 'pineapple', 'yellow', 'large'], category: 'cake', flavor: 'pineapple' },
  { name: 'Pineapple Cake (Bento)', keywords: ['cake', 'pineapple', 'bento', 'small'], category: 'cake', flavor: 'pineapple' },
  
  // CAKES - Truffle
  { name: 'Truffle Cake (500gm)', keywords: ['cake', 'truffle', 'chocolate', 'premium'], category: 'cake', flavor: 'truffle' },
  { name: 'Truffle Cake (1kg)', keywords: ['cake', 'truffle', 'chocolate', 'premium', 'large'], category: 'cake', flavor: 'truffle' },
  { name: 'Truffle Cake (Bento)', keywords: ['cake', 'truffle', 'bento', 'premium'], category: 'cake', flavor: 'truffle' },
  
  // LOAVES
  { name: 'Chocolate Loaf', keywords: ['loaf', 'chocolate', 'bread', 'rectangular'], category: 'loaf' },
  { name: 'Vanilla Loaf', keywords: ['loaf', 'vanilla', 'bread', 'light'], category: 'loaf' },
  { name: 'Tooti Frooti Loaf', keywords: ['loaf', 'tooti', 'frooti', 'colorful'], category: 'loaf' },
  
  // NANKHATAI
  { name: 'Nankhatai (500gms)', keywords: ['nankhatai', 'cookie', 'biscuit', 'indian'], category: 'nankhatai' },
];

console.log('='.repeat(80));
console.log('Image-Product Matching Analysis');
console.log('='.repeat(80));
console.log(`\nFound ${PRODUCTS.length} products to match`);
console.log('\nNOTE: This script creates a template for manual verification.');
console.log('Since we cannot automatically analyze image content, you will need to:');
console.log('1. Open verify_images.html in your browser');
console.log('2. Review each product-image pair');
console.log('3. Note any mismatches');
console.log('4. Update the mapping in productsData.ts\n');

// Create a mapping file that can be manually adjusted
const images = getAllImages();
console.log(`Found ${images.length} images\n`);

// Create initial mapping (will need manual verification)
const mapping = {};
let imageIndex = 0;

// Special handling for known images
const trufflesImage = images.find(img => img.filename.includes('truffles'));
const geminiImages = images.filter(img => img.filename.includes('Gemini'));

// Map truffle products first
const truffleProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes('truffle'));
truffleProducts.forEach(product => {
  if (trufflesImage) {
    mapping[product.name] = trufflesImage.filename;
  }
});

// Map other products
const otherProducts = PRODUCTS.filter(p => !p.name.toLowerCase().includes('truffle'));
otherProducts.forEach((product, index) => {
  // Use Gemini images for loaves and nankhatai
  if (product.category === 'loaf' || product.category === 'nankhatai') {
    const geminiIndex = index % geminiImages.length;
    if (geminiImages[geminiIndex]) {
      mapping[product.name] = geminiImages[geminiIndex].filename;
    }
  } else {
    // Use WhatsApp images for others
    const whatsappImages = images.filter(img => 
      img.filename.includes('WhatsApp') && 
      !Object.values(mapping).includes(img.filename)
    );
    if (whatsappImages.length > 0) {
      const imgIndex = Object.keys(mapping).length % whatsappImages.length;
      mapping[product.name] = whatsappImages[imgIndex].filename;
    }
  }
});

// Save mapping to JSON for reference
fs.writeFileSync(
  'image_product_mapping_current.json',
  JSON.stringify(mapping, null, 2)
);

console.log('Current mapping saved to: image_product_mapping_current.json');
console.log('\n⚠️  IMPORTANT: This is a TEMPLATE mapping.');
console.log('You MUST verify each image matches its product by:');
console.log('1. Opening verify_images.html in your browser');
console.log('2. Checking each product-image pair visually');
console.log('3. Updating productsData.ts with correct matches\n');




