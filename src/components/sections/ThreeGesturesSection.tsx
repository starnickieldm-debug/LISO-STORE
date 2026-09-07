import React from 'react';
import { threeGestures, brandConfig } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Droplet, Power, Sparkles } from 'lucide-react';

export const ThreeGesturesSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', triggerOnce: true });
  const prefersReduced = useReducedMotion();

  const icons = [
    <Droplet className="w-4 h-4 text-bone/70 group-hover:text-accent transition-colors" />,
    <Power className="w-4 h-4 text-accent" />,
    <Sparkles className="w-4 h-4 text-bone/70 group-hover:text-accent transition-colors" />
  ];

  const stepImages = [
    {
      webp: "/images/paso-01-llenar.webp",
      jpg: "/images/paso-01-llenar.jpg",
      alt: "Llenado de agua con el vaso medidor en el depósito de la plancha LISO"
    },
    {
      webp: "/images/paso-02-encender.webp",
      jpg: "/images/paso-02-encender.jpg",
      alt: "Pantalla digital LED de la plancha LISO marcando 150 °C"
    },
    {
      webp: "/images/paso-03-planchar.webp",
      jpg: "/images/paso-03-planchar.jpg",
      alt: "Planchado a vapor en percha sobre abrigo de lana con la plancha LISO"
    }
  ];

  return (
    <section 
      id="como-funciona" 
      className="py-20 sm:py-24 lg:py-28 bg-night-900 text-bone border-b border-white/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Background Texture: Pizarra oscura con exposición reducida */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/images/section2-slate-texture.jpg" 
          alt="" 
          className="w-full h-full object-cover object-center scale-105 opacity-60"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        {/* Soft dark gradient overlays for luxury editorial contrast and smooth section blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-transparent to-[#0B0C0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/40 via-transparent to-[#0B0C0F]/40" />
      </div>

      {/* Ambient Layer: Radial cálido arriba-izquierda */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.08)_0%,transparent_65%)] blur-2xl z-1" 
        aria-hidden="true" 
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Centered Editorial Section Header with authoritative scale and tight spacing */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14 space-y-2.5">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase block">
            [02] ASÍ FUNCIONA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-bone tracking-tight leading-[1.15]">
            Solo 3 pasos para usarla
          </h2>
          <p className="text-base sm:text-lg text-bone/70 max-w-xl mx-auto font-normal leading-relaxed">
            Olvídate del rollo de sacar la tabla y la plancha pesada.
          </p>
        </div>

        {/* 3 Step Visual Process Grid with Editorial Flow Connectors */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 relative items-stretch">
          {threeGestures.map((item, idx) => (
            <React.Fragment key={item.step}>
              <div
                className="relative bg-night-950/70 backdrop-blur-md border border-white/[0.09] hover:border-accent/40 p-5 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300 ease-mech-s shadow-dark-card rounded-xl hover-lift"
                style={prefersReduced ? undefined : {
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                  transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms`,
                  willChange: inView ? 'auto' : 'opacity, transform'
                }}
              >
                <div>
                  {/* Step Identifier Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
                    <span className="font-mono text-xs font-bold tracking-[0.16em] text-accent">
                      PASO {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      {icons[idx]}
                    </div>
                  </div>

                  {/* Prominent Real Demonstration Photograph */}
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden rounded-lg bg-night-950 border border-white/10 group-hover:border-white/20 transition-colors shadow-md">
                    <picture>
                      <source srcSet={stepImages[idx].webp} type="image/webp" />
                      <img 
                        src={stepImages[idx].jpg} 
                        alt={stepImages[idx].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content Block */}
                  <div className="pt-4 sm:pt-5 space-y-1.5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-bone group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] font-medium text-bone/90 leading-snug">
                      {item.description}
                    </p>
                    <p className="text-xs sm:text-sm text-bone/60 leading-relaxed font-normal pt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Subtle Editorial Horizontal Arrow Connector (Desktop only, between cards 01-02 and 02-03) */}
                {idx < 2 && (
                  <div 
                    className="hidden md:flex items-center justify-center absolute -right-3.5 lg:-right-4.5 xl:-right-5.5 top-[28%] -translate-y-1/2 z-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-7 lg:w-9 xl:w-11 h-[1px] bg-gradient-to-r from-accent/70 via-accent to-white/40 relative">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0.5 border-solid border-t-transparent border-b-transparent border-l-accent border-t-[3.5px] border-b-[3.5px] border-l-[6px]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle Vertical Connector (Mobile only, between stacked cards) */}
              {idx < 2 && (
                <div className="md:hidden flex justify-center py-1 text-accent/60" aria-hidden="true">
                  <div className="flex flex-col items-center">
                    <div className="w-[1px] h-4 bg-gradient-to-b from-accent/60 to-white/20" />
                    <div className="w-0 h-0 border-solid border-l-[3.5px] border-r-[3.5px] border-t-[5px] border-l-transparent border-r-transparent border-t-accent/80" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Process Conclusion (El Resultado del Proceso) */}
        <div className="mt-12 sm:mt-16 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-accent font-semibold">
              EL RESULTADO
            </span>
          </div>

          <p className="font-display text-xl sm:text-2xl font-bold text-bone tracking-tight">
            Entre 2 y 3 minutos por prenda.
          </p>

          <p className="text-xs sm:text-sm font-sans text-bone/60 uppercase tracking-widest font-medium mt-1">
            Sin tabla de planchar · Sin accesorios extra
          </p>

          <p className="text-[10px] font-sans text-bone/40 italic pt-2">
            *{brandConfig.labClaimNote}
          </p>
        </div>

      </div>
    </section>
  );
};
