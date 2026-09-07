import React from 'react';
import { lifestyleScenes } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

export const LifestyleScenesSection: React.FC = () => {
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
          number="07"
          overline="EN TU VIDA DIARIA"
          title="Hay días en los que sacar la tabla no tiene sentido."
          subtitle="Una camisa antes de una reunión, una prenda delicada o la ropa que salió arrugada de la maleta. LISO está hecha para esos pequeños rescates del día a día."
          theme="dark"
        />

        {/* Editorial Grid: Asymmetrical layout with warm rim-light */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Scene 01: Camisa de oficina (Large feature 7 cols) */}
          <Reveal direction="up" delay={0} duration={700} className="lg:col-span-7 space-y-4 group hover-lift">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
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
            <div className="pt-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
                {lifestyleScenes[0].caption}
              </h3>
              <p className="text-sm text-bone/70 mt-1">
                {lifestyleScenes[0].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 02: Vestido delicado (5 cols) */}
          <Reveal direction="up" delay={120} duration={700} className="lg:col-span-5 space-y-4 group hover-lift">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-02-vestido.webp" type="image/webp" />
                <img 
                  src="/images/escena-02-vestido.jpg" 
                  alt="Vestido verde de satén vaporizado en percha con LISO"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
                {lifestyleScenes[1].caption}
              </h3>
              <p className="text-sm text-bone/70 mt-1">
                {lifestyleScenes[1].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 03: Cortina (4 cols) */}
          <Reveal direction="up" delay={0} duration={700} className="lg:col-span-4 space-y-4 group hover-lift">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
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
            <div className="pt-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-bone">
                {lifestyleScenes[2].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[2].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 04: Hotel + maleta (4 cols) */}
          <Reveal direction="up" delay={100} duration={700} className="lg:col-span-4 space-y-4 group hover-lift">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
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
            <div className="pt-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-bone">
                {lifestyleScenes[3].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[3].context}
              </p>
            </div>
          </Reveal>

          {/* Scene 05: Producto sobre dock (4 cols) */}
          <Reveal direction="up" delay={200} duration={700} className="lg:col-span-4 space-y-4 group hover-lift">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-rim-warm bg-night-900">
              <picture className="w-full h-full">
                <source srcSet="/images/escena-05-dock.webp" type="image/webp" />
                <img 
                  src="/images/escena-05-dock.jpg" 
                  alt="LISO descansando en su base dock sobre superficie de mármol en el baño"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="pt-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-bone">
                {lifestyleScenes[4].caption}
              </h3>
              <p className="text-xs sm:text-sm text-bone/70 mt-1">
                {lifestyleScenes[4].context}
              </p>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
