import { NextRequest, NextResponse } from 'next/server';
import { products, filterProducts } from '@/lib/products';
import { FilterState, Brand, Occasion, BorderType } from '@/types';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(
    { products, total: products.length },
    {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    }
  );
}
