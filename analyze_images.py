"""
Image Analysis Script for Neha's Bakehouse
Uses vision model to analyze images and match them to product names
"""

import os
import json
import re
from pathlib import Path
from typing import List, Dict

# Product definitions from the codebase
PRODUCTS = [
    # CHOCOLATE
    {'name': 'Small Chocolate', 'keywords': ['chocolate', 'small', 'piece', 'bar']},
    {'name': 'Chocolate Bar', 'keywords': ['chocolate', 'bar', 'rectangular']},
    {'name': 'Nut Chocolate Bar', 'keywords': ['chocolate', 'bar', 'nuts', 'almonds', 'peanuts']},
    
    # MUFFINS
    {'name': 'Vanilla Muffin', 'keywords': ['muffin', 'vanilla', 'round', 'baked']},
    {'name': 'Chocolate Muffin', 'keywords': ['muffin', 'chocolate', 'dark', 'brown']},
    
    # CUPCAKES
    {'name': 'Vanilla Cupcake', 'keywords': ['cupcake', 'vanilla', 'frosting', 'icing', 'white']},
    {'name': 'Chocolate Cupcake', 'keywords': ['cupcake', 'chocolate', 'frosting', 'brown']},
    
    # GLASSCAKES
    {'name': 'Vanilla Glasscake', 'keywords': ['glass', 'vanilla', 'layered', 'dessert', 'jar']},
    {'name': 'Strawberry Glasscake', 'keywords': ['glass', 'strawberry', 'red', 'pink', 'fruit']},
    {'name': 'Pineapple Glasscake', 'keywords': ['glass', 'pineapple', 'yellow', 'tropical', 'fruit']},
    {'name': 'Chocolate Glasscake', 'keywords': ['glass', 'chocolate', 'brown', 'dark']},
    {'name': 'Truffle Glasscake', 'keywords': ['glass', 'truffle', 'chocolate', 'premium', 'dark']},
    
    # JARCAKES
    {'name': 'Vanilla Jarcake', 'keywords': ['jar', 'vanilla', 'layered', 'white', 'cream']},
    {'name': 'Strawberry Jarcake', 'keywords': ['jar', 'strawberry', 'red', 'pink', 'fruit']},
    {'name': 'Pineapple Jarcake', 'keywords': ['jar', 'pineapple', 'yellow', 'tropical']},
    {'name': 'Chocolate Jarcake', 'keywords': ['jar', 'chocolate', 'brown', 'dark']},
    {'name': 'Truffle Jarcake', 'keywords': ['jar', 'truffle', 'chocolate', 'premium']},
    
    # CHEESECAKES
    {'name': 'Blueberry Cheesecake', 'keywords': ['cheesecake', 'blueberry', 'blue', 'purple', 'berries']},
    {'name': 'Chocolate Cheesecake', 'keywords': ['cheesecake', 'chocolate', 'brown']},
    
    # BROWNIES
    {'name': 'Brownie (40gm)', 'keywords': ['brownie', 'square', 'chocolate', 'small', 'piece']},
    {'name': 'Brownie (500gm)', 'keywords': ['brownie', 'large', 'chocolate', 'square', 'tray']},
    
    # CAKES - Vanilla
    {'name': 'Vanilla Cake (500gm)', 'keywords': ['cake', 'vanilla', 'white', 'cream', 'layered']},
    {'name': 'Vanilla Cake (1kg)', 'keywords': ['cake', 'vanilla', 'white', 'large', 'layered']},
    {'name': 'Vanilla Cake (Bento)', 'keywords': ['cake', 'vanilla', 'bento', 'small', 'decorated', 'cute']},
    
    # CAKES - Strawberry
    {'name': 'Strawberry Cake (500gm)', 'keywords': ['cake', 'strawberry', 'red', 'pink', 'fruit', 'layered']},
    {'name': 'Strawberry Cake (1kg)', 'keywords': ['cake', 'strawberry', 'red', 'large', 'layered']},
    {'name': 'Strawberry Cake (Bento)', 'keywords': ['cake', 'strawberry', 'bento', 'small', 'decorated']},
    
    # CAKES - Chocolate
    {'name': 'Chocolate Cake (500gm)', 'keywords': ['cake', 'chocolate', 'brown', 'dark', 'layered']},
    {'name': 'Chocolate Cake (1kg)', 'keywords': ['cake', 'chocolate', 'brown', 'large', 'layered']},
    {'name': 'Chocolate Cake (Bento)', 'keywords': ['cake', 'chocolate', 'bento', 'small', 'decorated']},
    
    # CAKES - Pineapple
    {'name': 'Pineapple Cake (500gm)', 'keywords': ['cake', 'pineapple', 'yellow', 'tropical', 'layered']},
    {'name': 'Pineapple Cake (1kg)', 'keywords': ['cake', 'pineapple', 'yellow', 'large', 'layered']},
    {'name': 'Pineapple Cake (Bento)', 'keywords': ['cake', 'pineapple', 'bento', 'small', 'decorated']},
    
    # CAKES - Truffle
    {'name': 'Truffle Cake (500gm)', 'keywords': ['cake', 'truffle', 'chocolate', 'premium', 'dark', 'layered']},
    {'name': 'Truffle Cake (1kg)', 'keywords': ['cake', 'truffle', 'chocolate', 'premium', 'large', 'layered']},
    {'name': 'Truffle Cake (Bento)', 'keywords': ['cake', 'truffle', 'bento', 'small', 'premium', 'decorated']},
    
    # LOAVES
    {'name': 'Chocolate Loaf', 'keywords': ['loaf', 'chocolate', 'bread', 'rectangular', 'brown']},
    {'name': 'Vanilla Loaf', 'keywords': ['loaf', 'vanilla', 'bread', 'rectangular', 'white', 'light']},
    {'name': 'Tooti Frooti Loaf', 'keywords': ['loaf', 'tooti', 'frooti', 'colorful', 'multicolor', 'bread']},
    
    # NANKHATAI
    {'name': 'Nankhatai (500gms)', 'keywords': ['nankhatai', 'cookie', 'biscuit', 'indian', 'traditional', 'round']},
]

def get_all_images() -> List[str]:
    """Get all image files in the project root"""
    root = Path('.')
    images = []
    
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
        images.extend(root.glob(ext))
    
    return sorted([str(img.name) for img in images if img.is_file()])

def analyze_image_with_vision(image_path: str) -> Dict:
    """
    Analyze image using vision model
    This is a placeholder - in production, you'd use OpenAI Vision API, 
    Google Vision API, or a local model like CLIP
    """
    # For now, return basic file info
    # In a real implementation, you'd call a vision API here
    return {
        'filename': os.path.basename(image_path),
        'size': os.path.getsize(image_path) if os.path.exists(image_path) else 0,
    }

def match_image_to_product(image_filename: str, product: Dict) -> float:
    """Calculate match score between image filename and product"""
    score = 0.0
    filename_lower = image_filename.lower()
    product_name_lower = product['name'].lower()
    
    # Check for keyword matches in filename
    for keyword in product['keywords']:
        if keyword.lower() in filename_lower:
            score += 0.3
    
    # Special handling for known patterns
    if 'truffle' in product_name_lower and 'truffles.jpg' in filename_lower:
        score += 1.0
    
    if 'gemini' in filename_lower:
        # Gemini images might be for specific products
        if 'nankhatai' in product_name_lower:
            score += 0.5
        if 'loaf' in product_name_lower:
            score += 0.3
    
    return score

def create_optimal_mapping() -> Dict[str, str]:
    """Create optimal mapping of products to images"""
    images = get_all_images()
    print(f"Found {len(images)} images")
    print(f"Found {len(PRODUCTS)} products\n")
    
    # Create a mapping
    mapping = {}
    used_images = set()
    
    # Sort products by specificity (more specific first)
    sorted_products = sorted(PRODUCTS, key=lambda p: len(p['keywords']), reverse=True)
    
    for product in sorted_products:
        best_match = None
        best_score = -1
        
        for image_filename in images:
            if image_filename in used_images:
                continue
            
            score = match_image_to_product(image_filename, product)
            if score > best_score:
                best_score = score
                best_match = image_filename
        
        if best_match and best_score > 0:
            mapping[product['name']] = best_match
            used_images.add(best_match)
            print(f"✓ {product['name']:40} -> {best_match:50} (score: {best_score:.2f})")
        else:
            # Find any unused image
            for image_filename in images:
                if image_filename not in used_images:
                    mapping[product['name']] = image_filename
                    used_images.add(image_filename)
                    print(f"⚠ {product['name']:40} -> {image_filename:50} (no match, assigned)")
                    break
    
    return mapping

if __name__ == '__main__':
    print("=" * 100)
    print("Image-Product Matching Analysis")
    print("=" * 100)
    print()
    
    mapping = create_optimal_mapping()
    
    # Save to JSON
    output_file = 'image_product_mapping.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Mapping saved to {output_file}")
    print(f"\nTotal products mapped: {len(mapping)}")
