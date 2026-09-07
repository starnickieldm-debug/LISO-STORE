import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, currentProgress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-gradient-to-r from-accent via-accent to-bone/90 transition-transform ease-out duration-100"
        style={{
          width: '100%',
          transformOrigin: 'left',
          transform: `scaleX(${progress / 100})`
        }}
      />
    </div>
  );
};
