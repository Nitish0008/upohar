// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedTemplates from '../components/home/FeaturedTemplates';
import HowItWorks from '../components/home/HowItWorks';
import BrandBanner from '../components/home/BrandBanner';

export default function HomePage() {
  return (
    <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
      <HeroSection />
      <FeaturedTemplates />
      <CategoryGrid />
      <HowItWorks />
      <BrandBanner />

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}>
              🌾
            </div>
            <div>
              <p className="text-sm font-bold text-white">Celebrate Assam</p>
              <p className="text-xs text-gray-600">Spreading joy since 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {['About', 'Privacy', 'Contact', 'Careers'].map((link) => (
              <a key={link} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-700">© 2024 Celebrate Assam. Made with ❤️ in Assam</p>
        </div>
      </footer>
    </main>
  );
}
