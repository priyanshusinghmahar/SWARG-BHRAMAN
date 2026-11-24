import React from 'react';
import { Link } from 'react-router-dom';
import PersonalSuggester from '../components/PersonalSuggester';
import { 
  Compass, Sparkles, ShieldCheck, Heart, 
  MapPin, Users, Award, CheckCircle2, ArrowRight 
} from 'lucide-react';

export default function PersonalSuggesterPage({ onBookCircuit, onSaveToTrips }) {
  return (
    <div className="py-12 bg-slate-50 dark:bg-[#090E1A] text-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Home</Link>
          <span>/</span>
          <span className="text-amber-600 dark:text-amber-300 font-semibold">Personal Suggester & Mountain Matcher</span>
        </div>

        {/* Page Hero Header */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-[#0C1528] dark:via-[#111C36] dark:to-[#0A1020] rounded-3xl p-6 sm:p-10 border border-amber-500/30 dark:border-amber-500/25 shadow-xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-spin" />
              <span>Tailored Devbhoomi Intelligence • 0% Middleman</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 dark:text-white tracking-tight leading-tight">
              Uttarakhand Personal Mountain Suggester
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Don't guess where to travel in Devbhoomi. Tell us your current mood, companion group, travel style, and comfort level — our indigenous algorithm instantly matches you with authentic Himalayan circuits, native family homestays, and certified mountain scouts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>15+ Curated Regional Circuits</span>
              </div>
              <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                <span>Native Homestays & NIM Guides</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Real-time Dynamic Match Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Interactive Component */}
        <PersonalSuggester
          onBookCircuit={onBookCircuit}
          onSaveToTrips={onSaveToTrips}
        />

        {/* Educational / Trust Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-3xl bg-[#0D1527] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl">
              🎯
            </div>
            <h4 className="font-extrabold text-white text-lg font-serif">
              Psychological Vibe Calibration
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of generic search bars, our suggester evaluates pace, spiritual inclination, high-altitude tolerance, and authentic gastronomy to recommend the exact valley that will restore your mind.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D1527] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-2xl">
              🏡
            </div>
            <h4 className="font-extrabold text-white text-lg font-serif">
              100% Native Mountain Families
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every recommended homestay is independently vetted and run by indigenous Kumaoni or Garhwali families. 100% of your stay fees go directly into village empowerment without commissions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D1527] border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl">
              🧭
            </div>
            <h4 className="font-extrabold text-white text-lg font-serif">
              NIM Certified Guides Matching
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our recommender pairs high-altitude treks with Nehru Institute of Mountaineering (NIM) certified mountain leaders, ensuring wilderness first aid, mountain safety, and authentic local lore.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="p-8 rounded-3xl bg-[#0D1527] border border-white/10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              How Does the Personal Suggester Work?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h5 className="font-bold text-white text-sm">
                Can I customize the suggested circuit dates and travelers?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! Clicking "Book This Expedition" opens our booking modal with all circuit details pre-selected. You can adjust your dates, traveler counts, transit pickup, and optional artisan workshops freely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h5 className="font-bold text-white text-sm">
                Are the prices shown accurate and final?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                All prices reflect authentic daily costs for verified homestays, licensed guide rates, and home-cooked meals. There are zero agency markup fees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h5 className="font-bold text-white text-sm">
                What if I am traveling with senior citizens or young toddlers?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose the "Family with Elders & Children" option in Question 2. The algorithm will automatically filter out steep passes and prioritize paved scenic drives, lakeside gardens, and lower-altitude heritage towns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h5 className="font-bold text-white text-sm">
                How does the "Surprise Me 🎲" feature work?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                If you love spontaneous adventures or want to escape tourists, our "Surprise Me" button shuffles hidden offbeat gems like Khirsu, Chaukori, Harsil Valley, and Kanatal with 1 click.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
