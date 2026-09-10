import React from 'react';
import { boxItems, brandConfig } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Reveal } from '../ui/Reveal';

export const BoxContentsSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const prefersReduced = useReducedMotion();

  return (
    <section 
      className="py-14 sm:py-28 bg-bone border-b border-graphite/10"
      style={{ backgroundColor: '#F5F1EA', color: '#17181C' }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <SectionHeader
          title="Dentro de la caja."
          subtitle="Todo lo que necesitas para dejar tu ropa lista desde el primer minuto. Sin accesorios inútiles."
        />

        {/* Flat-lay Main Visual + Item breakdown */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
          
          {/* Flat-lay visual representation (6 cols, balanced max-width) */}
          <Reveal direction="up" duration={700} className="lg:col-span-6 max-w-[460px] sm:max-w-[490px] w-full mx-auto lg:mx-0">
            <div className="relative aspect-square w-full overflow-hidden bg-night-950 shadow-studio-hard border border-graphite/20 group">
              <picture className="w-full h-full">
                <source srcSet="/images/box-contents.webp" type="image/webp" />
                <img 
                  src="/images/box-contents.jpg" 
                  alt="Contenido del kit LISO: plancha de vapor, base de apoyo resistente al calor, vaso dosificador y cable de corriente"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
          </Reveal>

          {/* Item Breakdown List with Annotations (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-sans uppercase tracking-wider text-graphite/70 font-semibold pb-2 border-b border-graphite/15">
              Qué viene en la caja:
            </h3>

            <div className="divide-y divide-graphite/10 border-b border-graphite/10">
              {boxItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="py-3.5 flex items-start justify-between gap-4 group transition-all duration-200 ease-mech-s"
                  style={prefersReduced ? undefined : {
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                    transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`,
                    willChange: inView ? 'auto' : 'opacity, transform'
                  }}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs text-graphite/40 font-bold">
                        0{idx + 1}
                      </span>
                      <h4 className="font-display font-semibold text-sm sm:text-base text-graphite group-hover:text-accent transition-colors">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-graphite/70 leading-relaxed pl-6">
                      {item.annotation}
                    </p>
                  </div>
                  <span className="text-[11px] font-sans text-graphite/50 flex-shrink-0 pt-0.5 font-medium">
                    {item.includedCount}
                  </span>
                </div>
              ))}
            </div>

            {/* Quality seal reminder */}
            <div className="pt-4 flex items-center justify-between text-xs font-sans text-graphite/70 bg-bone-50/80 p-3 border border-graphite/15 font-medium">
              <span>RESPALDO Y SOPORTE:</span>
              <span className="font-semibold text-graphite">{brandConfig.factoryWarranty}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
