import fs from 'fs';

const products = JSON.parse(fs.readFileSync('ramraj_products_index.json', 'utf8'));

function search(terms, exclude = []) {
  return products.filter(p => {
    const text = (p.title + ' ' + (p.product_type || '') + ' ' + (p.tags ? p.tags.join(' ') : '')).toLowerCase();
    const hasAll = terms.every(t => text.includes(t.toLowerCase()));
    const hasExclude = exclude.some(e => text.includes(e.toLowerCase()));
    return hasAll && !hasExclude && p.images && p.images.length > 0;
  });
}

const queries = [
  { key: 'velcro-dhoti', terms: ['readymade', 'dhoti'] },
  { key: 'velcro-alt', terms: ['velcro'] },
  { key: 'pocket-dhoti', terms: ['pocket', 'dhoti'] },
  { key: '8-mulam', terms: ['8', 'mulam'] },
  { key: 'double-dhoti', terms: ['double', 'dhoti'] },
  { key: 'sandalwood-dhoti', terms: ['subhamangala'] },
  { key: 'fragrance-dhoti', terms: ['perfumed'] },
  { key: 'silk-dhoti-panchakacham', terms: ['panchakacham'] },
  { key: 'silk-dhoti-pure', terms: ['pure silk dhoti'] },
  { key: 'stain-dhoti', terms: ['stain'] },
  { key: 'temple-dhoti', terms: ['temple'] },
  { key: 'single-dhoti', terms: ['single', 'dhoti'] },
  { key: 'white-shirt', terms: ['white', 'shirt', 'cotton'] },
  { key: 'linen-shirt', terms: ['pure linen', 'shirt'] },
  { key: 'silk-shirt', terms: ['silk', 'shirt'] },
  { key: 'bamboo-shirt', terms: ['bamboo'] },
  { key: 'kurta', terms: ['kurta'] },
  { key: 'combo', terms: ['combo'] },
  { key: 'matching-set', terms: ['matching'] },
  { key: 'vest', terms: ['vest'] },
  { key: 'banian', terms: ['banian'] },
  { key: 'boxer', terms: ['boxer'] },
  { key: 'brief', terms: ['brief'] },
  { key: 'lungi', terms: ['lungi'] },
  { key: 'kids-dhoti', terms: ['boys', 'dhoti'] },
  { key: 'kids-star', terms: ['little star'] },
  { key: 'saree-soft-silk', terms: ['soft silk', 'saree'] },
  { key: 'saree-art-silk', terms: ['art silk', 'saree'] },
  { key: 'saree-cotton', terms: ['cotton', 'saree'] },
  { key: 'saree-kasavu', terms: ['kasavu'] },
  { key: 'saree-kerala', terms: ['kerala'] },
  { key: 'saree-chanderi', terms: ['chanderi', 'saree'] },
  { key: 'saree-general', terms: ['saree'] },
  { key: 'kurti', terms: ['kurti'] },
  { key: 'women-top', terms: ['women', 'top'] },
  { key: 'women-camisole', terms: ['camisole'] },
  { key: 'women-chimis', terms: ['chimis'] },
  { key: 'women-panties', terms: ['panties'] },
  { key: 'women-innerwear', terms: ['women', 'cotton'] },
  { key: 'nighty', terms: ['nighty'] },
  { key: 'nightwear', terms: ['nightwear'] },
  { key: 'girls-pattu', terms: ['pattu'] },
  { key: 'girls', terms: ['girls'] },
];

for (const q of queries) {
  const matches = search(q.terms);
  console.log(`=== Query: ${q.key} (${q.terms.join(', ')}) -> Found ${matches.length} ===`);
  matches.slice(0, 3).forEach(m => {
    console.log(`  - [${m.id}] ${m.title}`);
    console.log(`    Images (${m.images.length}): ${m.images[0]}`);
  });
}
