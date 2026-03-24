'use client';

import { createContext, useContext, useState } from 'react';

const DonateContext = createContext(null);

export function DonateProvider({ children }) {
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <DonateContext.Provider value={{ showDonateModal, setShowDonateModal }}>
      {children}
    </DonateContext.Provider>
  );
}

export function useDonate() {
  const context = useContext(DonateContext);
  if (!context) {
    throw new Error('useDonate must be used within DonateProvider');
  }
  return context;
}
