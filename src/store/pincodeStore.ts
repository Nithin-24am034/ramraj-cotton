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

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: string;
  isCodAvailable: boolean;
  courier: string;
  verified: boolean;
}

interface PincodeStore {
  savedPincode: string | null;
  pincodeInfo: PincodeInfo | null;
  isModalOpen: boolean;
  openPincodeModal: () => void;
  closePincodeModal: () => void;
  checkPincode: (pin: string) => PincodeInfo | null;
  savePincode: (pin: string) => PincodeInfo | null;
  clearPincode: () => void;
}

const KNOWN_PINCODES: Record<string, { city: string; state: string; days: string; cod: boolean; courier: string }> = {
  // Tamil Nadu
  '600001': { city: 'Chennai (George Town)', state: 'Tamil Nadu', days: '1-2 Days', cod: true, courier: 'BlueDart Express' },
  '600017': { city: 'Chennai (T. Nagar)', state: 'Tamil Nadu', days: '1-2 Days', cod: true, courier: 'BlueDart Express' },
  '641001': { city: 'Coimbatore', state: 'Tamil Nadu', days: '1-2 Days', cod: true, courier: 'Ramraj Express / BlueDart' },
  '641659': { city: 'Tirupur (Karumathampatti)', state: 'Tamil Nadu', days: 'Same Day / 1 Day', cod: true, courier: 'Direct Mill Dispatch' },
  '625001': { city: 'Madurai', state: 'Tamil Nadu', days: '1-2 Days', cod: true, courier: 'BlueDart Express' },
  '620001': { city: 'Tiruchirappalli', state: 'Tamil Nadu', days: '1-2 Days', cod: true, courier: 'Delhivery' },
  '636001': { city: 'Salem', state: 'Tamil Nadu', days: '1-2 Days', cod: true, courier: 'BlueDart Express' },
  // Karnataka
  '560001': { city: 'Bengaluru (MG Road)', state: 'Karnataka', days: '2-3 Days', cod: true, courier: 'BlueDart Express' },
  '560034': { city: 'Bengaluru (Koramangala)', state: 'Karnataka', days: '2-3 Days', cod: true, courier: 'Delhivery' },
  // Kerala
  '682001': { city: 'Kochi', state: 'Kerala', days: '2-3 Days', cod: true, courier: 'BlueDart Express' },
  '695001': { city: 'Thiruvananthapuram', state: 'Kerala', days: '2-3 Days', cod: true, courier: 'Delhivery' },
  // Andhra & Telangana
  '500001': { city: 'Hyderabad', state: 'Telangana', days: '2-3 Days', cod: true, courier: 'BlueDart Express' },
  '520001': { city: 'Vijayawada', state: 'Andhra Pradesh', days: '2-3 Days', cod: true, courier: 'Delhivery' },
  // Other Metros
  '400001': { city: 'Mumbai', state: 'Maharashtra', days: '3-4 Days', cod: true, courier: 'BlueDart Express' },
  '110001': { city: 'New Delhi', state: 'Delhi NCR', days: '3-5 Days', cod: true, courier: 'BlueDart Express' },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: '4-5 Days', cod: true, courier: 'Delhivery' },
};

const PincodeContext = createContext<PincodeStore | undefined>(undefined);

export function PincodeProvider({ children }: { children: ReactNode }) {
  const [savedPincode, setSavedPincode] = useState<string | null>(null);
  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ramraj-pincode');
      if (stored) {
        setSavedPincode(stored);
        evaluatePincode(stored);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const evaluatePincode = (pin: string): PincodeInfo => {
    const cleanPin = pin.trim().replace(/\D/g, '').slice(0, 6);
    if (KNOWN_PINCODES[cleanPin]) {
      const info = KNOWN_PINCODES[cleanPin];
      return {
        pincode: cleanPin,
        city: info.city,
        state: info.state,
        deliveryDays: info.days,
        isCodAvailable: info.cod,
        courier: info.courier,
        verified: true,
      };
    }

    // Algorithmic check based on first digit of Indian Pincode
    const firstDigit = cleanPin.charAt(0);
    let stateEstimate = 'India';
    let days = '3-5 Business Days';

    if (firstDigit === '6') {
      stateEstimate = 'Tamil Nadu / Kerala';
      days = '2-3 Business Days';
    } else if (firstDigit === '5') {
      stateEstimate = 'Karnataka / AP / Telangana';
      days = '2-4 Business Days';
    } else if (firstDigit === '4') {
      stateEstimate = 'Maharashtra / Goa';
      days = '3-4 Business Days';
    } else if (firstDigit === '1' || firstDigit === '2') {
      stateEstimate = 'North India';
      days = '4-5 Business Days';
    }

    return {
      pincode: cleanPin,
      city: stateEstimate,
      state: stateEstimate,
      deliveryDays: days,
      isCodAvailable: true,
      courier: 'BlueDart / Delhivery Express',
      verified: cleanPin.length === 6,
    };
  };

  const checkPincode = useCallback((pin: string) => {
    if (!pin || pin.trim().length < 6) return null;
    return evaluatePincode(pin);
  }, []);

  const savePincode = useCallback((pin: string) => {
    if (!pin || pin.trim().length < 6) return null;
    const info = evaluatePincode(pin);
    setSavedPincode(info.pincode);
    setPincodeInfo(info);
    try {
      localStorage.setItem('ramraj-pincode', info.pincode);
    } catch {
      // storage unavailable
    }
    return info;
  }, []);

  const clearPincode = useCallback(() => {
    setSavedPincode(null);
    setPincodeInfo(null);
    try {
      localStorage.removeItem('ramraj-pincode');
    } catch {
      // storage unavailable
    }
  }, []);

  const openPincodeModal = useCallback(() => setIsModalOpen(true), []);
  const closePincodeModal = useCallback(() => setIsModalOpen(false), []);

  const value = useMemo(
    () => ({
      savedPincode,
      pincodeInfo,
      isModalOpen,
      openPincodeModal,
      closePincodeModal,
      checkPincode,
      savePincode,
      clearPincode,
    }),
    [savedPincode, pincodeInfo, isModalOpen, openPincodeModal, closePincodeModal, checkPincode, savePincode, clearPincode]
  );

  return createElement(PincodeContext.Provider, { value }, children);
}

export function usePincode(): PincodeStore {
  const context = useContext(PincodeContext);
  if (!context) {
    return {
      savedPincode: null,
      pincodeInfo: null,
      isModalOpen: false,
      openPincodeModal: () => {},
      closePincodeModal: () => {},
      checkPincode: () => null,
      savePincode: () => null,
      clearPincode: () => {},
    };
  }
  return context;
}
