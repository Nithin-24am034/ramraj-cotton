'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { useCurrency } from '@/store/currencyStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      (p.fabric && p.fabric.toLowerCase().includes(q)) ||
      (p.specialFeature && p.specialFeature.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  const trendingSearches = [
    'Ottiko Kattiko Velcro Dhoti',
    'Kerala Kasavu Saree',
    '8 Mulam Panchaa Double Dhoti',
    'Kanchipuram Soft Silk',
    'White Linen Shirt',
    'Subhamangala Sandalwood Dhoti',
    'Little Stars Boys',
    'Anarkali Kurti Set',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="liquid-glass rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col border border-white/80">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/40 flex items-center gap-3 bg-white/60 backdrop-blur-md">
          <Search size={22} className="text-stone-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ramraj dhotis, shirts, Ramyyam sarees, kurtis..."
            className="flex-1 text-base sm:text-lg font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="liquid-glass-pill text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {/* If no query, show trending */}
          {!query && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-amber-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Trending Searches</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-700 text-xs font-medium rounded-xl transition-colors text-left"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && results.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Found {results.length} products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                          product.brand === 'ramraj'
                            ? 'bg-[#edf5ee] text-[#1d4d2d]'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {product.brand === 'ramraj' ? 'Ramraj' : 'Ramyyam'}
                        </span>
                        {product.purityBadge && (
                          <span className="text-[9px] text-amber-700 font-bold truncate">
                            {product.purityBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-stone-800 truncate group-hover:text-amber-700">
                        {product.name}
                      </p>
                      <p className="text-xs font-black text-stone-900 mt-0.5">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query && results.length === 0 && (
            <div className="text-center py-10">
              <Sparkles size={32} className="mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-bold text-stone-700">No matching products found</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for &quot;dhoti&quot;, &quot;saree&quot;, &quot;shirt&quot;, or &quot;kasavu&quot;</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 text-center">
          <Link
            href="/products"
            onClick={onClose}
            className="text-xs font-bold text-[#1d4d2d] hover:text-[#2d6a3d] inline-flex items-center gap-1"
          >
            Explore all Ramraj & Ramyyam collections <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
