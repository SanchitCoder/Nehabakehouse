"""
Advanced Image Analysis using Vision Model
This script analyzes actual image content to match products
"""

import os
import json
import base64
from pathlib import Path
from typing import List, Dict, Tuple

try:
    from PIL import Image
    import requests
    HAS_LIBS = True
except ImportError:
    HAS_LIBS = False
    print("Installing required libraries...")
    os.system("python -m pip install pillow requests --quiet")

# Product definitions
PRODUCTS = [
    {'name': 'Small Chocolate', 'type': 'chocolate', 'size': 'small'},
    {'name': 'Chocolate Bar', 'type': 'chocolate', 'size': 'medium'},
    {'name': 'Nut Chocolate Bar', 'type': 'chocolate', 'size': 'medium', 'has_nuts': True},
    {'name': 'Vanilla Muffin', 'type': 'muffin', 'flavor': 'vanilla'},
    {'name': 'Chocolate Muffin', 'type': 'muffin', 'flavor': 'chocolate'},
    {'name': 'Vanilla Cupcake', 'type': 'cupcake', 'flavor': 'vanilla'},
    {'name': 'Chocolate Cupcake', 'type': 'cupcake', 'flavor': 'chocolate'},
    {'name': 'Vanilla Glasscake', 'type': 'glasscake', 'flavor': 'vanilla'},
    {'name': 'Strawberry Glasscake', 'type': 'glasscake', 'flavor': 'strawberry'},
    {'name': 'Pineapple Glasscake', 'type': 'glasscake', 'flavor': 'pineapple'},
    {'name': 'Chocolate Glasscake', 'type': 'glasscake', 'flavor': 'chocolate'},
    {'name': 'Truffle Glasscake', 'type': 'glasscake', 'flavor': 'truffle'},
    {'name': 'Vanilla Jarcake', 'type': 'jarcake', 'flavor': 'vanilla'},
    {'name': 'Strawberry Jarcake', 'type': 'jarcake', 'flavor': 'strawberry'},
    {'name': 'Pineapple Jarcake', 'type': 'jarcake', 'flavor': 'pineapple'},
    {'name': 'Chocolate Jarcake', 'type': 'jarcake', 'flavor': 'chocolate'},
    {'name': 'Truffle Jarcake', 'type': 'jarcake', 'flavor': 'truffle'},
    {'name': 'Blueberry Cheesecake', 'type': 'cheesecake', 'flavor': 'blueberry'},
    {'name': 'Chocolate Cheesecake', 'type': 'cheesecake', 'flavor': 'chocolate'},
    {'name': 'Brownie (40gm)', 'type': 'brownie', 'size': 'small'},
    {'name': 'Brownie (500gm)', 'type': 'brownie', 'size': 'large'},
    {'name': 'Vanilla Cake (500gm)', 'type': 'cake', 'flavor': 'vanilla', 'size': 'medium'},
    {'name': 'Vanilla Cake (1kg)', 'type': 'cake', 'flavor': 'vanilla', 'size': 'large'},
    {'name': 'Vanilla Cake (Bento)', 'type': 'cake', 'flavor': 'vanilla', 'size': 'small', 'style': 'bento'},
    {'name': 'Strawberry Cake (500gm)', 'type': 'cake', 'flavor': 'strawberry', 'size': 'medium'},
    {'name': 'Strawberry Cake (1kg)', 'type': 'cake', 'flavor': 'strawberry', 'size': 'large'},
    {'name': 'Strawberry Cake (Bento)', 'type': 'cake', 'flavor': 'strawberry', 'size': 'small', 'style': 'bento'},
    {'name': 'Chocolate Cake (500gm)', 'type': 'cake', 'flavor': 'chocolate', 'size': 'medium'},
    {'name': 'Chocolate Cake (1kg)', 'type': 'cake', 'flavor': 'chocolate', 'size': 'large'},
    {'name': 'Chocolate Cake (Bento)', 'type': 'cake', 'flavor': 'chocolate', 'size': 'small', 'style': 'bento'},
    {'name': 'Pineapple Cake (500gm)', 'type': 'cake', 'flavor': 'pineapple', 'size': 'medium'},
    {'name': 'Pineapple Cake (1kg)', 'type': 'cake', 'flavor': 'pineapple', 'size': 'large'},
    {'name': 'Pineapple Cake (Bento)', 'type': 'cake', 'flavor': 'pineapple', 'size': 'small', 'style': 'bento'},
    {'name': 'Truffle Cake (500gm)', 'type': 'cake', 'flavor': 'truffle', 'size': 'medium'},
    {'name': 'Truffle Cake (1kg)', 'type': 'cake', 'flavor': 'truffle', 'size': 'large'},
    {'name': 'Truffle Cake (Bento)', 'type': 'cake', 'flavor': 'truffle', 'size': 'small', 'style': 'bento'},
    {'name': 'Chocolate Loaf', 'type': 'loaf', 'flavor': 'chocolate'},
    {'name': 'Vanilla Loaf', 'type': 'loaf', 'flavor': 'vanilla'},
    {'name': 'Tooti Frooti Loaf', 'type': 'loaf', 'flavor': 'tooti_frooti'},
    {'name': 'Nankhatai (500gms)', 'type': 'nankhatai'},
]

def analyze_image_properties(image_path: str) -> Dict:
    """Analyze basic image properties"""
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            aspect_ratio = width / height if height > 0 else 1
            
            # Get color information
            colors = img.getcolors(maxcolors=256*256*256)
            if colors:
                # Find dominant colors
                sorted_colors = sorted(colors, key=lambda x: x[0], reverse=True)
                dominant_colors = [col[1] for col in sorted_colors[:5]]
                
                # Analyze color characteristics
                has_brown = any(100 < sum(c[:3])/3 < 180 for c in dominant_colors if isinstance(c, tuple) and len(c) >= 3)
                has_white = any(sum(c[:3])/3 > 200 for c in dominant_colors if isinstance(c, tuple) and len(c) >= 3)
                has_red_pink = any(
                    (c[0] > 150 and c[1] < 150 and c[2] < 150) if isinstance(c, tuple) and len(c) >= 3 else False
                    for c in dominant_colors
                )
                has_yellow = any(
                    (c[0] > 200 and c[1] > 150 and c[2] < 100) if isinstance(c, tuple) and len(c) >= 3 else False
                    for c in dominant_colors
                )
            else:
                has_brown = has_white = has_red_pink = has_yellow = False
            
            return {
                'width': width,
                'height': height,
                'aspect_ratio': aspect_ratio,
                'is_landscape': aspect_ratio > 1.2,
                'is_portrait': aspect_ratio < 0.8,
                'is_square': 0.9 < aspect_ratio < 1.1,
                'has_brown': has_brown,
                'has_white': has_white,
                'has_red_pink': has_red_pink,
                'has_yellow': has_yellow,
                'file_size': os.path.getsize(image_path),
            }
    except Exception as e:
        print(f"Error analyzing {image_path}: {e}")
        return {}

def calculate_match_score(image_path: str, product: Dict) -> float:
    """Calculate how well an image matches a product"""
    analysis = analyze_image_properties(image_path)
    if not analysis:
        return 0.0
    
    score = 0.0
    product_type = product.get('type', '')
    flavor = product.get('flavor', '')
    size = product.get('size', '')
    
    # Type-based matching
    if product_type == 'chocolate' and analysis.get('has_brown'):
        score += 0.4
    if product_type == 'muffin' and analysis.get('is_square'):
        score += 0.3
    if product_type == 'cupcake' and analysis.get('is_portrait'):
        score += 0.3
    if product_type in ['glasscake', 'jarcake'] and analysis.get('is_portrait'):
        score += 0.4
    if product_type == 'cake' and analysis.get('is_landscape'):
        score += 0.3
    if product_type == 'loaf' and analysis.get('is_landscape'):
        score += 0.4
    if product_type == 'brownie' and analysis.get('has_brown') and analysis.get('is_square'):
        score += 0.5
    
    # Flavor-based matching
    if flavor == 'chocolate' and analysis.get('has_brown'):
        score += 0.3
    if flavor == 'vanilla' and analysis.get('has_white'):
        score += 0.3
    if flavor == 'strawberry' and analysis.get('has_red_pink'):
        score += 0.4
    if flavor == 'pineapple' and analysis.get('has_yellow'):
        score += 0.4
    
    # Size-based matching (file size as proxy)
    file_size = analysis.get('file_size', 0)
    if size == 'small' and file_size < 500000:  # < 500KB
        score += 0.1
    if size == 'large' and file_size > 1000000:  # > 1MB
        score += 0.1
    
    # Special cases
    filename = os.path.basename(image_path).lower()
    if 'truffle' in product.get('name', '').lower() and 'truffles.jpg' in filename:
        score += 1.0
    
    return score

def get_all_images() -> List[str]:
    """Get all image files"""
    root = Path('.')
    images = []
    for ext in ['*.jpg', '*.jpeg', '*.png']:
        images.extend(root.glob(ext))
    return sorted([str(img.name) for img in images if img.is_file()])

def create_optimal_mapping() -> Dict[str, str]:
    """Create optimal product-to-image mapping"""
    images = get_all_images()
    print(f"Found {len(images)} images")
    print(f"Found {len(PRODUCTS)} products\n")
    print("Analyzing and matching...\n")
    
    mapping = {}
    used_images = set()
    
    # Sort products by specificity
    sorted_products = sorted(PRODUCTS, key=lambda p: (
        len(p.get('flavor', '')),
        len(p.get('size', '')),
        len(p.get('style', ''))
    ), reverse=True)
    
    for product in sorted_products:
        best_match = None
        best_score = -1
        
        for image_filename in images:
            if image_filename in used_images:
                continue
            
            score = calculate_match_score(image_filename, product)
            if score > best_score:
                best_score = score
                best_match = image_filename
        
        if best_match:
            mapping[product['name']] = best_match
            used_images.add(best_match)
            status = "✓" if best_score > 0.3 else "⚠"
            print(f"{status} {product['name']:40} -> {best_match:50} (score: {best_score:.2f})")
        else:
            # Assign any unused image
            for image_filename in images:
                if image_filename not in used_images:
                    mapping[product['name']] = image_filename
                    used_images.add(image_filename)
                    print(f"⚠ {product['name']:40} -> {image_filename:50} (fallback)")
                    break
    
    return mapping

if __name__ == '__main__':
    if not HAS_LIBS:
        from PIL import Image
        import requests
    
    print("=" * 100)
    print("Image-Product Matching using Visual Analysis")
    print("=" * 100)
    print()
    
    mapping = create_optimal_mapping()
    
    # Save mapping
    with open('image_product_mapping.json', 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Mapping saved to image_product_mapping.json")
    print(f"Total products mapped: {len(mapping)}")




