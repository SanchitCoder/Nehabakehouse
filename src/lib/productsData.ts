import type { Product } from './types';

// Counter for generating unique IDs
let idCounter = 1;

// Helper function to create product
const createProduct = (
  name: string,
  description: string,
  price: number,
  category: Product['category'],
  imageUrl: string,
  featured: boolean = false
): Product => {
  const id = `local_product_${idCounter++}`;
  const now = new Date().toISOString();
  return {
    id,
    name,
    description,
    price,
    category,
    image_url: imageUrl,
    featured,
    created_at: now,
    updated_at: now,
  };
};

// Helper to get image path - Vite serves files from root, so we reference them directly
const getImagePath = (filename: string) => `/${filename}`;

// Product images - mapped to correctly named image files that match product names
// All images are now using the actual image files present in the project
const images = {
  // Truffle products - use dedicated truffles.jpg
  truffle: getImagePath('truffles.jpg'),
  
  // Chocolate products
  chocolate: getImagePath('Chocolate Nut Cake.jpg'), // Small Chocolate
  chocolate2: getImagePath('Chocolate Nut Cake.jpg'), // Chocolate Bar
  chocolate3: getImagePath('Chocolate Nut Cake.jpg'), // Nut Chocolate Bar
  
  // Muffins - using available images
  muffin: getImagePath('Vanilla_Cake.jpg'), // Vanilla Muffin
  muffin2: getImagePath('Chocolate_Cake.jpg'), // Chocolate Muffin
  
  // Cupcakes - using available images
  cupcake: getImagePath('Vanilla_Cake.jpg'), // Vanilla Cupcake
  cupcake2: getImagePath('Chocolate_Cake.jpg'), // Chocolate Cupcake
  
  // Glasscakes - using available images
  glasscake: getImagePath('Vanilla_Cake.jpg'), // Vanilla Glasscake
  glasscake2: getImagePath('Blueberry_Cake.jpg'), // Strawberry Glasscake
  glasscake3: getImagePath('Pineapple_Cake.jpg'), // Pineapple Glasscake
  glasscake4: getImagePath('Chocolate_Cake.jpg'), // Chocolate Glasscake
  
  // Jarcakes - using correctly named images
  jarcake: getImagePath('Jar_cake.jpg'), // Vanilla Jarcake
  jarcake2: getImagePath('Jar_cake.jpg'), // Strawberry Jarcake
  jarcake3: getImagePath('Jar_cake.jpg'), // Pineapple Jarcake
  jarcake4: getImagePath('Chocolate_jar.jpg'), // Chocolate Jarcake
  
  // Cheesecakes
  cheesecake: getImagePath('Blueberry_Cake.jpg'), // Blueberry Cheesecake
  cheesecake2: getImagePath('Chocolate_Cake.jpg'), // Chocolate Cheesecake
  
  // Brownies - using available images
  brownie: getImagePath('Chocolate_Cake.jpg'), // Brownie (40gm)
  brownie2: getImagePath('Chocolate_Cake.jpg'), // Brownie (500gm)
  
  // Cakes - Vanilla
  cake: getImagePath('Vanilla_Cake.jpg'), // Vanilla Cake (500gm)
  cake2: getImagePath('Vanilla_Cake.jpg'), // Vanilla Cake (1kg)
  cake3: getImagePath('Bento.jpg'), // Vanilla Cake (Bento)
  
  // Cakes - Strawberry
  cake4: getImagePath('Blueberry_Cake.jpg'), // Strawberry Cake (500gm)
  cake5: getImagePath('Blueberry_Cake.jpg'), // Strawberry Cake (1kg)
  cake6: getImagePath('Bento.jpg'), // Strawberry Cake (Bento)
  
  // Cakes - Chocolate
  cake7: getImagePath('Chocolate_Cake.jpg'), // Chocolate Cake (500gm)
  cake8: getImagePath('Chocolate_Cake.jpg'), // Chocolate Cake (1kg)
  extra3: getImagePath('Bento_combo.jpg'), // Chocolate Cake (Bento)
  
  // Cakes - Pineapple
  extra1: getImagePath('Pineapple_Cake.jpg'), // Pineapple Cake (500gm)
  extra2: getImagePath('Pineapple_Cake.jpg'), // Pineapple Cake (1kg)
  pineappleBento: getImagePath('Bento.jpg'), // Pineapple Cake (Bento)
  
  // Loaves - using available images
  loaf: getImagePath('Vanilla_Cake.jpg'), // Chocolate Loaf
  loaf2: getImagePath('Vanilla_Cake.jpg'), // Vanilla Loaf
  loaf3: getImagePath('Pineapple_Cake.jpg'), // Tooti Frooti Loaf
  
  // Nankhatai
  nankhatai: getImagePath('Nut_cake.jpg'), // Nankhatai (500gms)
};

export const localProducts: Product[] = [
  // CHOCOLATE (PER PIECE)
  createProduct(
    'Small Chocolate',
    'Delicious small chocolate piece',
    10,
    'Cookies',
    images.chocolate
  ),
  createProduct(
    'Chocolate Bar',
    'Rich and creamy chocolate bar',
    100,
    'Cookies',
    images.chocolate2,
    true
  ),
  createProduct(
    'Nut Chocolate Bar',
    'Chocolate bar with crunchy nuts',
    150,
    'Cookies',
    images.chocolate3,
    true
  ),

  // MUFFINS
  createProduct(
    'Vanilla Muffin',
    'Soft and fluffy vanilla muffin',
    12,
    'Pastries',
    images.muffin
  ),
  createProduct(
    'Chocolate Muffin',
    'Rich chocolate muffin with chocolate chips',
    15,
    'Pastries',
    images.muffin2,
    true
  ),

  // CUPCAKE
  createProduct(
    'Vanilla Cupcake',
    'Classic vanilla cupcake with buttercream frosting',
    20,
    'Cakes',
    images.cupcake,
    true
  ),
  createProduct(
    'Chocolate Cupcake',
    'Decadent chocolate cupcake with chocolate frosting',
    25,
    'Cakes',
    images.cupcake2,
    true
  ),

  // GLASSCAKE
  createProduct(
    'Vanilla Glasscake',
    'Delicious vanilla glasscake',
    50,
    'Cakes',
    images.glasscake
  ),
  createProduct(
    'Strawberry Glasscake',
    'Fresh strawberry glasscake',
    50,
    'Cakes',
    images.glasscake2
  ),
  createProduct(
    'Pineapple Glasscake',
    'Tropical pineapple glasscake',
    50,
    'Cakes',
    images.glasscake3
  ),
  createProduct(
    'Chocolate Glasscake',
    'Rich chocolate glasscake',
    50,
    'Cakes',
    images.glasscake4
  ),
  createProduct(
    'Truffle Glasscake',
    'Premium truffle glasscake',
    80,
    'Cakes',
    images.truffle,
    true
  ),

  // JARCAKE
  createProduct(
    'Vanilla Jarcake',
    'Delicious vanilla jarcake',
    100,
    'Cakes',
    images.jarcake
  ),
  createProduct(
    'Strawberry Jarcake',
    'Fresh strawberry jarcake',
    100,
    'Cakes',
    images.jarcake2
  ),
  createProduct(
    'Pineapple Jarcake',
    'Tropical pineapple jarcake',
    100,
    'Cakes',
    images.jarcake3
  ),
  createProduct(
    'Chocolate Jarcake',
    'Rich chocolate jarcake',
    100,
    'Cakes',
    images.jarcake4,
    true
  ),
  createProduct(
    'Truffle Jarcake',
    'Premium truffle jarcake',
    150,
    'Cakes',
    images.truffle,
    true
  ),

  // CHEESECAKE
  createProduct(
    'Blueberry Cheesecake',
    'Creamy cheesecake with fresh blueberries',
    150,
    'Cakes',
    images.cheesecake,
    true
  ),
  createProduct(
    'Chocolate Cheesecake',
    'Rich chocolate cheesecake',
    150,
    'Cakes',
    images.cheesecake2,
    true
  ),

  // BROWNIE
  createProduct(
    'Brownie (40gm)',
    'One piece of rich chocolate brownie (40gm)',
    40,
    'Cookies',
    images.brownie
  ),
  createProduct(
    'Brownie (500gm)',
    'Large chocolate brownie (500gm)',
    500,
    'Cookies',
    images.brownie2
  ),

  // CAKES - Vanilla (500gm, 1kg, Bento)
  createProduct(
    'Vanilla Cake (500gm)',
    'Classic vanilla cake - 500gm',
    350,
    'Cakes',
    images.cake
  ),
  createProduct(
    'Vanilla Cake (1kg)',
    'Classic vanilla cake - 1kg',
    700,
    'Cakes',
    images.cake2,
    true
  ),
  createProduct(
    'Vanilla Cake (Bento)',
    'Cute bento-style vanilla cake',
    200,
    'Cakes',
    images.cake3
  ),

  // CAKES - Strawberry
  createProduct(
    'Strawberry Cake (500gm)',
    'Fresh strawberry cake - 500gm',
    350,
    'Cakes',
    images.cake4
  ),
  createProduct(
    'Strawberry Cake (1kg)',
    'Fresh strawberry cake - 1kg',
    700,
    'Cakes',
    images.cake5,
    true
  ),
  createProduct(
    'Strawberry Cake (Bento)',
    'Cute bento-style strawberry cake',
    200,
    'Cakes',
    images.cake6
  ),

  // CAKES - Chocolate
  createProduct(
    'Chocolate Cake (500gm)',
    'Rich chocolate cake - 500gm',
    350,
    'Cakes',
    images.cake7,
    true
  ),
  createProduct(
    'Chocolate Cake (1kg)',
    'Rich chocolate cake - 1kg',
    700,
    'Cakes',
    images.cake8,
    true
  ),
  createProduct(
    'Chocolate Cake (Bento)',
    'Cute bento-style chocolate cake',
    200,
    'Cakes',
    images.extra3
  ),

  // CAKES - Pineapple
  createProduct(
    'Pineapple Cake (500gm)',
    'Tropical pineapple cake - 500gm',
    350,
    'Cakes',
    images.extra1
  ),
  createProduct(
    'Pineapple Cake (1kg)',
    'Tropical pineapple cake - 1kg',
    700,
    'Cakes',
    images.extra2
  ),
  createProduct(
    'Pineapple Cake (Bento)',
    'Cute bento-style pineapple cake',
    200,
    'Cakes',
    images.pineappleBento
  ),

  // CAKES - Truffle
  createProduct(
    'Truffle Cake (500gm)',
    'Premium truffle cake - 500gm',
    600,
    'Cakes',
    images.truffle,
    true
  ),
  createProduct(
    'Truffle Cake (1kg)',
    'Premium truffle cake - 1kg',
    1200,
    'Cakes',
    images.truffle,
    true
  ),
  createProduct(
    'Truffle Cake (Bento)',
    'Premium bento-style truffle cake',
    300,
    'Cakes',
    getImagePath('bento truffle.jpg'),
    true
  ),

  // LOAF
  createProduct(
    'Chocolate Loaf',
    'Delicious chocolate loaf bread',
    250,
    'Breads',
    images.loaf
  ),
  createProduct(
    'Vanilla Loaf',
    'Classic vanilla loaf bread',
    250,
    'Breads',
    images.loaf2
  ),
  createProduct(
    'Tooti Frooti Loaf',
    'Colorful tooti frooti loaf',
    250,
    'Breads',
    images.loaf3
  ),

  // NANKHATAI
  createProduct(
    'Nankhatai (500gms)',
    'Traditional Indian cookies - 500gms',
    500,
    'Cookies',
    images.nankhatai
  ),
];

