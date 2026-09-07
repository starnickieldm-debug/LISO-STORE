import React from 'react';
import { comparisonRows, brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { useInView } from '../../hooks/useInView';
import { Reveal } from '../ui/Reveal';

export const ComparisonSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section 
      id="comparativa" 
      className="py-20 sm:py-28 bg-night-900 text-bone border-b border-night-700 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Ambient Layer (a): Radial cálido arriba-izquierda al 8% */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.08)_0%,transparent_65%)] blur-2xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          overline="COMPARATIVA REAL"
          title="¿Y cómo se compara con una plancha normal?"
          subtitle="Depende de lo que quieras hacer. Para una pila de ropa, hay herramientas mejores. Para arreglarte rápido antes de salir, LISO juega en otra liga."
          theme="dark"
        />

        {/* Responsive Table Wrapper with Horizontal Scroll & Sticky First Column */}
        <Reveal direction="up" duration={700}>
          <div ref={ref} className="relative border border-night-700 bg-night-950/80 shadow-studio-hard-dark overflow-hidden">
            
            <div className="overflow-x-auto horizontal-scroll-touch">
              <table className="w-full text-left border-collapse min-w-[640px]">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-night-700 bg-night-900/90">
                    <th className="sticky left-0 bg-night-900 z-20 py-4 px-4 sm:px-6 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-1/4 border-r border-night-700 shadow-[2px_0_10px_rgba(0,0,0,0.5)]">
                      CRITERIO PRÁCTICO
                    </th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-1/4 border-r border-night-700">
                      PLANCHA + TABLA
                    </th>
                    <th className="py-4 px-4 sm:px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-1/4 border-r border-night-700">
                      VAPORIZADOR DE MANO
                    </th>
                    <th className="relative py-4 px-4 sm:px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone bg-night-800/80 w-1/4 overflow-hidden border-r border-night-700">
                      {/* Animated hairline drawing rule */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-[3px] bg-accent transition-transform duration-600 ease-vapor-m origin-left ${
                          inView ? 'scale-x-100' : 'scale-x-0'
                        }`} 
                      />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-bone">{brandConfig.name}</span>
                        <span className="text-[10px] bg-accent px-1.5 py-0.5 text-white font-semibold uppercase">
                          RETOQUE DIARIO
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-night-700/70 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => {
                    const isLast = idx === comparisonRows.length - 1;

                    return (
                      <tr key={row.feature} className={`hover:bg-white/[0.03] transition-colors ${idx % 2 === 1 ? 'bg-white/[0.015]' : ''}`}>
                        {/* Sticky 1st column */}
                        <td className="sticky left-0 bg-night-950 z-10 py-3.5 px-4 sm:px-6 font-medium text-bone border-r border-night-700 shadow-[2px_0_10px_rgba(0,0,0,0.5)]">
                          {row.feature}
                        </td>
                        
                        {/* Plancha Tradicional */}
                        <td className="py-3.5 px-4 sm:px-5 text-bone/70 border-r border-night-700/60">
                          {row.traditionalIron}
                        </td>

                        {/* Vaporizador barato */}
                        <td className="py-3.5 px-4 sm:px-5 text-bone/70 border-r border-night-700/60">
                          {row.cheapSteamer}
                        </td>

                        {/* LISO */}
                        <td className={`py-3.5 px-4 sm:px-5 font-semibold text-bone bg-accent/10 border-r border-night-700/60 ${isLast ? 'text-bone/60 font-normal italic' : 'text-bone'}`}>
                          {row.liso}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-3 bg-night-900/90 border-t border-night-700 text-[11px] font-sans font-medium text-bone/50 flex items-center justify-between">
              <span>*Desliza horizontalmente en móvil para ver todas las columnas</span>
              <span className="font-mono text-[10px]">{brandConfig.labClaimNote}</span>
            </div>

          </div>
        </Reveal>

        {/* Honest concluding statement & CTA */}
        <Reveal direction="up" delay={150} duration={650}>
          <div className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-display font-medium text-bone leading-relaxed">
                Para una pila de ropa, usa una plancha. Para una prenda que necesitas lista en cinco minutos, usa LISO.
              </p>
              <p className="text-sm font-sans text-bone/70">
                LISO está hecha exactamente para esos momentos.
              </p>
            </div>
            
            <div>
              <CTAButton href="#oferta" size="default">
                Quiero LISO — {currentMarket.formattedPrice}
              </CTAButton>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
