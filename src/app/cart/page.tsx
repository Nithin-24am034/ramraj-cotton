'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShoppingCart, Tag, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/store/currencyStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const { formatPrice } = useCurrency();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent?: number; flat?: number } | null>(null);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percent) {
      discountAmount = Math.round((totalPrice * appliedDiscount.percent) / 100);
    } else if (appliedDiscount.flat) {
      discountAmount = Math.min(totalPrice, appliedDiscount.flat);
    }
  }

  const discountedSubtotal = Math.max(0, totalPrice - discountAmount);
  const shipping = discountedSubtotal >= 799 || totalPrice === 0 ? 0 : 49;
  const grandTotal = discountedSubtotal + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'DHOTIWEEK') {
      setAppliedDiscount({ code: 'DHOTIWEEK', percent: 15 });
      toast.success('🎉 Coupon DHOTIWEEK Applied: 15% OFF!');
    } else if (clean === 'RAMRAJ10') {
      setAppliedDiscount({ code: 'RAMRAJ10', percent: 10 });
      toast.success('🎉 Coupon RAMRAJ10 Applied: 10% OFF!');
    } else if (clean === 'RAMYYAM') {
      setAppliedDiscount({ code: 'RAMYYAM', flat: 200 });
      toast.success('🎉 Coupon RAMYYAM Applied: Flat ₹200 OFF!');
    } else {
      toast.error('Invalid coupon code. Try DHOTIWEEK or RAMRAJ10');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm mx-auto py-16 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={44} className="text-stone-300" />
          </div>
          <h1 className="text-2xl font-black text-stone-800 mb-2">Your Cart is Empty</h1>
          <p className="text-stone-500 text-xs leading-relaxed mb-6">
            Explore authentic pure cotton dhotis, wedding silk sets, and traditional Ramyyam sarees.
          </p>
          <Link
            href="/products"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#1d4d2d] hover:bg-[#183e27] text-white font-bold text-sm rounded-xl shadow transition-all"
          >
            <ShoppingBag size={18} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Shopping Bag</h1>
            <p className="text-stone-500 text-xs mt-1">
              You have <strong className="text-stone-800">{totalItems} item{totalItems !== 1 ? 's' : ''}</strong> in your cart
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="px-4 py-2 bg-white border border-stone-300 text-stone-700 hover:text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} /> Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const key = `${item.product.id}_${item.selectedSize}_${item.selectedColor.name}`;
              return (
                <div
                  key={key}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-5"
                >
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            item.product.brand === 'ramraj'
                              ? 'bg-[#edf5ee] text-[#1d4d2d]'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {item.product.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam'}
                        </span>
                      </div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-bold text-stone-900 hover:text-amber-800 transition-colors text-sm sm:text-base line-clamp-2"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        <span className="font-semibold bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-lg border border-stone-200">
                          Size: {item.selectedSize}
                        </span>
                        <span className="font-semibold bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-lg border border-stone-200 flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-stone-300 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100">
                      <div className="flex items-center bg-stone-100 rounded-xl p-1 gap-2 border border-stone-200">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-7 text-center font-black text-xs text-stone-900">
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
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-black text-stone-950 text-base">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedSize, item.selectedColor.name)
                        }
                        className="text-stone-300 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 sticky top-28 space-y-5">
              <h2 className="font-black text-stone-900 text-lg">Order Summary</h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Bag Subtotal ({totalItems} items)</span>
                  <span className="font-bold text-stone-900">{formatPrice(totalPrice)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon ({appliedDiscount.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-emerald-700' : 'text-stone-900'}`}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 rounded-xl p-2.5 border border-amber-200">
                    Add {formatPrice(799 - discountedSubtotal)} more to qualify for FREE Shipping!
                  </p>
                )}

                <div className="flex justify-between text-base font-black text-stone-950 pt-3 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-[#1d4d2d] text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="e.g. DHOTIWEEK"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#1d4d2d]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCouponCode('DHOTIWEEK');
                      setAppliedDiscount({ code: 'DHOTIWEEK', percent: 15 });
                      toast.success('15% OFF applied!');
                    }}
                    className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                  >
                    Apply DHOTIWEEK (15% OFF)
                  </button>
                </div>
              </form>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#1d4d2d] hover:bg-[#183e27] text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={18} />
              </Link>

              <div className="pt-2 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>256-Bit SSL Encrypted &amp; Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
