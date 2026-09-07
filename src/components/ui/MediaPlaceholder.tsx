import React from 'react';

interface MediaPlaceholderProps {
  type?: 'video' | 'photo' | 'macro' | 'sequence';
  label: string;
  specs?: string;
  aspectRatio?: string;
  className?: string;
  badge?: string;
  theme?: 'light' | 'dark';
  children?: React.ReactNode;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type = 'photo',
  label,
  specs,
  aspectRatio = 'aspect-video',
  className = '',
  badge,
  theme = 'dark',
  children
}) => {
  const isDark = theme === 'dark';

  return (
    <div 
      className={`relative w-full ${aspectRatio} ${
        isDark 
          ? 'bg-night-900/90 border border-night-700 text-bone' 
          : 'bg-bone-50/90 border border-graphite/20 text-graphite'
      } rounded-sm overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none transition-all group ${className}`}
    >
      {/* Editorial corner markers */}
      <div className={`absolute top-2 left-2 w-2 h-2 border-t border-l ${isDark ? 'border-white/20' : 'border-graphite/30'}`} />
      <div className={`absolute top-2 right-2 w-2 h-2 border-t border-r ${isDark ? 'border-white/20' : 'border-graphite/30'}`} />
      <div className={`absolute bottom-2 left-2 w-2 h-2 border-b border-l ${isDark ? 'border-white/20' : 'border-graphite/30'}`} />
      <div className={`absolute bottom-2 right-2 w-2 h-2 border-b border-r ${isDark ? 'border-white/20' : 'border-graphite/30'}`} />

      {/* Top bar info */}
      <div className={`flex items-center justify-between z-10 text-[11px] font-mono font-medium uppercase tracking-wider ${
        isDark ? 'text-bone/60' : 'text-graphite/60'
      }`}>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>{type === 'video' ? 'VIDEO / GIF 6–8S' : 'ACTIVO REAL'}</span>
        </div>
        {badge && (
          <span className={`px-2 py-0.5 border text-[10px] font-mono font-medium tracking-normal rounded-sm ${
            isDark 
              ? 'bg-white/5 border-white/10 text-bone' 
              : 'bg-graphite/5 border-graphite/10 text-graphite'
          }`}>
            {badge}
          </span>
        )}
      </div>

      {/* Center content / wireframe preview */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-4 z-10">
        {children ? (
          children
        ) : (
          <div className="space-y-3 max-w-md">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border shadow-sm mx-auto group-hover:scale-105 transition-transform ${
              isDark 
                ? 'bg-night-950 border-white/15 text-bone/80' 
                : 'bg-bone/80 border-graphite/15 text-graphite/70'
            }`}>
              {type === 'video' ? (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
              )}
            </div>
            <p className={`text-xs sm:text-sm font-medium leading-snug ${
              isDark ? 'text-bone/80' : 'text-graphite/80'
            }`}>
              {label}
            </p>
          </div>
        )}
      </div>

      {/* Bottom technical specs tag */}
      <div className={`flex items-center justify-between z-10 text-[10px] font-mono font-medium pt-2 border-t ${
        isDark ? 'text-bone/40 border-night-700' : 'text-graphite/50 border-graphite/10'
      }`}>
        <span>ASSET ID: {specs || 'LISO-7005-MEDIA'}</span>
        <span className="text-accent font-semibold">FOTOGRAFÍA REAL REQUERIDA</span>
      </div>

      {/* Background subtle technical pattern */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
        isDark 
          ? 'bg-[radial-gradient(#F6F4EF_1px,transparent_1px)]' 
          : 'bg-[radial-gradient(#17181C_1px,transparent_1px)]'
      } [background-size:16px_16px]`} />
    </div>
  );
};
