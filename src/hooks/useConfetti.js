// src/hooks/useConfetti.js
import { useCallback } from 'react';

const COLORS = ['#F97316', '#FBBF24', '#FB7185', '#A78BFA', '#2DD4BF', '#34D399', '#60A5FA'];

export function useConfetti() {
  const launch = useCallback((count = 50) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 8 + 6;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 2 + 2;
      const delay = Math.random() * 1;
      const shape = Math.random() > 0.5 ? '50%' : '0%';

      el.className = 'confetti-particle';
      el.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${shape};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        top: -10px;
      `;

      document.body.appendChild(el);
      setTimeout(() => el.remove(), (duration + delay) * 1000 + 100);
    }
  }, []);

  return { launch };
}
