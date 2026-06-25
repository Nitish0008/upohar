// src/components/create/ShareStep.jsx
import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { useShare } from '../../hooks/useShare';
import { useToast } from '../ui/Toast';
import Button from '../ui/Button';

export default function ShareStep({ wishId, shareUrl: propShareUrl }) {
  const [copied, setCopied] = useState(false);
  const { shareToWhatsApp, copyLink, nativeShare } = useShare();
  const toast = useToast();

  const shareUrl = propShareUrl || `${window.location.origin}/wish/${wishId || 'preview'}`;
  const shareText = '🎉 Check out this special celebration card made with Celebrate Assam!';

  const handleCopy = async () => {
    await copyLink(shareUrl);
    setCopied(true);
    toast.show({ message: 'Link copied to clipboard!', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    shareToWhatsApp(shareText, shareUrl);
    toast.show({ message: 'Opening WhatsApp...', type: 'info' });
  };

  const handleNative = async () => {
    const ok = await nativeShare({
      title: 'Celebrate Assam',
      text: shareText,
      url: shareUrl,
    });
    if (!ok) handleCopy();
  };

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Success header */}
      <div className="text-center py-4">
        <div className="text-5xl mb-3 animate-bounce-in">🎉</div>
        <h3 className="text-xl font-bold text-white mb-1">Your card is ready!</h3>
        <p className="text-sm text-gray-400">Share it with your loved ones</p>
      </div>

      {/* Shareable link */}
      <div className="p-4 rounded-2xl glass-card border border-white/10">
        <p className="text-xs text-gray-500 mb-2 font-medium">Shareable Link</p>
        <div className="flex items-center gap-2">
          <p className="flex-1 text-sm text-gray-300 truncate font-mono bg-white/5 px-3 py-2 rounded-xl">
            {shareUrl}
          </p>
          <button
            onClick={handleCopy}
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              copied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/15'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="space-y-3">
        {/* WhatsApp */}
        <button
          id="share-whatsapp"
          onClick={handleWhatsApp}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #25D36615, #128C7E15)',
            border: '1px solid #25D36640',
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#25D36620' }}>
            💬
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Share on WhatsApp</p>
            <p className="text-xs text-gray-500">Send directly to contacts</p>
          </div>
          <Share2 size={16} className="ml-auto text-green-400" />
        </button>

        {/* Instagram */}
        <button
          id="share-instagram"
          onClick={() => {
            handleCopy();
            toast.show({ message: 'Link copied! Paste in your Instagram story 📸', type: 'info', duration: 4000 });
          }}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #E1306C15, #F77737 15%, #833AB415)',
            border: '1px solid #E1306C40',
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#E1306C20' }}>
            📸
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Share on Instagram</p>
            <p className="text-xs text-gray-500">Copy link & paste in story</p>
          </div>
          <Share2 size={16} className="ml-auto text-pink-400" />
        </button>

        {/* Native share */}
        <Button
          id="share-native"
          onClick={handleNative}
          variant="secondary"
          fullWidth
          size="lg"
          icon={<Share2 size={16} />}
        >
          More Sharing Options
        </Button>
      </div>

      {/* Watermark note */}
      <p className="text-center text-[11px] text-gray-600 pt-2">
        🌾 Your card includes "Created with Celebrate Assam" — helping us spread the word!
      </p>
    </div>
  );
}
