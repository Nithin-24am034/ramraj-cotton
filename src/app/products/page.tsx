import type { Metadata } from 'next';
import ProductsClient from '@/components/products/ProductsClient';

interface Props {
  searchParams: Promise<{ category?: string; brand?: string; filter?: string }>;
}

export const metadata: Metadata = {
  title: 'All Collections – Ramraj Cotton & Ramyyam Sarees',
  description: 'Explore our full range of pure cotton Dhotis, Veshtis, Formal White Shirts, Kerala Kasavu Sarees, Soft Silk, and Kurtis.',
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialCategory = params.category || 'all';
  const initialBrand = params.brand || 'all';
  return <ProductsClient initialCategory={initialCategory} initialBrand={initialBrand} />;
}
