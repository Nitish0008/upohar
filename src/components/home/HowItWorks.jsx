// src/components/home/HowItWorks.jsx
import React from 'react';

const STEPS = [
  { step: '01', title: 'Pick a Template', desc: 'Browse 140+ stunning templates for any occasion', emoji: '🎨', color: '#F97316' },
  { step: '02', title: 'Personalize It', desc: 'Add names, photos, custom messages & background music', emoji: '✏️', color: '#FB7185' },
  { step: '03', title: 'Share Instantly', desc: 'Send via WhatsApp, Instagram, or copy the shareable link', emoji: '🚀', color: '#A78BFA' },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14 border-t border-white/5">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-white">How It Works</h2>
        <p className="text-sm text-gray-500 mt-2">Create a beautiful wish card in under 60 seconds</p>
      </div>

      {/* Desktop: horizontal steps | Mobile: vertical */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px"
          style={{ background: 'linear-gradient(90deg, #F97316, #FB7185, #A78BFA)' }} />

        {STEPS.map((step, i) => (
          <div key={step.step} className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
            {/* Vertical connector (mobile) */}
            {i < STEPS.length - 1 && (
              <div className="md:hidden absolute left-8 w-px h-full"
                style={{ background: `linear-gradient(to bottom, ${step.color}60, transparent)` }} />
            )}

            {/* Icon */}
            <div
              className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 md:mx-auto md:mb-4"
              style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
            >
              {step.emoji}
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: step.color }}
              >
                {i + 1}
              </div>
            </div>

            <div className="md:mt-4">
              <h3 className="text-base font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
