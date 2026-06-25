// src/components/home/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import Button from '../ui/Button';

const FLOATING_CARDS = [
  {
    id: 1, emoji: '🎂', name: 'Priya', type: 'Birthday Wishes',
    color: '#F97316', bg: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.1))',
    border: 'rgba(249,115,22,0.35)',
  },
  {
    id: 2, emoji: '❤️', name: 'Raj & Mita', type: '5th Anniversary',
    color: '#FB7185', bg: 'linear-gradient(135deg, rgba(251,113,133,0.2), rgba(244,63,94,0.1))',
    border: 'rgba(251,113,133,0.35)',
  },
  {
    id: 3, emoji: '💍', name: 'Ananya', type: 'Proposal',
    color: '#FBBF24', bg: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))',
    border: 'rgba(251,191,36,0.35)',
  },
  {
    id: 4, emoji: '🎉', name: 'Rahul', type: 'Congratulations',
    color: '#A78BFA', bg: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(124,58,237,0.1))',
    border: 'rgba(167,139,250,0.35)',
  },
];

const STATS = [
  { value: '140+', label: 'Templates' },
  { value: '100%', label: 'Free' },
  { value: '6', label: 'Occasions' },
];

function FloatingCard({ card, style, floatClass }) {
  return (
    <div className={`${floatClass}`} style={style}>
      <div
        className="rounded-2xl p-3 w-44 shadow-xl"
        style={{ background: card.bg, border: `1px solid ${card.border}`, backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{card.emoji}</span>
          <div>
            <p className="text-xs font-semibold text-white leading-tight">{card.name}</p>
            <p className="text-[11px]" style={{ color: card.color }}>{card.type}</p>
          </div>
        </div>
        <div className="h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
        <p className="text-[10px] text-gray-500 mt-2 text-center watermark">✨ Celebrate Assam</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Responsive hero: stacked mobile, side-by-side desktop */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-orange-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs font-medium text-orange-300">🌾 Made with love in Assam</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Celebrate Every<br />
              <span className="text-gradient-warm">Moment</span> The<br className="hidden lg:block" />
              <span className="hidden lg:inline"> Assamese Way</span>
              <span className="lg:hidden"> Assamese Way</span>
            </h1>

            <p className="text-base lg:text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
              Create stunning birthday wishes, anniversary cards, digital invitations & more. Share instantly on WhatsApp & Instagram — 100% free.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Button size="xl" onClick={() => navigate('/create')}
                iconRight={<ArrowRight size={18} />} id="hero-cta-create">
                Create Your Wish
              </Button>
              <Button size="xl" variant="secondary" onClick={() => navigate('/templates')} id="hero-cta-templates">
                Browse 140+ Templates
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 justify-center lg:justify-start">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gradient-warm">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-2 mt-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['🧑', '👩', '🧔', '👧', '👦'].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full glass-card border border-white/20 flex items-center justify-center text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500">Loved across Assam</p>
            </div>
          </div>

          {/* RIGHT: Floating cards visual */}
          <div className="flex-1 relative hidden lg:flex items-center justify-center min-h-[480px]">
            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            </div>

            {/* Main center card */}
            <div
              className="relative z-10 w-56 rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #1a0800, #2d1200)', border: '1px solid rgba(249,115,22,0.4)' }}
            >
              <div className="h-24 flex items-center justify-center text-5xl"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.4) 0%, transparent 70%)' }}>
                🎂
              </div>
              <div className="px-5 pb-5 text-center">
                <p className="text-sm font-bold text-orange-400 font-display">Happy Birthday!</p>
                <p className="text-lg font-bold text-white mt-1">Priya ✨</p>
                <p className="text-xs text-gray-500 mt-1 italic">"Wishing you endless joy!"</p>
              </div>
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #F97316, #FBBF24)' }} />
              <div className="py-1.5 text-center" style={{ background: '#00000050' }}>
                <p className="text-[9px] text-gray-500">✨ Created with <span className="text-orange-400">Celebrate Assam</span></p>
              </div>
            </div>

            {/* Floating cards around center */}
            <FloatingCard card={FLOATING_CARDS[0]} floatClass="animate-float absolute"
              style={{ top: '5%', left: '0%' }} />
            <FloatingCard card={FLOATING_CARDS[1]} floatClass="animate-float-delayed absolute"
              style={{ top: '5%', right: '0%' }} />
            <FloatingCard card={FLOATING_CARDS[2]} floatClass="animate-float absolute"
              style={{ bottom: '5%', left: '2%' }} />
            <FloatingCard card={FLOATING_CARDS[3]} floatClass="animate-float-delayed absolute"
              style={{ bottom: '5%', right: '2%' }} />
          </div>
        </div>
      </div>

      {/* Gamosa strip */}
      <div className="gamosa-border h-1" />
    </section>
  );
}
