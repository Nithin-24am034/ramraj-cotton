import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata: Metadata = {
  title: 'All Collections – Ramraj Cotton & Ramyyam Sarees',
  description: 'Explore our full range of pure cotton Dhotis, Veshtis, Formal White Shirts, Kerala Kasavu Sarees, Soft Silk, and Kurtis.',
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 flex items-center justify-center">
          <div className="liquid-glass rounded-3xl p-8 text-center max-w-sm">
            <p className="text-stone-700 font-bold text-sm">Loading handcrafted collections...</p>
          </div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
