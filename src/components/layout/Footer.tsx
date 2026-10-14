import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Sparkles, Building2, Truck, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      {/* Handloom & Purity Pledge Bar */}
      <div className="bg-[#12281a] border-b border-stone-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="font-bold text-white text-xs">100% Pure Combed Cotton</p>
                <p className="text-[11px] text-stone-400">Certified by Indian Textile Committee</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Government Silk Mark</p>
                <p className="text-[11px] text-stone-400">Pure Mulberry Silk in Kalyan Collections</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Building2 size={22} />
              </div>
              <div>
                <p className="font-bold text-white text-xs">250+ Exclusive Showrooms</p>
                <p className="text-[11px] text-stone-400">Across Tamil Nadu, Karnataka, Kerala &amp; AP</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Truck size={22} />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Free Shipping &gt; ₹799</p>
                <p className="text-[11px] text-stone-400">Direct Express Delivery Pan-India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col 1 */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="relative h-14 w-44 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-md border border-white/20">
                <Image
                  src="/images/ramraj-logo.jpg"
                  alt="Ramraj Cotton Original Logo"
                  fill
                  className="object-contain p-1"
                  sizes="180px"
                />
              </div>
              <div className="relative h-12 w-32 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-white/20">
                <Image
                  src="/images/ramyyam-logo.jpg"
                  alt="Ramyyam Original Logo"
                  fill
                  className="object-contain p-1"
                  sizes="130px"
                />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-stone-400 mb-5 max-w-sm">
              Founded in 1983 by Padma Shri K.R. Nagarajan in Avinashi, Tirupur. Today, Ramraj Cotton &amp; Ramyyam sustain over 50,000 handloom weaver families, bringing pure combed cotton dhotis, shirts, and royal silk sarees to homes across the globe.
            </p>
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-xs text-stone-400 space-y-1 shadow-inner">
              <p className="text-white font-bold">Toll-Free Customer Care:</p>
              <p className="text-amber-400 font-bold text-sm">1800 425 2444 / +91 94899 00000</p>
              <p className="text-[11px] text-stone-400">Mon to Sat • 9:00 AM to 8:00 PM IST</p>
            </div>
          </div>

          {/* Ramraj Cotton (Men) */}
          <div>
            <h4 className="font-black text-white text-xs uppercase tracking-wider mb-4 text-[#a9d3ae]">
              Ramraj Cotton (Men)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=dhotis" className="text-stone-400 hover:text-white transition-colors">
                  Ottiko Kattiko™ (Velcro Dhoti)
                </Link>
              </li>
              <li>
                <Link href="/products?category=dhotis" className="text-stone-400 hover:text-white transition-colors">
                  PANCHAA™ 8-Mulam Double Dhoti
                </Link>
              </li>
              <li>
                <Link href="/products?category=veshti" className="text-stone-400 hover:text-white transition-colors">
                  Kalyan Pattu Panchakacham
                </Link>
              </li>
              <li>
                <Link href="/products?category=dhotis" className="text-stone-400 hover:text-white transition-colors">
                  Subhamangala Sandalwood Dhoti
                </Link>
              </li>
              <li>
                <Link href="/products?category=shirts" className="text-stone-400 hover:text-white transition-colors">
                  100% Combed Cotton White Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=shirts" className="text-stone-400 hover:text-white transition-colors">
                  Pure European Linen Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=innerwear" className="text-stone-400 hover:text-white transition-colors">
                  Classic Ribbed Cotton Vests
                </Link>
              </li>
              <li>
                <Link href="/products?category=kids" className="text-stone-400 hover:text-white transition-colors">
                  Little Stars Boys Ethnic Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Ramyyam (Women) */}
          <div>
            <h4 className="font-black text-white text-xs uppercase tracking-wider mb-4 text-rose-300">
              Ramyyam (Women)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=sarees" className="text-stone-400 hover:text-white transition-colors">
                  Kerala Kasavu 24K Gold Sarees
                </Link>
              </li>
              <li>
                <Link href="/products?category=sarees" className="text-stone-400 hover:text-white transition-colors">
                  Kanchipuram Soft Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/products?category=sarees" className="text-stone-400 hover:text-white transition-colors">
                  Chettinad Handloom Cotton Sarees
                </Link>
              </li>
              <li>
                <Link href="/products?category=kurtis" className="text-stone-400 hover:text-white transition-colors">
                  Pure Cotton Anarkali Sets
                </Link>
              </li>
              <li>
                <Link href="/products?category=women-innerwear" className="text-stone-400 hover:text-white transition-colors">
                  Combed Cotton Camisole Slips
                </Link>
              </li>
              <li>
                <Link href="/products?category=women-nightwear" className="text-stone-400 hover:text-white transition-colors">
                  Floral Cotton Maxi Nighties
                </Link>
              </li>
              <li>
                <Link href="/products?category=girls" className="text-stone-400 hover:text-white transition-colors">
                  Girls Traditional Pattu Pavadai
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Showrooms */}
          <div>
            <h4 className="font-black text-white text-xs uppercase tracking-wider mb-4 text-amber-400">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/stores" className="text-stone-400 hover:text-white transition-colors">
                  Find 250+ Showrooms
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-stone-400 hover:text-white transition-colors">
                  Track Your Order Online
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-400 hover:text-white transition-colors">
                  Our 1983 Heritage Story
                </Link>
              </li>
              <li>
                <span className="text-stone-400">Dhoti Sizing (4 vs 8 Mulam)</span>
              </li>
              <li>
                <span className="text-stone-400">Wash Care &amp; Zari Maintenance</span>
              </li>
              <li>
                <span className="text-stone-400">International NRI Shipping</span>
              </li>
              <li>
                <span className="text-stone-400">Bulk &amp; Wedding Enquiries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Address */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-amber-500 shrink-0" />
            <span>
              Ramraj Cotton Corporate Complex, 7/8, Avinashi Road, Karumathampatti, Coimbatore – 641659, Tamil Nadu, India.
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['100% Pure Cotton', 'Silk Mark Certified', 'Handloom Mark', 'RuPay / UPI', 'Visa / Mastercard', 'Cash on Delivery'].map((m) => (
              <span key={m} className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] text-stone-400">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-900 bg-black/40 py-4 px-4 text-center text-[11px] text-stone-500">
        <p>
          © 2026 Ramraj Cotton &amp; Ramyyam Pvt. Ltd. All rights reserved. Handcrafted with reverence in Tamil Nadu, India.
        </p>
      </div>
    </footer>
  );
}
