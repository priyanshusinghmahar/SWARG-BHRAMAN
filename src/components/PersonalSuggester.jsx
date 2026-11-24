import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  QUIZ_QUESTIONS, 
  SUGGESTED_CIRCUITS, 
  SECRET_OFFBEAT_GEMS, 
  matchCircuits 
} from '../data/personalSuggesterData';
import { handleImageError } from '../utils/imageFallback';
import { 
  Sparkles, Compass, MapPin, Calendar, Users, 
  CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, 
  Heart, ShieldCheck, Dices, Tag, Check, Award, 
  Utensils, Bed, UserCheck, ShoppingBag, ExternalLink, Share2 
} from 'lucide-react';

export default function PersonalSuggester({ onBookCircuit, onSaveToTrips }) {
  const navigate = useNavigate();

  // Mode: 'quiz' | 'results'
  const [viewMode, setViewMode] = useState('quiz');
  const [currentStep, setCurrentStep] = useState(0);

  // User selections
  const [answers, setAnswers] = useState({
    mood: 'spiritual',
    companions: 'couple',
    duration: 'standard',
    budget: 'comfort',
    food: 'native'
  });

  // Active category filter on results
  const [activeFilter, setActiveFilter] = useState('all');

  // Saved circuits state
  const [savedIds, setSavedIds] = useState([]);
  const [copiedLink, setCopiedLink] = useState(null);

  // Secret Gem Modal / Highlight state
  const [secretGem, setSecretGem] = useState(null);
  const [isSecretGemOpen, setIsSecretGemOpen] = useState(false);

  // Compute matched circuits dynamically
  const matchedCircuits = useMemo(() => {
    return matchCircuits(answers);
  }, [answers]);

  // Filtered circuits based on category pill
  const filteredCircuits = useMemo(() => {
    if (activeFilter === 'all') return matchedCircuits;
    return matchedCircuits.filter(c => c.moods.includes(activeFilter) || c.tags.includes(activeFilter));
  }, [matchedCircuits, activeFilter]);

  // Archetype title based on answers
  const userArchetype = useMemo(() => {
    const moodObj = QUIZ_QUESTIONS[0].options.find(o => o.id === answers.mood);
    const compObj = QUIZ_QUESTIONS[1].options.find(o => o.id === answers.companions);
    return `${moodObj?.badge || 'Devbhoomi Seeker'} • ${compObj?.label.split('/')[0] || 'Traveler'}`;
  }, [answers]);

  const handleSelectOption = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextStep = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setViewMode('results');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveCircuit = (circuit) => {
    if (savedIds.includes(circuit.id)) {
      setSavedIds(savedIds.filter(id => id !== circuit.id));
    } else {
      setSavedIds([...savedIds, circuit.id]);
      if (onSaveToTrips) {
        onSaveToTrips({
          id: `SUGG-${Date.now()}`,
          packageTitle: `Suggested Circuit: ${circuit.title}`,
          destination: circuit.region,
          travelDate: 'Planned via Personal Suggester',
          returnDate: circuit.idealDays,
          travelers: answers.companions === 'solo' ? 1 : answers.companions === 'couple' ? 2 : 4,
          totalPrice: circuit.approxCostPerPerson * 2,
          status: 'SAVED VIBE SUGGESTION',
          stayType: circuit.stayRecommendation.name,
          pickupLocation: 'Kathgodam / Dehradun',
          contactPerson: `${circuit.guideMatch.name} (${circuit.guideMatch.badge})`,
          artisanWorkshop: circuit.districtSpecialty
        });
      }
    }
  };

  const handleBookSuggested = (circuit) => {
    if (onBookCircuit) {
      onBookCircuit({
        name: circuit.title,
        title: circuit.title,
        destination: circuit.region,
        region: circuit.region,
        pricePerPerson: circuit.approxCostPerPerson,
        startingPrice: circuit.approxCostPerPerson,
        duration: circuit.idealDays,
        image: circuit.coverImage,
        description: circuit.tagline
      });
    } else {
      navigate('/destinations');
    }
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * SECRET_OFFBEAT_GEMS.length);
    setSecretGem(SECRET_OFFBEAT_GEMS[randomIndex]);
    setIsSecretGemOpen(true);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="space-y-8">
      
      {/* View Toggle Bar (Quiz vs Results vs Surprise) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-amber-500/20 backdrop-blur-xl shadow-md dark:shadow-xl text-slate-900 dark:text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400">
            <Compass className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-bold tracking-wider uppercase">
              SwargBhraman Personal Recommender
            </div>
            <div className="text-slate-900 dark:text-white font-extrabold text-sm sm:text-base font-serif">
              {viewMode === 'quiz' ? 'Find Your Mountain Vibe Quiz' : `Personal Matches: ${userArchetype}`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'results' && (
            <button
              onClick={() => {
                setViewMode('quiz');
                setCurrentStep(0);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-200 dark:border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}

          {viewMode === 'quiz' && (
            <button
              onClick={() => setViewMode('results')}
              className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-white/5 hover:bg-amber-100 dark:hover:bg-white/10 text-amber-700 dark:text-amber-300 text-xs font-bold transition border border-amber-300 dark:border-amber-500/20"
            >
              Skip to Recommendations ({matchedCircuits.length}) →
            </button>
          )}

          <button
            onClick={handleSurpriseMe}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-purple-950/40"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Surprise Me 🎲</span>
          </button>
        </div>
      </div>

      {/* QUIZ VIEW */}
      {viewMode === 'quiz' && (
        <div className="bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#121E36] dark:to-[#0A0F1D] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-amber-500/25 shadow-xl dark:shadow-2xl relative overflow-hidden text-slate-900 dark:text-white">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Stepper Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-slate-300 dark:border-white/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-300 shadow-md"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
            
            {/* Step Pills */}
            <div className="hidden sm:flex items-center justify-between mt-3 px-1">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`text-[11px] font-semibold transition flex items-center gap-1 ${
                    idx === currentStep 
                      ? 'text-amber-600 dark:text-amber-300 font-bold' 
                      : idx < currentStep 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                    idx === currentStep 
                      ? 'bg-amber-500 text-slate-950 font-extrabold' 
                      : idx < currentStep 
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                  }`}>
                    {idx < currentStep ? '✓' : idx + 1}
                  </span>
                  <span>{q.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Title & Subtitle */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Personal Vibe Calibration</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
              {currentQ.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {currentQ.subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map(opt => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-amber-50 to-amber-100/90 border-amber-500 shadow-lg ring-2 ring-amber-400/40 text-slate-900 dark:from-amber-500/20 dark:via-[#1A2642] dark:to-[#121B30] dark:border-amber-400 dark:shadow-xl dark:shadow-amber-950/30 dark:ring-amber-400/30 dark:text-white'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] dark:border-white/10 dark:hover:border-white/20 dark:text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg animate-in fade-in">
                      ✓
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl group-hover:scale-110 transition duration-200">
                        {opt.icon}
                      </span>
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                          {opt.badge}
                        </span>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg font-serif mt-0.5">
                          {opt.label}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                      {opt.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className={`text-[11px] font-bold ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'}`}>
                      {isSelected ? 'Selected Choice' : 'Click to Select'}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {isSelected ? '●' : '○'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                currentStep === 0
                  ? 'border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs sm:text-sm font-extrabold transition flex items-center gap-2 shadow-xl shadow-amber-950/40"
            >
              <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Show My Tailored Suggestions' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* RESULTS VIEW */}
      {viewMode === 'results' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Persona Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-[#0C1528] dark:via-[#101E3C] dark:to-[#0A101F] border border-slate-200 dark:border-amber-500/30 shadow-xl dark:shadow-2xl relative overflow-hidden text-slate-900 dark:text-white">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
                  <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  Your Devbhoomi Travel Archetype
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
                  {userArchetype}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Based on your affinity for <strong>{answers.mood}</strong>, traveling with <strong>{answers.companions}</strong> for <strong>{answers.duration}</strong> on a <strong>{answers.budget}</strong> daily allowance, we’ve calculated the highest-affinity Uttarakhand circuits for you.
                </p>
                
                {/* Selected Answers Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    Mood: <strong className="text-amber-700 dark:text-amber-300 capitalize">{answers.mood}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    Group: <strong className="text-sky-700 dark:text-sky-300 capitalize">{answers.companions}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    Days: <strong className="text-emerald-700 dark:text-emerald-300 capitalize">{answers.duration}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    Food: <strong className="text-orange-700 dark:text-orange-300 capitalize">{answers.food}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setViewMode('quiz');
                      setCurrentStep(0);
                    }}
                    className="text-amber-600 dark:text-amber-400 underline hover:text-amber-700 dark:hover:text-amber-300 font-bold ml-1"
                  >
                    Change Filters ↺
                  </button>
                </div>
              </div>

              {/* Match Stats Box */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-right shadow-sm">
                <div className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-600 dark:text-amber-400">
                  {filteredCircuits[0]?.calculatedScore || 98}%
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Highest Circuit Match
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
                  ✓ 100% Direct Local Homestays
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: `All Curated (${matchedCircuits.length})` },
              { id: 'spiritual', label: '🕉️ Spiritual & Shrines' },
              { id: 'adventure', label: '🏔️ High Trek & Snow' },
              { id: 'romance', label: '💑 Romantic & Quiet' },
              { id: 'culture', label: '🎨 Heritage & Artisans' },
              { id: 'family', label: '👨‍👩‍👧 Family Friendly' },
              { id: 'wildlife', label: '🐅 Wilderness & Safaris' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  activeFilter === filter.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Matched Circuits List */}
          <div className="space-y-6">
            {filteredCircuits.map((circuit, index) => {
              const isSaved = savedIds.includes(circuit.id);

              return (
                <div
                  key={circuit.id}
                  className="bg-white dark:bg-[#101728] rounded-3xl border border-slate-200 dark:border-white/10 hover:border-amber-400/40 transition duration-300 overflow-hidden shadow-md dark:shadow-2xl flex flex-col lg:flex-row group text-slate-900 dark:text-white"
                >
                  {/* Left Photo & Badges */}
                  <div className="lg:w-2/5 relative h-72 lg:h-auto min-h-[280px] overflow-hidden flex-shrink-0 bg-black">
                    <img
                      src={circuit.coverImage}
                      alt={circuit.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
                    
                    {/* Match Score Badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-extrabold shadow-xl">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{circuit.calculatedScore}% Match Score</span>
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold shadow-lg">
                      #{index + 1} Best Pick
                    </div>

                    {/* Bottom Specs on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                        {circuit.region}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-200 mt-1 font-medium">
                        <span>🏔️ {circuit.altitude}</span>
                        <span>•</span>
                        <span>⏱️ {circuit.idealDays}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content Details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                    
                    <div>
                      {/* Sub-archetype & Title */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400/90 block mb-1">
                            {circuit.archetype}
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-snug">
                            {circuit.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {circuit.tagline}
                          </p>
                        </div>

                        {/* Save to Wishlist Button */}
                        <button
                          onClick={() => handleSaveCircuit(circuit)}
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition border flex-shrink-0 ${
                            isSaved
                              ? 'bg-rose-500/20 text-rose-500 dark:text-rose-400 border-rose-500/40 shadow-lg'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white dark:border-white/10 dark:hover:bg-white/10'
                          }`}
                          title={isSaved ? 'Saved in My Trips' : 'Save to My Trips'}
                        >
                          <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Why Matched Bullets */}
                      <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                        <div className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                          <span>Why this matches your personality</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                          {circuit.whyMatched.map((reason, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-amber-500 mt-0.5">•</span>
                              <span className="leading-snug">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Micro Recommendation Cards (Stay, Guide, Food) */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        
                        {/* Stay */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">
                            <Bed className="w-3.5 h-3.5" />
                            <span>Recommended Stay</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {circuit.stayRecommendation.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {circuit.stayRecommendation.type}
                          </div>
                        </div>

                        {/* Guide */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1">
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Matched Native Scout</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {circuit.guideMatch.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {circuit.guideMatch.badge}
                          </div>
                        </div>

                        {/* Delicacy & Souvenir */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                            <Utensils className="w-3.5 h-3.5" />
                            <span>Must-Taste & Specialty</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {circuit.districtSpecialty.split('&')[0]}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {circuit.localDelicacy}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                          Estimated Local Direct Cost
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                            ₹{circuit.approxCostPerPerson.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">/ person • 0% Middleman</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Link
                          to="/districts-haat"
                          className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-amber-700 dark:text-amber-300 text-xs font-bold transition border border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                          title="Buy authentic local craft"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">District Souvenir</span>
                        </Link>

                        <button
                          onClick={() => handleBookSuggested(circuit)}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs sm:text-sm transition flex items-center gap-2 shadow-xl shadow-amber-950/40"
                        >
                          <span>Book This Expedition</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* SURPRISE ME MODAL */}
      {isSecretGemOpen && secretGem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 text-slate-900 dark:text-white">
            
            <button
              onClick={() => setIsSecretGemOpen(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white text-base font-bold w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center transition"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Dices className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Secret Himalayan Offbeat Gem</span>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black">
              <img
                src={secretGem.image}
                alt={secretGem.title}
                onError={handleImageError}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold">
                {secretGem.district} • {secretGem.altitude}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold font-serif text-slate-900 dark:text-white">
                {secretGem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {secretGem.tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">Best Suited For</span>
                <span className="text-slate-900 dark:text-white font-bold">{secretGem.bestFor}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">Estimated Daily Cost</span>
                <span className="text-amber-700 dark:text-amber-300 font-bold">{secretGem.cost}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={handleSurpriseMe}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle Another Gem</span>
              </button>

              <button
                onClick={() => {
                  setIsSecretGemOpen(false);
                  if (onBookCircuit) {
                    onBookCircuit({
                      name: secretGem.title,
                      title: secretGem.title,
                      destination: secretGem.district,
                      region: secretGem.district,
                      pricePerPerson: 2800,
                      startingPrice: 2800,
                      duration: '3-4 Days Offbeat',
                      image: secretGem.image,
                      description: secretGem.tagline
                    });
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-extrabold transition shadow-lg"
              >
                Book This Hidden Gem →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
