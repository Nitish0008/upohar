// src/components/home/BrandBanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const FEATURES = ['Free Forever', 'No Sign-up Required', 'WhatsApp Ready', '140+ Templates', 'Background Music', 'Photo Upload'];

export default function BrandBanner() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
      <div
        className="relative rounded-3xl overflow-hidden px-8 lg:px-16 py-12 lg:py-16"
        style={{
          background: 'linear-gradient(135deg, #1a0800 0%, #2d1200 40%, #1a0010 100%)',
          border: '1px solid rgba(249,115,22,0.2)',
        }}
      >
        {/* Glows */}
        <div className="absolute top-0 left-0 w-96 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.25) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative flex flex-col lg:flex-row items-center gap-10">
          {/* Left text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-4xl mb-3">🌾</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              Start Celebrating <span className="text-gradient-warm">Today</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-lg">
              Bringing the warmth of Assamese culture to every celebration. Create beautiful digital cards and spread joy — completely free.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {FEATURES.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', color: '#FB923C' }}>
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="xl" onClick={() => navigate('/create')} icon={<Sparkles size={18} />} id="banner-cta-create">
                Create Free Wish Card
              </Button>
              <Button size="xl" variant="outline" onClick={() => navigate('/templates')}
                iconRight={<ArrowRight size={16} />} id="banner-cta-templates">
                Explore Templates
              </Button>
            </div>
          </div>

          {/* Right: feature boxes (desktop only) */}
          <div className="hidden lg:grid grid-cols-2 gap-3 w-72 flex-shrink-0">
            {[
              { emoji: '🎂', label: 'Birthday', count: '50+' },
              { emoji: '❤️', label: 'Anniversary', count: '30+' },
              { emoji: '🎉', label: 'Congratulations', count: '25+' },
              { emoji: '💍', label: 'Proposal', count: '15+' },
              { emoji: '📜', label: 'Invitations', count: '20+' },
              { emoji: '📅', label: 'Reminders', count: '∞' },
            ].map((item) => (
              <div key={item.label}
                className="p-3 rounded-2xl text-center glass-card border border-white/5 hover:border-orange-500/20 transition-colors">
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-xs font-semibold text-white mt-1">{item.label}</p>
                <p className="text-[10px] text-orange-400">{item.count} templates</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
