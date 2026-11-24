import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, Sparkles, ShieldCheck, CheckCircle2, Award, 
  Printer, ArrowRight, Download, QrCode, Share2, Info, Users 
} from 'lucide-react';
import { SACRED_CAUSES, PRESET_AMOUNTS } from '../data/donationData';
import SwargBhramanLogo from './SwargBhramanLogo';

export default function DonationSection() {
  const [selectedCauseId, setSelectedCauseId] = useState('temple-restoration');
  const [selectedAmount, setSelectedAmount] = useState(1100);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorGotra, setDonorGotra] = useState('');
  const [dedicationMessage, setDedicationMessage] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [needTaxReceipt, setNeedTaxReceipt] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  // Track real donations from localStorage
  const [realDonations, setRealDonations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('swargbraman_donations') || '[]');
    } catch (e) {
      return [];
    }
  });

  const activeCause = SACRED_CAUSES.find(c => c.id === selectedCauseId) || SACRED_CAUSES[0];
  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  // Calculate real metrics per cause
  const getCauseStats = (causeTitle) => {
    const matching = realDonations.filter(d => d.causeTitle === causeTitle);
    const totalRaised = matching.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    return {
      raised: totalRaised,
      donorsCount: matching.length
    };
  };

  const totalAllRaised = realDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0);

  // Find nearest impact description
  const matchingImpact = activeCause.impactTiers?.slice().reverse().find(tier => finalAmount >= tier.amount)
    || activeCause.impactTiers?.[0];

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!donorName) {
      alert('Please enter donor name');
      return;
    }
    if (finalAmount < 51) {
      alert('Minimum donation amount is ₹51');
      return;
    }

    setIsSubmitting(true);

    const receiptId = `DAAN-SB-${Date.now().toString().slice(-7)}`;
    const newCertificate = {
      receiptId,
      donorName,
      donorEmail,
      donorPhone,
      donorGotra: donorGotra || 'Kashyap (Universal Devbhoomi Gotra)',
      dedicationMessage: dedicationMessage || 'For sacred family blessings, peace and preservation of Himalayan heritage',
      amount: finalAmount,
      causeTitle: activeCause.title,
      causeIcon: activeCause.icon,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      panNumber: needTaxReceipt ? panNumber : 'N/A (Standard Seva Daan)',
      shloka: activeCause.shloka,
      shlokaMeaning: activeCause.shlokaMeaning
    };

    setTimeout(() => {
      // Store in localStorage
      const updated = [newCertificate, ...realDonations];
      try {
        localStorage.setItem('swargbraman_donations', JSON.stringify(updated));
      } catch (err) {}

      setRealDonations(updated);
      setIsSubmitting(false);
      setCertificateData(newCertificate);

      // Trigger celebratory festive confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1400);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="donation-section" className="py-16 bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Heart className="w-4 h-4 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400 animate-pulse" />
            <span>Devbhoomi Seva & Sacred Daan Fund</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-serif tracking-tight">
            Preserve Devbhoomi, Support Native Pilgrims
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            "Selfless service purifies the soul" — 100% transparent contributions channeled directly to Himalayan heritage and pilgrim food kitchens.
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-amber-700 dark:text-amber-300 font-semibold shadow-sm">
              <Users className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Real Total Seva Received: <strong className="text-slate-900 dark:text-white">₹{totalAllRaised.toLocaleString('en-IN')}</strong> from <strong className="text-slate-900 dark:text-white">{realDonations.length} genuine pilgrims</strong></span>
            </span>
          </div>
        </div>

        {certificateData ? (
          /* =========================================================================
             OFFICIAL DIGITAL TEMPLE DAAN CERTIFICATE (PRINTABLE & DOWNLOADABLE)
             ========================================================================= */
          <div className="max-w-3xl mx-auto bg-white dark:bg-gradient-to-b dark:from-[#0E1B33] dark:to-[#0A1222] border-2 border-amber-500/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-in fade-in-50">
            
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Certificate Border Frame */}
            <div className="border border-amber-500/40 rounded-2xl p-6 sm:p-8 bg-amber-50/40 dark:bg-[#091120]/90 backdrop-blur-md relative">
              
              {/* Certificate Top Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-500/30 pb-6 text-center sm:text-left">
                <SwargBhramanLogo size="md" />
                <div className="text-center sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 block">
                    Devbhoomi Uttarakhand Sacred Trust
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                    Receipt #{certificateData.receiptId}
                  </span>
                </div>
              </div>

              {/* Certificate Sacred Content */}
              <div className="text-center my-8 space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider inline-block">
                  Certificate of Sacred Contribution • Devbhoomi Trust
                </span>

                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-950 dark:text-white">
                  {certificateData.donorName}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Has made a virtuous offering of{' '}
                  <strong className="text-amber-700 dark:text-amber-400 font-serif text-lg">
                    ₹{certificateData.amount.toLocaleString('en-IN')}
                  </strong>{' '}
                  towards{' '}
                  <strong className="text-slate-900 dark:text-white">
                    {certificateData.causeIcon} {certificateData.causeTitle}
                  </strong>.
                </p>

                {/* Gotra & Dedication Box */}
                <div className="p-4 bg-white dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 max-w-lg mx-auto text-xs text-left space-y-1.5 shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Donor Gotra:</span>
                    <span className="text-amber-700 dark:text-amber-300 font-bold">{certificateData.donorGotra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Date of Daan:</span>
                    <span className="text-slate-700 dark:text-slate-200">{certificateData.date} at {certificateData.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Sankalp / Dedication:</span>
                    <span className="text-slate-700 dark:text-slate-200 italic truncate max-w-[240px]">"{certificateData.dedicationMessage}"</span>
                  </div>
                </div>

                {/* Shloka Highlight */}
                <div className="pt-2">
                  <p className="font-serif text-amber-700 dark:text-amber-300 font-bold text-sm tracking-wide">
                    {certificateData.shloka}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-0.5">
                    "{certificateData.shlokaMeaning}"
                  </p>
                </div>
              </div>

              {/* Seal & Signatures */}
              <div className="pt-6 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Authorized Devbhoomi Heritage Seal</span>
                </div>

                <div className="text-center sm:text-right">
                  <div className="font-serif italic text-amber-700 dark:text-amber-400 text-sm font-bold">
                    SwargBhraman Seva Samiti
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Governing Council, Uttarakhand</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePrintCertificate}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Certificate PDF</span>
              </button>

              <button
                onClick={() => setCertificateData(null)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl transition"
              >
                Make Another Seva Offering
              </button>
            </div>

          </div>
        ) : (
          /* =========================================================================
             DONATION SELECTION & SUBMISSION FORM
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Cause Selection & Impact */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Step 1: Choose Your Sacred Cause
              </span>

              <div className="space-y-3">
                {SACRED_CAUSES.map((cause) => {
                  const isSelected = cause.id === selectedCauseId;
                  const stats = getCauseStats(cause.title);
                  const percentRaised = Math.min(100, Math.round((stats.raised / cause.goal) * 100));

                  return (
                    <div
                      key={cause.id}
                      onClick={() => setSelectedCauseId(cause.id)}
                      className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50 dark:bg-[#0E1E38] border-amber-500 shadow-xl shadow-amber-500/10'
                          : 'bg-white dark:bg-[#0A1222] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl p-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          {cause.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 dark:text-white text-base font-serif">
                              {cause.title}
                            </h4>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-amber-700 dark:text-amber-300/90 mt-0.5 font-medium">
                            {cause.subtitle}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                            {cause.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar (Dynamic from Real Donations) */}
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>
                          Real Raised: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">₹{stats.raised.toLocaleString('en-IN')}</strong> of ₹{cause.goal.toLocaleString('en-IN')}
                        </span>
                        <span className="text-amber-700 dark:text-amber-300 font-bold">{stats.donorsCount} Pilgrim{stats.donorsCount !== 1 ? 's' : ''} ({percentRaised}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 mt-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full"
                          style={{ width: `${Math.max(percentRaised, 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Amount & Donor Information Form */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0C1527] border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 block">
                  Step 2: Sacred Offering Amount
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-950 dark:text-white mt-0.5">
                  Choose Donation (₹)
                </h3>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2.5 rounded-xl font-serif text-sm font-extrabold transition border ${
                      !customAmount && selectedAmount === amt
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-50 dark:bg-black/40 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Or Enter Custom Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min={51}
                    placeholder="Enter custom amount (min ₹51)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white font-serif font-bold focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>
              </div>

              {/* Dynamic Impact Display Box */}
              {matchingImpact && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Direct Real-World Impact:</span>
                    <p className="mt-0.5 leading-snug">{matchingImpact.impact}</p>
                  </div>
                </div>
              )}

              {/* Donor Credentials Form */}
              <form onSubmit={handleDonateSubmit} className="space-y-3.5 pt-2 border-t border-white/10 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                  Step 3: Donor Details for Certificate
                </span>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Singh Mahar"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Gotra / Ancestry (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyap / Bhardwaj"
                      value={donorGotra}
                      onChange={(e) => setDonorGotra(e.target.value)}
                      className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Phone (For Receipt SMS)</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Sankalp / Dedication Message</label>
                  <input
                    type="text"
                    placeholder="e.g. In loving memory of parents / For safe Kedarnath pilgrimage"
                    value={dedicationMessage}
                    onChange={(e) => setDedicationMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* 80G Tax Exemption Toggle */}
                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={needTaxReceipt}
                      onChange={(e) => setNeedTaxReceipt(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 bg-black border-white/20 focus:ring-amber-400"
                    />
                    <span className="font-semibold text-[11px]">Request 80G Tax Exemption Certificate</span>
                  </label>

                  {needTaxReceipt && (
                    <div className="mt-2">
                      <input
                        type="text"
                        maxLength={10}
                        placeholder="Enter PAN Number (e.g. ABCDE1234F)"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 bg-black/50 border border-amber-400/40 rounded-xl text-white uppercase font-mono text-xs focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Generating Sacred Certificate...</span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
                        <span>Contribute ₹{finalAmount.toLocaleString('en-IN')} & Get Certificate</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-2">
                    Instant UPI QR, Card & Netbanking supported • Secure 256-bit encryption
                  </p>
                </div>

              </form>

            </div>

          </div>
        )}

        {/* Real Devbhoomi Donors Wall */}
        {realDonations.length > 0 && (
          <div className="mt-14 p-6 sm:p-8 bg-[#0C1527] border border-amber-500/25 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                  Transparent Seva Register
                </span>
                <h4 className="text-xl font-bold font-serif text-white">
                  Recent Devbhoomi Donors ({realDonations.length})
                </h4>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-bold">100% Real Offerings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {realDonations.map((d, idx) => (
                <div key={idx} className="p-3.5 bg-black/40 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{d.donorName}</div>
                      <span className="text-[10px] text-amber-300 font-semibold">{d.donorGotra}</span>
                    </div>
                    <span className="font-serif font-extrabold text-amber-400 text-sm">₹{Number(d.amount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[150px]">{d.causeIcon} {d.causeTitle}</span>
                    <span>{d.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
