import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/store/cartStore';
import { WishlistProvider } from '@/store/wishlistStore';
import { CurrencyProvider } from '@/store/currencyStore';
import { PincodeProvider } from '@/store/pincodeStore';
import { BrandProvider } from '@/store/brandStore';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Ramraj Cotton & Ramyyam – Indian Traditional Wear & Sarees',
    template: '%s | Ramraj Cotton & Ramyyam',
  },
  description:
    'Official online store for Ramraj Cotton & Ramyyam. Shop 100% pure cotton Dhotis, Ottiko Kattiko Velcro Dhotis, Formal White Shirts, Kerala Kasavu Sarees, Kanchipuram Silk & Kurtis since 1983.',
  keywords: [
    'ramraj cotton',
    'ramyyam sarees',
    'ottiko kattiko',
    'velcro dhoti',
    'kasavu saree',
    'kerala saree',
    'veshti',
    'white shirt',
    'panchakacham',
    'cotton dhoti',
    'little stars boys',
    'pattu pavadai',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ramrajcotton.in',
    siteName: 'Ramraj Cotton & Ramyyam',
    title: 'Ramraj Cotton & Ramyyam – Pure Cotton Dhotis, Shirts & Sarees',
    description: '100% pure combed cotton & Silk Mark certified traditional wear crafted since 1983.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d4d2d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://ramrajcotton.in" />
      </head>
      <body className="flex flex-col min-h-screen bg-stone-50 antialiased selection:bg-amber-100 selection:text-stone-900">
        <BrandProvider>
          <CurrencyProvider>
            <PincodeProvider>
              <CartProvider>
                <WishlistProvider>
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: '#12281a',
                        color: '#fff',
                        borderRadius: '16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '12px 20px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                      },
                      success: {
                        iconTheme: { primary: '#C9A84C', secondary: '#fff' },
                      },
                    }}
                  />
                  <Navbar />
                  <CartDrawer />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <WhatsAppButton />
                </WishlistProvider>
              </CartProvider>
            </PincodeProvider>
          </CurrencyProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
