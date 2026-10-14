'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Pure Cotton Traditions',
    subtitle: 'Dhotis & Wedding Wear',
    description: 'Crafted in the spirit of heritage, Ramraj Cotton brings you pure cotton dhotis, classic white shirts and wedding-ready essentials built for everyday confidence and celebration.',
    cta: 'Shop Dhotis',
    ctaHref: '/products?category=dhotis',
    badge: 'Trusted Since 1983',
    badgeColor: 'bg-amber-600',
    image: 'https://ramrajcotton.in/cdn/shop/collections/01_d247eea8-9818-4e60-928f-0168b125ebb6.jpg?v=1728567031',
    accent: 'from-amber-700 to-amber-500',
    overlayColor: 'from-slate-900/90 via-slate-900/50 to-transparent',
  },
  {
    id: 2,
    title: 'White Shirt Essentials',
    subtitle: 'Premium Cotton Shirts',
    description: 'From crisp formal whites to clean festive staples, our white and cotton-rich shirts are designed for elegance, comfort, and timeless Indian style.',
    cta: 'Shop Shirts',
    ctaHref: '/products?category=shirts',
    badge: 'Best Sellers',
    badgeColor: 'bg-emerald-600',
    image: 'https://ramrajcotton.in/cdn/shop/collections/02_811057cd-ac4c-47c7-9fb7-08b737a3143b.jpg?v=1728566773',
    accent: 'from-emerald-700 to-emerald-500',
    overlayColor: 'from-slate-900/90 via-slate-900/50 to-transparent',
  },
  {
    id: 3,
    title: 'Festive Wedding Elegance',
    subtitle: 'Silk & Festive Sets',
    description: 'Celebrate with premium silk, zari borders, and coordinated dhoti-shirt sets made for weddings, poojas, and traditional ceremonies.',
    cta: 'Explore Collection',
    ctaHref: '/products?category=veshti',
    badge: 'Festival Edit',
    badgeColor: 'bg-amber-500',
    image: 'https://ramrajcotton.in/cdn/shop/collections/04_88eba311-76f9-4cbf-9bb9-e43f33022a14.jpg?v=1728566858',
    accent: 'from-amber-600 to-yellow-500',
    overlayColor: 'from-slate-900/90 via-slate-900/40 to-transparent',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => goToSlide((current + 1) % slides.length), [current, goToSlide]);
  const prev = useCallback(() => goToSlide((current - 1 + slides.length) % slides.length), [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[60vh] sm:h-[75vh] lg:h-[88vh] overflow-hidden bg-slate-900" aria-label="Featured promotions carousel">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className={`object-cover transition-all duration-700 ${isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'}`}
          sizes="100vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center">
        <div className={`max-w-2xl transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {/* Badge */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${slide.badgeColor} mb-5 shadow-lg`}>
            <Star size={11} className="mr-1 fill-current" />
            {slide.badge}
          </span>

          {/* Subtitle */}
          <p className="text-amber-400 font-bold text-sm sm:text-base uppercase tracking-[0.2em] mb-3">
            {slide.subtitle}
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href={slide.ctaHref} className="btn-primary text-base px-8 py-4 shadow-xl hover:shadow-amber-500/30">
              <ShoppingBag size={20} />
              {slide.cta}
            </Link>
            <Link href="/products" className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all duration-200 inline-flex items-center gap-2 text-base">
              View All
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-8">
            {['100% Pure Cotton', 'Free Shipping ₹799+', '30-Day Returns'].map((trust) => (
              <div key={trust} className="flex items-center gap-2 text-slate-300 text-xs">
                <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
                {trust}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all duration-200 border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-all duration-200 border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Carousel slides">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2.5 bg-amber-400'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-20 text-white/60 text-xs font-mono">
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
