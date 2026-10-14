'use client';

import { useState } from 'react';
import { MessageCircle, X, ShoppingBag, Truck, HelpCircle, PhoneCall } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = '919489900000'; // Official Ramraj customer support line

  const options = [
    {
      title: 'Order Tracking & Delivery',
      msg: 'Hello Ramraj Cotton Support, I would like to check the delivery status of my recent order.',
      icon: Truck,
    },
    {
      title: 'Dhoti / Saree Sizing Help',
      msg: 'Hello, I need help choosing the right Dhoti / Saree size and border type.',
      icon: HelpCircle,
    },
    {
      title: 'Wedding & Bulk Purchases',
      msg: 'Namaste, I am interested in bulk wedding orders for Dhotis, Silk Sets and Sarees.',
      icon: ShoppingBag,
    },
  ];

  const handleOpenChat = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Dropup popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-fadeIn">
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Ramraj & Ramyyam Help</h4>
                <p className="text-[10px] text-emerald-100">Typically replies in 5 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-2">
            <p className="text-xs text-stone-600 mb-3">How can our handloom specialists assist you today?</p>
            {options.map((opt) => (
              <button
                key={opt.title}
                onClick={() => handleOpenChat(opt.msg)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 text-xs font-semibold transition-all border border-stone-200"
              >
                <opt.icon size={16} className="text-emerald-600 shrink-0" />
                <span className="flex-1">{opt.title}</span>
              </button>
            ))}

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <PhoneCall size={12} /> Toll Free: 1800 425 2444
              </span>
              <span>Mon-Sat 9AM-8PM</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill / Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Help</span>
      </button>
    </div>
  );
}
