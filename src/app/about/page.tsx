import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, HeartHandshake, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Our Heritage & Weavers | Ramraj Cotton & Ramyyam',
  description: 'The journey of Padma Shri K.R. Nagarajan founding Ramraj Cotton in 1983 to preserve and dignify South Indian handloom dhotis and veshtis.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="relative h-16 w-52 mx-auto mb-6 bg-white p-2 rounded-2xl shadow-sm border border-stone-200">
            <Image
              src="/images/ramraj-logo.jpg"
              alt="Ramraj Cotton Original Logo"
              fill
              className="object-contain"
              sizes="220px"
            />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1d4d2d] bg-[#edf5ee] px-4 py-1.5 rounded-full inline-block mb-4">
            Since 1983 • Avinashi, Tirupur
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight mb-6">
            Dignifying Indian Handlooms &amp; The Sacred Veshti
          </h1>
          <p className="text-base text-stone-600 leading-relaxed">
            In 1983, a visionary textile entrepreneur, Shri K.R. Nagarajan, set out with a simple yet revolutionary mission: to restore the pride, elegance, and national dignity of wearing the traditional Indian Dhoti.
          </p>
        </div>

        {/* Founder & Milestone cards (LIQUID GLASS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20 liquid-glass rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 shadow-md border border-white/40">
            <Image
              src="https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_b28406bf-5b67-4ff9-811b-2cd04365771a.png?v=1789556947"
              alt="Handloom weaving at Ramraj Cotton"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-xs font-semibold">
                Authentic pit-loom and power-loom weaving in the heartland of Tamil Nadu
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
              Padma Shri Honoree
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">The Story of Padma Shri K.R. Nagarajan</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              When five-star establishments and formal offices were turning away men clad in traditional white dhotis, Shri K.R. Nagarajan took a stand. He revolutionized the textile manufacturing process, blending the softest combed cotton yarn with pristine white bleach and lustrous gold zari.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Today, Ramraj Cotton supports more than <strong>50,000 weaver families</strong> across Tirupur, Erode, Salem, and Coimbatore, providing dignified livelihood and sustaining century-old weaving traditions.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#1d4d2d]">
              <ShieldCheck size={16} /> Certified 100% Pure Indian Cotton &amp; Handloom Mark
            </div>
          </div>
        </div>

        {/* Pillars (LIQUID GLASS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: Users,
              title: '50,000+ Weavers',
              desc: 'Providing regular income and healthcare to master weavers across Tamil Nadu loom villages.',
            },
            {
              icon: Award,
              title: 'Purity & Quality',
              desc: 'Only 100s & 80s super-combed compact cotton and official Silk Mark mulberry silk.',
            },
            {
              icon: HeartHandshake,
              title: 'Ramyyam Collection',
              desc: 'Empowering women artisans through handloom Kasavu, Chettinad, and Kanchipuram sarees.',
            },
            {
              icon: Leaf,
              title: 'Eco-Responsible',
              desc: 'Solar powered processing mills and zero liquid discharge water recycling in Tirupur.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="liquid-glass-card rounded-2xl p-6 border border-white/70 shadow-sm hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#edf5ee] text-[#1d4d2d] flex items-center justify-center mb-4 shadow-sm border border-emerald-400/20">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-base text-stone-900 mb-1">{title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Ramyyam Section */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-16 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="relative h-12 w-40 mb-4 bg-white/95 p-1.5 rounded-xl">
              <Image
                src="/images/ramyyam-logo.jpg"
                alt="Ramyyam Official Logo"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-rose-200 bg-white/10 px-3 py-1 rounded-full">
              From the House of Ramraj Cotton
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-4">RAMYYAM – The Grace of Indian Womanhood</h2>
            <p className="text-sm text-rose-100 leading-relaxed mb-8">
              Ramyyam was born to bring the same uncompromising standard of pure cotton and authentic handlooms to women. From ethereal Kerala Kasavu sarees with 24K gold zari to breathable Chettinad cotton and daily comfort lingerie, Ramyyam celebrates the timeless beauty of Indian traditions.
            </p>
            <Link
              href="/products?brand=ramyyam"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-rose-950 hover:bg-rose-100 font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Explore Ramyyam Sarees & Kurtis <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
