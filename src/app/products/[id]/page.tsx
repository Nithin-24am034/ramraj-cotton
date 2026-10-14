import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import ProductDetailClient from '@/components/products/ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: [{ url: product.images[0], width: 800, height: 600, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();
  const relatedProducts = getRelatedProducts(product, 4);
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
