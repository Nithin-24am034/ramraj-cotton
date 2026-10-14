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
import { Currency, CurrencyConfig } from '@/types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'USD ($)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' },
  SGD: { code: 'SGD', symbol: 'S$', rate: 0.016, label: 'SGD (S$)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0094, label: 'GBP (£)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: 'EUR (€)' },
};

interface CurrencyStore {
  currentCurrency: Currency;
  config: CurrencyConfig;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInINR: number) => string;
  convertPrice: (priceInINR: number) => number;
}

const CurrencyContext = createContext<CurrencyStore | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('INR');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ramraj-currency') as Currency;
      if (stored && CURRENCIES[stored]) {
        setCurrentCurrency(stored);
      }
    } catch {
      setCurrentCurrency('INR');
    }
  }, []);

  const setCurrency = useCallback((currency: Currency) => {
    setCurrentCurrency(currency);
    try {
      localStorage.setItem('ramraj-currency', currency);
    } catch {
      // storage unavailable
    }
  }, []);

  const config = useMemo(() => CURRENCIES[currentCurrency], [currentCurrency]);

  const convertPrice = useCallback(
    (priceInINR: number) => {
      if (currentCurrency === 'INR') return priceInINR;
      return Math.round(priceInINR * config.rate * 100) / 100;
    },
    [currentCurrency, config.rate]
  );

  const formatPrice = useCallback(
    (priceInINR: number) => {
      const converted = convertPrice(priceInINR);
      if (currentCurrency === 'INR') {
        return `₹${priceInINR.toLocaleString('en-IN')}`;
      }
      return `${config.symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [convertPrice, currentCurrency, config.symbol]
  );

  const value = useMemo(
    () => ({
      currentCurrency,
      config,
      setCurrency,
      formatPrice,
      convertPrice,
    }),
    [currentCurrency, config, setCurrency, formatPrice, convertPrice]
  );

  return createElement(CurrencyContext.Provider, { value }, children);
}

export function useCurrency(): CurrencyStore {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Fallback if accessed outside provider
    return {
      currentCurrency: 'INR',
      config: CURRENCIES.INR,
      setCurrency: () => {},
      formatPrice: (p: number) => `₹${p.toLocaleString('en-IN')}`,
      convertPrice: (p: number) => p,
    };
  }
  return context;
}
