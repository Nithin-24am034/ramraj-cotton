'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  Heart,
  ChevronDown,
  MapPin,
  Sparkles,
  Truck,
  Globe,
  Building2,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCurrency, CURRENCIES } from '@/store/currencyStore';
import { usePincode } from '@/store/pincodeStore';
import { useBrand } from '@/store/brandStore';
import { categories } from '@/lib/products';
import { Currency } from '@/types';
import SearchModal from '@/components/ui/SearchModal';
import DrapeGuideModal from '@/components/ui/DrapeGuideModal';
import PincodeModal from '@/components/ui/PincodeModal';
import WishlistDrawer from '@/components/cart/WishlistDrawer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMenMenuOpen, setIsMenMenuOpen] = useState(false);
  const [isWomenMenuOpen, setIsWomenMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrapeOpen, setIsDrapeOpen] = useState(false);

  const { getTotalItems, toggleCart, getTotalPrice } = useCartStore();
  const { totalWishlistItems, openWishlist } = useWishlistStore();
  const { currentCurrency, setCurrency, formatPrice } = useCurrency();
  const { savedPincode, openPincodeModal, pincodeInfo } = usePincode();
  const { selectedBrand, setSelectedBrand, isRamraj, isRamyyam } = useBrand();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ramrajCategories = categories.filter((c) => c.brand === 'ramraj');
  const ramyyamCategories = categories.filter((c) => c.brand === 'ramyyam');

  return (
    <>
      {/* ── TOP UTILITY TICKER BAR ── */}
      <div className="bg-[#12281a] text-stone-200 text-[11px] py-1.5 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-amber-200">DHOTI WEEK SPECIAL:</span>
            <span className="hidden sm:inline">Flat 15% OFF on Wedding Silk Sets • Free Delivery Above ₹799</span>
            <span className="sm:hidden">Free Delivery &gt; ₹799</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Pincode trigger */}
            <button
              onClick={openPincodeModal}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer text-[11px]"
            >
              <MapPin size={12} className="text-amber-300" />
              <span className="hidden md:inline text-stone-300">Deliver to:</span>
              <span className="font-bold underline decoration-dotted">
                {savedPincode ? `${savedPincode} (${pincodeInfo?.city?.slice(0, 8) || 'Set'})` : 'Check Pincode'}
              </span>
            </button>

            <span className="text-stone-500 hidden sm:inline">|</span>

            {/* Currency selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer font-bold"
              >
                <Globe size={12} className="text-stone-400" />
                <span>{currentCurrency}</span>
                <ChevronDown size={10} />
              </button>
              {isCurrencyOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white text-stone-800 rounded-xl shadow-2xl border border-stone-200 py-1 z-50 animate-fadeIn">
                  {(Object.keys(CURRENCIES) as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-stone-100 ${
                        currentCurrency === cur ? 'bg-amber-50 text-amber-800' : ''
                      }`}
                    >
                      <span>{CURRENCIES[cur].label}</span>
                      <span className="font-mono text-[10px] text-stone-400">{CURRENCIES[cur].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-stone-500 hidden sm:inline">|</span>

            {/* Quick links */}
            <Link href="/stores" className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Building2 size={12} />
              <span>Stores</span>
            </Link>
            <Link href="/track-order" className="hidden md:flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Truck size={12} />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── BRAND SWITCHER PORTAL RIBBON ── */}
      <div className="bg-stone-900 border-b border-stone-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedBrand('ramraj')}
              className={`px-4 sm:px-6 py-2 text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
                isRamraj
                  ? 'border-[#2d6a3d] bg-[#1d4d2d] text-white shadow-inner'
                  : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>RAMRAJ COTTON</span>
              <span className="hidden sm:inline text-[10px] font-normal text-emerald-200/80">(Men &amp; Boys)</span>
            </button>

            <button
              onClick={() => setSelectedBrand('ramyyam')}
              className={`px-4 sm:px-6 py-2 text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
                isRamyyam
                  ? 'border-rose-500 bg-rose-950 text-rose-100 shadow-inner'
                  : 'border-transparent text-stone-400 hover:text-rose-200 hover:bg-stone-800/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>RAMYYAM</span>
              <span className="hidden sm:inline text-[10px] font-normal text-rose-300/80">(Women &amp; Girls)</span>
            </button>

            <button
              onClick={() => setSelectedBrand('all')}
              className={`hidden md:flex px-4 py-2 text-xs font-black tracking-wider transition-all cursor-pointer items-center gap-1.5 border-b-2 ${
                selectedBrand === 'all'
                  ? 'border-amber-500 bg-stone-800 text-amber-300'
                  : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <span>ALL COLLECTIONS</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-stone-400 text-[11px]">
            <button
              onClick={() => setIsDrapeOpen(true)}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition-colors"
            >
              <Sparkles size={13} />
              <span>How to Drape Dhoti &amp; Saree</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN STICKY NAVIGATION HEADER ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200'
            : isRamyyam
            ? 'bg-[#fff8f9] shadow-sm border-b border-rose-100'
            : 'bg-[#f7faf7] shadow-sm border-b border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isRamyyam
                    ? 'bg-gradient-to-br from-rose-800 to-rose-950 ring-2 ring-rose-300'
                    : 'bg-gradient-to-br from-[#1d4d2d] to-[#12281a] ring-2 ring-amber-300'
                }`}
              >
                <span className="text-white font-black text-xl tracking-tight">
                  {isRamyyam ? 'RY' : 'R'}
                </span>
              </div>
              <div className="leading-none text-left">
                {isRamyyam ? (
                  <>
                    <p className="font-black text-rose-950 text-[1.6rem] tracking-[0.08em]">RAMYYAM</p>
                    <p className="text-rose-700 text-[9px] font-bold tracking-[0.2em] uppercase">
                      From House of Ramraj
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-black text-stone-900 text-[1.65rem] tracking-[0.06em]">RAMRAJ</p>
                    <p className="text-[#2d6a3d] text-[10px] font-bold tracking-[0.22em] uppercase">
                      Cotton • Since 1983
                    </p>
                  </>
                )}
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-3.5 py-2 text-stone-700 hover:text-[#1d4d2d] font-bold text-sm rounded-lg transition-colors"
              >
                Home
              </Link>

              {/* Ramraj Men Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsMenMenuOpen(true)}
                onMouseLeave={() => setIsMenMenuOpen(false)}
              >
                <button
                  onClick={() => setIsMenMenuOpen(!isMenMenuOpen)}
                  className={`px-3.5 py-2 font-bold text-sm rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isRamraj ? 'text-[#1d4d2d] bg-[#edf5ee]' : 'text-stone-700 hover:text-[#1d4d2d]'
                  }`}
                >
                  <span>Ramraj Men</span>
                  <ChevronDown size={14} className={`transition-transform ${isMenMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMenMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 py-3 z-50 animate-fadeIn">
                    <div className="px-4 pb-2 mb-2 border-b border-stone-100">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1d4d2d]">
                        Ramraj Cotton Men &amp; Boys
                      </p>
                    </div>
                    {ramrajCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        onClick={() => setIsMenMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-stone-50 transition-colors group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-stone-800 group-hover:text-[#1d4d2d]">{cat.label}</p>
                            {cat.badge && (
                              <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-400 line-clamp-1">{cat.description}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-stone-100 px-4">
                      <Link
                        href="/products?brand=ramraj"
                        onClick={() => setIsMenMenuOpen(false)}
                        className="text-xs font-bold text-[#1d4d2d] hover:underline"
                      >
                        View all Men&apos;s collections →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Ramyyam Women Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsWomenMenuOpen(true)}
                onMouseLeave={() => setIsWomenMenuOpen(false)}
              >
                <button
                  onClick={() => setIsWomenMenuOpen(!isWomenMenuOpen)}
                  className={`px-3.5 py-2 font-bold text-sm rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isRamyyam ? 'text-rose-800 bg-rose-50' : 'text-stone-700 hover:text-rose-800'
                  }`}
                >
                  <span className="text-rose-700">🌸 Ramyyam Women</span>
                  <ChevronDown size={14} className={`transition-transform ${isWomenMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isWomenMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-rose-200 py-3 z-50 animate-fadeIn">
                    <div className="px-4 pb-2 mb-2 border-b border-rose-100">
                      <p className="text-[10px] font-black uppercase tracking-wider text-rose-800">
                        Ramyyam Ethnic &amp; Handlooms
                      </p>
                    </div>
                    {ramyyamCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        onClick={() => setIsWomenMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-rose-50/50 transition-colors group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-stone-800 group-hover:text-rose-800">{cat.label}</p>
                            {cat.badge && (
                              <span className="text-[9px] font-black bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-400 line-clamp-1">{cat.description}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-rose-100 px-4">
                      <Link
                        href="/products?brand=ramyyam"
                        onClick={() => setIsWomenMenuOpen(false)}
                        className="text-xs font-bold text-rose-800 hover:underline"
                      >
                        View all Ramyyam Sarees &amp; Kurtis →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/products?category=dhotis"
                className="px-3 py-2 text-stone-700 hover:text-[#1d4d2d] font-bold text-sm rounded-lg transition-colors"
              >
                Dhotis
              </Link>
              <Link
                href="/products?category=sarees"
                className="px-3 py-2 text-stone-700 hover:text-rose-800 font-bold text-sm rounded-lg transition-colors"
              >
                Sarees
              </Link>
              <Link
                href="/products?category=shirts"
                className="px-3 py-2 text-stone-700 hover:text-[#1d4d2d] font-bold text-sm rounded-lg transition-colors"
              >
                Shirts
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-stone-700 hover:text-[#1d4d2d] font-bold text-sm rounded-lg transition-colors"
              >
                Heritage
              </Link>
            </nav>

            {/* Actions: Search, Drape Guide, Wishlist, Cart */}
            <div className="flex items-center gap-2.5">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                aria-label="Search catalog"
              >
                <Search size={16} />
                <span className="hidden sm:inline">Search...</span>
              </button>

              {/* Drape Guide button for Mobile */}
              <button
                onClick={() => setIsDrapeOpen(true)}
                className="lg:hidden p-2 text-amber-700 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
                title="Drape Guide"
                aria-label="How to wear dhoti and saree"
              >
                <Sparkles size={20} />
              </button>

              {/* Wishlist */}
              <button
                onClick={openWishlist}
                className="relative p-2.5 text-stone-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-scaleIn">
                    {totalWishlistItems}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="cart-toggle-btn"
                onClick={toggleCart}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md active:scale-95 cursor-pointer ${
                  isRamyyam
                    ? 'bg-rose-900 hover:bg-rose-950 text-white'
                    : 'bg-[#1d4d2d] hover:bg-[#183e27] text-white'
                }`}
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-white/80 uppercase font-semibold">Cart</span>
                  <span className="text-xs font-black">{formatPrice(totalPrice)}</span>
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU DRAWER ── */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white max-h-[85vh] overflow-y-auto px-4 py-6 space-y-6 animate-fadeIn">
            {/* Brand switcher in mobile */}
            <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl">
              <button
                onClick={() => {
                  setSelectedBrand('ramraj');
                  setIsMobileOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  isRamraj ? 'bg-[#1d4d2d] text-white shadow' : 'text-stone-600'
                }`}
              >
                Ramraj Men
              </button>
              <button
                onClick={() => {
                  setSelectedBrand('ramyyam');
                  setIsMobileOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  isRamyyam ? 'bg-rose-900 text-white shadow' : 'text-stone-600'
                }`}
              >
                Ramyyam Women
              </button>
              <button
                onClick={() => {
                  setSelectedBrand('all');
                  setIsMobileOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedBrand === 'all' ? 'bg-stone-900 text-white shadow' : 'text-stone-600'
                }`}
              >
                All
              </button>
            </div>

            {/* Ramraj Categories */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#1d4d2d] mb-3">
                Ramraj Cotton (Men &amp; Boys)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ramrajCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.id}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#edf5ee] border border-stone-200 text-xs font-bold text-stone-800"
                  >
                    <span>{c.icon}</span>
                    <span className="truncate">{c.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ramyyam Categories */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-rose-800 mb-3">
                Ramyyam (Women &amp; Girls)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ramyyamCategories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.id}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50/50 hover:bg-rose-50 border border-rose-200 text-xs font-bold text-stone-800"
                  >
                    <span>{c.icon}</span>
                    <span className="truncate">{c.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick helper links */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                onClick={() => {
                  setIsDrapeOpen(true);
                  setIsMobileOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 text-amber-900 font-bold text-xs"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-600" />
                  <span>Interactive Dhoti &amp; Saree Drape Guide</span>
                </span>
                <span>→</span>
              </button>
              <Link
                href="/stores"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 text-stone-800 font-bold text-xs"
              >
                <span className="flex items-center gap-2">
                  <Building2 size={16} className="text-stone-500" />
                  <span>Find 250+ Showrooms</span>
                </span>
                <span>→</span>
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 text-stone-800 font-bold text-xs"
              >
                <span className="flex items-center gap-2">
                  <Truck size={16} className="text-stone-500" />
                  <span>Track Your Order</span>
                </span>
                <span>→</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 text-stone-800 font-bold text-xs"
              >
                <span>Our Heritage &amp; Weavers Story</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <DrapeGuideModal isOpen={isDrapeOpen} onClose={() => setIsDrapeOpen(false)} />
      <PincodeModal />
      <WishlistDrawer />
    </>
  );
}
