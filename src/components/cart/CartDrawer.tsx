'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/store/currencyStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();
  const { formatPrice } = useCurrency();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const freeShippingThreshold = 799;
  const isFreeShipping = totalPrice >= freeShippingThreshold;

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-[#1d4d2d] text-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-amber-400" size={22} />
            <h2 className="font-black text-lg tracking-wide">Your Shopping Bag</h2>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#edf5ee] border-b border-[#a9d3ae]/40 text-xs text-stone-700">
            <div className="flex items-center justify-between mb-1.5 font-bold">
              <span className="flex items-center gap-1.5 text-[#1d4d2d]">
                <Truck size={14} />
                {isFreeShipping ? '🎉 You unlocked FREE Shipping!' : `Add ${formatPrice(freeShippingThreshold - totalPrice)} more for Free Shipping`}
              </span>
              <span className="text-[10px] text-stone-400">Min. ₹799</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1d4d2d] h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart items or empty state */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center">
                <ShoppingCart size={36} className="text-stone-300" />
              </div>
              <div>
                <p className="font-bold text-stone-800 text-base mb-1">Your cart is currently empty</p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover pure cotton dhotis, wedding silk sets, and authentic Ramyyam sarees.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-[#1d4d2d] hover:bg-[#183e27] text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100" role="list">
              {items.map((item) => {
                const key = `${item.product.id}_${item.selectedSize}_${item.selectedColor.name}`;
                return (
                  <li key={key} className="py-4 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                              item.product.brand === 'ramraj'
                                ? 'bg-[#edf5ee] text-[#1d4d2d]'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {item.product.brand === 'ramraj' ? 'Ramraj' : 'Ramyyam'}
                          </span>
                        </div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="text-xs font-bold text-stone-900 hover:text-amber-800 line-clamp-2 leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex gap-2 mt-1 flex-wrap text-[11px] text-stone-500">
                          <span className="font-semibold bg-stone-100 px-2 py-0.5 rounded">
                            {item.selectedSize}
                          </span>
                          <span className="font-semibold bg-stone-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-stone-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                        <p className="font-black text-stone-950 mt-1.5 text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-200 bg-stone-50 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-black text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedSize, item.selectedColor.name)
                          }
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 p-6 space-y-4 bg-stone-50">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-stone-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Shipping</span>
                <span className={`font-bold ${isFreeShipping ? 'text-emerald-700' : 'text-stone-900'}`}>
                  {isFreeShipping ? 'FREE' : formatPrice(49)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-stone-950 pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="text-[#1d4d2d]">
                  {formatPrice(totalPrice + (isFreeShipping ? 0 : 49))}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 bg-[#1d4d2d] hover:bg-[#183e27] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full py-2.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center"
              >
                View Full Cart &amp; Apply Coupons
              </Link>
            </div>

            <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Direct Mill Quality Guarantee • 100% Cotton</span>
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
