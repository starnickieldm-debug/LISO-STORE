import React from 'react';

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
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? 'text-center mx-auto max-w-3xl lg:max-w-4xl' : 'max-w-3xl lg:max-w-4xl'} ${className}`}>

      {/* Main Title (Voice 1: Space Grotesk H2 clamp, semibold, closed tracking) */}
      <h2 className={`font-h2-clamp font-semibold leading-[1.2] pb-1 ${isDark ? 'text-bone text-luminance-h2' : 'text-graphite'}`}>
        {title}
      </h2>

      {/* Subtitle (Humanist body: 16-18px, bone 75%, line-height 1.6) */}
      {subtitle && (
        <p className={`mt-3 sm:mt-4 text-base sm:text-lg font-normal leading-relaxed ${isDark ? 'text-bone/75' : 'text-graphite/75'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
