'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  RefreshCcw,
  Star,
  ChevronRight,
  Minus,
  Plus,
  ZoomIn,
  Sparkles,
  MapPin,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Product, ProductReview } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCurrency } from '@/store/currencyStore';
import { usePincode } from '@/store/pincodeStore';
import ProductCard from './ProductCard';
import DrapeGuideModal from '@/components/ui/DrapeGuideModal';
import toast from 'react-hot-toast';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'White', hex: '#FFFFFF' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'care'>('description');
  const [isDrapeModalOpen, setIsDrapeModalOpen] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Store hooks
  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { formatPrice } = useCurrency();
  const { checkPincode, savePincode, savedPincode, pincodeInfo } = usePincode();

  // Local pincode input
  const [pincodeInput, setPincodeInput] = useState(savedPincode || '');
  const [pincodeResult, setPincodeResult] = useState(pincodeInfo);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    toast.success(`Added ${quantity}× ${product.name.slice(0, 24)} to Cart! 🛍️`);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const handleCheckPincode = () => {
    if (pincodeInput.trim().length !== 6) {
      toast.error('Please enter a valid 6-digit Indian Pincode');
      return;
    }
    const info = checkPincode(pincodeInput);
    if (info) {
      setPincodeResult(info);
      savePincode(pincodeInput);
      toast.success(`Delivery available to ${info.city}!`);
    } else {
      toast.error('Unable to deliver to this pincode.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error('Please fill in your name and review details.');
      return;
    }
    const newRev: ProductReview = {
      id: `user-rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: 'Verified Purchase Review',
      comment: newReviewComment.trim(),
      location: 'India',
      verified: true,
    };
    setReviewsList((prev) => [newRev, ...prev]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setIsSubmittingReview(false);
    toast.success('Thank you! Your verified review has been published.');
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-stone-300 fill-stone-200'}
      />
    ));

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1d4d2d] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-[#1d4d2d] transition-colors">Collections</Link>
            <ChevronRight size={12} />
            <Link
              href={`/products?brand=${product.brand}`}
              className="hover:text-[#1d4d2d] transition-colors font-semibold uppercase text-[10px]"
            >
              {product.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam'}
            </Link>
            <ChevronRight size={12} />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-[#1d4d2d] transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-stone-800 font-bold truncate max-w-[220px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-md border border-stone-200 group">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={`${product.name} - image ${selectedImage + 1}`}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Discount / Purity Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                <span
                  className={`text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md ${
                    product.brand === 'ramraj'
                      ? 'bg-[#1d4d2d] text-white'
                      : 'bg-rose-900 text-rose-100'
                  }`}
                >
                  {product.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam'}
                </span>
                {product.discount && product.discount > 0 && (
                  <span className="text-xs font-black bg-amber-500 text-stone-950 px-3 py-1 rounded-full shadow">
                    {product.discount}% OFF
                  </span>
                )}
                {product.purityBadge && (
                  <span className="text-[10px] font-bold bg-white/95 text-stone-900 px-3 py-1 rounded-full shadow border border-stone-200 backdrop-blur-sm">
                    ★ {product.purityBadge}
                  </span>
                )}
              </div>

              {/* Wishlist Heart & Share */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600 shadow-md flex items-center justify-center transition-all cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart size={18} className={isFavorited ? 'text-rose-600 fill-rose-600' : ''} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md flex items-center justify-center transition-all cursor-pointer"
                  title="Share product"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImage === i
                        ? 'border-[#1d4d2d] ring-2 ring-[#a9d3ae] shadow'
                        : 'border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-black tracking-widest uppercase text-[#1d4d2d]">
                  {product.brand === 'ramraj' ? 'Ramraj Cotton' : 'Ramyyam'}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-semibold text-stone-500 capitalize">{product.category}</span>
                {product.specialFeature && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full ml-auto">
                    {product.specialFeature}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs font-black text-amber-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-stone-500">
                  Based on <strong>{product.reviewCount.toLocaleString('en-IN')}</strong> verified reviews
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200 flex items-baseline gap-4 shadow-sm">
              <span className="text-3xl font-black text-stone-950">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Save {formatPrice(product.originalPrice - product.price)} ({product.discount}%)
                  </span>
                </>
              )}
              <span className="text-[11px] text-stone-400 ml-auto">Inclusive of all GST &amp; Taxes</span>
            </div>

            {/* Size Selector + Drape Guide Trigger */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-stone-700">
                  Select Size / Dimensions
                </span>
                <button
                  onClick={() => setIsDrapeModalOpen(true)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={13} /> Sizing &amp; Drape Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#1d4d2d] text-white shadow-md'
                        : 'bg-white border border-stone-300 text-stone-700 hover:border-[#1d4d2d]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-stone-700 block mb-2">
                  Color / Shade: <span className="font-normal text-stone-500">{selectedColor.name}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedColor.name === c.name
                          ? 'border-[#1d4d2d] ring-2 ring-[#a9d3ae] bg-stone-50'
                          : 'border-stone-200 hover:border-stone-400 bg-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls & Purchase Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 bg-white rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* 1-Click Buy Now */}
              <button
                onClick={handleBuyNow}
                className={`w-full py-3.5 rounded-xl font-black text-sm text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  product.brand === 'ramraj'
                    ? 'bg-[#1d4d2d] hover:bg-[#183e27]'
                    : 'bg-rose-900 hover:bg-rose-950'
                }`}
              >
                <span>Buy Now – 1-Click Instant Checkout</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* ── INLINE PINCODE ESTIMATOR BOX ── */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#1d4d2d]" />
                <span className="text-xs font-bold text-stone-800">Check Delivery &amp; COD Availability</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckPincode()}
                  placeholder="Enter 6-digit Pincode (e.g. 600001)"
                  className="flex-1 px-3 py-2 border border-stone-300 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-[#1d4d2d]"
                />
                <button
                  onClick={handleCheckPincode}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl"
                >
                  Verify
                </button>
              </div>

              {pincodeResult && (
                <div className="p-3 bg-[#edf5ee] rounded-xl text-xs space-y-1">
                  <p className="font-bold text-[#1d4d2d] flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>Delivering to {pincodeResult.city} ({pincodeResult.pincode})</span>
                  </p>
                  <p className="text-stone-600">
                    Estimated Time: <strong>{pincodeResult.deliveryDays}</strong> via {pincodeResult.courier}
                  </p>
                  <p className="text-emerald-700 font-semibold">✓ Cash on Delivery is eligible</p>
                </div>
              )}
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <ShieldCheck size={20} className="mx-auto text-[#1d4d2d] mb-1" />
                <p className="text-[11px] font-bold text-stone-800">100% Genuine</p>
                <p className="text-[10px] text-stone-400">Tirupur Mill Sealed</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <Truck size={20} className="mx-auto text-amber-600 mb-1" />
                <p className="text-[11px] font-bold text-stone-800">Fast Dispatch</p>
                <p className="text-[10px] text-stone-400">Within 24 Hours</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <RefreshCcw size={20} className="mx-auto text-emerald-600 mb-1" />
                <p className="text-[11px] font-bold text-stone-800">Easy Exchange</p>
                <p className="text-[10px] text-stone-400">At Any Showroom</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS SECTION: Description, Specifications, Reviews, Care ── */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          {/* Tabs bar */}
          <div className="flex border-b border-stone-200 gap-4 sm:gap-8 overflow-x-auto pb-3">
            {[
              { id: 'description', label: 'Detailed Description' },
              { id: 'specs', label: 'Weave & Specifications' },
              { id: 'reviews', label: `Customer Reviews (${reviewsList.length})` },
              { id: 'care', label: 'Washing & Zari Care' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-2 text-xs sm:text-sm font-black tracking-wide whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#1d4d2d] text-[#1d4d2d]'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="pt-6 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl animate-fadeIn">
              <p>{product.description}</p>
              {product.specialFeature && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-stone-800">
                  <h4 className="font-bold text-sm mb-1 text-amber-900 flex items-center gap-1.5">
                    <Sparkles size={16} className="text-amber-600" />
                    <span>Special Feature: {product.specialFeature}</span>
                  </h4>
                  <p className="text-xs text-stone-600">
                    Engineered by Ramraj textile experts to elevate everyday ease and traditional celebrations.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="pt-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {product.specifications?.map((spec) => (
                  <div key={spec.label} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{spec.label}</p>
                    <p className="text-xs font-bold text-stone-800 mt-0.5">{spec.value}</p>
                  </div>
                )) || (
                  <>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <p className="text-[10px] font-bold text-stone-400 uppercase">Fabric</p>
                      <p className="text-xs font-bold text-stone-800">{product.fabric || '100% Pure Combed Cotton'}</p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <p className="text-[10px] font-bold text-stone-400 uppercase">Border Style</p>
                      <p className="text-xs font-bold text-stone-800 capitalize">{product.borderType?.replace('-', ' ') || 'Traditional'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="pt-6 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                <div>
                  <h4 className="font-bold text-base text-stone-900">Verified Buyer Feedback</h4>
                  <p className="text-xs text-stone-500">Real feedback from Tamil Nadu, Karnataka, Kerala and NRIs worldwide</p>
                </div>
                <button
                  onClick={() => setIsSubmittingReview(!isSubmittingReview)}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow transition-all w-fit cursor-pointer"
                >
                  Write a Review
                </button>
              </div>

              {/* Review input form */}
              {isSubmittingReview && (
                <form onSubmit={handleSubmitReview} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                  <h5 className="font-bold text-sm text-stone-800">Share Your Experience with {product.name}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs bg-white font-bold"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                        <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                        <option value={3}>⭐⭐⭐ 3 Stars - Average</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Review Comments</label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Comment on fabric softness, zari shine, fitting, and delivery experience..."
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1d4d2d] text-white font-bold text-xs rounded-xl"
                    >
                      Publish Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmittingReview(false)}
                      className="px-4 py-2 bg-stone-200 text-stone-700 font-bold text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews list */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <CheckCircle2 size={11} /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1">{renderStars(rev.rating)}</div>
                    <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                    <p className="text-[10px] text-stone-400">{rev.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Care */}
          {activeTab === 'care' && (
            <div className="pt-6 space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl animate-fadeIn">
              <h4 className="font-bold text-stone-800 text-sm mb-2">Preserving Handloom Cotton &amp; Zari Radiance</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hand wash or gentle cold machine wash using mild liquid detergent.</li>
                <li>Never use harsh bleaching agents on pure gold or silver zari borders.</li>
                <li>Dry inside-out in shade to preserve pristine white fabric brilliance.</li>
                <li>For Silk and Zari Veshtis, roll-wrap with muslin cloth and dry clean recommended.</li>
                <li>Warm iron on reverse side; avoid direct high-heat contact on zari threads.</li>
              </ul>
            </div>
          )}
        </div>

        {/* ── RELATED PRODUCTS SECTION ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-stone-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Global Drape Guide Modal */}
      <DrapeGuideModal
        isOpen={isDrapeModalOpen}
        onClose={() => setIsDrapeModalOpen(false)}
        initialTab={
          product.category === 'sarees'
            ? 'saree'
            : product.tags.includes('velcro')
            ? 'velcro'
            : product.category === 'veshti'
            ? 'panchakacham'
            : 'traditional'
        }
      />
    </div>
  );
}
