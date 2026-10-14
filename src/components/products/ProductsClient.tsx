'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterX, SlidersHorizontal, ChevronDown, ChevronUp, X, Sparkles, Check } from 'lucide-react';
import { products, filterProducts, categories } from '@/lib/products';
import { FilterState, Category, SortOption, Brand, Occasion, BorderType } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { useCurrency } from '@/store/currencyStore';
import { useBrand } from '@/store/brandStore';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const occasions: { value: Occasion; label: string }[] = [
  { value: 'wedding', label: 'Wedding & Bridal' },
  { value: 'festival', label: 'Festivals (Diwali, Pongal, Onam)' },
  { value: 'puja', label: 'Temple & Puja' },
  { value: 'office', label: 'Office & Formal' },
  { value: 'daily', label: 'Daily Comfort' },
];

const borderTypes: { value: BorderType; label: string }[] = [
  { value: 'gold-zari', label: '24K Gold Zari Border' },
  { value: 'mayilkan', label: 'Mayilkan (Peacock Eye)' },
  { value: 'temple', label: 'South Temple Border' },
  { value: 'silver-zari', label: 'Silver Zari Border' },
  { value: 'colour', label: 'Colour Border' },
  { value: 'plain', label: 'Plain White Selvage' },
];

const availableMaterials = [
  '100% Super Combed Cotton',
  '100% Pure Mulberry Silk',
  '100% Pure European Linen',
  'Organic Bamboo Cotton',
  'Soft Art Silk',
  'Cotton-Silk Blend',
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-black uppercase tracking-wider text-stone-800 mb-3 cursor-pointer"
        aria-expanded={open}
      >
        <span>{title}</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

export default function ProductsClient({
  initialCategory,
  initialBrand,
}: {
  initialCategory?: string;
  initialBrand?: string;
}) {
  const { formatPrice } = useCurrency();
  const { selectedBrand: activeContextBrand, setSelectedBrand } = useBrand();
  const searchParams = useSearchParams();

  const queryCategory = searchParams.get('category');
  const queryBrand = searchParams.get('brand');

  const [filters, setFilters] = useState<FilterState>({
    brand: (queryBrand as Brand) || (initialBrand as Brand) || (activeContextBrand !== 'all' ? activeContextBrand : 'all'),
    category: (queryCategory as Category) || (initialCategory as Category) || 'all',
    sizes: [],
    materials: [],
    priceRange: [0, 10000],
    sortBy: 'featured',
    occasion: 'all',
    borderType: 'all',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync if URL search changes
  useEffect(() => {
    const targetCat = queryCategory || initialCategory;
    const targetBrand = queryBrand || initialBrand;
    if (targetCat) {
      setFilters((prev) => ({ ...prev, category: targetCat as Category }));
    }
    if (targetBrand) {
      setFilters((prev) => ({ ...prev, brand: targetBrand as Brand }));
    }
  }, [queryCategory, queryBrand, initialCategory, initialBrand]);

  const filtered = useMemo(() => filterProducts(products, filters), [filters]);

  const toggleMaterial = useCallback((mat: string) => {
    setFilters((prev) => ({
      ...prev,
      materials: prev.materials.includes(mat)
        ? prev.materials.filter((m) => m !== mat)
        : [...prev.materials, mat],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      brand: 'all',
      category: 'all',
      sizes: [],
      materials: [],
      priceRange: [0, 10000],
      sortBy: 'featured',
      occasion: 'all',
      borderType: 'all',
    });
    setSelectedBrand('all');
  }, [setSelectedBrand]);

  const activeFilterCount =
    (filters.brand && filters.brand !== 'all' ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.occasion && filters.occasion !== 'all' ? 1 : 0) +
    (filters.borderType && filters.borderType !== 'all' ? 1 : 0) +
    filters.materials.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  const activeCategoryList =
    filters.brand === 'ramraj'
      ? categories.filter((c) => c.brand === 'ramraj')
      : filters.brand === 'ramyyam'
      ? categories.filter((c) => c.brand === 'ramyyam')
      : categories;

  const FiltersPanel = () => (
    <aside className="space-y-1">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <h2 className="font-black text-stone-900 text-sm tracking-wide uppercase">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <FilterX size={13} /> Reset ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Brand Selection */}
      <FilterSection title="Brand Portal">
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Brands (Ramraj & Ramyyam)' },
            { id: 'ramraj', label: '👑 Ramraj Cotton (Men & Boys)' },
            { id: 'ramyyam', label: '🌸 Ramyyam (Women & Girls)' },
          ].map((b) => (
            <label
              key={b.id}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                (filters.brand || 'all') === b.id
                  ? 'bg-[#1d4d2d]/10 text-[#1d4d2d]'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <input
                type="radio"
                name="brandFilter"
                checked={(filters.brand || 'all') === b.id}
                onChange={() => {
                  setFilters((prev) => ({ ...prev, brand: b.id as Brand | 'all', category: 'all' }));
                  setSelectedBrand(b.id as Brand | 'all');
                }}
                className="accent-[#1d4d2d]"
              />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Category Selection */}
      <FilterSection title="Category">
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <label
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filters.category === 'all' ? 'bg-amber-100/70 text-amber-900' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <input
              type="radio"
              name="catFilter"
              checked={filters.category === 'all'}
              onChange={() => setFilters((p) => ({ ...p, category: 'all' }))}
              className="accent-amber-600"
            />
            <span>All Categories</span>
          </label>
          {activeCategoryList.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filters.category === cat.id ? 'bg-amber-100/70 text-amber-900' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <input
                  type="radio"
                  name="catFilter"
                  checked={filters.category === cat.id}
                  onChange={() => setFilters((p) => ({ ...p, category: cat.id }))}
                  className="accent-amber-600"
                />
                <span className="truncate">{cat.icon} {cat.label}</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Occasion */}
      <FilterSection title="Occasion">
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
            <input
              type="radio"
              name="occFilter"
              checked={filters.occasion === 'all'}
              onChange={() => setFilters((p) => ({ ...p, occasion: 'all' }))}
              className="accent-[#1d4d2d]"
            />
            <span>All Occasions</span>
          </label>
          {occasions.map((occ) => (
            <label key={occ.value} className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
              <input
                type="radio"
                name="occFilter"
                checked={filters.occasion === occ.value}
                onChange={() => setFilters((p) => ({ ...p, occasion: occ.value }))}
                className="accent-[#1d4d2d]"
              />
              <span>{occ.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Border Type */}
      <FilterSection title="Border Type">
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
            <input
              type="radio"
              name="borderFilter"
              checked={filters.borderType === 'all'}
              onChange={() => setFilters((p) => ({ ...p, borderType: 'all' }))}
              className="accent-[#1d4d2d]"
            />
            <span>All Borders</span>
          </label>
          {borderTypes.map((b) => (
            <label key={b.value} className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
              <input
                type="radio"
                name="borderFilter"
                checked={filters.borderType === b.value}
                onChange={() => setFilters((p) => ({ ...p, borderType: b.value }))}
                className="accent-[#1d4d2d]"
              />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Materials */}
      <FilterSection title="Fabric &amp; Fiber">
        <div className="space-y-1.5">
          {availableMaterials.map((mat) => (
            <label key={mat} className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.materials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="rounded accent-[#1d4d2d]"
              />
              <span>{mat}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Slider */}
      <FilterSection title="Max Price">
        <div>
          <div className="flex justify-between text-xs font-black text-stone-800 mb-2">
            <span>{formatPrice(0)}</span>
            <span className="text-amber-800">{formatPrice(filters.priceRange[1])}</span>
          </div>
          <input
            type="range"
            min={300}
            max={7500}
            step={100}
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((p) => ({ ...p, priceRange: [p.priceRange[0], Number(e.target.value)] }))
            }
            className="w-full accent-[#1d4d2d] cursor-pointer"
          />
        </div>
      </FilterSection>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {filters.brand === 'ramraj'
              ? 'Ramraj Cotton • Men & Boys'
              : filters.brand === 'ramyyam'
              ? 'Ramyyam • Women & Girls Handlooms'
              : 'Complete Traditional Collection'}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Showing <strong className="text-stone-800">{filtered.length}</strong> authentic handcrafted items
          </p>
        </div>

        {/* Sort & Mobile Filter Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 liquid-glass-pill rounded-xl text-xs font-bold text-stone-800 shadow-sm cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2 liquid-glass-pill rounded-xl px-3.5 py-2 text-xs shadow-sm">
            <span className="text-stone-500 font-semibold hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as SortOption }))}
              className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white text-stone-800">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
        {/* Desktop Sidebar (LIQUID GLASS) */}
        <div className="hidden lg:block liquid-glass rounded-3xl p-6 border border-white/80 shadow-xl sticky top-28">
          <FiltersPanel />
        </div>

        {/* Products Grid */}
        <div>
          {/* Active filter badges */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className="text-xs font-bold text-stone-400">Active Filters:</span>
              {filters.brand && filters.brand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#1d4d2d] text-white rounded-full text-xs font-bold">
                  Brand: {filters.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam'}
                  <button onClick={() => setFilters((p) => ({ ...p, brand: 'all' }))}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
                  Category: {filters.category}
                  <button onClick={() => setFilters((p) => ({ ...p, category: 'all' }))}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.occasion && filters.occasion !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-bold">
                  Occasion: {filters.occasion}
                  <button onClick={() => setFilters((p) => ({ ...p, occasion: 'all' }))}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.borderType && filters.borderType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-bold">
                  Border: {filters.borderType}
                  <button onClick={() => setFilters((p) => ({ ...p, borderType: 'all' }))}>
                    <X size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-red-600 hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
              <Sparkles size={36} className="mx-auto text-stone-300 mb-3" />
              <h3 className="font-bold text-base text-stone-800 mb-1">No products match this filter combination</h3>
              <p className="text-xs text-stone-500 mb-6">Try resetting filters to view all Ramraj and Ramyyam items.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#1d4d2d] hover:bg-[#183e27] text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs liquid-glass h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-white/60">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="font-black text-stone-900 text-base">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 liquid-glass-pill rounded-full text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <FiltersPanel />
            </div>

            <div className="pt-6 border-t border-stone-200/60 mt-6">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 liquid-glass-btn text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 cursor-pointer"
              >
                Apply Filters ({filtered.length} results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
