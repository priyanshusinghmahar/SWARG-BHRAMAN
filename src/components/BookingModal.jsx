import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { 
  X, Calendar, Users, MapPin, Sparkles, CheckCircle2, ShieldCheck, 
  Printer, CreditCard, ArrowRight, Mountain, Compass, ChevronDown, Check, 
  CloudSun, Thermometer, Flame, ShoppingBag, Award, QrCode, Phone, Clock, Ticket
} from 'lucide-react';
import { DESTINATIONS } from '../data/mockData';
import { UTTARAKHAND_TOUR_PLANS } from '../data/tourPlansData';
import { handleImageError } from '../utils/imageFallback';

export default function BookingModal({
  isOpen,
  onClose,
  initialData = {},
  onConfirmBooking
}) {
  if (!isOpen) return null;

  // Selected state
  const [bookingMode, setBookingMode] = useState('tour'); // 'tour' | 'destination'
  const [selectedTour, setSelectedTour] = useState(UTTARAKHAND_TOUR_PLANS[0]);
  const [selectedLocation, setSelectedLocation] = useState(DESTINATIONS[0]);
  const [selectedBatch, setSelectedBatch] = useState(UTTARAKHAND_TOUR_PLANS[0]?.batchDates?.[0] || '15 Dec 2026');
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [travelDate, setTravelDate] = useState('2026-12-15');
  const [returnDate, setReturnDate] = useState('2026-12-25');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Payment preference: 'advance' (25%) or 'full' (100% with extra ₹500 discount)
  const [paymentOption, setPaymentOption] = useState('advance');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'

  // Expedition Add-ons
  const [addonMule, setAddonMule] = useState(false);
  const [addonGearKit, setAddonGearKit] = useState(false);
  const [addonPhotography, setAddonPhotography] = useState(false);
  const [addonOxygen, setAddonOxygen] = useState(false);

  const { currentUser } = useAuth();

  // Traveler Details
  const [travelerName, setTravelerName] = useState(() => currentUser?.name || 'Priyanshu Singh Mahar');
  const [travelerEmail, setTravelerEmail] = useState(() => currentUser?.email || 'priyanshu@example.com');
  const [travelerPhone, setTravelerPhone] = useState(() => currentUser?.phone || '+91 98765 43210');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 94120 12345');
  const [pickupCity, setPickupCity] = useState('Haridwar / Dehradun ISBT');
  const [dietaryPref, setDietaryPref] = useState('satvik-pure');

  // Confirmation state
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Sync state whenever modal opens or initialData/user changes
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setConfirmedBookingData(null);

      if (currentUser) {
        if (currentUser.name) setTravelerName(currentUser.name);
        if (currentUser.email) setTravelerEmail(currentUser.email);
        if (currentUser.phone) setTravelerPhone(currentUser.phone);
      }

      // Check for direct tour plan match
      if (initialData?.id && String(initialData.id).startsWith('tour-')) {
        const found = UTTARAKHAND_TOUR_PLANS.find(p => p.id === initialData.id);
        if (found) {
          setSelectedTour(found);
          setSelectedBatch(initialData.selectedBatch || found.batchDates?.[0] || '15 Dec 2026');
          setBookingMode('tour');
          return;
        }
      }

      // Check by title or name
      const titleQuery = (initialData?.title || initialData?.name || '').toLowerCase();
      if (titleQuery) {
        const tourMatch = UTTARAKHAND_TOUR_PLANS.find(p => 
          p.title.toLowerCase().includes(titleQuery) || titleQuery.includes(p.title.toLowerCase())
        );
        if (tourMatch) {
          setSelectedTour(tourMatch);
          setSelectedBatch(tourMatch.batchDates?.[0] || '15 Dec 2026');
          setBookingMode('tour');
          return;
        }

        const destMatch = DESTINATIONS.find(d => 
          d.name.toLowerCase().includes(titleQuery) || titleQuery.includes(d.name.toLowerCase())
        );
        if (destMatch) {
          setSelectedLocation(destMatch);
          setBookingMode('destination');
          return;
        }
      }

      // Default to premier Char Dham Yatra or Kedarkantha
      setBookingMode('tour');
      setSelectedTour(UTTARAKHAND_TOUR_PLANS[0]);
      setSelectedBatch(UTTARAKHAND_TOUR_PLANS[0]?.batchDates?.[0] || '15 Dec 2026');
    }
  }, [isOpen, initialData]);

  // Handle ESC key press to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const isTourPlan = bookingMode === 'tour';

  // Base Rate calculation
  const baseRate = isTourPlan 
    ? (selectedTour.pricePerPerson || 8999)
    : (selectedLocation.startingPrice || 4500);

  const totalBase = (baseRate * adults) + (baseRate * 0.5 * children);
  const muleCost = addonMule ? 3500 * adults : 0;
  const gearKitCost = addonGearKit ? 999 * adults : 0;
  const photoCost = addonPhotography ? 1999 : 0;
  const oxygenCost = addonOxygen ? 1200 : 0;
  const totalAddons = muleCost + gearKitCost + photoCost + oxygenCost;
  const greenCess = 150 * (adults + children);
  const subTotal = totalBase + totalAddons + greenCess;

  const prepaidDiscount = paymentOption === 'full' ? 500 : 0;
  const grandTotal = Math.max(0, subTotal - prepaidDiscount);
  const amountToPayNow = paymentOption === 'advance' 
    ? Math.round(grandTotal * 0.25)
    : grandTotal;
  const remainingAtBaseCamp = grandTotal - amountToPayNow;

  const handleCompleteBooking = (e) => {
    e.preventDefault();

    const bookingId = `SB-EXP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = {
      id: bookingId,
      packageTitle: isTourPlan ? selectedTour.title : `${selectedLocation.name} Mountain Expedition`,
      destination: isTourPlan ? selectedTour.subtitle : `${selectedLocation.name} (${selectedLocation.region})`,
      travelDate: isCustomDate ? travelDate : selectedBatch,
      returnDate: returnDate,
      duration: isTourPlan ? selectedTour.duration : '5 Days / 4 Nights',
      travelers: adults + children,
      adultsCount: adults,
      childrenCount: children,
      travelerName,
      travelerEmail,
      travelerPhone,
      emergencyPhone,
      pickupCity,
      dietaryPref,
      grandTotal,
      paidAmount: amountToPayNow,
      dueAmount: remainingAtBaseCamp,
      paymentOption,
      paymentMethod,
      bookingDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed & Boarding Pass Ready',
      leadGuide: 'Squad Leader Deepak Rawat (NIM Certified)',
      emergencySos: 'Uttarakhand 24x7 Helpline: 1070 / 112',
      pnr: bookingId
    };

    setConfirmedBookingData(newBooking);
    setIsSuccess(true);

    if (onConfirmBooking) {
      onConfirmBooking(newBooking);
    }

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      className="fixed inset-0 z-[100] flex justify-center items-start sm:items-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0C121E] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-amber-500/40 my-3 sm:my-auto max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Fixed Sticky Header with Prominent Close Cross Button */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-slate-50 to-amber-500/10 dark:from-[#0E1729] dark:via-[#090F1C] dark:to-[#0E1729] border-b border-slate-200 dark:border-amber-500/30 flex items-center justify-between shrink-0 shadow-sm z-20">
          <div className="min-w-0 pr-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Guaranteed Departure • 25% Advance Reserve</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black font-serif text-slate-950 dark:text-white leading-tight truncate">
              Book Your Sacred Expedition
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
              Digital QR Boarding Passes • Certified NIM Guides • Zero Middlemen
            </p>
          </div>

          {/* Prominent High-Contrast Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-10 h-10 rounded-2xl bg-slate-200/90 hover:bg-rose-600 hover:text-white dark:bg-white/10 dark:hover:bg-rose-600 text-slate-800 dark:text-slate-200 flex items-center justify-center transition border border-slate-300 dark:border-white/15 cursor-pointer shadow-md group shrink-0"
            title="Close (Esc)"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleCompleteBooking} className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Scrollable Form Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
              
              {/* EXPEDITION / DESTINATION SELECTOR */}
              <div className="p-3.5 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-500/30 space-y-1.5">
                <label className="block text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Choose Expedition or Destination:</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% Live Departures</span>
                </label>
                
                <select
                  value={bookingMode === 'tour' ? selectedTour.id : selectedLocation.id}
                  onChange={(e) => {
                    const val = e.target.value;
                    const tourFound = UTTARAKHAND_TOUR_PLANS.find(p => p.id === val);
                    if (tourFound) {
                      setBookingMode('tour');
                      setSelectedTour(tourFound);
                      setSelectedBatch(tourFound.batchDates?.[0] || '15 Dec 2026');
                    } else {
                      const destFound = DESTINATIONS.find(d => d.id === val);
                      if (destFound) {
                        setBookingMode('destination');
                        setSelectedLocation(destFound);
                      }
                    }
                  }}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-amber-500/40 focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer shadow-sm"
                >
                  <optgroup label="🏔️ Curated Himalayan Expeditions (Tour Plans)">
                    {UTTARAKHAND_TOUR_PLANS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.duration}) — ₹{p.pricePerPerson.toLocaleString('en-IN')}/person
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🛕 Sacred Mountain Valleys & Shrines">
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.region}) — From ₹{d.startingPrice.toLocaleString('en-IN')}/person
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

            {/* PACKAGE HIGHLIGHT BANNER */}
            <div className="p-4 bg-slate-50 dark:bg-gradient-to-br dark:from-[#121A2C] dark:to-[#0A0F1A] rounded-2xl border border-amber-500/30 space-y-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative border border-slate-300 dark:border-white/20">
                  <img
                    src={isTourPlan ? selectedTour.image : selectedLocation.image}
                    alt={isTourPlan ? selectedTour.title : selectedLocation.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 px-1 py-0.5 bg-black/80 text-amber-300 text-[8px] font-bold rounded-tl">
                    {isTourPlan ? selectedTour.grade : selectedLocation.region?.split(' ')[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-950 dark:text-white text-base truncate font-serif">
                      {isTourPlan ? selectedTour.title : selectedLocation.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30 flex-shrink-0">
                      ₹{baseRate.toLocaleString('en-IN')}/person
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">
                    {isTourPlan ? selectedTour.subtitle : selectedLocation.tagline}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-amber-700 dark:text-amber-300/90 mt-1">
                    <span>⏱️ {isTourPlan ? selectedTour.duration : '5 Days / 4 Nights'}</span>
                    <span>•</span>
                    <span>⛰️ {isTourPlan ? selectedTour.altitude : selectedLocation.altitude}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 100% Satvik Meals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 1: BATCH DEPARTURE DATE SELECTOR */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block flex items-center justify-between">
                <span>1. Select Guaranteed Departure Batch</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 lowercase font-medium">Fixed departures or custom</span>
              </span>

              {isTourPlan && selectedTour.batchDates && selectedTour.batchDates.length > 0 ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {selectedTour.batchDates.map((batch, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedBatch(batch);
                          setIsCustomDate(false);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          !isCustomDate && selectedBatch === batch
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                            : 'bg-white dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{batch}</span>
                        </div>
                        {idx === 0 && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-extrabold flex-shrink-0 ml-1">
                            Fast
                          </span>
                        )}
                      </button>
                    ))}

                    {/* Custom Date Option */}
                    <button
                      type="button"
                      onClick={() => setIsCustomDate(true)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isCustomDate
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                          : 'bg-white dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400/40'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Custom Date</span>
                    </button>
                  </div>

                  {isCustomDate && (
                    <div className="pt-2 grid grid-cols-2 gap-2 animate-in fade-in">
                      <div>
                        <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Return Date</label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Departure Date</label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Return Date</label>
                    <input
                      type="date"
                      required
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: TRAVELERS COUNT */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                2. Number of Travelers
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Adults (12+ yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Children (&lt;12 yrs - 50% Off)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 3: HIGH ALTITUDE & EXPEDITION ADD-ONS */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                3. Optional Mountain Add-ons
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-amber-50 dark:hover:bg-white/5 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addonMule}
                      onChange={(e) => setAddonMule(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">🐴 Dedicated Mule / Pony</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Backpack offloading assistance</div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-600 dark:text-amber-300 text-[11px]">+₹3,500</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-amber-50 dark:hover:bg-white/5 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addonGearKit}
                      onChange={(e) => setAddonGearKit(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">🦯 Trek Pole &amp; Microspikes</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Rental gear kit for icy trails</div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-600 dark:text-amber-300 text-[11px]">+₹999</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-amber-50 dark:hover:bg-white/5 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addonPhotography}
                      onChange={(e) => setAddonPhotography(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">📸 Drone &amp; Trail Photo Album</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">4K summit drone reels</div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-600 dark:text-amber-300 text-[11px]">+₹1,999</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-amber-50 dark:hover:bg-white/5 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addonOxygen}
                      onChange={(e) => setAddonOxygen(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">🫁 Emergency O2 Canister</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Portable medical cylinder</div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-600 dark:text-amber-300 text-[11px]">+₹1,200</span>
                </label>

              </div>
            </div>

            {/* STEP 4: PRIMARY TRAVELER DETAILS */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                4. Primary Traveler &amp; Hill SOS Contact
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-300 mb-0.5">Full Name (As on Govt ID)</label>
                  <input
                    type="text"
                    required
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-white/15 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-300 mb-0.5">Email (For Digital Boarding Pass)</label>
                  <input
                    type="email"
                    required
                    value={travelerEmail}
                    onChange={(e) => setTravelerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-white/15 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-300 mb-0.5">Mobile Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={travelerPhone}
                    onChange={(e) => setTravelerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-white/15 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-300 mb-0.5">Emergency SOS Contact</label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-white/15 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* STEP 5: PAYMENT PREFERENCE (ADVANCE VS FULL) */}
            <div className="p-4 bg-amber-50/80 dark:bg-[#0A1222] rounded-2xl border-2 border-amber-300 dark:border-amber-500/40 shadow-sm space-y-3">
              <span className="text-xs font-black text-amber-950 dark:text-amber-300 uppercase tracking-wider block">
                5. Flexible Payment Structure
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 25% Advance Option */}
                <div
                  onClick={() => setPaymentOption('advance')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    paymentOption === 'advance'
                      ? 'bg-white dark:bg-[#131F38] border-amber-500 text-slate-900 dark:text-white shadow-md'
                      : 'bg-white/80 dark:bg-[#060A14] border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-amber-800 dark:text-amber-300">Option A: Pay 25% Advance</span>
                    <span className={`w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] font-black ${paymentOption === 'advance' ? 'bg-amber-500 text-slate-950' : 'text-transparent'}`}>
                      ✓
                    </span>
                  </div>
                  <div className="text-base font-black text-slate-950 dark:text-white font-serif">
                    ₹{Math.round(grandTotal * 0.25).toLocaleString('en-IN')} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">due now</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                    Pay balance ₹{Math.round(grandTotal * 0.75).toLocaleString('en-IN')} upon arrival at base camp.
                  </p>
                </div>

                {/* 100% Full Payment Option */}
                <div
                  onClick={() => setPaymentOption('full')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    paymentOption === 'full'
                      ? 'bg-white dark:bg-[#0E231C] border-emerald-500 text-slate-950 dark:text-white shadow-md'
                      : 'bg-white/80 dark:bg-[#060A14] border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Option B: Pay 100% Full</span>
                    <span className={`w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black ${paymentOption === 'full' ? 'bg-emerald-500 text-white' : 'text-transparent'}`}>
                      ✓
                    </span>
                  </div>
                  <div className="text-base font-black text-emerald-700 dark:text-emerald-400 font-serif">
                    ₹{grandTotal.toLocaleString('en-IN')} <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold">(₹500 OFF Applied)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                    Complete trip payment upfront. Zero payment needed on mountain trail.
                  </p>
                </div>

              </div>

              {/* Payment Method Selector */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    paymentMethod === 'upi' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'bg-white dark:bg-[#060A14] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-[#131F38]'
                  }`}
                >
                  ⚡ Instant UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'bg-white dark:bg-[#060A14] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-[#131F38]'
                  }`}
                >
                  💳 Debit / Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    paymentMethod === 'netbanking' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'bg-white dark:bg-[#060A14] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-[#131F38]'
                  }`}
                >
                  🏦 Net Banking
                </button>
              </div>
            </div>

            </div>

            {/* Sticky Bottom Summary & Submission Bar */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#080E1B] border-t border-slate-200 dark:border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 shadow-lg z-20">
              <div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 uppercase font-black block">
                  Amount Due Today
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-serif text-amber-600 dark:text-amber-400">
                    ₹{amountToPayNow.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    (Total: ₹{grandTotal.toLocaleString('en-IN')})
                  </span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                  ✓ Instant QR Pass Generated • Free Date Reschedule Guarantee
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-300 dark:border-white/20 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Reserve Seat &amp; Get Pass</span>
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* CONFIRMED EXPEDITION BOARDING PASS SCREEN */
          <div className="overflow-y-auto flex-1 p-5 sm:p-7 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-500 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Seat Reserved &amp; Biometric Clearance Issued
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-950 dark:text-white mt-2">
                SwargBhraman Expedition Boarding Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
                Your reservation for <strong>{confirmedBookingData?.packageTitle}</strong> is active. Save your official QR boarding pass below.
              </p>
            </div>

            {/* Travel Pass Ticket Card */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950/90 border-2 border-dashed border-amber-500/40 rounded-3xl text-left font-sans space-y-4 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Booking PNR</span>
                  <span className="text-sm font-black text-amber-600 dark:text-amber-300 font-mono tracking-wider">{confirmedBookingData?.pnr}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Status</span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px]">
                    VERIFIED EXPEDITION
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg text-slate-950 dark:text-white font-serif leading-tight">
                  {confirmedBookingData?.packageTitle}
                </h4>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                  📍 {confirmedBookingData?.destination}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-white dark:bg-white/[0.03] p-3 rounded-xl border border-slate-200 dark:border-white/5">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Departure Batch</span>
                  <span className="font-bold text-slate-900 dark:text-white">{confirmedBookingData?.travelDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Travelers</span>
                  <span className="font-bold text-slate-900 dark:text-white">{confirmedBookingData?.travelers} Guests</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Lead Explorer</span>
                  <span className="font-bold text-slate-900 dark:text-white">{confirmedBookingData?.travelerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Assigned Guide</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{confirmedBookingData?.leadGuide}</span>
                </div>
              </div>

              {/* QR and Payment details */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Amount Paid Today:</span>
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-serif">
                    ₹{confirmedBookingData?.paidAmount?.toLocaleString('en-IN')}
                  </span>
                  {confirmedBookingData?.dueAmount > 0 && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                      (₹{confirmedBookingData?.dueAmount?.toLocaleString('en-IN')} due at base camp)
                    </span>
                  )}
                </div>

                <div className="p-2 rounded-xl bg-white text-slate-950 text-center shadow flex flex-col items-center border border-slate-200">
                  <QrCode className="w-12 h-12 text-slate-950" />
                  <span className="text-[8px] font-mono font-bold mt-0.5">SCAN PASS</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 pt-2 flex items-center justify-between">
                <span>🛰️ Emergency Helpline: 1070 / 112</span>
                <span className="text-amber-600 dark:text-amber-300 font-semibold">24x7 Satellite Support</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-300 dark:border-white/15 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Print Official Pass PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-black transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/40 cursor-pointer"
              >
                <span>Done &amp; Close</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
