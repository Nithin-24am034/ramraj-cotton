'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/store/currencyStore';
import toast from 'react-hot-toast';

export default function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeFromWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { formatPrice } = useCurrency();

  if (!isOpen) return null;

  const handleMoveToCart = (product: typeof items[0]) => {
    const size = product.sizes[0] || 'Standard';
    const color = product.colors[0] || { name: 'Standard', hex: '#FFFFFF' };
    addItem(product, size, color, 1);
    removeFromWishlist(product.id);
    toast.success(`Moved ${product.name.slice(0, 20)}... to Cart!`);
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-rose-500 fill-rose-500" />
              <h3 className="font-black text-lg text-stone-900">Your Wishlist</h3>
              <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button
              onClick={closeWishlist}
              className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} className="text-stone-300" />
                </div>
                <h4 className="font-bold text-stone-800 text-base mb-1">Your wishlist is empty</h4>
                <p className="text-xs text-stone-500 mb-6">
                  Save your favorite Ramraj dhotis, shirts & Ramyyam sarees to revisit them anytime.
                </p>
                <button
                  onClick={closeWishlist}
                  className="px-6 py-2.5 bg-[#1d4d2d] hover:bg-[#183e27] text-white text-xs font-bold rounded-xl transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-2xl border border-stone-200 hover:border-amber-300 transition-all bg-white shadow-sm"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          product.brand === 'ramraj'
                            ? 'bg-[#edf5ee] text-[#1d4d2d]'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {product.brand === 'ramraj' ? 'Ramraj' : 'Ramyyam'}
                        </span>
                      </div>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={closeWishlist}
                        className="font-bold text-xs text-stone-900 hover:text-amber-700 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs font-black text-stone-900 mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex items-center gap-1.5 text-xs font-bold bg-[#1d4d2d] hover:bg-[#183e27] text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-stone-400 hover:text-red-600 p-1.5 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50">
              <Link
                href="/products"
                onClick={closeWishlist}
                className="w-full flex items-center justify-center gap-2 py-3 border border-stone-300 hover:bg-stone-100 rounded-xl text-xs font-bold text-stone-700 transition-colors"
              >
                Continue Shopping <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
