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

// Local product images - array of available image files
const localImageFiles = [
  'WhatsApp Image 2025-11-03 at 20.53.48_8153f9b8.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.48_9cd4b6f9.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.48_a796992e.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.48_dd4432cd.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.49_03ff2c52.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.49_a7f9dc66.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.50_230e7cca.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.50_9491f119.jpg',
  'WhatsApp Image 2025-11-03 at 20.53.50_e13db27c.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.04_0501a8d4.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.04_ff086662.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.04_ffbb8eba.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.05_33882962.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.05_3d79ac1c.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.05_9e91ec43.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.06_6c6750d0.jpg',
  'WhatsApp Image 2025-11-03 at 21.02.06_a76f60d9.jpg',
  'WhatsApp Image 2025-11-03 at 21.03.29_62e6b2ae.jpg',
  'WhatsApp Image 2025-11-03 at 21.03.29_9aacd4f8.jpg',
  'WhatsApp Image 2025-11-03 at 21.03.29_c3546026.jpg',
  'WhatsApp Image 2025-11-03 at 21.03.30_d3b40026.jpg',
  'WhatsApp Image 2025-11-03 at 21.03.30_e3fc96a5.jpg',
  'WhatsApp Image 2025-11-03 at 21.04.49_4d5210d6.jpg',
  'WhatsApp Image 2025-11-03 at 21.04.49_d423ee14.jpg',
  'WhatsApp Image 2025-11-03 at 21.04.50_b4baf054.jpg',
  'WhatsApp Image 2025-11-03 at 21.04.50_ff5d6984.jpg',
  'WhatsApp Image 2025-11-03 at 21.04.51_870d790d.jpg',
  'WhatsApp Image 2025-11-03 at 21.04.51_c6ca024f.jpg',
  'Gemini_Generated_Image_nf4kwunf4kwunf4k.png',
  'Gemini_Generated_Image_nf4kwunf4kwunf4k (1).png',
  'Gemini_Generated_Image_nf4kwunf4kwunf4k (2).png',
  'Gemini_Generated_Image_nf4kwunf4kwunf4k (3).png',
  'Gemini_Generated_Image_nf4kwunf4kwunf4k (4).png',
];

// Helper to get image path - Vite serves files from root, so we reference them directly
const getImagePath = (filename: string) => `/${filename}`;

// Product images - mapped to local files
const images = {
  // Truffle products use the specific truffles.jpg
  truffle: getImagePath('truffles.jpg'),
  // Chocolate products
  chocolate: getImagePath(localImageFiles[0]),
  chocolate2: getImagePath(localImageFiles[1]),
  chocolate3: getImagePath(localImageFiles[2]),
  // Muffins
  muffin: getImagePath(localImageFiles[3]),
  muffin2: getImagePath(localImageFiles[4]),
  // Cupcakes
  cupcake: getImagePath(localImageFiles[5]),
  cupcake2: getImagePath(localImageFiles[6]),
  // Glasscakes
  glasscake: getImagePath(localImageFiles[7]),
  glasscake2: getImagePath(localImageFiles[8]),
  glasscake3: getImagePath(localImageFiles[9]),
  glasscake4: getImagePath(localImageFiles[10]),
  // Jarcakes
  jarcake: getImagePath(localImageFiles[11]),
  jarcake2: getImagePath(localImageFiles[12]),
  jarcake3: getImagePath(localImageFiles[13]),
  jarcake4: getImagePath(localImageFiles[14]),
  // Cheesecakes
  cheesecake: getImagePath(localImageFiles[15]),
  cheesecake2: getImagePath(localImageFiles[16]),
  // Brownies
  brownie: getImagePath(localImageFiles[17]),
  brownie2: getImagePath(localImageFiles[18]),
  // Cakes
  cake: getImagePath(localImageFiles[19]),
  cake2: getImagePath(localImageFiles[20]),
  cake3: getImagePath(localImageFiles[21]),
  cake4: getImagePath(localImageFiles[22]),
  cake5: getImagePath(localImageFiles[23]),
  cake6: getImagePath(localImageFiles[24]),
  cake7: getImagePath(localImageFiles[25]),
  cake8: getImagePath(localImageFiles[26]),
  // Loafs
  loaf: getImagePath(localImageFiles[27]),
  loaf2: getImagePath('Gemini_Generated_Image_nf4kwunf4kwunf4k.png'),
  loaf3: getImagePath('Gemini_Generated_Image_nf4kwunf4kwunf4k (1).png'),
  // Nankhatai
  nankhatai: getImagePath('Gemini_Generated_Image_nf4kwunf4kwunf4k (2).png'),
  // Additional images for variety
  extra1: getImagePath('Gemini_Generated_Image_nf4kwunf4kwunf4k (3).png'),
  extra2: getImagePath('Gemini_Generated_Image_nf4kwunf4kwunf4k (4).png'),
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
    images.extra1
  ),

  // CAKES - Pineapple
  createProduct(
    'Pineapple Cake (500gm)',
    'Tropical pineapple cake - 500gm',
    350,
    'Cakes',
    images.extra2
  ),
  createProduct(
    'Pineapple Cake (1kg)',
    'Tropical pineapple cake - 1kg',
    700,
    'Cakes',
    images.cake
  ),
  createProduct(
    'Pineapple Cake (Bento)',
    'Cute bento-style pineapple cake',
    200,
    'Cakes',
    images.cake2
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
    images.truffle,
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

