import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LedTemperatureCounterProps {
  start?: number;
  end?: number;
  duration?: number;
  className?: string;
  unit?: string;
  isDarkTheme?: boolean;
}

export const LedTemperatureCounter: React.FC<LedTemperatureCounterProps> = ({
  start = 90,
  end = 150,
  duration = 600,
  className = '',
  unit = '°C',
  isDarkTheme = false
}) => {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(prefersReduced ? end : start);
  const [isComplete, setIsComplete] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setValue(end);
      setIsComplete(true);
      return;
    }

    if (!inView) return;

    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing mech-s (cubic-bezier(0.2, 0.8, 0.2, 1))
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const current = Math.round(start + (end - start) * eased);
      setValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setValue(end);
        setIsComplete(true);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [inView, start, end, duration, prefersReduced]);

  const textColor = isDarkTheme
    ? (isComplete ? 'text-accent drop-shadow-[0_0_10px_rgba(180,36,124,0.6)]' : 'text-white')
    : (isComplete ? 'text-accent drop-shadow-[0_0_8px_rgba(180,36,124,0.35)]' : 'text-graphite');

  return (
    <span 
      ref={ref}
      className={`font-sans tabular-specs transition-all duration-300 ${textColor} ${className}`}
    >
      {value} {unit}
    </span>
  );
};
