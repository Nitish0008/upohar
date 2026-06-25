// src/pages/WishViewPage.jsx
// Shareable wish card page — this is what recipients see when they open a link
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Share2, Heart, ArrowLeft, Music, Volume2, VolumeX } from 'lucide-react';
import Button from '../components/ui/Button';
import { useShare } from '../hooks/useShare';
import { useToast } from '../components/ui/Toast';
import { useConfetti } from '../hooks/useConfetti';
import { getTemplateById } from '../data/templates';
import defaultSong from '../song/alexander-nakarada-silly-intro(chosic.com).mp3';

export default function WishViewPage() {
  const { wishId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { copyLink, shareToWhatsApp } = useShare();
  const toast = useToast();
  const { launch } = useConfetti();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Parse card details from query parameters
  const templateId = searchParams.get('t');
  const recipientName = searchParams.get('r') || 'Someone Special';
  const senderName = searchParams.get('s');
  const message = searchParams.get('m');
  const musicChoice = searchParams.get('mu') || 'none';
  const photoUrl = searchParams.get('p');

  const template = templateId ? getTemplateById(templateId) : null;

  // Retrieve styles
  const bg = template?.previewStyle?.background || 'linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #1a0020 100%)';
  const accentColor = template?.previewStyle?.accentColor || '#F97316';
  const textColor = template?.previewStyle?.textColor || '#FFF7ED';
  const secondaryColor = template?.previewStyle?.secondaryColor || '#FBBF24';
  const category = template?.category || 'birthday';

  const catEmojis = {
    birthday: '🎂',
    anniversary: '❤️',
    congratulations: '🎉',
    proposal: '💍',
    invitation: '📜',
    reminder: '📅',
  };
  const catTitles = {
    birthday: 'Happy Birthday',
    anniversary: 'Happy Anniversary',
    congratulations: 'Congratulations',
    proposal: 'Will You Marry Me?',
    invitation: "You're Invited",
    reminder: 'Reminder',
  };

  const emoji = catEmojis[category] || '✨';
  const title = catTitles[category] || 'Celebrate!';

  useEffect(() => {
    // Auto-launch confetti when viewing a wish
    const timer = setTimeout(() => launch(70), 500);

    // Initialize audio if enabled
    if (musicChoice !== 'none') {
      audioRef.current = new Audio(defaultSong);
      audioRef.current.loop = true;

      // Attempt autoplay
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            console.log('Autoplay blocked. Tap anywhere to enable sound.');
            // Fallback: start on first click anywhere
            const startPlaying = () => {
              audioRef.current?.play().then(() => setIsPlaying(true));
              window.removeEventListener('click', startPlaying);
            };
            window.addEventListener('click', startPlaying);
          });
      }
    }

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicChoice]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const shareUrl = window.location.href;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-hero relative">
      {/* Ambient glows */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${accentColor}30 0%, transparent 70%)`, filter: 'blur(40px)' }}
      />

      {/* Floating Music Control */}
      {musicChoice !== 'none' && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full border bg-[#0F0A1E]/80 backdrop-blur-md text-white transition-all duration-300 shadow-lg"
          style={{ borderColor: isPlaying ? accentColor : 'rgba(255,255,255,0.1)' }}
        >
          {isPlaying ? (
            <Volume2 size={16} className="text-orange-400 animate-pulse" />
          ) : (
            <VolumeX size={16} className="text-gray-500" />
          )}
        </button>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Create your own</span>
      </button>

      {/* The Wish Card */}
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl mb-6 relative"
        style={{
          background: bg,
          border: `1px solid ${accentColor}30`,
        }}
      >
        {/* Decorative corner brackets to look like a premium physical card */}
        <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />
        <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-11 left-3.5 w-4 h-4 border-b border-l opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-11 right-3.5 w-4 h-4 border-b border-r opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />

        {/* Top glow */}
        <div
          className="h-32 flex items-center justify-center relative pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor}50 0%, transparent 70%)` }}
        >
          <span className="text-7xl animate-bounce-in">{emoji}</span>
        </div>

        {/* Photo view */}
        {photoUrl && (
          <div className="relative w-full h-48 overflow-hidden border-y border-white/5">
            <img src={photoUrl} alt="Celebration upload" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, ${bg.includes('gradient') ? '#100c24' : bg} 100%)`,
              }}
            />
          </div>
        )}

        <div className="px-6 pb-6 text-center relative z-10">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: accentColor }}
          >
            {title}
          </h1>
          <p className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {recipientName}
          </p>

          {message ? (
            <div
              className="p-4 rounded-2xl mb-4 text-sm leading-relaxed text-left text-gray-200"
              style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
            >
              <span className="font-serif text-lg leading-none" style={{ color: accentColor }}>"</span>
              {message}
              <span className="font-serif text-lg leading-none" style={{ color: accentColor }}>"</span>
            </div>
          ) : (
            <div
              className="p-4 rounded-2xl mb-4 text-sm leading-relaxed text-gray-300 italic"
              style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}15` }}
            >
              "Wishing you a day as wonderful as you are. May all your dreams come true this year!"
            </div>
          )}

          {senderName && <p className="text-sm" style={{ color: secondaryColor }}>— With love from <strong>{senderName}</strong> 💛</p>}
        </div>

        {/* Color bar */}
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accentColor}, ${secondaryColor}, ${accentColor})` }} />

        {/* Watermark */}
        <div className="py-2 text-center" style={{ background: '#00000040' }}>
          <p className="text-[10px] text-gray-500">✨ Created with <span style={{ color: accentColor }}>Celebrate Assam</span></p>
        </div>
      </div>

      {/* Heart reaction */}
      <button
        className="flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full glass-card border border-white/10 text-sm text-gray-300 hover:text-rose-400 hover:border-rose-500/30 transition-all hover:scale-105 active:scale-95 duration-200"
        onClick={() => {
          launch(40);
          toast.show({ message: '❤️ Love sent!', type: 'success' });
        }}
      >
        <Heart size={16} className="text-rose-500 animate-pulse" />
        Send Love Back
      </button>

      {/* Create your own CTA */}
      <div className="w-full max-w-sm space-y-3">
        <Button fullWidth size="lg" onClick={() => navigate('/create')} id="wish-view-create">
          <span>🌾</span> Create Your Own Card
        </Button>
        <Button
          fullWidth
          size="lg"
          variant="secondary"
          onClick={() => {
            copyLink(shareUrl);
            toast.show({ message: 'Link copied!', type: 'success' });
          }}
          icon={<Share2 size={16} />}
          id="wish-view-share"
        >
          Share This Card
        </Button>
      </div>

      <p className="text-xs text-gray-700 mt-6 text-center">
        🌾 Free forever • Made in Assam
      </p>
    </main>
  );
}
