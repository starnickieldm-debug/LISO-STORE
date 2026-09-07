import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionHeaderProps {
  number?: string;
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  overline,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';
  const prefersReduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  const shouldAnimate = !prefersReduced;

  return (
    <div 
      ref={ref}
      className={`mb-10 sm:mb-14 ${isCenter ? 'text-center mx-auto max-w-3xl lg:max-w-4xl' : 'max-w-3xl lg:max-w-4xl'} ${className}`}
    >
      {/* Optional Overline / Step Counter */}
      {(number || overline) && (
        <div 
          className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold"
          style={shouldAnimate ? {
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,10px,0)',
            transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: inView ? 'auto' : 'opacity, transform'
          } : undefined}
        >
          {number && <span className="opacity-80">[{number}]</span>}
          {overline && <span>{overline}</span>}
        </div>
      )}

      {/* Main Title (Voice 1: Space Grotesk H2 clamp, semibold, closed tracking) */}
      <h2 
        className={`font-h2-clamp font-semibold leading-[1.2] pb-1 ${isDark ? 'text-bone text-luminance-h2' : 'text-graphite'}`}
        style={shouldAnimate ? {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,18px,0)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms',
          willChange: inView ? 'auto' : 'opacity, transform'
        } : undefined}
      >
        {title}
      </h2>

      {/* Subtitle (Humanist body: 16-18px, bone 75%, line-height 1.6) */}
      {subtitle && (
        <p 
          className={`mt-3 sm:mt-4 text-base sm:text-lg font-normal leading-relaxed ${isDark ? 'text-bone/75' : 'text-graphite/75'}`}
          style={shouldAnimate ? {
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,14px,0)',
            transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 180ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 180ms',
            willChange: inView ? 'auto' : 'opacity, transform'
          } : undefined}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
