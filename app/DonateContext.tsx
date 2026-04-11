'use client';

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type DonateContextValue = {
  showDonateModal: boolean;
  setShowDonateModal: Dispatch<SetStateAction<boolean>>;
};

const DonateContext = createContext<DonateContextValue | null>(null);

export function DonateProvider({ children }: { children: ReactNode }) {
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <DonateContext.Provider value={{ showDonateModal, setShowDonateModal }}>
      {children}
    </DonateContext.Provider>
  );
}

export function useDonate(): DonateContextValue {
  const context = useContext(DonateContext);
  if (!context) {
    throw new Error('useDonate must be used within DonateProvider');
  }
  return context;
}
