// Script to search and download or match official Ramraj & Ramyyam product pictures
import fs from 'fs';

async function fetchAllRamrajProducts() {
  const allProducts = [];
  const collections = [
    'dhotis',
    'big-border-dhotis',
    'big-border-readymade-dhotis',
    'art-silk-dhotis',
    'silk-dhotis',
    'art-silk-panchakacham',
    '100-cotton-shirts',
    'shirts',
    'kurtas',
    'combos',
    'best-seller-vests',
    'boxer-shorts',
    'kids',
    'boys-dhoti-shirt-combos',
    'little-star-dhoti-shirt-set',
    'sarees',
    'art-silk-sarees',
    'chanderi-cotton-sarees',
    'ramyyam',
    'women-chimis',
    'braziers'
  ];

  for (const col of collections) {
    try {
      const res = await fetch(`https://ramrajcotton.in/collections/${col}/products.json?limit=50`);
      if (res.ok) {
        const data = await res.json();
        for (const p of data.products) {
          if (!allProducts.some(existing => existing.id === p.id)) {
            allProducts.push({
              id: p.id,
              title: p.title,
              handle: p.handle,
              product_type: p.product_type,
              tags: p.tags,
              images: p.images.map(img => img.src),
              col
            });
          }
        }
      }
    } catch (e) {
      console.log(`Failed to fetch collection ${col}:`, e.message);
    }
  }

  // Also fetch generic products.json pages
  for (let page = 1; page <= 5; page++) {
    try {
      const res = await fetch(`https://ramrajcotton.in/products.json?limit=250&page=${page}`);
      if (res.ok) {
        const data = await res.json();
        for (const p of data.products) {
          if (!allProducts.some(existing => existing.id === p.id)) {
            allProducts.push({
              id: p.id,
              title: p.title,
              handle: p.handle,
              product_type: p.product_type,
              tags: p.tags,
              images: p.images.map(img => img.src),
              col: 'general'
            });
          }
        }
      }
    } catch (e) {
      console.log(`Failed page ${page}:`, e.message);
    }
  }

  console.log(`Total Ramraj/Ramyyam products fetched: ${allProducts.length}`);
  fs.writeFileSync('ramraj_products_index.json', JSON.stringify(allProducts, null, 2));
}

fetchAllRamrajProducts();
