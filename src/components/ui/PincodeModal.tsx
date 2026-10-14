'use client';

import { useState } from 'react';
import { X, MapPin, Truck, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePincode, PincodeInfo } from '@/store/pincodeStore';

export default function PincodeModal() {
  const { isModalOpen, closePincodeModal, checkPincode, savePincode, savedPincode, pincodeInfo } = usePincode();
  const [inputPin, setInputPin] = useState(savedPincode || '');
  const [result, setResult] = useState<PincodeInfo | null>(pincodeInfo);
  const [error, setError] = useState<string | null>(null);

  if (!isModalOpen) return null;

  const handleCheck = () => {
    if (inputPin.trim().length !== 6) {
      setError('Please enter a valid 6-digit Indian Pincode');
      return;
    }
    setError(null);
    const info = checkPincode(inputPin);
    if (info) {
      setResult(info);
      savePincode(inputPin);
    } else {
      setError('Unable to verify delivery to this pincode. Please contact customer care.');
    }
  };

  const quickPincodes = [
    { city: 'Chennai', pin: '600001' },
    { city: 'Coimbatore', pin: '641001' },
    { city: 'Tirupur (HQ)', pin: '641659' },
    { city: 'Madurai', pin: '625001' },
    { city: 'Bengaluru', pin: '560001' },
    { city: 'Kochi', pin: '682001' },
    { city: 'Hyderabad', pin: '500001' },
    { city: 'Mumbai', pin: '400001' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#1d4d2d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MapPin size={20} className="text-[#a9d3ae]" />
            </div>
            <div>
              <h3 className="font-black text-lg">Check Delivery & COD</h3>
              <p className="text-xs text-[#d1e7d4]">Direct dispatch from Ramraj Mills, Tirupur</p>
            </div>
          </div>
          <button
            onClick={closePincodeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
              Enter 6-Digit Delivery Pincode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inputPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setInputPin(val);
                  setError(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                placeholder="e.g. 600001"
                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl font-mono text-base font-bold text-stone-800 focus:outline-none focus:border-[#1d4d2d] focus:ring-2 focus:ring-[#1d4d2d]/20"
              />
              <button
                onClick={handleCheck}
                className="px-5 py-3 bg-[#1d4d2d] hover:bg-[#183e27] text-white font-bold text-sm rounded-xl transition-all"
              >
                Check
              </button>
            </div>
            {error && <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>}
          </div>

          {/* Quick city chips */}
          <div>
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Quick Select</p>
            <div className="flex flex-wrap gap-1.5">
              {quickPincodes.map(({ city, pin }) => (
                <button
                  key={pin}
                  onClick={() => {
                    setInputPin(pin);
                    const info = checkPincode(pin);
                    if (info) {
                      setResult(info);
                      savePincode(pin);
                    }
                  }}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-[#edf5ee] hover:text-[#1d4d2d] text-stone-600 rounded-lg text-xs font-medium transition-colors"
                >
                  {city} ({pin})
                </button>
              ))}
            </div>
          </div>

          {/* Results display */}
          {result && (
            <div className="p-4 bg-[#edf5ee] border border-[#a9d3ae] rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-stone-900 text-sm">{result.city}, {result.state}</p>
                  <p className="font-mono text-xs text-stone-500">Pincode: {result.pincode}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
              </div>

              <div className="border-t border-[#a9d3ae]/50 pt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <Truck size={15} className="text-[#1d4d2d] shrink-0" />
                  <span>Estimated Delivery: <strong className="text-[#1d4d2d]">{result.deliveryDays}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                  <span>Cash on Delivery: <strong className="text-emerald-700">Available</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                  <span>Courier Partner: {result.courier} • Free delivery on orders above ₹799</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center">
          <span className="text-xs text-stone-500">Saved to session automatically</span>
          <button
            onClick={closePincodeModal}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
