import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Calendar, Users, MapPin, Sparkles, CheckCircle2, ShieldCheck, 
  Printer, CreditCard, ArrowRight, Mountain, Compass, ChevronDown, Check
} from 'lucide-react';
import { DESTINATIONS } from '../data/mockData';
import { handleImageError } from '../utils/imageFallback';

// Curated list of all Uttarakhand booking locations & circuits
const ALL_UTTARAKHAND_LOCATIONS = [
  ...DESTINATIONS.map(d => ({
    id: d.id,
    name: d.name,
    region: d.region,
    tagline: d.tagline,
    altitude: d.altitude,
    category: d.category,
    price: d.startingPrice,
    image: d.image,
    highlights: d.highlights
  })),
  {
    id: 'dest-jageshwar',
    name: 'Jageshwar Dham',
    region: 'Kumaon (Almora)',
    tagline: '124 Ancient Nagara Stone Temples in Deodar Forest',
    altitude: '1,870 m',
    category: 'Spiritual & Heritage',
    price: 3600,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    highlights: ['124 Ancient Shrines', 'Deodar Forest Meditation', 'Panch Kedar Connection']
  },
  {
    id: 'dest-tehri',
    name: 'Tehri Lake & Floating Huts',
    region: 'Garhwal',
    tagline: 'Asia’s Largest Hydro Dam & Emerald Water Sports Arena',
    altitude: '1,750 m',
    category: 'Water Sports & Adventure',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Jet Ski & Speed Boating', 'Floating Eco Cottages', 'New Tehri Viewpoints']
  },
  {
    id: 'dest-lansdowne',
    name: 'Lansdowne & Pine Ridges',
    region: 'Garhwal (Pauri)',
    tagline: 'Pristine British Cantonment & Quiet Blue Pine Trails',
    altitude: '1,706 m',
    category: 'Quiet Hill Station',
    price: 3900,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Bhulla Tal Lake', 'Tip-in-Top Sunset Point', 'St. John’s Heritage Church']
  }
];

export default function BookingModal({
  isOpen,
  onClose,
  initialData = {},
  onConfirmBooking
}) {
  if (!isOpen) return null;

  // Selected Location State
  const initialLocName = initialData.name || initialData.title || initialData.location || '';
  const matchingLoc = ALL_UTTARAKHAND_LOCATIONS.find(loc => 
    loc.name.toLowerCase().includes(initialLocName.toLowerCase()) ||
    initialLocName.toLowerCase().includes(loc.name.toLowerCase())
  ) || ALL_UTTARAKHAND_LOCATIONS[0];

  const [selectedLocation, setSelectedLocation] = useState(matchingLoc);
  const [regionFilter, setRegionFilter] = useState('All');
  const [locationSearch, setLocationSearch] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  // When initialData changes, update if provided
  useEffect(() => {
    if (initialData.name || initialData.title) {
      const match = ALL_UTTARAKHAND_LOCATIONS.find(loc => 
        loc.name.toLowerCase().includes((initialData.name || initialData.title).toLowerCase()) ||
        (initialData.name || initialData.title).toLowerCase().includes(loc.name.toLowerCase())
      );
      if (match) setSelectedLocation(match);
    }
  }, [initialData]);

  const [travelDate, setTravelDate] = useState('2026-12-10');
  const [returnDate, setReturnDate] = useState('2026-12-15');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [stayType, setStayType] = useState('homestay');
  const [pickupCity, setPickupCity] = useState('Kathgodam Railway Station');

  const [travelerName, setTravelerName] = useState('Priyanshu Singh Mahar');
  const [travelerEmail, setTravelerEmail] = useState('priyanshu@example.com');
  const [travelerPhone, setTravelerPhone] = useState('+91 98765 43210');

  const [addonAipan, setAddonAipan] = useState(true);
  const [addonCooking, setAddonCooking] = useState(false);
  const [addonBalMithaiBox, setAddonBalMithaiBox] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Dynamic base price derived from currently chosen location
  const basePricePerPerson = selectedLocation.price || 4500;
  
  const stayMultipliers = {
    homestay: 1.0,
    camp: 0.9,
    resort: 1.45
  };

  const stayLabels = {
    homestay: 'Traditional Pahadi Stone Homestay (With Local Family)',
    camp: 'Riverside / Alpine Glamping Tent',
    resort: 'Himalayan Pine Wooden Eco-Chalet'
  };

  const calculatedBase = basePricePerPerson * adults * stayMultipliers[stayType];
  const calculatedChild = basePricePerPerson * 0.5 * children * stayMultipliers[stayType];
  
  const addonAipanCost = addonAipan ? 750 * adults : 0;
  const addonCookingCost = addonCooking ? 500 * adults : 0;
  const addonMithaiCost = addonBalMithaiBox ? 450 : 0;
  const greenCess = 150;

  const grandTotal = Math.round(calculatedBase + calculatedChild + addonAipanCost + addonCookingCost + addonMithaiCost + greenCess);

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setIsLocationDropdownOpen(false);
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();

    const bookingId = `UK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: bookingId,
      packageTitle: `${selectedLocation.name} Mountain Expedition`,
      destination: `${selectedLocation.name} (${selectedLocation.region})`,
      travelDate,
      returnDate,
      travelers: adults + children,
      travelerName,
      travelerEmail,
      travelerPhone,
      stayType: stayLabels[stayType],
      artisanWorkshop: addonAipan ? '3-Hour Sacred Aipan Painting Masterclass' : 'None',
      totalPrice: grandTotal,
      status: 'CONFIRMED',
      bookingDate: new Date().toISOString().split('T')[0],
      qrCode: `PAHADI-PASS-${bookingId}`,
      pickupLocation: pickupCity,
      contactPerson: 'Meenakshi Joshi & Pahadi Host Guild (+91 94120 48219)',
      image: selectedLocation.image
    };

    try {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setConfirmedBookingData(newBooking);
    setIsSuccess(true);
    onConfirmBooking(newBooking);
  };

  const filteredLocations = ALL_UTTARAKHAND_LOCATIONS.filter(loc => {
    const matchesRegion = regionFilter === 'All' || loc.region.includes(regionFilter);
    const matchesSearch = loc.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
                          loc.tagline.toLowerCase().includes(locationSearch.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Container with Midnight Slate & Warm Gold Theme */}
      <div className="bg-[#0C121E] text-slate-100 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-amber-500/25 relative my-6 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-base font-bold w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition border border-white/10"
        >
          ✕
        </button>

        {!isSuccess ? (
          <form onSubmit={handleCompleteBooking} className="space-y-5">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Guaranteed Direct Booking • 0% Middleman Fee
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Book Your Uttarakhand Expedition
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize your dates, pick your mountain stay, and choose from authentic Uttarakhand circuits.
              </p>
            </div>

            {/* LOCATION SELECTOR SECTION (Featured Highlight) */}
            <div className="p-4 bg-gradient-to-br from-[#121A2C] to-[#0A0F1A] rounded-2xl border border-amber-400/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>1. Select Destination / Location</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {ALL_UTTARAKHAND_LOCATIONS.length} Circuits Available
                </span>
              </div>

              {/* Selected Destination Card / Trigger */}
              <div 
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-amber-400/50 cursor-pointer transition group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/20">
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <span className="absolute bottom-0 right-0 px-1 py-0.5 bg-black/80 text-amber-300 text-[8px] font-bold rounded-tl">
                    {selectedLocation.region.split(' ')[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base truncate font-serif">
                      {selectedLocation.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex-shrink-0">
                      ₹{selectedLocation.price.toLocaleString('en-IN')}/person
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    {selectedLocation.tagline}
                  </p>
                  <p className="text-[10px] text-amber-300/80 mt-0.5 flex items-center gap-2">
                    <span>🏔️ {selectedLocation.altitude}</span>
                    <span>•</span>
                    <span className="text-sky-300">{selectedLocation.category}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 group-hover:bg-amber-500/30 transition flex-shrink-0">
                  <span>Change</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Collapsible Location Selector Dropdown Grid */}
              {isLocationDropdownOpen && (
                <div className="pt-3 border-t border-white/10 space-y-2.5 animate-in slide-in-from-top-2">
                  {/* Search & Region Filter Bar */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Search Kedarnath, Chopta, Nainital, Auli..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <div className="flex gap-1 overflow-x-auto pb-1">
                      {['All', 'Garhwal', 'Kumaon'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRegionFilter(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                            regionFilter === r
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-white/10 text-slate-300 hover:bg-white/15'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Location List */}
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                    {filteredLocations.map(loc => (
                      <div
                        key={loc.id}
                        onClick={() => handleSelectLocation(loc)}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition text-xs ${
                          selectedLocation.id === loc.id
                            ? 'bg-amber-500/20 border border-amber-400 text-white font-bold'
                            : 'bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={loc.image}
                            alt={loc.name}
                            onError={handleImageError}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="truncate">
                            <div className="font-bold text-white flex items-center gap-1.5 truncate">
                              <span>{loc.name}</span>
                              <span className="text-[10px] text-slate-400 font-normal">({loc.region})</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">{loc.tagline}</div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 ml-2">
                          <span className="font-extrabold text-amber-300 block">
                            ₹{loc.price.toLocaleString('en-IN')}
                          </span>
                          {selectedLocation.id === loc.id && (
                            <span className="text-[10px] text-amber-400 flex items-center gap-0.5 justify-end">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Dates & Travelers */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/10 space-y-3.5">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                2. Trip Schedule & Guests
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-white/15 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Return Date</label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-white/15 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Adult Travelers (12+ yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-white/15 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Children (Under 12 - 50% Off)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-white/15 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Stay Type Selection */}
            <div>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                3. Choose Mountain Stay Experience
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'homestay', label: 'Pahadi Homestay', desc: 'Woodfire cooking, family-run' },
                  { id: 'camp', label: 'Alpine Glamping', desc: 'Riverside & starlight camp' },
                  { id: 'resort', label: 'Pine Chalet', desc: 'Luxury heated eco-lodge' },
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStayType(s.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      stayType === s.id
                        ? 'bg-amber-500/15 border-amber-400 text-white font-bold shadow'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.label}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Cultural Add-ons */}
            <div>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                4. Cultural Add-ons Supporting Native Artisans
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/10 cursor-pointer hover:bg-white/5">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addonAipan}
                      onChange={(e) => setAddonAipan(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-white">
                        🎨 3-Hour Hands-on Aipan Folk Art Masterclass
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Take home your hand-painted pine wood sacred mandala
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-300">+₹750 / person</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/10 cursor-pointer hover:bg-white/5">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addonBalMithaiBox}
                      onChange={(e) => setAddonBalMithaiBox(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-white">
                        🍬 GI-Certified Almora Bal Mithai Souvenir Box (500g)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Freshly roasted roasted-khoya balls with sugar spheres
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-400">+₹450</span>
                </label>
              </div>
            </div>

            {/* Step 5: Primary Traveler Details */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/10 space-y-3 text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wider block">
                5. Traveler Contact & Pickup
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-0.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-white/15 rounded-lg bg-slate-950 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-0.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={travelerEmail}
                    onChange={(e) => setTravelerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-white/15 rounded-lg bg-slate-950 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-0.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={travelerPhone}
                    onChange={(e) => setTravelerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-white/15 rounded-lg bg-slate-950 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 mb-0.5">Transit Pickup Hub</label>
                <select
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-white/15 rounded-lg bg-slate-950 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Kathgodam Railway Station">Kathgodam Railway Station (Gateway to Kumaon)</option>
                  <option value="Dehradun Jolly Grant Airport">Dehradun Jolly Grant Airport (Gateway to Garhwal)</option>
                  <option value="Haridwar Junction">Haridwar Railway Junction</option>
                  <option value="Rishikesh Bus Stand">Rishikesh ISBT</option>
                  <option value="Self Drive / Direct Arrival">I will travel directly to the destination</option>
                </select>
              </div>
            </div>

            {/* Price Summary & Submit Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Grand Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-serif text-amber-400">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({adults + children} Traveler{adults + children > 1 ? 's' : ''})
                  </span>
                </div>
                <span className="text-[10px] text-amber-300 block mt-0.5">
                  ✓ Pay ₹0 now • Free cancellation up to 48 hrs before departure
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 border border-white/20 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-xl transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Confirm Booking & Get Pass</span>
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* Confirmation Pass Screen */
          <div className="text-center py-4 space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                Booking Confirmed & Verified
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-2">
                PahadiVibe Travel Pass Issued!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                A digital pass and local host details have been confirmed for <strong>{confirmedBookingData.destination}</strong>.
              </p>
            </div>

            {/* Travel Pass Ticket Card */}
            <div className="p-6 bg-slate-950/80 border-2 border-dashed border-amber-500/40 rounded-2xl text-left font-sans space-y-4 max-w-lg mx-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pass ID</span>
                  <span className="text-sm font-extrabold text-amber-300 font-mono">{confirmedBookingData.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                  <span className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                    VERIFIED PASS
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg text-white font-serif leading-tight">
                  {confirmedBookingData.packageTitle}
                </h4>
                <p className="text-xs text-amber-400 mt-0.5">
                  📍 {confirmedBookingData.destination}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Travel Dates</span>
                  <span className="font-bold text-white">{confirmedBookingData.travelDate} to {confirmedBookingData.returnDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Travelers</span>
                  <span className="font-bold text-white">{confirmedBookingData.travelers} Guests</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mountain Stay</span>
                  <span className="font-bold text-white truncate block">{confirmedBookingData.stayType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Amount</span>
                  <span className="font-extrabold text-amber-300 font-mono">₹{confirmedBookingData.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300">
                <span className="font-bold text-amber-300 block mb-0.5">Artisan Coordination & Host:</span>
                <span>{confirmedBookingData.contactPerson}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Verification Pass Code</span>
                  <span className="font-mono text-[11px] text-amber-300">{confirmedBookingData.qrCode}</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                  <span className="font-mono font-bold text-slate-950 text-xs">QR</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 border border-white/20 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span>Print Travel Pass</span>
              </button>
              
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md transition"
              >
                Done / View My Bookings
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
