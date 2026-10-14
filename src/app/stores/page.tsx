'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Search, Navigation, CheckCircle2, Building2 } from 'lucide-react';
import { StoreLocation } from '@/types';

const STORE_DATA: StoreLocation[] = [
  // Chennai
  {
    id: 'store-chn-01',
    name: 'Ramraj & Ramyyam Flagship Megastore – T. Nagar',
    brand: 'both',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'No. 34, Usman Road, Opp. Panagal Park, T. Nagar',
    landmark: 'Near Panagal Park',
    phone: '+91 44 2434 2444',
    timings: '9:30 AM – 9:30 PM (All 7 Days)',
    hasParking: true,
    isFlagship: true,
  },
  {
    id: 'store-chn-02',
    name: 'Ramraj Cotton & Ramyyam – Anna Nagar',
    brand: 'both',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '2nd Avenue, Near Roundana, Anna Nagar West',
    landmark: 'Opposite Anna Arch',
    phone: '+91 44 2621 1888',
    timings: '9:30 AM – 9:00 PM',
    hasParking: true,
    isFlagship: false,
  },
  {
    id: 'store-chn-03',
    name: 'Ramyyam Exclusive Saree Boutique – Mylapore',
    brand: 'ramyyam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'Luz Church Road, Near Kapaleeshwarar Temple, Mylapore',
    landmark: 'Near Luz Corner',
    phone: '+91 44 2498 3333',
    timings: '9:00 AM – 9:00 PM',
    hasParking: false,
    isFlagship: true,
  },

  // Coimbatore & Tirupur
  {
    id: 'store-cbe-01',
    name: 'Ramraj Cotton World Heritage Flagship – Cross Cut Road',
    brand: 'both',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    address: 'Cross Cut Road, Gandhipuram, Coimbatore – 641012',
    landmark: 'Near Power House Signal',
    phone: '+91 422 249 8000',
    timings: '9:00 AM – 9:30 PM',
    hasParking: true,
    isFlagship: true,
  },
  {
    id: 'store-tpr-01',
    name: 'Ramraj Mill Corporate Experience Center – Tirupur',
    brand: 'both',
    city: 'Tirupur',
    state: 'Tamil Nadu',
    address: 'Ramraj Cotton Mills Campus, Karumathampatti – 641659',
    landmark: 'National Highway 544',
    phone: '+91 422 240 0000',
    timings: '9:00 AM – 8:30 PM',
    hasParking: true,
    isFlagship: true,
  },

  // Madurai & Trichy
  {
    id: 'store-mdu-01',
    name: 'Ramraj Cotton & Ramyyam – West Tower Street',
    brand: 'both',
    city: 'Madurai',
    state: 'Tamil Nadu',
    address: 'Near Meenakshi Amman Temple West Gate, Madurai – 625001',
    landmark: 'West Gopuram Entrance',
    phone: '+91 452 234 5678',
    timings: '8:30 AM – 9:30 PM',
    hasParking: false,
    isFlagship: true,
  },
  {
    id: 'store-try-01',
    name: 'Ramraj Cotton – Thillai Nagar',
    brand: 'ramraj',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    address: 'Main Road, 10th Cross, Thillai Nagar, Trichy – 620018',
    landmark: 'Near Shastri Road',
    phone: '+91 431 274 1234',
    timings: '9:30 AM – 9:00 PM',
    hasParking: true,
    isFlagship: false,
  },

  // Bengaluru
  {
    id: 'store-blr-01',
    name: 'Ramraj Cotton & Ramyyam – Jayanagar 4th Block',
    brand: 'both',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '11th Main, 4th Block, Jayanagar, Bengaluru – 560011',
    landmark: 'Opposite Jayanagar Complex',
    phone: '+91 80 2663 9999',
    timings: '10:00 AM – 9:00 PM',
    hasParking: true,
    isFlagship: true,
  },
  {
    id: 'store-blr-02',
    name: 'Ramraj Cotton – Malleshwaram 8th Cross',
    brand: 'ramraj',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Sampige Road, 8th Cross, Malleshwaram, Bengaluru – 560003',
    landmark: 'Near CTR',
    phone: '+91 80 2346 5555',
    timings: '10:00 AM – 9:00 PM',
    hasParking: false,
    isFlagship: false,
  },

  // Kerala
  {
    id: 'store-koc-01',
    name: 'Ramraj Cotton & Ramyyam – MG Road, Kochi',
    brand: 'both',
    city: 'Kochi',
    state: 'Kerala',
    address: 'Mahatma Gandhi Road, Near Shenoys Theatre, Kochi – 682035',
    landmark: 'Shenoys Junction',
    phone: '+91 484 238 2222',
    timings: '9:30 AM – 8:30 PM',
    hasParking: true,
    isFlagship: true,
  },

  // Hyderabad
  {
    id: 'store-hyd-01',
    name: 'Ramraj Cotton & Ramyyam – Dilsukhnagar',
    brand: 'both',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Main Road, Opp. Konark Theatre, Dilsukhnagar, Hyderabad – 500060',
    landmark: 'Near Dilsukhnagar Metro Station',
    phone: '+91 40 2405 8888',
    timings: '10:00 AM – 9:30 PM',
    hasParking: true,
    isFlagship: true,
  },
];

export default function StoreLocatorPage() {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [brandFilter, setBrandFilter] = useState<'all' | 'ramraj' | 'ramyyam'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const cities = ['All', 'Chennai', 'Coimbatore', 'Tirupur', 'Madurai', 'Tiruchirappalli', 'Bengaluru', 'Kochi', 'Hyderabad'];

  const filtered = STORE_DATA.filter((st) => {
    if (selectedCity !== 'All' && st.city !== selectedCity) return false;
    if (brandFilter === 'ramraj' && st.brand === 'ramyyam') return false;
    if (brandFilter === 'ramyyam' && st.brand === 'ramraj') return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        st.name.toLowerCase().includes(q) ||
        st.city.toLowerCase().includes(q) ||
        st.address.toLowerCase().includes(q) ||
        st.landmark.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="liquid-glass-dark rounded-3xl p-8 md:p-12 text-white mb-10 shadow-2xl relative overflow-hidden border border-white/20">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 inline-block mb-3">
              250+ Showrooms Across India
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-2 mb-3">Find a Ramraj &amp; Ramyyam Showroom</h1>
            <p className="text-sm md:text-base text-stone-200 leading-relaxed font-light">
              Experience the pure touch of authentic South Indian handlooms in person. Visit our state-of-the-art showrooms for custom fitting, bridal consultations, and our complete collections.
            </p>
          </div>
          <Building2 size={240} className="absolute -bottom-12 -right-8 text-white/5 pointer-events-none" />
        </div>

        {/* Filter Controls */}
        <div className="liquid-glass rounded-3xl p-4 sm:p-6 shadow-xl mb-8 space-y-4 backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by area, landmark or street..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 text-sm focus:outline-none focus:border-[#1d4d2d] bg-white/80 backdrop-blur-md shadow-inner"
              />
            </div>

            {/* Brand Toggle */}
            <div className="flex gap-1.5 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 w-full sm:w-auto shadow-inner">
              {[
                { id: 'all', label: 'All Showrooms' },
                { id: 'ramraj', label: 'Ramraj Cotton' },
                { id: 'ramyyam', label: 'Ramyyam Women' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setBrandFilter(tab.id as typeof brandFilter)}
                  className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    brandFilter === tab.id
                      ? 'liquid-glass-btn text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* City chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCity === city
                    ? 'liquid-glass-btn text-white shadow-sm'
                    : 'liquid-glass-pill text-stone-600 hover:text-stone-900'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((store) => (
            <div
              key={store.id}
              className="liquid-glass-card rounded-3xl p-6 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full backdrop-blur-md border ${
                    store.brand === 'ramyyam'
                      ? 'bg-rose-100/80 text-rose-800 border-rose-200'
                      : store.brand === 'ramraj'
                      ? 'bg-[#edf5ee]/80 text-[#1d4d2d] border-emerald-200'
                      : 'bg-amber-100/80 text-amber-900 border-amber-200'
                  }`}>
                    {store.brand === 'both' ? 'Ramraj & Ramyyam' : store.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam Exclusive'}
                  </span>
                  {store.isFlagship && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-200 shadow-sm">
                      ★ Flagship
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-stone-900 mb-2 leading-snug">{store.name}</h3>

                <div className="space-y-2 text-xs text-stone-600 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#1d4d2d] shrink-0 mt-0.5" />
                    <span>{store.address} (Landmark: {store.landmark})</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-amber-600 shrink-0" />
                    <a href={`tel:${store.phone}`} className="hover:text-amber-700 font-medium">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-stone-400 shrink-0" />
                    <span>{store.timings}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                  {store.hasParking ? <CheckCircle2 size={13} className="text-emerald-600" /> : null}
                  {store.hasParking ? 'Customer Parking Available' : 'Valet on Request'}
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 liquid-glass-pill hover:bg-[#1d4d2d] hover:text-white text-stone-700 text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  <Navigation size={13} /> Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 liquid-glass rounded-3xl shadow-xl">
            <Building2 size={40} className="mx-auto text-stone-400 mb-3" />
            <h3 className="font-bold text-stone-700 text-base">No showrooms found in this search</h3>
            <p className="text-xs text-stone-400 mt-1">Try selecting a different city or clearing the search filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
