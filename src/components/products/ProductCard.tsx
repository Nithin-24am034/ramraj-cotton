'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Heart, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCurrency } from '@/store/currencyStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'White', hex: '#FFFFFF' });
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { formatPrice } = useCurrency();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes[0] || 'Standard';
    addItem(product, size, selectedColor, 1);
    toast.success(`Added ${product.name.slice(0, 24)}... to Cart! 🛍️`);
    openCart();
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group liquid-glass-card rounded-3xl overflow-hidden flex flex-col justify-between relative border border-white/70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none">
            {/* Brand Pill */}
            <span
              className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-md border ${
                product.brand === 'ramraj'
                  ? 'bg-[#1d4d2d]/90 text-white border-emerald-400/30'
                  : 'bg-rose-950/90 text-rose-100 border-rose-400/30'
              }`}
            >
              {product.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam'}
            </span>

            {/* Discount Badge */}
            {product.discount && product.discount > 0 && (
              <span className="text-[10px] font-black bg-amber-400/95 backdrop-blur-md text-stone-950 px-2 py-0.5 rounded-full shadow-sm border border-amber-300">
                {product.discount}% OFF
              </span>
            )}

            {/* Special Feature / Innovation Pill */}
            {product.specialFeature && (
              <span className="hidden sm:inline text-[9px] font-bold liquid-glass-pill text-stone-900 px-2.5 py-0.5 rounded-full">
                ★ {product.specialFeature.split(' ')[0]}
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleToggleFav}
            aria-label="Save to Wishlist"
            className="liquid-glass-pill absolute top-3 right-3 w-8 h-8 rounded-full text-stone-600 hover:text-rose-600 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
          >
            <Heart
              size={16}
              className={isFavorited ? 'text-rose-600 fill-rose-600' : 'text-stone-600'}
            />
          </button>

          {/* Quick Add Overlay on hover */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer backdrop-blur-md ${
                product.brand === 'ramraj' ? 'liquid-glass-btn' : 'liquid-glass-btn-rose'
              }`}
            >
              <ShoppingBag size={14} />
              <span>Quick Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Purity certification badge */}
          {product.purityBadge && (
            <p className="text-[10px] font-bold text-amber-800 tracking-wide uppercase mb-1 flex items-center gap-1">
              <Sparkles size={11} className="text-amber-600" />
              <span>{product.purityBadge}</span>
            </p>
          )}

          {/* Product Name */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-amber-800 transition-colors">
            <h3 className="font-bold text-sm text-stone-900 leading-snug line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Ratings & reviews */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star size={11} className="text-amber-600 fill-amber-600" />
              <span className="text-[11px] font-black text-amber-900">{product.rating}</span>
            </div>
            <span className="text-[11px] text-stone-400">({product.reviewCount.toLocaleString('en-IN')})</span>
          </div>

          {/* Colors palette */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor.name === c.name
                      ? 'ring-2 ring-amber-500 scale-110 border-white'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-stone-400 ml-1">{product.colors.length} colors</span>
            </div>
          )}
        </div>
      </div>

      {/* Price & Action */}
      <div className="px-4 pb-4 pt-1 flex items-baseline justify-between border-t border-stone-100 mt-1">
        <div>
          <span className="text-base font-black text-stone-950">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-stone-400 line-through ml-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.borderType && (
          <span className="text-[10px] font-semibold text-stone-500 capitalize">
            {product.borderType.replace('-', ' ')}
          </span>
        )}
      </div>
    </div>
  );
}
