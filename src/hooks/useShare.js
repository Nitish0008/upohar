// src/hooks/useShare.js
import { useCallback } from 'react';

export function useShare() {
  const shareToWhatsApp = useCallback((text, url) => {
    const encoded = encodeURIComponent(`${text}\n${url}`);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }, []);

  const shareToInstagram = useCallback(() => {
    // Instagram doesn't support direct deep link sharing, guide user to copy
    window.open('https://www.instagram.com/', '_blank');
  }, []);

  const copyLink = useCallback(async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    }
  }, []);

  const nativeShare = useCallback(async ({ title, text, url }) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }, []);

  return { shareToWhatsApp, shareToInstagram, copyLink, nativeShare };
}
