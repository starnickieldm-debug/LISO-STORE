import React, { useState, useRef } from 'react';
import { lifestyleScenes } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

const sceneImages = [
  { webp: "/images/escena-01-camisa.webp", jpg: "/images/escena-01-camisa.jpg", alt: "Camisa de oficina colgada siendo alisada a vapor con LISO" },
  { webp: "/images/escena-02-vestido.webp", jpg: "/images/escena-02-vestido.jpg", alt: "Vestido verde de satén vaporizado en gancho con LISO" },
  { webp: "/images/escena-03-cortina.webp", jpg: "/images/escena-03-cortina.jpg", alt: "Cortina blanca vaporizada directamente en vertical con LISO" },
  { webp: "/images/escena-04-maleta.webp", jpg: "/images/escena-04-maleta.jpg", alt: "Plancha de viaje LISO empacada en maleta y bolso de mano" },
  { webp: "/images/escena-05-dock.webp", jpg: "/images/escena-05-dock.jpg", alt: "LISO descansando en su base de apoyo sobre superficie de mármol en el baño" },
];

export const LifestyleScenesSection: React.FC = () => {
  const [activeScene, setActiveScene] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    const clamped = Math.max(0, Math.min(lifestyleScenes.length - 1, index));
    setActiveScene(clamped);
  };

  const scrollToScene = (index: number) => {
    if (!carouselRef.current) return;
    const targetChild = carouselRef.current.children[index] as HTMLElement | undefined;
    if (targetChild) {
      targetChild.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    setActiveScene(index);
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-night-950 text-bone border-b border-night-700 relative overflow-hidden bg-macro-fabric"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Ghost ambiental MAÑANA (Grotesca outline 25% con máscara de niebla, suprimido en móvil < 768px) */}
      <div 
        className="select-none pointer-events-none absolute -right-6 top-10 font-sans font-medium text-[15vw] tracking-tighter leading-none text-outline-bone-ghost ghost-fog-mask hidden md:block" 
        aria-hidden="true" 
      >
        MAÑANA
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          title="Hay días en los que sacar la tabla no tiene sentido."
          subtitle="Una camisa antes de una reunión, una prenda delicada o la ropa que salió arrugada de la maleta. LISO está hecha para esos pequeños rescates del día a día."
          theme="dark"
        />

        {/* =========================================================================
            DESKTOP EDITORIAL GRID (>= 768px) — 100% Unchanged Asymmetrical Layout
            ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          
          {/* Scene 01: Camisa de oficina (Large feature 7 cols) */}
          <Reveal direction="up" delay={0} duration={700} className="lg:col-span-7 space-y-3 sm:space-y-4 group hover-lift">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl sm:rounded-[32px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-01-camisa.webp" type="image/webp" />
                <img 
                  src="/images/escena-01-camisa.jpg" 
                  alt="Camisa de oficina colgada siendo alisada a vapor con LISO"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-1 sm:pt-2">
              <h3 className="font-display text-lg sm:text-2xl font-bold text-bone">
                {lifestyleScenes[0].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[0].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 02: Vestido delicado (5 cols) */}
          <Reveal direction="up" delay={120} duration={700} className="lg:col-span-5 space-y-3 sm:space-y-4 group hover-lift">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl sm:rounded-[32px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-02-vestido.webp" type="image/webp" />
                <img 
                  src="/images/escena-02-vestido.jpg" 
                  alt="Vestido verde de satén vaporizado en gancho con LISO"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-1 sm:pt-2">
              <h3 className="font-display text-lg sm:text-2xl font-bold text-bone">
                {lifestyleScenes[1].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[1].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 03: Cortina (4 cols) */}
          <Reveal direction="up" delay={0} duration={700} className="lg:col-span-4 space-y-3 sm:space-y-4 group hover-lift">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-03-cortina.webp" type="image/webp" />
                <img 
                  src="/images/escena-03-cortina.jpg" 
                  alt="Cortina blanca vaporizada directamente en vertical con LISO"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-1 sm:pt-2">
              <h3 className="font-display text-base sm:text-xl font-bold text-bone">
                {lifestyleScenes[2].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[2].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 04: Hotel + maleta (4 cols) */}
          <Reveal direction="up" delay={100} duration={700} className="lg:col-span-4 space-y-3 sm:space-y-4 group hover-lift">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-04-maleta.webp" type="image/webp" />
                <img 
                  src="/images/escena-04-maleta.jpg" 
                  alt="Plancha de viaje LISO empacada en maleta y bolso de mano"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-1 sm:pt-2">
              <h3 className="font-display text-base sm:text-xl font-bold text-bone">
                {lifestyleScenes[3].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[3].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 05: Producto sobre dock (4 cols) */}
          <Reveal direction="up" delay={200} duration={700} className="lg:col-span-4 space-y-3 sm:space-y-4 group hover-lift">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-05-dock.webp" type="image/webp" />
                <img 
                  src="/images/escena-05-dock.jpg" 
                  alt="LISO descansando en su base de apoyo sobre superficie de mármol en el baño"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-1 sm:pt-2">
              <h3 className="font-display text-base sm:text-xl font-bold text-bone">
                {lifestyleScenes[4].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[4].context}
              </p>
            </div>
          </Reveal>

        </div>

        {/* =========================================================================
            MOBILE STORY REEL (< 768px) — 100% Native Mobile-First Snap Carousel
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Situation Pills Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3 px-1 -mx-1">
            {lifestyleScenes.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => scrollToScene(idx)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full font-sans text-[10px] font-bold tracking-wider uppercase transition-all ${
                    isActive 
                      ? 'bg-accent text-white shadow-sm ring-1 ring-accent' 
                      : 'bg-white/[0.05] border border-white/10 text-bone/60 hover:text-bone active:bg-white/10'
                  }`}
                >
                  {scene.number} · {scene.title.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap-Track */}
          <div 
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="mobile-snap-track gap-3.5 px-4 -mx-4 pb-3 pt-0.5"
          >
            {lifestyleScenes.map((scene, idx) => (
              <div
                key={scene.id}
                className="mobile-snap-item w-[85vw] max-w-[340px] bg-night-900/95 border border-white/15 p-4 rounded-2xl shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Slide Top Metadata */}
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                    <span className="font-sans text-[11px] font-bold tracking-wider text-accent uppercase">
                      ESCENA {scene.number} · {scene.title}
                    </span>
                    <span className="font-sans text-[11px] font-semibold text-bone/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                      {idx + 1} / {lifestyleScenes.length}
                    </span>
                  </div>

                  {/* High Quality Photograph */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-night-950 border border-white/10 mb-3 shadow-md">
                    <picture>
                      <source srcSet={sceneImages[idx].webp} type="image/webp" />
                      <img 
                        src={sceneImages[idx].jpg} 
                        alt={sceneImages[idx].alt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Caption & Context */}
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-bone leading-snug">
                      {scene.caption}
                    </h3>
                    <p className="text-xs text-bone/70 leading-relaxed font-normal">
                      {scene.context}
                    </p>
                  </div>
                </div>

                {/* Micro Swipe Cue on first slide */}
                {idx === 0 && (
                  <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-sans font-medium text-bone/50">
                    <span>DESLIZA PARA VER MÁS ESCENAS</span>
                    <span>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {lifestyleScenes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToScene(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeScene === idx 
                    ? 'w-6 bg-accent' 
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir a escena ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
