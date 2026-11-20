import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, ShieldCheck, Award, HeartHandshake, 
  MapPin, Phone, MessageSquare, Star, ArrowRight, 
  HelpCircle, CheckCircle2, AlertCircle, Mountain 
} from 'lucide-react';
import GuidesSection from '../components/GuidesSection';

export default function GuidesPage({ guides = [], onBookGuide }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Why should I hire a certified local Himalayan guide?',
      a: 'Uttarakhand’s high alpine terrain (Chopta, Tungnath, Valley of Flowers, Milam Glacier) features sudden weather shifts, narrow mountain ridges, and high altitude conditions. Our certified guides are NIM (Nehru Institute of Mountaineering) graduates with Wilderness First Responder training, indigenous mountain knowledge, and deep connections to local homestays.'
    },
    {
      q: 'How does daily rate billing work?',
      a: 'All guide fees are 100% transparent and paid directly to the scout with zero platform commission. Rates range from ₹1,400 to ₹2,200 per day, covering route planning, summit leadership, emergency first aid, and cultural storytelling. Porter support and forest permits can be arranged directly with the guide.'
    },
    {
      q: 'Are guides verified for women solo travelers?',
      a: 'Yes! All guides are strictly police-verified and certified by the Uttarakhand Tourism Development Board (UTDB) and Nehru Institute of Mountaineering. We also have female licensed naturalists like Anita Chauhan and Pooja Pande who specialize in heritage and nature walks.'
    },
    {
      q: 'What gear and emergency supplies do the guides carry?',
      a: 'High-altitude trek leaders carry certified medical first aid kits, pulse oximeters, emergency communication radios, and are trained in managing Acute Mountain Sickness (AMS) protocols and SDRF evacuation coordination.'
    }
  ];

  return (
    <div className="bg-[#07110F] text-white min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative pt-12 pb-16 bg-gradient-to-b from-[#091C18] to-[#07110F] border-b border-white/10 overflow-hidden">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
            <span>/</span>
            <span className="text-emerald-300 font-semibold">Local Mountain Guides</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Compass className="w-4 h-4 text-emerald-400" />
              100% Native Mountain Scouts & Leaders
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Certified Local Guides & Trek Leaders of Uttarakhand
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore the sacred peaks of Garhwal and the heritage valleys of Kumaon with NIM-trained mountaineers, Jim Corbett tiger naturalists, and Kumaoni historians who know every ridge and folklore.
            </p>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-emerald-300">NIM Certified</span>
              <p className="text-xs text-slate-300 mt-1">Nehru Institute of Mountaineering & IMF leaders</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-amber-300">100% Native</span>
              <p className="text-xs text-slate-300 mt-1">Born and raised in Himalayan valley villages</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-teal-300">4.96 ★ Rating</span>
              <p className="text-xs text-slate-300 mt-1">Across 1,400+ successfully guided expeditions</p>
            </div>
            <div className="bg-[#0E2320]/80 border border-emerald-500/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-bold font-serif text-rose-300">0% Commission</span>
              <p className="text-xs text-slate-300 mt-1">Direct daily rates paid straight to the guide</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Guides Directory Section */}
      <GuidesSection
        guides={guides}
        onBookGuide={onBookGuide}
      />

      {/* Safety Standards & Protocol */}
      <section className="py-16 bg-[#081513] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Our Safety Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Why Expedition Safety Comes First
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Every guide verified on SafarNama adheres to strict Himalayan mountaineering safety protocols and state guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D221F] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl font-bold mb-4">
                🩺
              </div>
              <h3 className="text-base font-bold text-white mb-2">Wilderness First Aid & Oximetry</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All high-altitude leaders monitor oxygen saturation (SpO2) at regular intervals above 2,500m to prevent Acute Mountain Sickness (AMS).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D221F] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl font-bold mb-4">
                📻
              </div>
              <h3 className="text-base font-bold text-white mb-2">SDRF Emergency Link</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct hotline coordination with Uttarakhand State Disaster Response Force (SDRF) and local forest chowkis for rapid medical assistance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D221F] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-xl font-bold mb-4">
                🌿
              </div>
              <h3 className="text-base font-bold text-white mb-2">Leave No Trace Certified</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Commitment to zero-plastic trails, eco-responsible camping, respecting sacred temple traditions, and patronizing native village homestays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide FAQs Section */}
      <section className="py-16 bg-[#07110F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Hiring a Mountain Guide FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0D211E] rounded-2xl border border-white/10 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-emerald-300 transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-emerald-400 text-lg">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 border-t border-white/5 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
