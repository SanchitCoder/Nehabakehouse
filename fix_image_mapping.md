# Image-Product Mapping Fix Guide

Since images need to be visually verified to match product names, please follow these steps:

## Current Issue
The images assigned to products may not match the actual product names. We need to verify and fix each mapping.

## Solution Steps

1. **Open the verification tool**: Open `verify_images.html` in your browser (or serve it via your dev server)

2. **Review each product-image pair**: Check if the image actually shows the product described by the name

3. **Note mismatches**: For each incorrect match, note:
   - Product Name
   - Current Image Filename (incorrect)
   - Correct Image Filename (what it should be)

4. **Provide the correct mappings**: Once you've reviewed all products, provide me with a list of corrections like:

```
Product: "Vanilla Cupcake"
Current Image: "WhatsApp Image 2025-11-03 at 20.53.49_a7f9dc66.jpg"
Correct Image: "WhatsApp Image 2025-11-03 at 21.02.04_0501a8d4.jpg"
```

OR

If you can identify which images show which products, provide a complete mapping list.

## Alternative: Quick Fix Script

If you want to manually update the mappings yourself, you can edit `src/lib/productsData.ts` and update the `images` object to use the correct filenames for each product type.



