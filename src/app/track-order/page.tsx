'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { OrderTrackResult } from '@/types';

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [trackingData, setTrackingData] = useState<OrderTrackResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = () => {
    if (!orderQuery.trim()) return;
    setSearched(true);

    const q = orderQuery.trim().toUpperCase();
    // Generate realistic simulated status
    setTrackingData({
      orderId: q.startsWith('#') ? q : `#${q}`,
      estimatedDelivery: 'Tomorrow, by 4:00 PM',
      currentStatus: 'Out for Delivery',
      courier: 'BlueDart Express Handloom Special',
      trackingNumber: `BD-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      steps: [
        {
          status: 'Order Placed & Confirmed',
          date: '12 Oct 2026, 10:30 AM',
          location: 'Ramraj Online Hub, Tirupur',
          completed: true,
          description: 'Payment verified. Items assigned to Tirupur central dispatch.',
        },
        {
          status: 'Loom-Fresh Quality Inspection & Packed',
          date: '12 Oct 2026, 03:15 PM',
          location: 'Karumathampatti Weaving Facility, TN',
          completed: true,
          description: '100% pure combed cotton purity certificate and aroma seal applied.',
        },
        {
          status: 'Dispatched via Courier Hub',
          date: '13 Oct 2026, 08:45 AM',
          location: 'BlueDart Air Express Cargo, Coimbatore',
          completed: true,
          description: 'In transit to destination city sorting center.',
        },
        {
          status: 'Arrived at Local Delivery Hub',
          date: '14 Oct 2026, 06:20 AM',
          location: 'Regional Delivery Center',
          completed: true,
          description: 'Package scanned and sorted into courier van.',
        },
        {
          status: 'Out for Delivery',
          date: '14 Oct 2026, 09:15 AM',
          location: 'Your Area Delivery Executive',
          completed: true,
          description: 'Delivery Executive: Ramesh K. (+91 98400 12345). OTP required at handover.',
        },
        {
          status: 'Delivered',
          date: 'Estimated 14 Oct 2026, 04:00 PM',
          location: 'Recipient Address',
          completed: false,
          description: 'Package will be handed over with physical bill and guarantee card.',
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1d4d2d] bg-[#edf5ee] px-3.5 py-1.5 rounded-full inline-block mb-3">
            Real-time Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-3">Track Your Ramraj Order</h1>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Enter your Order ID (e.g. #RMJ-10842 or 10842) or 10-digit registered mobile number to see live transit updates.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Package size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. RMJ-84291) or Phone..."
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                className="w-full pl-12 pr-4 py-3.5 border border-stone-300 rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#1d4d2d] focus:ring-2 focus:ring-[#1d4d2d]/20"
              />
            </div>
            <button
              onClick={handleTrack}
              className="px-8 py-3.5 bg-[#1d4d2d] hover:bg-[#183e27] text-white font-bold text-sm rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Search size={18} /> Track Package
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
            <span>Try demo order:</span>
            <button
              onClick={() => {
                setOrderQuery('RMJ-89421');
              }}
              className="font-mono text-amber-700 hover:underline font-bold"
            >
              #RMJ-89421
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Shipment Details</span>
                <h3 className="font-mono font-black text-xl text-stone-900 mt-0.5">{trackingData.orderId}</h3>
                <p className="text-xs text-stone-500 mt-1">
                  AWB Number: <strong className="font-mono text-stone-700">{trackingData.trackingNumber}</strong>
                </p>
              </div>
              <div className="sm:text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Estimated Delivery</span>
                <p className="font-black text-lg text-emerald-700 mt-0.5">{trackingData.estimatedDelivery}</p>
                <p className="text-xs text-stone-500 mt-1">{trackingData.courier}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 space-y-6">
              {trackingData.steps.map((step, idx) => (
                <div key={step.status} className="flex gap-4 relative">
                  {/* Vertical bar */}
                  {idx < trackingData.steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                        step.completed ? 'bg-emerald-500' : 'bg-stone-200'
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      step.completed
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-400 border border-stone-300'
                    }`}
                  >
                    {step.completed ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                  </div>

                  {/* Step info */}
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4
                        className={`text-sm font-bold ${
                          step.completed ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {step.status}
                      </h4>
                      <span className="text-[11px] font-mono text-stone-400">{step.date}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{step.description}</p>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-1">
                      <MapPin size={11} /> {step.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#edf5ee] rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-[#1d4d2d]" />
                <div>
                  <p className="text-xs font-bold text-stone-900">100% Genuine Ramraj Guarantee</p>
                  <p className="text-[11px] text-stone-500">Every parcel includes official authenticity tag & exchange slip</p>
                </div>
              </div>
              <Link href="/products" className="text-xs font-bold text-[#1d4d2d] hover:underline flex items-center gap-1">
                Shop More <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {searched && !trackingData && (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-600 font-bold">No active shipment found with this ID</p>
            <p className="text-xs text-stone-400 mt-1">Please verify your order confirmation SMS or email receipt.</p>
          </div>
        )}
      </div>
    </div>
  );
}
