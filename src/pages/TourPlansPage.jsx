import React from 'react';
import TourPlansSection from '../components/TourPlansSection';

export default function TourPlansPage({ tourPlans, onOpenBookingModal }) {
  return (
    <div className="pt-2 pb-12 bg-slate-50 dark:bg-[#080D1A] min-h-screen">
      <TourPlansSection tourPlans={tourPlans} onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
}
