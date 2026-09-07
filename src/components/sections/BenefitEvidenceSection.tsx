import React from 'react';
import { benefitBlocks } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';

export const BenefitEvidenceSection: React.FC = () => {
  return (
    <section 
      className="py-20 sm:py-28 bg-night-950 text-bone border-b border-white/10 relative overflow-hidden bg-macro-fabric"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Ghost watermark */}
      <div 
        className="select-none pointer-events-none absolute -left-6 top-16 font-sans font-medium uppercase text-[15vw] tracking-tighter leading-none text-outline-bone-ghost ghost-fade-vertical hidden md:block" 
        aria-hidden="true" 
      >
        150°
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <SectionHeader
          title="Menos vueltas para tener tu ropa lista."
          subtitle="Olvídate de sacar la tabla cada vez que una prenda necesita un retoque. LISO está pensada para resolverlo en minutos."
          theme="dark"
        />

        {/* Alternating Benefit Blocks */}
        <div className="space-y-16 sm:space-y-24">
          {benefitBlocks.map((block, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={block.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Text Content */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="text-xs font-sans text-accent font-semibold uppercase tracking-wider">
                      {block.meta}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-bone leading-snug">
                    {block.title}
                  </h3>

                  <p className="text-base sm:text-lg text-bone/80 leading-relaxed">
                    {block.description}
                  </p>

                  {block.footnote && (
                    <p className="text-xs font-sans text-bone/50 italic pt-1">
                      {block.footnote}
                    </p>
                  )}


                </div>

                {/* Media Visual / Interactive Evidence (Clean without superimposed text) */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {index === 0 ? (
                    <BeforeAfterSlider 
                      beforeImage="/images/before-wrinkled-shirt.jpg"
                      afterImage="/images/after-smooth-shirt.jpg"
                    />
                  ) : index === 1 ? (
                    <div className="relative w-full aspect-[4/3] bg-night-900 border border-white/15 overflow-hidden shadow-dark-card group">
                      <img 
                        src="/images/screen-temperature-display.jpg" 
                        alt="Pantalla digital con indicador de temperatura en tiempo real" 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/3] bg-night-900 border border-white/15 overflow-hidden shadow-dark-card group">
                      <img 
                        src="/images/liso-desk-dock.jpg" 
                        alt="Plancha de vapor portátil LISO con base dock y vaso medidor sobre escritorio" 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
