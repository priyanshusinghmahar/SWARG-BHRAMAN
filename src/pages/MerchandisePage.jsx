import React from 'react';
import MerchandiseSection from '../components/MerchandiseSection';

export default function MerchandisePage({ onConfirmOrder }) {
  return (
    <div className="pt-2 pb-12 bg-slate-50 dark:bg-[#080D1A] min-h-screen">
      <MerchandiseSection onConfirmOrder={onConfirmOrder} />
    </div>
  );
}
