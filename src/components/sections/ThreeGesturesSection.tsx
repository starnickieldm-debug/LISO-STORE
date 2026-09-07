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
    <Droplet className="w-5 h-5 text-bone" />,
    <Power className="w-5 h-5 text-accent" />,
    <Sparkles className="w-5 h-5 text-bone" />
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
      className="py-20 sm:py-28 bg-night-900 text-bone border-b border-white/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Background Texture: Pizarra oscura con exposición reducida */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/images/section2-slate-texture.jpg" 
          alt="" 
          className="w-full h-full object-cover object-center scale-105 opacity-65"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        {/* Soft dark gradient overlays for luxury editorial contrast and smooth section blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-transparent to-[#0B0C0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/40 via-transparent to-[#0B0C0F]/40" />
      </div>

      {/* Ambient Layer (a): Radial cálido arriba-izquierda al 8% */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.08)_0%,transparent_65%)] blur-2xl z-1" 
        aria-hidden="true" 
      />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          number="02"
          overline="ASÍ FUNCIONA"
          title="Solo 3 pasos para usarla"
          subtitle="Olvídate del rollo de sacar la tabla y la plancha pesada."
          align="left"
          theme="dark"
        />

        {/* 3 Step Editorial Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {threeGestures.map((item, idx) => (
            <div
              key={item.step}
              className="relative bg-night-800/85 backdrop-blur-md border border-white/10 p-6 sm:p-7 flex flex-col justify-between group hover:border-accent/40 transition-all duration-250 ease-mech-s shadow-dark-card rounded-none hover-lift"
              style={prefersReduced ? undefined : {
                opacity: inView ? 1 : 0,
                transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 32px, 0)',
                transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms`,
                willChange: inView ? 'auto' : 'opacity, transform'
              }}
            >
              <div>
                {/* Top Step Dotted Callout & Icon */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <span className="font-sans text-xs px-2.5 py-0.5 border border-dashed border-accent/50 text-accent font-bold tracking-wider uppercase rounded-md">
                    PASO {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                </div>

                {/* Real Demonstration Photograph */}
                <div className="relative aspect-[4/3] w-full my-5 overflow-hidden bg-night-950 border border-white/10 group-hover:border-white/20 transition-colors shadow-inner">
                  <picture>
                    <source srcSet={stepImages[idx].webp} type="image/webp" />
                    <img 
                      src={stepImages[idx].jpg} 
                      alt={stepImages[idx].alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-bone">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-bone/90 leading-snug">
                    {item.description}
                  </p>
                  <p className="text-sm text-bone/60 pt-1 font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>

              {/* Footnote if exists */}
              {item.footnote && (
                <div className="mt-6 pt-3 border-t border-white/10">
                  <p className="text-[11px] font-sans text-bone/50 italic">
                    {item.footnote}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom reassurance line */}
        <div className="mt-12 text-center">
          <p className="text-xs font-sans font-semibold tracking-wider uppercase text-bone/60">
            ENTRE 2 Y 3 MINUTOS POR PRENDA · SIN TABLA NI ACCESORIOS EXTRA
          </p>
        </div>

      </div>
    </section>
  );
};
