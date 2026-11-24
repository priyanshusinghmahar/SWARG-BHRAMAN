import React, { useState } from 'react';
import { 
  Calendar, MapPin, Compass, Clock, Award, CheckCircle2, 
  XCircle, ChevronDown, ChevronUp, Printer, ArrowRight, Sparkles, Filter,
  Star, ShieldCheck, Flame, Users, Tag, AlertCircle, ShoppingBag, Check
} from 'lucide-react';
import { UTTARAKHAND_TOUR_PLANS, TOUR_PLAN_CATEGORIES } from '../data/tourPlansData';
import EmptyState from './EmptyState';

export default function TourPlansSection({ tourPlans, onOpenBookingModal }) {
  const allPlans = tourPlans && tourPlans.length > 0 ? tourPlans : UTTARAKHAND_TOUR_PLANS;
  const [selectedCategory, setSelectedCategory] = useState('All Tour Plans');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('All Durations');
  const [sortBy, setSortBy] = useState('featured');
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 'tour-chardham-10d-1': true, 'tour-chardham-10d-2': true });

  const toggleDay = (planId, dayNum) => {
    const key = `${planId}-${dayNum}`;
    setExpandedDays(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBookTour = (tour, selectedBatch = null) => {
    if (onOpenBookingModal) {
      onOpenBookingModal({
        id: tour.id,
        title: tour.title,
        pricePerPerson: tour.pricePerPerson,
        originalPrice: tour.originalPrice,
        startingPrice: tour.pricePerPerson,
        duration: tour.duration,
        daysCount: tour.daysCount,
        region: tour.pickupDrop,
        location: tour.subtitle,
        image: tour.image,
        altitude: tour.altitude,
        grade: tour.grade,
        batchDates: tour.batchDates,
        selectedBatch: selectedBatch || tour.batchDates?.[0] || 'Flexible Date',
        depositPercent: tour.depositPercent || 25,
        seatsLeft: tour.seatsLeft
      });
    }
  };

  // Filter and sort logic
  let filteredPlans = allPlans.filter(plan => {
    const matchesCategory = selectedCategory === 'All Tour Plans' || plan.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.overview.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDuration = true;
    if (selectedDuration === 'Weekend (2-3 Days)') matchesDuration = plan.daysCount <= 3;
    else if (selectedDuration === 'Short Trek (4-5 Days)') matchesDuration = plan.daysCount >= 4 && plan.daysCount <= 5;
    else if (selectedDuration === 'Expedition (6-10 Days)') matchesDuration = plan.daysCount >= 6;

    return matchesCategory && matchesSearch && matchesDuration;
  });

  if (sortBy === 'price-low') {
    filteredPlans.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
  } else if (sortBy === 'price-high') {
    filteredPlans.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
  } else if (sortBy === 'rating') {
    filteredPlans.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  } else if (sortBy === 'duration') {
    filteredPlans.sort((a, b) => a.daysCount - b.daysCount);
  }

  return (
    <section id="tour-plans-section" className="py-16 bg-slate-50 dark:bg-[#080D1A] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Himalayan Mountain Background Backdrop (Visible in White & Dark Mode) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-10 pointer-events-none transition-opacity"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=85')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/40 to-white/95 dark:from-[#080D1A]/95 dark:via-[#080D1A]/80 dark:to-[#080D1A] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Verified Himalayan Expeditions • Guaranteed Batches</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white font-serif tracking-tight">
              Curated Tour Plans &amp; Expeditions
            </h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Book certified Himalayan expeditions with verified satvik dining, NIM-trained trek leaders, and instant digital QR boarding passes. Pay only 25% advance to reserve your seat today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free Weather Reschedule</span>
            </span>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/20 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Govt Registered Operators</span>
            </span>
          </div>
        </div>

        {/* Search, Filter & Sort Hub */}
        <div className="bg-white dark:bg-[#0C1527] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 mb-8 space-y-4 shadow-lg dark:shadow-xl transition-colors">
          {/* Row 1: Search and Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Compass className="w-4 h-4 text-amber-500 dark:text-amber-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search expeditions (e.g. Kedarnath, Tungnath, Auli, Flowers...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="All Durations">All Durations (Any Days)</option>
                <option value="Weekend (2-3 Days)">Weekend (2-3 Days)</option>
                <option value="Short Trek (4-5 Days)">Short Trek (4-5 Days)</option>
                <option value="Expedition (6-10 Days)">Expedition (6-10 Days)</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">Sort By: Featured &amp; Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="duration">Duration (Shortest First)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-200 dark:border-white/5">
            {TOUR_PLAN_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6">
          <span>Showing <strong>{filteredPlans.length}</strong> Guaranteed Expeditions</span>
          <span>⚡ Instant Seat Confirmation with QR Boarding Pass</span>
        </div>

        {/* Tour Plans Cards Stack */}
        <div className="space-y-8">
          {filteredPlans.length === 0 ? (
            <EmptyState
              icon={Compass}
              title="No Expeditions Found"
              description={`No tour itineraries match "${searchQuery || selectedCategory}". Reset filters or search for another destination.`}
              actionLabel="View All Expeditions"
              onAction={() => { setSearchQuery(''); setSelectedCategory('All Tour Plans'); }}
            />
          ) : (
            filteredPlans.map(tour => {
            const isPlanExpanded = expandedPlanId === tour.id;
            const advanceDeposit = Math.round(tour.pricePerPerson * (tour.depositPercent / 100));

            return (
              <div
                key={tour.id}
                className="bg-white dark:bg-[#0C1527] rounded-3xl border border-slate-200 dark:border-white/10 hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-lg dark:shadow-2xl"
              >
                {/* Tour Main Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                  
                  {/* Photo Preview (4 Cols) */}
                  <div className="lg:col-span-4 relative rounded-2xl overflow-hidden h-64 lg:h-80 shadow-lg group">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge, Discount & Seats Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none z-10">
                      <div className="flex flex-col gap-1.5 items-start max-w-[50%] pointer-events-auto">
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-lg uppercase tracking-wider truncate">
                          {tour.badge || 'Govt Certified'}
                        </span>
                        {tour.discount && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] shadow truncate">
                            {tour.discount}
                          </span>
                        )}
                      </div>

                      {/* Seats urgency badge */}
                      {tour.seatsLeft && (
                        <div className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white font-bold text-[10px] backdrop-blur-md border border-rose-400/50 flex items-center gap-1 shadow flex-shrink-0 pointer-events-auto">
                          <Flame className="w-3 h-3 text-amber-300 animate-pulse" />
                          <span>Only {tour.seatsLeft} Seats Left!</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom overlay: Duration & Altitude */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                      <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{tour.duration}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 font-semibold flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-sky-400" />
                        <span>{tour.altitude.split(' ')[0]}</span>
                      </span>
                    </div>
                  </div>

                  {/* Tour Meta & Commercial Highlights (5 Cols) */}
                  <div className="lg:col-span-5 space-y-3.5">
                    
                    {/* Rating & Category */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-400/20 border border-amber-300 dark:border-amber-400/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 dark:text-amber-400" />
                        <span>{tour.rating || 4.95}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">({tour.reviewsCount || 120} reviews)</span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        • {tour.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-950 dark:text-white leading-snug">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-1">
                        {tour.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tour.overview}
                    </p>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300 pt-1">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                        <span className="truncate">Pickup: <strong>{tour.pickupDrop}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                        <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="truncate">Grade: <strong>{tour.grade}</strong></span>
                      </div>
                    </div>

                    {/* Inclusions summary pills */}
                    {tour.inclusionsSummary && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {tour.inclusionsSummary.map((inc, i) => (
                          <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-400" />
                            <span>{inc}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Next Guaranteed Batches */}
                    {tour.batchDates && tour.batchDates.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 dark:border-white/5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block mb-1">
                          Upcoming Guaranteed Batches:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {tour.batchDates.slice(0, 3).map((batch, bIdx) => (
                            <button
                              key={bIdx}
                              onClick={() => handleBookTour(tour, batch)}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/25 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>{batch}</span>
                            </button>
                          ))}
                          {tour.batchDates.length > 3 && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              +{tour.batchDates.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Commercial Booking CTAs (3 Cols) */}
                  <div className="lg:col-span-3 bg-slate-50 dark:bg-black/40 rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-inner">
                    
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400 font-serif">
                          ₹{tour.pricePerPerson.toLocaleString('en-IN')}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{tour.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 block mt-0.5">
                        Per Person (All Stays, Meals &amp; Permits Included)
                      </span>

                      {/* Advance Deposit Tag */}
                      <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>Reserve with ₹{advanceDeposit.toLocaleString('en-IN')} (25% advance)</span>
                      </div>
                    </div>

                    {/* Commercial Buttons */}
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleBookTour(tour)}
                        className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Book / Reserve Seat</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedPlanId(isPlanExpanded ? null : tour.id)}
                        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-white/10 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{isPlanExpanded ? 'Hide Route Details' : 'View Day-by-Day Itinerary'}</span>
                        {isPlanExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center space-y-0.5">
                      <p>🔒 256-bit Secure Reservation</p>
                      <p>🧾 Instant QR Boarding Pass</p>
                    </div>

                  </div>

                </div>

                {/* Day-by-Day Itinerary Accordion View */}
                {isPlanExpanded && (
                  <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090F1C] p-6 sm:p-8 animate-in slide-in-from-top-4 duration-300">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10 gap-3">
                      <div>
                        <h4 className="text-lg font-bold font-serif text-slate-950 dark:text-white flex items-center gap-2">
                          <span>🧭 Complete {tour.daysCount}-Day Certified Itinerary</span>
                          <span className="text-xs text-amber-700 dark:text-amber-400 font-mono">({tour.altitude})</span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          Carefully paced altitude acclimatization and scenic waypoint schedule.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-300 dark:border-white/10 cursor-pointer shadow-sm dark:shadow-none"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Print Itinerary PDF</span>
                        </button>
                        
                        <button
                          onClick={() => handleBookTour(tour)}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black transition flex items-center gap-1 shadow cursor-pointer"
                        >
                          <span>Reserve This Plan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Day-by-Day Timeline */}
                    <div className="mt-6 space-y-4">
                      {tour.itinerary.map(dayPlan => {
                        const dayKey = `${tour.id}-${dayPlan.day}`;
                        const isDayOpen = expandedDays[dayKey] ?? true;

                        return (
                          <div
                            key={dayPlan.day}
                            className="bg-white dark:bg-[#0D1629] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition shadow-sm dark:shadow-none"
                          >
                            <button
                              onClick={() => toggleDay(tour.id, dayPlan.day)}
                              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] text-left transition cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 shadow">
                                  D{dayPlan.day}
                                </span>
                                <div>
                                  <h5 className="font-bold text-sm text-slate-950 dark:text-white">
                                    {dayPlan.title}
                                  </h5>
                                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    <span>📍 {dayPlan.distance}</span>
                                    <span>⛰️ {dayPlan.altitude}</span>
                                    <span>🏨 {dayPlan.stay}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-slate-500 dark:text-slate-400">
                                {isDayOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </button>

                            {isDayOpen && (
                              <div className="px-4 pb-4 pt-1 border-t border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 space-y-2.5">
                                <p className="leading-relaxed bg-slate-50 dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                                  {dayPlan.activities}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-[11px] text-amber-700 dark:text-amber-300">
                                  <span>🥗 <strong>Meal Plan:</strong> {dayPlan.meals}</span>
                                  <span>🏨 <strong>Stay:</strong> {dayPlan.stay}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Inclusions & Exclusions Grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-slate-200 dark:border-white/10">
                      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1524] border border-emerald-300 dark:border-emerald-500/20 space-y-2.5 shadow-sm dark:shadow-none">
                        <h5 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Guaranteed Inclusions</span>
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                          {tour.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1524] border border-rose-300 dark:border-rose-500/20 space-y-2.5 shadow-sm dark:shadow-none">
                        <h5 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          <span>Not Included (Transparent Pricing)</span>
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                          {tour.exclusions.map((exc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-rose-600 dark:text-rose-400 mt-0.5">✕</span>
                              <span>{exc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom CTA in Itinerary View */}
                    <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 dark:bg-gradient-to-r dark:from-amber-500/15 dark:to-orange-500/15 border border-amber-300 dark:border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none">
                      <div>
                        <div className="text-sm font-bold text-slate-950 dark:text-white">
                          Ready to embark on this Himalayan journey?
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          Reserve today with ₹{advanceDeposit.toLocaleString('en-IN')} (25% advance). Zero cancellation fee up to 7 days before.
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookTour(tour)}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-amber-950/40 whitespace-nowrap cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Reserve Seat for ₹{tour.pricePerPerson.toLocaleString('en-IN')}</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          }))}
        </div>

        {/* 100% SwargBhraman Expedition Guarantee Strip */}
        <div className="mt-16 bg-white dark:bg-gradient-to-r dark:from-[#0C1527] dark:via-[#101C35] dark:to-[#0C1527] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-amber-500/30 shadow-xl dark:shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              The SwargBhraman Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-950 dark:text-white mt-1">
              Why 10,000+ Explorers Choose Our Trip Plans
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xl font-bold">
                🏔️
              </div>
              <h4 className="font-bold text-sm text-slate-950 dark:text-white">NIM / HMI Certified Guides</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Trained in high-altitude mountain medicine, search &amp; rescue, and native Himalayan lore.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xl font-bold">
                🛡️
              </div>
              <h4 className="font-bold text-sm text-slate-950 dark:text-white">100% Weather Reschedule</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If landslides or blizzards halt a pass, transfer your trip to any upcoming date with zero penalty.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 flex items-center justify-center text-xl font-bold">
                🥗
              </div>
              <h4 className="font-bold text-sm text-slate-950 dark:text-white">100% Satvik Clean Meals</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hygienic, wholesome, light-on-stomach Pahadi &amp; North Indian food prepared fresh daily on trails.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 flex items-center justify-center text-xl font-bold">
                🪪
              </div>
              <h4 className="font-bold text-sm text-slate-950 dark:text-white">Digital QR Boarding Pass</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Instant digital passes with biometric clearances, hotel vouchers, and 24x7 satellite emergency contacts.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
