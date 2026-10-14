'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Smartphone, Package, CheckCircle2, Lock, ChevronRight, Truck, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCurrency } from '@/store/currencyStore';
import { usePincode } from '@/store/pincodeStore';
import { CheckoutForm } from '@/types';
import toast from 'react-hot-toast';

const INDIAN_STATES = [
  'Tamil Nadu', 'Karnataka', 'Kerala', 'Telangana', 'Andhra Pradesh', 'Maharashtra',
  'Delhi NCR', 'Gujarat', 'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Goa',
  'Madhya Pradesh', 'Punjab', 'Haryana', 'Odisha', 'Bihar', 'Assam',
];

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { formatPrice } = useCurrency();
  const { savedPincode, pincodeInfo } = usePincode();

  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 799 || totalPrice === 0 ? 0 : 49;
  const grandTotal = totalPrice + shipping;

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: pincodeInfo?.city || '',
    state: pincodeInfo?.state || 'Tamil Nadu',
    pincode: savedPincode || '',
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const update = (field: keyof CheckoutForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate secure payment gateway transaction
    await new Promise((res) => setTimeout(res, 2200));
    const generatedId = `RMJ-${Date.now().toString().slice(-6)}`;
    setConfirmedOrderId(generatedId);
    setIsProcessing(false);
    setStep(3);
    clearCart();
    toast.success('Order placed successfully! 🎉');
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-white/80 focus:outline-none focus:border-[#1d4d2d] focus:ring-2 focus:ring-[#1d4d2d]/20 transition-all text-sm text-stone-900 bg-white/80 backdrop-blur-md font-medium shadow-inner placeholder:text-stone-400';

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm mx-auto py-16 liquid-glass rounded-3xl p-8 shadow-xl">
          <p className="text-stone-600 text-sm mb-4 font-medium">Your shopping bag is currently empty.</p>
          <Link
            href="/products"
            className="liquid-glass-btn px-6 py-3 text-white font-bold text-xs rounded-xl shadow-lg inline-block"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  // Step 3: Success Screen
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <div className="liquid-glass rounded-3xl shadow-2xl p-8 sm:p-10 text-center max-w-lg w-full" role="main">
          <div className="relative h-14 w-48 mx-auto mb-4">
            <Image
              src="/images/ramraj-logo.jpg"
              alt="Ramraj Cotton Official"
              fill
              className="object-contain"
              sizes="200px"
            />
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-100/80 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
            <CheckCircle2 size={36} className="text-emerald-600" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1d4d2d] bg-[#edf5ee]/90 px-3 py-1 rounded-full inline-block mb-2 border border-emerald-200/50">
            Payment Verified • Dispatch Initiated
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">Order Confirmed! 🎉</h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-1">
            Thank you, <strong>{form.firstName} {form.lastName}</strong>! Your traditional handlooms are being carefully inspected and prepared for dispatch.
          </p>
          <p className="text-stone-500 text-xs mb-6">
            A confirmation receipt and SMS tracking link has been sent to <strong>{form.phone}</strong> &amp; <strong>{form.email}</strong>.
          </p>

          <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-5 mb-6 text-left space-y-3 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
              <span className="text-xs text-stone-500">Order ID:</span>
              <span className="font-mono font-black text-sm text-[#1d4d2d]">#{confirmedOrderId}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
              <span className="text-xs text-stone-500">Delivery Address:</span>
              <span className="text-xs font-bold text-stone-800 text-right truncate max-w-[200px]">
                {form.address}, {form.city} – {form.pincode}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">Estimated Delivery:</span>
              <span className="text-xs font-bold text-emerald-700">2–3 Business Days (Express Air)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/track-order"
              className="w-full py-3.5 liquid-glass-btn text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Truck size={16} /> Track Order Live Status
            </Link>
            <Link
              href="/products"
              className="w-full py-3 liquid-glass-pill hover:bg-white text-stone-800 font-bold text-xs rounded-xl transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="p-2.5 liquid-glass-pill rounded-xl hover:bg-white text-stone-700 transition-colors shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Checkout</h1>
              <p className="text-xs text-stone-600 font-medium">Encrypted payment &amp; direct dispatch from Tirupur Mills</p>
            </div>
          </div>
          <div className="relative h-11 w-40 hidden sm:block">
            <Image
              src="/images/ramraj-logo-header.jpg"
              alt="Ramraj Cotton"
              fill
              className="object-contain object-right"
              sizes="160px"
            />
          </div>
        </div>

        {/* Progress Step Bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['1. Shipping Address', '2. Payment Selection', '3. Order Receipt'] as const).map((label, i) => {
            const stepNum = (i + 1) as Step;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <div key={label} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'liquid-glass-btn text-white shadow-md'
                      : isDone
                      ? 'bg-emerald-600/90 text-white shadow-sm'
                      : 'liquid-glass-pill text-stone-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 size={14} /> : <span>{stepNum}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 2 && <ChevronRight size={14} className="text-stone-300 mx-1.5" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Main Form (3 Cols) */}
          <div className="lg:col-span-3">
            <div className="liquid-glass rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-2xl">
              {/* Step 1: Delivery Information */}
              {step === 1 && (
                <div>
                  <h2 className="font-black text-stone-900 text-base mb-6 flex items-center gap-2">
                    <Package size={18} className="text-[#1d4d2d]" /> Delivery Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        First Name *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Rajesh"
                        value={form.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        Last Name *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Kumar"
                        value={form.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className={inputClass}
                        placeholder="rajesh.kumar@example.com"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        Mobile Number * (For SMS tracking)
                      </label>
                      <input
                        type="tel"
                        className={inputClass}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        Street Address / Apartment / Landmark *
                      </label>
                      <textarea
                        rows={2}
                        className={`${inputClass} resize-none`}
                        placeholder="Door No, Street Name, Near Landmark"
                        value={form.address}
                        onChange={(e) => update('address', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        City *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Chennai"
                        value={form.city}
                        onChange={(e) => update('city', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        6-Digit Pincode *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="600001"
                        maxLength={6}
                        value={form.pincode}
                        onChange={(e) => update('pincode', e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        State *
                      </label>
                      <select
                        className={`${inputClass} cursor-pointer`}
                        value={form.state}
                        onChange={(e) => update('state', e.target.value)}
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!form.firstName || !form.email || !form.phone || !form.address || !form.pincode) {
                        toast.error('Please fill in all mandatory delivery fields.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full py-4 liquid-glass-btn text-white font-bold text-sm rounded-xl shadow-lg mt-8 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="font-black text-stone-900 text-base mb-6 flex items-center gap-2">
                    <CreditCard size={18} className="text-[#1d4d2d]" /> Select Payment Method
                  </h2>

                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'upi', label: 'UPI / QR Code', icon: '📱', desc: 'Google Pay, PhonePe, Paytm, BHIM UPI' },
                      { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, MasterCard, RuPay, Maestro' },
                      { id: 'cod', label: 'Cash on Delivery (COD)', icon: '📦', desc: 'Pay with cash at doorstep upon delivery' },
                    ].map(({ id, label, icon, desc }) => (
                      <label
                        key={id}
                        className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                          form.paymentMethod === id
                            ? 'border-[#1d4d2d] bg-[#edf5ee]/80 shadow-md ring-2 ring-[#1d4d2d]/20 backdrop-blur-md'
                            : 'border-white/80 bg-white/60 hover:bg-white/80 shadow-sm'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={form.paymentMethod === id}
                          onChange={() => update('paymentMethod', id)}
                          className="accent-[#1d4d2d] w-4 h-4"
                        />
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <p className="font-bold text-stone-900 text-xs sm:text-sm">{label}</p>
                          <p className="text-[11px] text-stone-500">{desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {form.paymentMethod === 'upi' && (
                    <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 mb-6 shadow-inner">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        className={inputClass}
                        placeholder="yourname@okhdfcbank"
                        value={form.upiId || ''}
                        onChange={(e) => update('upiId', e.target.value)}
                      />
                    </div>
                  )}

                  {form.paymentMethod === 'card' && (
                    <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 mb-6 space-y-4 shadow-inner">
                      <div>
                        <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                          Card Number
                        </label>
                        <input
                          className={inputClass}
                          placeholder="4532 •••• •••• 8910"
                          maxLength={19}
                          value={form.cardNumber || ''}
                          onChange={(e) => update('cardNumber', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                            Expiry (MM/YY)
                          </label>
                          <input
                            className={inputClass}
                            placeholder="12/28"
                            maxLength={5}
                            value={form.cardExpiry || ''}
                            onChange={(e) => update('cardExpiry', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={3}
                            className={inputClass}
                            placeholder="•••"
                            value={form.cardCvv || ''}
                            onChange={(e) => update('cardCvv', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 liquid-glass-pill hover:bg-white text-stone-700 font-bold text-xs rounded-xl transition-all shadow-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 py-3.5 liquid-glass-btn text-white font-black text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <span>Processing Payment &amp; Generating AWB...</span>
                      ) : (
                        <>
                          <Lock size={15} />
                          <span>Pay {formatPrice(grandTotal)} &amp; Confirm Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary (2 Cols) */}
          <div className="lg:col-span-2">
            <div className="liquid-glass rounded-3xl shadow-xl p-6 sticky top-28 space-y-4 backdrop-blur-2xl">
              <h2 className="font-black text-stone-900 text-base">Order Review ({items.length} items)</h2>

              <ul className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-white/60">
                {items.map((item) => (
                  <li key={`${item.product.id}_${item.selectedSize}`} className="pt-2 flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-white/80 shrink-0 border border-white/80 shadow-sm">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-800 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-stone-500 font-medium">
                        {item.selectedSize} • Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-black text-stone-900 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-stone-200/60 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping Charge</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-emerald-700' : 'text-stone-900'}`}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-stone-950 pt-2 border-t border-stone-200/60">
                  <span>Grand Total</span>
                  <span className="text-[#1d4d2d]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#edf5ee]/70 backdrop-blur-md rounded-2xl border border-white/80 text-[11px] text-stone-700 font-medium flex items-center gap-2 shadow-sm">
                <ShieldCheck size={16} className="text-[#1d4d2d] shrink-0" />
                <span>100% Genuine Handloom Guarantee &amp; Purity Tag Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
