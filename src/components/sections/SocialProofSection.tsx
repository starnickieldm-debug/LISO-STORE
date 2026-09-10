import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

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
      className="py-14 sm:py-20 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Clean, concise header */}
        <Reveal direction="up" duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-graphite leading-[1.2] pb-1">
              No te lo contamos. Te lo mostramos.
            </h2>
            <p className="text-sm sm:text-base text-graphite/70 font-sans">
              Mira LISO en acción directamente sobre la prenda.
            </p>
          </div>
        </Reveal>

        {/* Video Player - Full prominence, clean frame, zero dead space */}
        <Reveal direction="up" delay={120} duration={700}>
          <div className="relative aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl sm:rounded-2xl border border-graphite/20 shadow-studio-hard overflow-hidden group">
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
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-accent hover:bg-accent-hover active:scale-95 text-white flex items-center justify-center shadow-[0_0_24px_rgba(180,36,124,0.5)] transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-0.5 fill-white" />
              </div>
            </div>
          )}
        </div>
        </Reveal>

      </div>
    </section>
  );
};
