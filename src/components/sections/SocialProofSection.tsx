import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section 
      id="prueba-real"
      className="py-14 sm:py-20 bg-night-900 text-bone border-b border-white/10 relative overflow-hidden"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Subtle ambient light */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.06)_0%,transparent_65%)] blur-2xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Clean, concise header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-bone leading-[1.2] pb-1">
            No te lo contamos. Te lo mostramos.
          </h2>
          <p className="text-sm sm:text-base text-bone/70 font-sans">
            Mira LISO en acción directamente sobre la prenda.
          </p>
        </div>

        {/* Video Player - Full prominence, clean frame, zero dead space */}
        <div className="relative aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl sm:rounded-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden group">
          <video
            ref={videoRef}
            src="/videos/liso-prueba-real.mp4"
            controls={isPlaying}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Initial Play Overlay - Fades smoothly on click */}
          {!isPlaying && (
            <div 
              onClick={handlePlayToggle}
              className="absolute inset-0 bg-black/40 hover:bg-black/25 backdrop-blur-[1px] flex items-center justify-center cursor-pointer transition-all"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlayToggle();
                }
              }}
              aria-label="Reproducir video de demostración"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-[0_0_24px_rgba(180,36,124,0.5)] transform group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
