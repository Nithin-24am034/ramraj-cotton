import { Product, FilterState, Category, Brand } from '@/types';

export interface CategoryMeta {
  id: Category;
  label: string;
  brand: Brand;
  icon: string;
  description: string;
  badge?: string;
}

export const categories: CategoryMeta[] = [
  // ── RAMRAJ COTTON (Men & Boys) ──────────────────────────────────────────
  {
    id: 'dhotis',
    label: 'Dhotis & Veshtis',
    brand: 'ramraj',
    icon: '✨',
    description: 'Ottiko Kattiko, PANCHAA 8-Mulam, Zari & Daily',
    badge: 'Famous',
  },
  {
    id: 'shirts',
    label: 'Pure Cotton Shirts',
    brand: 'ramraj',
    icon: '👔',
    description: '100% Combed Cotton, Linen & Silk Wedding Shirts',
  },
  {
    id: 'veshti',
    label: 'Silk & Wedding Veshti',
    brand: 'ramraj',
    icon: '👑',
    description: 'Gold Kasavu, Mayilkan Zari & Panchakacham',
    badge: 'Wedding',
  },
  {
    id: 'kurtas',
    label: 'Ethnic Kurtas',
    brand: 'ramraj',
    icon: '🪡',
    description: 'Short Kurtas, Linen Festive & Silk Sets',
  },
  {
    id: 'combos',
    label: 'Matching Combos',
    brand: 'ramraj',
    icon: '🎁',
    description: 'Father & Son, Bridegroom Gift Sets',
  },
  {
    id: 'innerwear',
    label: 'Vests & Loungewear',
    brand: 'ramraj',
    icon: '🩳',
    description: 'Super Combed Cotton Vests & Woven Boxers',
  },
  {
    id: 'lungis',
    label: 'Traditional Lungis',
    brand: 'ramraj',
    icon: '🧵',
    description: 'Handloom Checked & Malabar Kasavu Lungis',
  },
  {
    id: 'kids',
    label: 'Little Stars (Boys)',
    brand: 'ramraj',
    icon: '👦',
    description: 'Boys Velcro Dhoti Sets & Pattu Panchakacham',
  },

  // ── RAMYYAM (Women & Girls) ─────────────────────────────────────────────
  {
    id: 'sarees',
    label: 'Ramyyam Sarees',
    brand: 'ramyyam',
    icon: '🥻',
    description: 'Kerala Kasavu, Kanchipuram Soft Silk & Chettinad Cotton',
    badge: 'Heritage',
  },
  {
    id: 'kurtis',
    label: 'Kurtis & Sets',
    brand: 'ramyyam',
    icon: '👗',
    description: 'Anarkali Sets, Hand Block Printed & Chanderi Silk',
  },
  {
    id: 'women-innerwear',
    label: 'Lingerie & Camisoles',
    brand: 'ramyyam',
    icon: '🌸',
    description: '100% Combed Cotton Slips & Antimicrobial Panties',
  },
  {
    id: 'women-nightwear',
    label: 'Nightwear & Maxis',
    brand: 'ramyyam',
    icon: '🌙',
    description: 'Pure Cotton Printed Feeding & Loungewear Maxis',
  },
  {
    id: 'girls',
    label: 'Girls Pattu Pavadai',
    brand: 'ramyyam',
    icon: '👧',
    description: 'Traditional South Indian Silk Lehenga Choli Sets',
    badge: 'Festive',
  },
];

export const products: Product[] = [
  // =========================================================================
  // ─── RAMRAJ COTTON: DHOTIS & VESHTIS ──────────────────────────────────────
  // =========================================================================
  {
    id: 'rr-dhoti-001',
    name: 'Ottiko Kattiko Readymade Velcro Pocket Dhoti with Towel',
    slug: 'ottiko-kattiko-readymade-velcro-pocket-dhoti',
    brand: 'ramraj',
    category: 'dhotis',
    price: 645,
    originalPrice: 850,
    discount: 24,
    description:
      'The world-famous Ramraj "Ottiko Kattiko" innovation! No complicated knots required — simply wrap around your waist and stick the secure micro-Velcro closure. Features a discreet functional pocket on the right side for smartphones and wallets. Comes paired with a matching 1-meter pure cotton Angavastram (towel) with an auspicious gold jari border.',
    shortDescription: 'World-famous instant wrap micro-Velcro dhoti with side pocket & matching towel.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_3ee2ca35-5d7c-4e83-ab44-2f750ca59d48.jpg?v=1739623766',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_045a8862-b8cf-4e41-ad5a-7f957b596348.jpg?v=1739623766',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_667768a5-60ef-424f-b23a-5dbbd3f2e783.jpg?v=1740648139',
    ],
    sizes: ['28-30 (S)', '32-34 (M)', '36-38 (L)', '40-42 (XL)', '44 (XXL)'],
    materials: ['100% Super Combed Cotton'],
    colors: [
      { name: 'Pure White & Gold', hex: '#FFFFFF' },
      { name: 'Auspicious Cream & Gold', hex: '#FFF8E7' },
    ],
    rating: 4.9,
    reviewCount: 3840,
    inStock: true,
    isFeatured: true,
    isNew: false,
    occasion: 'daily',
    borderType: 'gold-zari',
    fabric: '100% Super Combed Cotton',
    length: 'Adjustable Velcro Waistband',
    specialFeature: 'Ottiko Kattiko Velcro + Secret Mobile Pocket',
    purityBadge: '100% Pure Cotton Certified',
    tags: ['velcro', 'pocket-dhoti', 'ottiko-kattiko', 'best-seller', 'ramraj-signature'],
    specifications: [
      { label: 'Weave Type', value: 'High Density Combed Plain Weave' },
      { label: 'Waist Style', value: 'Adjustable Hook & Loop Velcro with Pocket' },
      { label: 'Border', value: '1 Inch Gold Jari Woven Border' },
      { label: 'Included Accessories', value: 'Matching 1.0m Cotton Angavastram' },
      { label: 'Wash Care', value: 'Gentle Machine / Hand Wash in Cold Water' },
    ],
    reviews: [
      {
        id: 'rev-01',
        author: 'Karthik Subramanian',
        rating: 5,
        date: '28 Sep 2026',
        title: 'Life changing innovation for youngsters!',
        comment: 'I never used to wear dhotis to temple functions because tying it was a nightmare. This velcro version fits in 10 seconds and never slips. The pocket holds my iPhone 15 comfortably.',
        location: 'Chennai, Tamil Nadu',
        verified: true,
      },
      {
        id: 'rev-02',
        author: 'Balaji Venkatesh',
        rating: 5,
        date: '14 Sep 2026',
        title: 'Superb quality cotton and strong velcro',
        comment: 'Washed it 8 times now, velcro is still just as strong as day one. Typical Ramraj excellence.',
        location: 'Coimbatore, Tamil Nadu',
        verified: true,
      },
    ],
  },
  {
    id: 'rr-dhoti-002',
    name: 'PANCHAA™ Handwoven 8 Mulam (4.0m) Double Dhoti',
    slug: 'panchaa-handwoven-8-mulam-double-dhoti',
    brand: 'ramraj',
    category: 'dhotis',
    price: 995,
    originalPrice: 1290,
    discount: 23,
    description:
      'The quintessential South Indian gentleman’s attire. Woven on traditional pit-looms by master handloom weavers in Tamil Nadu, this authentic 8 Mulam (4.0 meters) double dhoti features a high-density 100s yarn count. Features the auspicious Mayilkan (Peacock-eye) gold zari border.',
    shortDescription: 'Master handwoven 8-Mulam double dhoti with traditional Mayilkan gold zari.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_b28406bf-5b67-4ff9-811b-2cd04365771a.png?v=1789556947',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_a516ce1a-6a37-4ef8-8df0-b23a40194843.png?v=1789556947',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_02f22b1e-7831-4045-afa4-00d316ed1ff1.png?v=1789556947',
    ],
    sizes: ['8 Mulam (4.0m)', '9 Mulam (4.5m)', '10 Mulam (5.0m)'],
    materials: ['100s Count Pure Combed Cotton'],
    colors: [
      { name: 'Kalyan White & Gold', hex: '#FFFFFF' },
      { name: 'Kalyan Cream & Gold', hex: '#FFF6E0' },
    ],
    rating: 4.95,
    reviewCount: 1940,
    inStock: true,
    isFeatured: true,
    isNew: false,
    occasion: 'wedding',
    borderType: 'mayilkan',
    fabric: '100s Fine Combed Cotton',
    length: '8 Mulam (4.0 Meters)',
    specialFeature: 'Handloom Mark Certified Pit-Loom Weave',
    purityBadge: 'Handloom Mark Certified',
    tags: ['panchaa', '8-mulam', 'double-dhoti', 'handloom', 'wedding'],
    specifications: [
      { label: 'Yarn Count', value: '100s x 100s Superfine Cotton' },
      { label: 'Length', value: '8 Mulam (4.0 Meters x 1.27 Meters)' },
      { label: 'Border', value: '2-Inch Traditional Mayilkan Gold Zari' },
      { label: 'Origin', value: 'Sirumugai / Karur Looms, Tamil Nadu' },
    ],
    reviews: [
      {
        id: 'rev-03',
        author: 'S. Ramaswamy',
        rating: 5,
        date: '02 Oct 2026',
        title: 'Authentic Traditional Drape',
        comment: 'For traditional ceremonies, nothing matches a real 8-mulam double dhoti. The drape holds crisp pleats all through the pooja.',
        location: 'Madurai, Tamil Nadu',
        verified: true,
      },
    ],
  },
  {
    id: 'rr-dhoti-003',
    name: 'Subhamangala Sandalwood Fragrance Perfumed Dhoti',
    slug: 'subhamangala-sandalwood-fragrance-perfumed-dhoti',
    brand: 'ramraj',
    category: 'dhotis',
    price: 780,
    originalPrice: 950,
    discount: 18,
    description:
      'An exclusive spiritual innovation by Ramraj Cotton. Infused with natural, micro-encapsulated Mysore Sandalwood aroma that gently activates as you walk, creating an aura of serenity and auspiciousness during temple visits, homams, and weddings. Fragrance lasts through multiple washes.',
    shortDescription: 'Infused with natural auspicious Mysore Sandalwood aroma with gold zari.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_2399d38c-67c9-4054-982e-5ca0fc481df9.png?v=1790676266',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_64927911-f01a-4eac-8ebe-7b52c908296e.jpg?v=1790676266',
    ],
    sizes: ['4 Mulam (2.0m)', '8 Mulam (4.0m)'],
    materials: ['Pure Combed Cotton with Sandal Extract'],
    colors: [{ name: 'Auspicious Sandal Cream', hex: '#FAF0E6' }],
    rating: 4.85,
    reviewCount: 1420,
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: 'puja',
    borderType: 'gold-zari',
    fabric: 'Sandalwood Micro-Encapsulated Cotton',
    length: '4 Mulam & 8 Mulam',
    specialFeature: 'Aromatherapy Mysore Sandalwood Fragrance',
    purityBadge: '100% Pure Herbal Infused',
    tags: ['subhamangala', 'fragrance', 'sandalwood', 'puja', 'temple'],
    specifications: [
      { label: 'Fragrance', value: 'Natural Mysore Sandalwood Essential Oils' },
      { label: 'Technology', value: 'Micro-encapsulated friction-release aroma' },
      { label: 'Border', value: 'Auspicious Temple Gopuram Gold Zari' },
    ],
  },
  {
    id: 'rr-dhoti-004',
    name: 'Kalyan Special Pure Mulberry Silk Panchakacham Set',
    slug: 'kalyan-special-pure-mulberry-silk-panchakacham-set',
    brand: 'ramraj',
    category: 'veshti',
    price: 4995,
    originalPrice: 6500,
    discount: 23,
    description:
      'The crown jewel of traditional Tamil weddings. Woven from 100% pure Mulberry Silk bearing the official government Silk Mark certification. Features an opulent 3-inch pure 24K gold-plated zari border with traditional floral creepers and temple motifs. Includes matching 9x5 Panchakacham and Angavastram.',
    shortDescription: 'Official Silk Mark 100% Pure Mulberry Silk with 3-inch rich gold zari.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_3e83cf55-55c7-480d-b6f1-3ec54a831914.jpg?v=1750758467',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_2c2c9200-3810-4b46-99d0-e5ee953ef3ea.jpg?v=1750758467',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_298b506c-aae5-4ee9-8c25-176c04ce6211.jpg?v=1750758856',
    ],
    sizes: ['9x5 Mulam Complete Wedding Set'],
    materials: ['100% Pure Mulberry Silk'],
    colors: [
      { name: 'Royal Wedding Cream', hex: '#FFF8DC' },
      { name: 'Golden Ivory', hex: '#FFFFF0' },
    ],
    rating: 5.0,
    reviewCount: 980,
    inStock: true,
    isFeatured: true,
    isNew: false,
    occasion: 'wedding',
    borderType: 'gold-zari',
    fabric: '100% Pure Mulberry Silk (Silk Mark)',
    length: '9x5 Mulam (Dhoti + Angavastram)',
    specialFeature: 'Government Silk Mark Certified',
    purityBadge: 'Silk Mark Certified India',
    tags: ['silk', 'pattu', 'panchakacham', 'wedding', 'kalyan'],
    specifications: [
      { label: 'Certification', value: 'Silk Mark Organisation of India (SMOI)' },
      { label: 'Zari', value: 'Tested 24K Gold Plated Thread' },
      { label: 'Set Contents', value: 'Panchakacham Dhoti (4.5m) + Angavastram (2.25m)' },
    ],
  },
  {
    id: 'rr-dhoti-005',
    name: 'Spill-Proof Stain Repellent Nano Cotton Dhoti',
    slug: 'spill-proof-stain-repellent-cotton-dhoti',
    brand: 'ramraj',
    category: 'dhotis',
    price: 799,
    originalPrice: 999,
    discount: 20,
    description:
      'Never worry about coffee, tea, sambar, or water spills ruining your pristine white dhoti during feast banquets. Engineered with bio-inspired Lotus Leaf nanotechnology, liquids literally bead up and roll off without staining or soaking the fabric, while preserving 100% breathability.',
    shortDescription: 'Lotus-leaf nanotechnology: coffee, tea & curry bead right off without staining.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/dhoti_1_dd199eaf-926e-49c9-b211-f5203a37dc31.png?v=1790313440',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_d4ac3977-2d2b-4c3e-bfa8-9b2d917183b1.png?v=1790313440',
    ],
    sizes: ['4 Mulam (2.0m)', '8 Mulam (4.0m)'],
    materials: ['Hydrophobic Nano-Treated 100% Cotton'],
    colors: [{ name: 'Stain-Guard White', hex: '#FFFFFF' }],
    rating: 4.88,
    reviewCount: 1650,
    inStock: true,
    isFeatured: false,
    isNew: true,
    occasion: 'festival',
    borderType: 'gold-zari',
    fabric: 'Lotus-Leaf Hydrophobic Cotton',
    length: '4 Mulam / 8 Mulam',
    specialFeature: 'Spill-Proof & Stain Repellent',
    purityBadge: 'Nano-Tech Certified',
    tags: ['stain-proof', 'spill-proof', 'wedding-feast', 'nano-cotton'],
  },
  {
    id: 'rr-dhoti-006',
    name: 'Classic South Temple Border 4 Mulam Single Dhoti',
    slug: 'classic-south-temple-border-4-mulam-dhoti',
    brand: 'ramraj',
    category: 'dhotis',
    price: 395,
    originalPrice: 499,
    discount: 21,
    description:
      'The everyday favorite of millions of households. Lightweight, breathable, and easy to wash. Woven from 100% pure combed cotton with a classic red-and-gold temple border.',
    shortDescription: 'Lightweight everyday 100% cotton dhoti with traditional red & gold temple border.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_03b5bb77-27f9-4a79-8a14-db05d7b3fbff.jpg?v=1739870566',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_375216f9-82eb-4124-af54-5363b9374896.jpg?v=1739870566',
    ],
    sizes: ['4 Mulam (2.0m)'],
    materials: ['100% Combed Cotton'],
    colors: [{ name: 'Temple White', hex: '#FFFFFF' }],
    rating: 4.75,
    reviewCount: 3120,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'daily',
    borderType: 'temple',
    fabric: '100% Pure Combed Cotton',
    length: '4 Mulam (2.0 Meters)',
    tags: ['temple', 'daily', '4-mulam', 'budget-friendly'],
  },

  // =========================================================================
  // ─── RAMRAJ COTTON: SHIRTS & KURTAS ───────────────────────────────────────
  // =========================================================================
  {
    id: 'rr-shirt-001',
    name: 'Ramraj Classic White 100% Combed Cotton Formal Shirt',
    slug: 'classic-white-pure-cotton-formal-shirt',
    brand: 'ramraj',
    category: 'shirts',
    price: 695,
    originalPrice: 899,
    discount: 23,
    description:
      'The hallmark of South Indian formal elegance. Tailored from premium 80s count two-ply combed cotton that stays crisp from morning meetings to evening temple visits. Features reinforced collars that never curl and mother-of-pearl finish buttons. Available in classic Half Sleeve & Full Sleeve.',
    shortDescription: 'Premium 80s 2-ply combed cotton white formal shirt with anti-curl collar.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_ae8e4826-d63f-48d2-b5b7-f5d209dd3eee.jpg?v=1782543109',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_1c676068-f06b-4104-95f8-9245b16c9d73.jpg?v=1782887021',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/NewProject_1_fcd50886-36de-4863-a5ae-43c20f994989.jpg?v=1782883852',
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    materials: ['100% Combed Compact Cotton'],
    colors: [
      { name: 'Pure White (Half Sleeve)', hex: '#FFFFFF' },
      { name: 'Pure White (Full Sleeve)', hex: '#F8F9FA' },
    ],
    rating: 4.89,
    reviewCount: 4210,
    inStock: true,
    isFeatured: true,
    isNew: false,
    occasion: 'office',
    fabric: '80s 2-Ply Combed Compact Cotton',
    purityBadge: '100% Pure Cotton Certified',
    tags: ['white-shirt', 'formal', 'office', 'half-sleeve', 'best-seller'],
    specifications: [
      { label: 'Fit', value: 'Regular Comfort Fit' },
      { label: 'Collar', value: 'Reinforced Stiff Spread Collar' },
      { label: 'Pocket', value: 'Single Chest Pocket with Pen Slot' },
      { label: 'Buttons', value: 'Cross-Stitched Heat Resistant Resin' },
    ],
    reviews: [
      {
        id: 'rev-04',
        author: 'Narayanan Ananth',
        rating: 5,
        date: '05 Oct 2026',
        title: 'Best white shirt for Indian summers',
        comment: 'I own six of these shirts for daily office wear. Nothing breathes better in Chennai humidity than Ramraj combed cotton.',
        location: 'Chennai, Tamil Nadu',
        verified: true,
      },
    ],
  },
  {
    id: 'rr-shirt-002',
    name: '100% Pure Irish Linen Luxury Shirt – Pastel Ivory',
    slug: 'pure-irish-linen-luxury-shirt-pastel-ivory',
    brand: 'ramraj',
    category: 'shirts',
    price: 1495,
    originalPrice: 1999,
    discount: 25,
    description:
      'Woven from the finest long-staple European flax fibers, this pure linen shirt offers the ultimate breezy drape. Highly breathable with natural moisture-wicking properties, it softens with every wash while retaining its structured drape.',
    shortDescription: '100% Pure European Flax linen. Naturally cool, luxurious and breathable.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/5_a81ca979-62ac-47c0-8c88-ec54e1ea585e.jpg?v=1784001640',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_1b8f2722-9fa1-4a1f-a3a5-fa9148289533.jpg?v=1784001140',
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    materials: ['100% Pure European Linen'],
    colors: [
      { name: 'Pastel Ivory', hex: '#FFFFF0' },
      { name: 'Sky Breeze Blue', hex: '#E0F2FE' },
      { name: 'Natural Sand', hex: '#F5F5DC' },
    ],
    rating: 4.92,
    reviewCount: 1180,
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: 'festival',
    fabric: '60 Lea Pure European Flax Linen',
    purityBadge: '100% Pure Linen Certified',
    tags: ['linen', 'luxury', 'breathable', 'festive', 'summer'],
  },
  {
    id: 'rr-shirt-003',
    name: 'Pure Mulberry Silk Wedding Shirt – Cream Gold',
    slug: 'pure-mulberry-silk-wedding-shirt-cream-gold',
    brand: 'ramraj',
    category: 'shirts',
    price: 2995,
    originalPrice: 3800,
    discount: 21,
    description:
      'Tailored from 100% pure Mulberry Silk to match the Kalyan Silk Dhoti. Boasts a regal golden sheen that reflects warm wedding lights beautifully. Finished with tone-on-tone fine stitching and gold-toned buttons.',
    shortDescription: 'Silk Mark certified pure mulberry silk wedding shirt for groom & festive functions.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_8b13d889-2cfc-46d9-9ec0-27346f95f948.jpg?v=1725693102',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_41256a78-e88c-4017-82d6-50074fe8c2b2.jpg?v=1737613226',
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    materials: ['100% Pure Mulberry Silk'],
    colors: [
      { name: 'Kalyan Cream Gold', hex: '#FFF8DC' },
      { name: 'Ivory White', hex: '#FFFFFF' },
    ],
    rating: 4.96,
    reviewCount: 760,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'wedding',
    fabric: 'Pure Mulberry Silk',
    purityBadge: 'Silk Mark Certified India',
    tags: ['silk-shirt', 'wedding-shirt', 'pattu-shirt', 'groom'],
  },
  {
    id: 'rr-shirt-004',
    name: 'Organic Bamboo Cotton Anti-Bacterial Breathable Shirt',
    slug: 'organic-bamboo-cotton-anti-bacterial-shirt',
    brand: 'ramraj',
    category: 'shirts',
    price: 895,
    originalPrice: 1199,
    discount: 25,
    description:
      'A modern sustainable essential. Blended from 60% organic bamboo fiber and 40% combed organic cotton. Naturally antimicrobial and thermal-regulating, it keeps body temperature 2-3 degrees cooler than regular fabrics.',
    shortDescription: 'Organic bamboo-cotton blend that naturally prevents odors and stays cool.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/NewProject_1_fcd50886-36de-4863-a5ae-43c20f994989.jpg?v=1782883852',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_5890287f-e768-41c0-907e-b8be7df5efe1.jpg?v=1787554959',
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    materials: ['60% Bamboo Fiber', '40% Organic Cotton'],
    colors: [
      { name: 'Bamboo White', hex: '#F9FAFB' },
      { name: 'Sage Mint', hex: '#ECFDF5' },
    ],
    rating: 4.84,
    reviewCount: 920,
    inStock: true,
    isFeatured: false,
    isNew: true,
    occasion: 'daily',
    fabric: 'Eco Bamboo Cotton',
    purityBadge: 'OEKO-TEX Standard 100',
    tags: ['bamboo', 'organic', 'eco-friendly', 'anti-odor'],
  },
  {
    id: 'rr-kurta-001',
    name: 'Mandarin Collar Short Cotton Festive Kurta Shirt',
    slug: 'mandarin-collar-short-cotton-festive-kurta',
    brand: 'ramraj',
    category: 'kurtas',
    price: 749,
    originalPrice: 999,
    discount: 25,
    description:
      'The perfect fusion of traditional aesthetics and casual ease. Designed with a structured Chinese mandarin collar, mother-of-pearl buttons, and roll-up sleeves. Pairs effortlessly with dhotis or linen trousers.',
    shortDescription: 'Casual short kurta with structured mandarin collar and side slits.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/241224_Ecom_Ramraj20201.jpg?v=1735378626',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/1_bbe76d84-071d-4325-b12e-c49fc5c9de8a.jpg?v=1672901119',
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    materials: ['100% Slub Cotton Weave'],
    colors: [
      { name: 'Ivory Cream', hex: '#FFFBF0' },
      { name: 'Pooja Maroon', hex: '#881337' },
      { name: 'Turmeric Yellow', hex: '#FEF08A' },
    ],
    rating: 4.81,
    reviewCount: 840,
    inStock: true,
    isFeatured: false,
    isNew: true,
    occasion: 'festival',
    fabric: 'Slub Textured Pure Cotton',
    tags: ['kurta', 'mandarin-collar', 'festive', 'short-kurta'],
  },

  // =========================================================================
  // ─── RAMRAJ COTTON: COMBOS, INNERWEAR, LUNGIS & KIDS ─────────────────────
  // =========================================================================
  {
    id: 'rr-combo-001',
    name: 'Father & Son Pattu Matching Dhoti & Shirt Festive Combo',
    slug: 'father-and-son-pattu-matching-dhoti-shirt-combo',
    brand: 'ramraj',
    category: 'combos',
    price: 2499,
    originalPrice: 3200,
    discount: 22,
    description:
      'Celebrate festivals together with perfectly matched traditional attire. Includes: 1 Men’s Gold Border Velcro Dhoti + Shirt, and 1 Boy’s Matching Little Stars Dhoti + Shirt Set. Packaged in an ornate gift box.',
    shortDescription: 'Matching Father & Son traditional gold zari dhoti & shirt gift set.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_a8f6b7f7-c9a7-49ed-8bc8-adcf2e04a805.jpg?v=1781686841',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/Gold_F.jpg?v=1697192860',
    ],
    sizes: ['Men 40 + Boy 6-8 Yrs', 'Men 42 + Boy 8-10 Yrs', 'Men 44 + Boy 10-12 Yrs'],
    materials: ['Cotton-Silk Festive Blend'],
    colors: [{ name: 'Auspicious Gold & Cream', hex: '#FFF8E7' }],
    rating: 4.95,
    reviewCount: 650,
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: 'festival',
    borderType: 'gold-zari',
    purityBadge: 'Festive Combo Box',
    tags: ['father-son', 'combo', 'gift-set', 'diwali', 'pongal'],
  },
  {
    id: 'rr-inner-001',
    name: 'Super Combed Cotton Ribbed White Vest (Pack of 3)',
    slug: 'super-combed-cotton-ribbed-white-vest-pack-of-3',
    brand: 'ramraj',
    category: 'innerwear',
    price: 360,
    originalPrice: 450,
    discount: 20,
    description:
      'The iconic Ramraj Banian. Knitted from 100% super combed Egyptian cotton with 1x1 rib construction that hugs the body naturally without pinching. Sweat absorbent, skin-friendly, and durable through hundreds of washes.',
    shortDescription: 'Classic Ramraj ribbed vest. Ultra-soft 100% super combed cotton pack of 3.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/5_f1a0ff1a-5d22-4a5b-9f4a-c02b9a6623b8.jpg?v=1784108069',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_59298364-597b-4214-b36f-9313dca7e3d2.jpg?v=1784108296',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/1_7475e303-60da-4bf9-9ec2-7878e3a94700.jpg?v=1784108383',
    ],
    sizes: ['80cm (S)', '85cm (M)', '90cm (L)', '95cm (XL)', '100cm (XXL)'],
    materials: ['100% Super Combed Cotton'],
    colors: [{ name: 'Pure White', hex: '#FFFFFF' }],
    rating: 4.91,
    reviewCount: 6200,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'daily',
    fabric: '1x1 Ribbed Pure Cotton',
    purityBadge: '100% Pure Cotton Certified',
    tags: ['innerwear', 'vest', 'banian', 'pack-of-3', 'daily-comfort'],
  },
  {
    id: 'rr-inner-002',
    name: 'Pure Cotton Woven Boxers with Pocket (Pack of 2)',
    slug: 'pure-cotton-woven-boxers-with-pocket-pack-of-2',
    brand: 'ramraj',
    category: 'innerwear',
    price: 499,
    originalPrice: 650,
    discount: 23,
    description:
      'Relax in supreme comfort. Crafted from 100% breathable poplin cotton with a gentle covered waistband and a concealed back pocket. Perfect for sleeping and lounging around the house.',
    shortDescription: '100% poplin cotton lounge boxers with functional pocket (Pack of 2).',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/4_2a810d34-ec83-4faa-9ebd-3798bc6aa0bf.jpg?v=1791527038',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_f08957b2-0c41-4a9a-9daf-55623c21c399.jpg?v=1786958854',
    ],
    sizes: ['M (32-34)', 'L (36-38)', 'XL (40-42)', 'XXL (44)'],
    materials: ['100% Poplin Cotton'],
    colors: [
      { name: 'Navy & White Check', hex: '#1E3A8A' },
      { name: 'Grey Stripe', hex: '#64748B' },
    ],
    rating: 4.83,
    reviewCount: 1530,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'daily',
    tags: ['boxers', 'loungewear', 'pack-of-2', 'comfortable'],
  },
  {
    id: 'rr-lungi-001',
    name: 'Traditional South Indian Handloom Checked Cotton Lungi',
    slug: 'traditional-handloom-checked-cotton-lungi',
    brand: 'ramraj',
    category: 'lungis',
    price: 325,
    originalPrice: 420,
    discount: 23,
    description:
      'Handcrafted on powerlooms in Bhavani and Salem. Woven with yarn-dyed 100% combed cotton with interlocking selvage edges that prevent fraying. Softens with each wash, offering relaxed daily comfort.',
    shortDescription: 'Yarn-dyed 100% cotton handloom checked lungi with reinforced selvage.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/greencheck_5756_219a5a23-7921-4b8e-b501-c46273c830ba.jpg?v=1771060950',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/greencheck_5750_67f511bd-174e-406f-8694-6ef4193b0130.jpg?v=1771060950',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/DOTHI-31_6101.jpg?v=1767690498',
    ],
    sizes: ['2.0 Meters (Standard)', '2.25 Meters (Large)'],
    materials: ['100% Yarn-Dyed Cotton'],
    colors: [
      { name: 'Royal Blue & Green Check', hex: '#1E40AF' },
      { name: 'Maroon & Navy Check', hex: '#991B1B' },
    ],
    rating: 4.79,
    reviewCount: 2890,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'daily',
    fabric: 'Yarn-Dyed 60s Cotton',
    tags: ['lungi', 'handloom', 'checked', 'south-indian'],
  },
  {
    id: 'rr-kids-001',
    name: 'Little Stars Boys Velcro Dhoti & Embroidered Kurta Set',
    slug: 'little-stars-boys-velcro-dhoti-embroidered-kurta-set',
    brand: 'ramraj',
    category: 'kids',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    description:
      'Make little princes look auspicious! Features a super comfortable kid-friendly elasticated Velcro pocket dhoti that stays on securely during playtime, paired with an embroidered soft cotton kurta shirt with zari embellishment.',
    shortDescription: 'Kid-friendly elastic velcro dhoti with embroidered gold zari kurta set.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/01_246a9cff-0c7c-40de-afb4-c0f21aa0889c.jpg?v=1659957541',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/Gold_F.jpg?v=1697192860',
    ],
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    materials: ['100% Breathable Cotton with Silk Touch'],
    colors: [
      { name: 'Cream & Gold Zari', hex: '#FFF8E7' },
      { name: 'Festive Yellow & Gold', hex: '#FEF08A' },
    ],
    rating: 4.93,
    reviewCount: 1420,
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: 'festival',
    borderType: 'gold-zari',
    purityBadge: 'Kid Safe Gentle Cotton',
    tags: ['little-stars', 'boys', 'kids-ethnic', 'pattu-dhoti'],
  },

  // =========================================================================
  // ─── RAMYYAM: WOMEN’S SAREES, KURTIS, INNERWEAR & GIRLS ──────────────────
  // =========================================================================
  {
    id: 'ry-saree-001',
    name: 'Ramyyam Traditional Kerala Kasavu Saree with 24K Gold Zari Pallu',
    slug: 'ramyyam-traditional-kerala-kasavu-saree-gold-zari',
    brand: 'ramyyam',
    category: 'sarees',
    price: 1895,
    originalPrice: 2499,
    discount: 24,
    description:
      'The eternal symbol of Malayali and South Indian feminine grace. Woven from unbleached natural cotton with rich 24K gold-plated zari tissue border and an elaborate temple gopuram pallu. Perfect for Onam, Vishu, temple ceremonies, and traditional weddings. Comes with an unstitched matching blouse piece with border.',
    shortDescription: 'Authentic Kerala Kasavu with 24K gold zari temple pallu & matching blouse piece.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_792876f2-bf35-45b9-9f75-6a3b27a4337f.jpg?v=1788426817',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_5e3fe7ab-d4b6-4874-8aa6-f13f386464e6.jpg?v=1788253215',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/ChatGPTImageAug12_2026_01_49_33PM.png?v=1786522807',
    ],
    sizes: ['6.25 Meters (with Blouse Piece)'],
    materials: ['100% Pure Fine Combed Cotton'],
    colors: [
      { name: 'Natural Off-White & Gold', hex: '#FAF9F6' },
      { name: 'Rich Cream & Gold', hex: '#FFF8E7' },
    ],
    rating: 4.97,
    reviewCount: 2780,
    inStock: true,
    isFeatured: true,
    isNew: false,
    occasion: 'festival',
    borderType: 'gold-zari',
    fabric: 'Fine Combed Natural Cotton',
    length: '6.25 Meters (5.45m Saree + 0.8m Blouse)',
    specialFeature: 'Authentic Kerala Kasavu Handloom Weave',
    purityBadge: 'Ramyyam Heritage Certified',
    tags: ['ramyyam', 'kerala-saree', 'kasavu', 'onam', 'gold-zari', 'women-saree'],
    specifications: [
      { label: 'Weave', value: 'Balaramapuram Authentic Pit-Loom Weave' },
      { label: 'Pallu Work', value: 'Rich Golden Zari Intricate Peacock & Temple Motifs' },
      { label: 'Blouse Piece', value: 'Included (0.8m unstitched with matching border)' },
      { label: 'Occasion', value: 'Onam, Vishu, Temple Festivals, Weddings' },
    ],
    reviews: [
      {
        id: 'rev-05',
        author: 'Dr. Priya Menon',
        rating: 5,
        date: '01 Oct 2026',
        title: 'Breathtaking drape and genuine zari sheen!',
        comment: 'Wore this for our family Vishu pooja. The cotton is soft yet holds neat pleats. The gold border has a royal glow without being gaudy. Extremely proud of Ramyyam quality.',
        location: 'Kochi, Kerala',
        verified: true,
      },
      {
        id: 'rev-06',
        author: 'Sowmya Krishnamurthy',
        rating: 5,
        date: '22 Sep 2026',
        title: 'Authentic Kasavu - pure bliss',
        comment: 'Shipped to Bangalore in 2 days. The packaging was immaculate. Highly recommend!',
        location: 'Bengaluru, Karnataka',
        verified: true,
      },
    ],
  },
  {
    id: 'ry-saree-002',
    name: 'Ramyyam Kanchipuram Soft Silk Wedding Saree with Rich Brocade Pallu',
    slug: 'ramyyam-kanchipuram-soft-silk-wedding-saree',
    brand: 'ramyyam',
    category: 'sarees',
    price: 5495,
    originalPrice: 7200,
    discount: 24,
    description:
      'A masterpiece from the heritage looms of Kanchipuram. Crafted from pure soft art-silk featuring heavy zari jacquard brocade work on the body and a breathtaking bridal pallu woven with intricate peacock and floral vines. Soft on the skin, featherlight to carry, and radiant under wedding spotlights.',
    shortDescription: 'Regal Kanchipuram soft silk saree with heavy zari brocade bridal pallu.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_4_4fa8350a-9197-4695-8ed5-d1645388a123.jpg?v=1791950034',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_2_c5616119-7b69-4f03-b7e3-a6e46fc803c6.jpg?v=1791950034',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_1_9a5d674d-a3ce-4bd7-9887-c8223bc616be.jpg?v=1791950034',
    ],
    sizes: ['6.3 Meters (with Heavy Brocade Blouse)'],
    materials: ['Pure Soft Art Silk & Tested Zari'],
    colors: [
      { name: 'Kalyan Rani Pink & Gold', hex: '#BE185D' },
      { name: 'Bridal Crimson Red & Gold', hex: '#991B1B' },
      { name: 'Royal Peacock Blue & Gold', hex: '#0C4A6E' },
    ],
    rating: 4.96,
    reviewCount: 1840,
    inStock: true,
    isFeatured: true,
    isNew: false,
    occasion: 'wedding',
    borderType: 'gold-zari',
    fabric: 'Kanchipuram Soft Silk Jacquard',
    length: '6.3 Meters with Blouse',
    specialFeature: 'Dual-Tone Heavy Brocade Weave',
    purityBadge: 'Ramyyam Royal Wedding Silk',
    tags: ['ramyyam', 'kanchipuram', 'soft-silk', 'wedding', 'bridal-saree'],
    specifications: [
      { label: 'Weave Type', value: 'Jacquard Loom Interlocked Weave' },
      { label: 'Zari', value: 'Tested 24K Gold Finish Zari Thread' },
      { label: 'Blouse', value: '0.85m Contrast Brocade Blouse with Zari Border' },
    ],
  },
  {
    id: 'ry-saree-003',
    name: 'Ramyyam Chettinad Handloom Pure Cotton Saree with Temple Border',
    slug: 'ramyyam-chettinad-handloom-pure-cotton-saree',
    brand: 'ramyyam',
    category: 'sarees',
    price: 1295,
    originalPrice: 1650,
    discount: 22,
    description:
      'Celebrated for its earthy charm and vibrant contrasts, this authentic Chettinad cotton saree is handwoven by master weavers in the historic Karaikudi cluster. Featuring traditional contrast temple borders (Koorai) and checks that reflect the grandeur of Chettinad heritage mansions.',
    shortDescription: 'Heritage Chettinad handloom pure cotton saree with contrast temple border.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_292df0b2-d6e3-47ca-a208-8dc41f1accc9.png?v=1790769828',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_d295e713-2be4-4d44-9eb0-e6bf88334fb3.png?v=1790849137',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_0399174f-dbcc-4523-a4ff-31136410a304.png?v=1790769784',
    ],
    sizes: ['6.2 Meters with Blouse'],
    materials: ['100% Handloom Combed Cotton'],
    colors: [
      { name: 'Mustard Yellow & Maroon', hex: '#D97706' },
      { name: 'Forest Green & Ruby Red', hex: '#166534' },
    ],
    rating: 4.88,
    reviewCount: 1350,
    inStock: true,
    isFeatured: false,
    isNew: true,
    occasion: 'daily',
    borderType: 'temple',
    fabric: 'Chettinad 80s Handloom Cotton',
    length: '6.2 Meters',
    purityBadge: 'Chettinad Handloom Certified',
    tags: ['chettinad', 'cotton-saree', 'handloom', 'karaikudi', 'daily-wear'],
  },
  {
    id: 'ry-saree-004',
    name: 'Ramyyam Tissue Golden Organza Festive Party Wear Saree',
    slug: 'ramyyam-tissue-golden-organza-festive-saree',
    brand: 'ramyyam',
    category: 'sarees',
    price: 2450,
    originalPrice: 3200,
    discount: 23,
    description:
      'Gleam with royal luster. Woven with ultra-fine golden metallic tissue yarns combined with soft organza for a semi-translucent, ethereal look. Features an embroidered scallop border with delicate pearl detailing.',
    shortDescription: 'Luminous metallic gold tissue organza saree with embroidered scallop border.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_c001331b-6f26-4887-bb43-087bfa2cb660.png?v=1785410287',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_aae1eeac-cc12-4c25-a9e2-7b28c1fb4a3b.jpg?v=1785410099',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_dd50a4f6-53c1-48f5-95f1-7fcdf1401880.png?v=1785478039',
    ],
    sizes: ['6.3 Meters with Designer Blouse'],
    materials: ['Golden Metallic Tissue & Soft Organza'],
    colors: [
      { name: 'Radiant Champagne Gold', hex: '#FDE047' },
      { name: 'Rose Gold Tissue', hex: '#FDA4AF' },
    ],
    rating: 4.91,
    reviewCount: 940,
    inStock: true,
    isFeatured: false,
    isNew: true,
    occasion: 'festival',
    borderType: 'gold-zari',
    fabric: 'Metallic Tissue Organza',
    tags: ['tissue-saree', 'organza', 'party-wear', 'festive', 'gold'],
  },
  {
    id: 'ry-kurti-001',
    name: 'Ramyyam Pure Cotton Anarkali Kurti with Pant & Chiffon Dupatta Set',
    slug: 'ramyyam-pure-cotton-anarkali-kurti-pant-dupatta-set',
    brand: 'ramyyam',
    category: 'kurtis',
    price: 1699,
    originalPrice: 2299,
    discount: 26,
    description:
      'Graceful flared 3-piece ethnic set. Crafted from 100% pure breathable cotton featuring handcrafted silver gota-patti embroidery on the yoke. Includes flared Anarkali kurta with pockets, straight-fit elasticated trousers, and a lightweight printed chiffon dupatta.',
    shortDescription: '3-Piece 100% pure cotton Anarkali set with gota-patti embroidery & dupatta.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_9dda9639-9d21-4874-b9b2-e23d07924028.png?v=1790234045',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_2b3365fd-e02a-4068-b81f-6b6ffdbe1fa3.png?v=1790234159',
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)', '3XL (46)'],
    materials: ['100% Pure Combed Cotton'],
    colors: [
      { name: 'Powder Sky Blue & Floral', hex: '#BAE6FD' },
      { name: 'Peach Coral & Gold', hex: '#FECDD3' },
      { name: 'Mint Green', hex: '#A7F3D0' },
    ],
    rating: 4.92,
    reviewCount: 2150,
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: 'festival',
    fabric: '100% Fine Combed Cotton',
    purityBadge: '100% Pure Cotton Certified',
    tags: ['anarkali', 'kurti-set', 'ramyyam', 'dupatta', '3-piece-set'],
  },
  {
    id: 'ry-kurti-002',
    name: 'Ramyyam Straight-Cut Hand Block Printed Cotton Kurti',
    slug: 'ramyyam-straight-cut-hand-block-printed-cotton-kurti',
    brand: 'ramyyam',
    category: 'kurtis',
    price: 799,
    originalPrice: 1099,
    discount: 27,
    description:
      'Your everyday office and college favorite. Features traditional Bagru hand block floral motifs on super-soft combed cotton with side slits, a boat neck with wooden button detailing, and three-quarter sleeves.',
    shortDescription: 'Hand block printed daily comfort pure cotton kurti with side pockets.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_5cfd39ec-f81e-47e8-baf6-5681093fcdb5.png?v=1790234253',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_9dda9639-9d21-4874-b9b2-e23d07924028.png?v=1790234045',
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    materials: ['100% Hand Block Printed Cotton'],
    colors: [
      { name: 'Indigo Blue & White', hex: '#1E3A8A' },
      { name: 'Madder Red & Mustard', hex: '#991B1B' },
    ],
    rating: 4.87,
    reviewCount: 1670,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'office',
    fabric: '100% Hand Block Cotton',
    tags: ['kurti', 'block-print', 'office-wear', 'daily', 'cotton'],
  },
  {
    id: 'ry-inner-001',
    name: 'Ramyyam 100% Combed Cotton Daily Comfort Camisole Slip (Pack of 2)',
    slug: 'ramyyam-combed-cotton-daily-comfort-camisole-slip-pack-of-2',
    brand: 'ramyyam',
    category: 'women-innerwear',
    price: 449,
    originalPrice: 599,
    discount: 25,
    description:
      'From Ramyyam Lingerie & Essentials. Designed specifically for wearing under sarees, kurtis, and formal wear. Made from ultra-soft combed cotton jersey with smooth flat-lock seams that leave zero impressions.',
    shortDescription: 'Zero-impression smooth flat-lock seam cotton slips for sarees & kurtis (Pack of 2).',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0029_DSC09169_853739f3-a1dd-4fe6-b0a5-d1a6863ca6a9.jpg?v=1679997373',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0008_Untitled-2_0008_DSC09240_60d0589e-7aa8-4a9f-b6c3-16cdf1e2c58b.jpg?v=1679996999',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0013_Untitled-2_0012_DSC09230_0aaedd95-d7f0-4707-addf-827240d993aa.jpg?v=1679996679',
    ],
    sizes: ['S (80cm)', 'M (85cm)', 'L (90cm)', 'XL (95cm)', 'XXL (100cm)'],
    materials: ['100% Super Combed Jersey Cotton'],
    colors: [
      { name: 'Classic White & Skin', hex: '#FFFFFF' },
      { name: 'Black & Skin Nude', hex: '#18181B' },
    ],
    rating: 4.89,
    reviewCount: 3100,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'daily',
    fabric: 'Skin-Friendly Combed Cotton',
    purityBadge: 'Dermatologically Tested Cotton',
    tags: ['ramyyam', 'camisole', 'innerwear', 'slip', 'pack-of-2'],
  },
  {
    id: 'ry-night-001',
    name: 'Ramyyam Pure Cotton Floral Printed Feeding & Loungewear Maxi Nighty',
    slug: 'ramyyam-pure-cotton-floral-printed-maxi-nighty',
    brand: 'ramyyam',
    category: 'women-nightwear',
    price: 649,
    originalPrice: 850,
    discount: 24,
    description:
      'Unsurpassed sleeping and lounging comfort. Tailored with generous gathers and front zipper access for nursing mothers. Woven from 100% non-sheer combed cotton that stays soft and cool throughout warm nights.',
    shortDescription: '100% non-sheer cotton floral maxi nighty with invisible front feeding zipper.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/07_6881e6f5-98fe-405f-8da1-756d7148c6c3.jpg?v=1748520536',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_27ba108d-9f3b-4150-948b-cfaa46bc04d2.jpg?v=1748327814',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_1131d6ab-4fe4-4fe2-a433-ac4bb4d5af04.jpg?v=1748331291',
    ],
    sizes: ['L (Free Size Bust 42)', 'XL (Bust 46)', 'XXL (Bust 50)'],
    materials: ['100% Breathable Cotton'],
    colors: [
      { name: 'Lavender Floral', hex: '#E9D5FF' },
      { name: 'Rose Pink Floral', hex: '#FECDD3' },
    ],
    rating: 4.86,
    reviewCount: 1890,
    inStock: true,
    isFeatured: false,
    isNew: false,
    occasion: 'daily',
    fabric: 'Breathable Pure Cotton',
    tags: ['nighty', 'maxi', 'loungewear', 'maternity', 'feeding'],
  },
  {
    id: 'ry-girls-001',
    name: 'Ramyyam Girls Traditional Pattu Pavadai (Silk Lehenga Choli Set)',
    slug: 'ramyyam-girls-traditional-pattu-pavadai-silk-set',
    brand: 'ramyyam',
    category: 'girls',
    price: 1299,
    originalPrice: 1750,
    discount: 26,
    description:
      'The quintessential South Indian festive dress for young girls. Made with soft art-silk featuring authentic temple zari borders, rich contrast choli top with golden piping, and a breathable pure cotton lining to protect delicate child skin.',
    shortDescription: 'Traditional South Indian Pattu Pavadai set with soft pure cotton inner lining.',
    images: [
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_206cc917-d287-4107-960a-418161a98557.jpg?v=1780916685',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_550b08ab-d299-4d78-af96-95e8b6c8a0f5.jpg?v=1780917131',
      'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_96335079-97c4-4de1-b1be-f7efc67aa0f6.jpg?v=1787127974',
    ],
    sizes: ['1-2 Yrs', '3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs'],
    materials: ['Art Silk with 100% Cotton Lining'],
    colors: [
      { name: 'Auspicious Green & Red Zari', hex: '#15803D' },
      { name: 'Peacock Blue & Gold', hex: '#0284C7' },
      { name: 'Mustard Gold & Magenta', hex: '#CA8A04' },
    ],
    rating: 4.98,
    reviewCount: 1620,
    inStock: true,
    isFeatured: true,
    isNew: true,
    occasion: 'festival',
    borderType: 'gold-zari',
    purityBadge: 'Child Skin-Safe Cotton Lining',
    tags: ['pattu-pavadai', 'girls', 'lehenga', 'diwali', 'temple', 'kids'],
  },
];

// ─── FILTERING & SEARCH UTILITIES ──────────────────────────────────────────
export function filterProducts(
  productList: Product[],
  filters: Partial<FilterState>
): Product[] {
  return productList.filter((product) => {
    // Brand filter
    if (filters.brand && filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Occasion filter
    if (filters.occasion && filters.occasion !== 'all' && product.occasion !== filters.occasion) {
      return false;
    }

    // Border filter
    if (filters.borderType && filters.borderType !== 'all' && product.borderType !== filters.borderType) {
      return false;
    }

    // Sizes filter
    if (filters.sizes && filters.sizes.length > 0) {
      const hasSize = filters.sizes.some((size) =>
        product.sizes.some((s) => s.toLowerCase().includes(size.toLowerCase()))
      );
      if (!hasSize) return false;
    }

    // Materials filter
    if (filters.materials && filters.materials.length > 0) {
      const hasMaterial = filters.materials.some((mat) =>
        product.materials.some((m) => m.toLowerCase().includes(mat.toLowerCase()))
      );
      if (!hasMaterial) return false;
    }

    // Price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}
