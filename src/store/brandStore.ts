'use client';

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Brand } from '@/types';

export type BrandSelection = Brand | 'all';

interface BrandStore {
  selectedBrand: BrandSelection;
  setSelectedBrand: (brand: BrandSelection) => void;
  isRamraj: boolean;
  isRamyyam: boolean;
  isAll: boolean;
  brandTheme: {
    name: string;
    tagline: string;
    primaryColor: string;
    accentColor: string;
    headerBg: string;
    badgeBg: string;
  };
}

const BRAND_THEMES = {
  ramraj: {
    name: 'RAMRAJ COTTON',
    tagline: 'Pure Cotton • Men & Kids Traditional Wear • Since 1983',
    primaryColor: '#1d4d2d', // Royal Forest/Emerald Green
    accentColor: '#C9A84C', // Pure Gold
    headerBg: '#f7faf7',
    badgeBg: '#edf5ee',
  },
  ramyyam: {
    name: 'RAMYYAM',
    tagline: 'Timeless Elegance • Sarees, Kurtis & Women Ethnic • From House of Ramraj',
    primaryColor: '#881337', // Regal Deep Rose / Wine
    accentColor: '#fb7185', // Rose Gold / Soft Pink
    headerBg: '#fff7f8',
    badgeBg: '#ffe4e6',
  },
  all: {
    name: 'HOUSE OF RAMRAJ',
    tagline: 'Ramraj Cotton & Ramyyam • Complete Family Traditional Collection',
    primaryColor: '#1A1A2E',
    accentColor: '#C9A84C',
    headerBg: '#f8fafc',
    badgeBg: '#f1f5f9',
  },
};

const BrandContext = createContext<BrandStore | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrandState] = useState<BrandSelection>('all');

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlBrand = urlParams.get('brand') as BrandSelection;
      if (urlBrand && (urlBrand === 'ramraj' || urlBrand === 'ramyyam' || urlBrand === 'all')) {
        setSelectedBrandState(urlBrand);
        return;
      }

      const stored = localStorage.getItem('ramraj-active-brand') as BrandSelection;
      if (stored && (stored === 'ramraj' || stored === 'ramyyam' || stored === 'all')) {
        setSelectedBrandState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const setSelectedBrand = useCallback((brand: BrandSelection) => {
    setSelectedBrandState(brand);
    try {
      localStorage.setItem('ramraj-active-brand', brand);
    } catch {
      // ignore
    }
  }, []);

  const isRamraj = selectedBrand === 'ramraj';
  const isRamyyam = selectedBrand === 'ramyyam';
  const isAll = selectedBrand === 'all';

  const brandTheme = useMemo(() => BRAND_THEMES[selectedBrand], [selectedBrand]);

  const value = useMemo(
    () => ({
      selectedBrand,
      setSelectedBrand,
      isRamraj,
      isRamyyam,
      isAll,
      brandTheme,
    }),
    [selectedBrand, setSelectedBrand, isRamraj, isRamyyam, isAll, brandTheme]
  );

  return createElement(BrandContext.Provider, { value }, children);
}

export function useBrand(): BrandStore {
  const context = useContext(BrandContext);
  if (!context) {
    return {
      selectedBrand: 'all',
      setSelectedBrand: () => {},
      isRamraj: false,
      isRamyyam: false,
      isAll: true,
      brandTheme: BRAND_THEMES.all,
    };
  }
  return context;
}
