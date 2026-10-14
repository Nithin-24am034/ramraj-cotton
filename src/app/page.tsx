'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Leaf,
  Sparkles,
  Wind,
  Droplets,
  Award,
  Layers,
} from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { products, categories } from '@/lib/products';
import { useBrand } from '@/store/brandStore';
import DrapeGuideModal from '@/components/ui/DrapeGuideModal';

export default function HomePage() {
  const { selectedBrand, setSelectedBrand, isRamyyam } = useBrand();
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'ramraj' | 'ramyyam'>('all');
  const [isDrapeOpen, setIsDrapeOpen] = useState(false);

  // Trust Badges
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: '100% Pure Combed Cotton',
      desc: 'Certified by Indian Textile Committee',
      color: 'text-[#1d4d2d]',
      bg: 'bg-[#edf5ee]',
    },
    {
      icon: Sparkles,
      title: 'Silk Mark Certified',
      desc: '100% Pure Mulberry Silk Collections',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
    },
    {
      icon: Truck,
      title: 'Free Shipping Above ₹799',
      desc: 'Direct dispatch from Tirupur Mills',
      color: 'text-[#1d4d2d]',
      bg: 'bg-[#edf5ee]',
    },
    {
      icon: Award,
      title: '50,000+ Weavers',
      desc: 'Supporting handloom heritage since 1983',
      color: 'text-rose-800',
      bg: 'bg-rose-50',
    },
  ];

  // Innovations
  const innovations = [
    {
      id: 'velcro',
      title: 'Ottiko Kattiko™',
      badge: '#1 Innovation',
      desc: 'World famous Velcro Pocket Dhoti. Wraps in 10 seconds, secret phone pocket, zero knots.',
      icon: Layers,
      href: '/products/ottiko-kattiko-readymade-velcro-pocket-dhoti',
      color: 'from-amber-600 to-amber-800',
    },
    {
      id: 'fragrance',
      title: 'Subhamangala Sandalwood',
      badge: 'Herbal Infusion',
      desc: 'Micro-encapsulated Mysore Sandalwood aroma that releases as you walk in temples.',
      icon: Wind,
      href: '/products/subhamangala-sandalwood-fragrance-perfumed-dhoti',
      color: 'from-emerald-700 to-emerald-900',
    },
    {
      id: 'stain',
      title: 'Spill-Proof Stain Repellent',
      badge: 'Lotus Nano-Tech',
      desc: 'Coffee, tea, and wedding feast curries bead right off without staining pristine white cotton.',
      icon: Droplets,
      href: '/products/spill-proof-stain-repellent-cotton-dhoti',
      color: 'from-blue-700 to-blue-900',
    },
    {
      id: 'bamboo',
      title: 'Organic Bamboo Cotton',
      badge: 'Thermo-Cooling',
      desc: 'Naturally antimicrobial and odor-resistant. Keeps body 2-3°C cooler in tropical weather.',
      icon: Leaf,
      href: '/products/organic-bamboo-cotton-anti-bacterial-shirt',
      color: 'from-teal-700 to-teal-900',
    },
  ];

  // Filtered popular products
  const displayedProducts = products.filter((p) => {
    if (activeCatalogTab === 'all') return p.isFeatured;
    return p.isFeatured && p.brand === activeCatalogTab;
  }).slice(0, 8);

  const ramrajHeroCats = categories.filter((c) => c.brand === 'ramraj').slice(0, 4);
  const ramyyamHeroCats = categories.filter((c) => c.brand === 'ramyyam').slice(0, 4);

  return (
    <>
      {/* ── HERO BANNER SECTION (LIQUID GLASS) ── */}
      <section className="py-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-6 items-stretch">
            {/* Main Big Hero Banner */}
            <div className="relative min-h-[460px] lg:min-h-[500px] overflow-hidden rounded-[32px] bg-stone-950 shadow-2xl border border-white/60 group">
              <Image
                src={
                  isRamyyam
                    ? 'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_792876f2-bf35-45b9-9f75-6a3b27a4337f.jpg?v=1788426817'
                    : 'https://ramrajcotton.in/cdn/shop/collections/01_d247eea8-9818-4e60-928f-0168b125ebb6.jpg?v=1728567031'
                }
                alt="Ramraj Cotton & Ramyyam traditional collection"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

              <div className="absolute inset-0 flex items-center p-8 sm:p-12 md:p-16">
                <div className="max-w-xl text-white">
                  {isRamyyam ? (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="text-rose-200 font-black text-xs tracking-[0.25em] uppercase">
                          Ramyyam • House of Ramraj
                        </span>
                      </div>
                      <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-4 tracking-tight">
                        Timeless Kasavu &amp; Soft Silk Grace
                      </h1>
                      <p className="text-sm sm:text-base text-stone-200 mb-8 leading-relaxed max-w-lg">
                        Authentic Kerala Kasavu with 24K gold zari pallu, Kanchipuram brocade silks, and pure Chettinad handlooms crafted for sacred Indian celebrations.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="/products?category=sarees"
                          className="px-6 py-3.5 liquid-glass-btn-rose text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
                        >
                          <ShoppingBag size={18} /> Explore Sarees
                        </Link>
                        <Link
                          href="/products?category=kurtis"
                          className="px-6 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/50 text-white font-bold text-sm sm:text-base rounded-xl transition-all"
                        >
                          Shop Kurtis &amp; Sets
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="text-amber-300 font-black text-xs tracking-[0.25em] uppercase">
                          Ramraj Cotton • Since 1983
                        </span>
                      </div>
                      <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-4 tracking-tight">
                        Pure Cotton. Timeless Dignity.
                      </h1>
                      <p className="text-sm sm:text-base text-stone-200 mb-8 leading-relaxed max-w-lg">
                        Experience the world-renowned Ottiko Kattiko™ Velcro Pocket Dhoti, 8-Mulam PANCHAA handlooms, and 100% combed cotton formal shirts.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="/products?category=dhotis"
                          className="px-6 py-3.5 liquid-glass-btn text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
                        >
                          <ShoppingBag size={18} /> Shop Dhotis &amp; Veshtis
                        </Link>
                        <button
                          onClick={() => setIsDrapeOpen(true)}
                          className="px-6 py-3.5 bg-amber-500/95 hover:bg-amber-400 backdrop-blur-md text-stone-950 font-black text-sm sm:text-base rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2 border border-amber-300/40"
                        >
                          <Sparkles size={18} /> How to Wear
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Side Dual Promo Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Promo Card 1: Ramyyam / Ramraj Spotlight */}
              <div className="relative min-h-[230px] rounded-[28px] overflow-hidden bg-rose-950 shadow-xl border border-white/50 group">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_4_4fa8350a-9197-4695-8ed5-d1645388a123.jpg?v=1791950034"
                  alt="Ramyyam Wedding Silk Sarees"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-200 bg-rose-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-1 border border-rose-400/40">
                    RAMYYAM COLLECTION
                  </span>
                  <h3 className="text-xl font-black">Kanchipuram &amp; Kasavu Sarees</h3>
                  <Link
                    href="/products?category=sarees"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white mt-2 group"
                  >
                    <span>Explore Bridal Silk</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Promo Card 2: Kalyan Wedding Silk Dhoti & Shirt */}
              <div className="relative min-h-[230px] rounded-[28px] overflow-hidden bg-stone-900 shadow-xl border border-white/50 group">
                <Image
                  src="https://ramrajcotton.in/cdn/shop/collections/04_88eba311-76f9-4cbf-9bb9-e43f33022a14.jpg?v=1728566858"
                  alt="Ramraj Kalyan Wedding Silk Dhoti and Shirt"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-stone-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-1 border border-amber-400/40">
                    KALYAN SPECIAL
                  </span>
                  <h3 className="text-xl font-black">Pure Silk Panchakacham Sets</h3>
                  <Link
                    href="/products?category=veshti"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white mt-2 group"
                  >
                    <span>View Wedding Sets</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & PURITY CERTIFICATION BAR ── */}
      {/* ── TRUST & PURITY CERTIFICATION BAR (LIQUID GLASS) ── */}
      <section className="py-8 relative" aria-label="Ramraj Trust Guarantee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trustFeatures.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="flex items-center gap-3.5 p-4 rounded-2xl liquid-glass border border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all"
              >
                <div className={`w-11 h-11 ${bg} ${color} rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/40`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-xs sm:text-sm">{title}</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RAMRAJ SIGNATURE INNOVATIONS SECTION (LIQUID GLASS DARK) ── */}
      <section className="py-16 bg-stone-900/90 backdrop-blur-2xl text-white relative border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Pioneering Handloom Tech
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-3">The Ramraj Innovations</h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-lg">
                Patented innovations that transformed traditional dhotis into modern essentials for millions across the world.
              </p>
            </div>
            <button
              onClick={() => setIsDrapeOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all w-fit cursor-pointer shadow-lg active:scale-95"
            >
              <Sparkles size={15} /> How to Wear Ottiko Kattiko
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {innovations.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="liquid-glass-dark hover:bg-stone-800/80 border border-white/15 hover:border-amber-400/60 rounded-3xl p-6 transition-all duration-300 group flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-stone-950/80 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>Shop Innovation</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RAMRAJ COTTON CATEGORIES (MEN & BOYS) ── */}
      <section className="py-14 bg-[#f8faf7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1d4d2d] bg-[#edf5ee] px-3 py-1 rounded-full">
                Men &amp; Boys
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">Ramraj Cotton Heritage</h2>
            </div>
            <Link
              href="/products?brand=ramraj"
              className="text-xs font-bold text-[#1d4d2d] hover:underline flex items-center gap-1"
            >
              View all Men&apos;s collections <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ramrajHeroCats.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] liquid-glass-card border border-white/60 shadow-md hover:shadow-2xl transition-all"
              >
                <Image
                  src={
                    cat.id === 'dhotis'
                      ? 'https://ramrajcotton.in/cdn/shop/collections/01_d247eea8-9818-4e60-928f-0168b125ebb6.jpg?v=1728567031'
                      : cat.id === 'shirts'
                      ? 'https://ramrajcotton.in/cdn/shop/collections/02_811057cd-ac4c-47c7-9fb7-08b737a3143b.jpg?v=1728566773'
                      : cat.id === 'veshti'
                      ? 'https://ramrajcotton.in/cdn/shop/collections/04_88eba311-76f9-4cbf-9bb9-e43f33022a14.jpg?v=1728566858'
                      : 'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/241224_Ecom_Ramraj20201.jpg?v=1735378626'
                  }
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-2xl mb-1 block">{cat.icon}</span>
                  <h3 className="font-bold text-base leading-tight">{cat.label}</h3>
                  <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RAMYYAM WOMEN & GIRLS SPOTLIGHT (LIQUID GLASS) ── */}
      <section className="py-14 bg-rose-50/40 backdrop-blur-xl border-b border-rose-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-800 bg-rose-100/80 px-3 py-1 rounded-full border border-rose-200/50">
                Women &amp; Girls
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-rose-950 mt-2">RAMYYAM Handloom Sarees &amp; Ethnic</h2>
            </div>
            <Link
              href="/products?brand=ramyyam"
              className="text-xs font-bold text-rose-800 hover:underline flex items-center gap-1"
            >
              View all Ramyyam collections <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ramyyamHeroCats.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] liquid-glass-card border border-rose-200/60 shadow-md hover:shadow-2xl transition-all"
              >
                <Image
                  src={
                    cat.id === 'sarees'
                      ? 'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_792876f2-bf35-45b9-9f75-6a3b27a4337f.jpg?v=1788426817'
                      : cat.id === 'kurtis'
                      ? 'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_9dda9639-9d21-4874-b9b2-e23d07924028.png?v=1790234045'
                      : cat.id === 'women-innerwear'
                      ? 'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0029_DSC09169_853739f3-a1dd-4fe6-b0a5-d1a6863ca6a9.jpg?v=1679997373'
                      : 'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/07_6881e6f5-98fe-405f-8da1-756d7148c6c3.jpg?v=1748520536'
                  }
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-2xl mb-1 block">{cat.icon}</span>
                  <h3 className="font-bold text-base leading-tight">{cat.label}</h3>
                  <p className="text-[11px] text-rose-200 mt-1 line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR PICKS & CATALOGUE SECTION (LIQUID GLASS) ── */}
      <section className="py-16 relative" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-700">
                Most Loved Across India
              </span>
              <h2 id="featured-heading" className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                Featured Best Sellers
              </h2>
            </div>

            {/* Brand Toggle Tabs with liquid glass pill */}
            <div className="flex p-1 liquid-glass-pill rounded-2xl w-fit border border-white/80">
              {[
                { id: 'all', label: 'All Picks' },
                { id: 'ramraj', label: 'Ramraj Men' },
                { id: 'ramyyam', label: 'Ramyyam Women' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCatalogTab(tab.id as typeof activeCatalogTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCatalogTab === tab.id
                      ? 'bg-white/95 text-stone-900 shadow-md border border-white/80'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 liquid-glass-btn text-white font-bold text-sm rounded-2xl transition-all shadow-lg active:scale-95"
            >
              <span>Explore Complete Catalogue (25 Products)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 40-YEAR HERITAGE STORY CALLOUT (LIQUID GLASS) ── */}
      <section className="py-16 relative border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass rounded-[32px] p-8 sm:p-12 border border-white/80 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 shadow-lg border border-white/40">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_b28406bf-5b67-4ff9-811b-2cd04365771a.png?v=1789556947"
                  alt="Ramraj Cotton Master Handloom Weavers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1d4d2d] bg-[#edf5ee]/90 px-3.5 py-1.5 rounded-full inline-block border border-emerald-400/30">
                  40+ Years of Purity &amp; Trust
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                  Crafted by 50,000+ Master Weavers in Tamil Nadu
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Every thread of Ramraj Cotton and Ramyyam represents the pride of Indian textile heritage. Initiated in 1983 by Padma Shri K.R. Nagarajan, we continue to dignify traditional wear with state-of-the-art combing, tested 24K gold zari, and pure mulberry silk.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="px-6 py-3 bg-stone-900/90 hover:bg-stone-900 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 border border-white/20"
                  >
                    Read Our Founder&apos;s Story
                  </Link>
                  <Link
                    href="/stores"
                    className="px-6 py-3 liquid-glass-pill hover:bg-white text-stone-800 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    Locate 250+ Showrooms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Drape Guide Modal */}
      <DrapeGuideModal isOpen={isDrapeOpen} onClose={() => setIsDrapeOpen(false)} />
    </>
  );
}
