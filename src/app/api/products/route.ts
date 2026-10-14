import { NextRequest, NextResponse } from 'next/server';
import { products, filterProducts } from '@/lib/products';
import { FilterState, Brand, Occasion, BorderType } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brand = (searchParams.get('brand') || 'all') as Brand | 'all';
  const category = (searchParams.get('category') || 'all') as FilterState['category'];
  const occasion = (searchParams.get('occasion') || 'all') as Occasion | 'all';
  const borderType = (searchParams.get('borderType') || 'all') as BorderType | 'all';
  const sortBy = (searchParams.get('sort') || 'featured') as FilterState['sortBy'];
  const minPrice = Number(searchParams.get('minPrice') || 0);
  const maxPrice = Number(searchParams.get('maxPrice') || 99999);
  const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
  const materials = searchParams.get('materials')?.split(',').filter(Boolean) || [];
  const featured = searchParams.get('featured');
  const isNew = searchParams.get('new');

  let result = filterProducts(products, {
    brand,
    category,
    occasion,
    borderType,
    sortBy,
    sizes,
    materials,
    priceRange: [minPrice, maxPrice],
  });

  if (featured === 'true') result = result.filter((p) => p.isFeatured);
  if (isNew === 'true') result = result.filter((p) => p.isNew);

  const limit = Number(searchParams.get('limit') || 100);
  result = result.slice(0, limit);

  return NextResponse.json(
    { products: result, total: result.length },
    {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    }
  );
}
