import React from 'react';
import { priceTransparencyConfig } from '../../config/priceTransparency';
import { Reveal } from '../ui/Reveal';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

export const PriceTransparencySection: React.FC = () => {
  const {
    sectionId,
    title,
    subtitle,
    referenceStores,
    ourOffer,
    operationalContext,
    verificationCallout,
  } = priceTransparencyConfig;

  return (
    <section
      id={sectionId}
      className="py-8 sm:py-12 lg:py-14 bg-white text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* =========================================================================
            1. ENCABEZADO COMPACTO Y DIRECTO
            ========================================================================= */}
        <Reveal direction="up" duration={550}>
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-graphite tracking-tight leading-[1.15]">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base font-sans text-graphite/75 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </Reveal>

        {/* =========================================================================
            2. LAS 3 COMPARATIVAS (TARJETAS LIMPIAS Y CLICKEABLES)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {referenceStores.map((store, index) => {
            const isRealUrl = store.referenceUrl.startsWith('http');

            return (
              <Reveal key={store.id} direction="up" duration={550 + index * 60}>
                <div className="h-full flex flex-col justify-between rounded-2xl p-4 bg-white border border-graphite/12 shadow-card hover:border-accent/40 hover:shadow-premium transition-all group">
                  <div className="space-y-3">
                    {/* Header de la tarjeta */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-bold tracking-tight text-graphite">
                        {store.storeName}
                      </span>
                      {isRealUrl && (
                        <a
                          href={store.referenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-sans text-accent hover:text-accent-hover font-semibold inline-flex items-center gap-0.5"
                          title={`Abrir ${store.shortName} en pestaña nueva`}
                        >
                          <span>Enlace</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Captura de pantalla: Clickeable directamente para comprobar */}
                    <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-graphite/12 bg-[#FAF8F5] relative">
                      {isRealUrl ? (
                        <a
                          href={store.referenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full block relative cursor-pointer group/thumb"
                          title={`Ver publicación en ${store.storeName}`}
                        >
                          <img
                            src={store.screenshotUrl}
                            alt={`Captura de ${store.storeName}`}
                            className="w-full h-full object-contain p-1.5 group-hover/thumb:scale-[1.02] transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-graphite/0 group-hover/thumb:bg-graphite/10 transition-colors flex items-center justify-center pointer-events-none">
                            <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-night-950/90 text-white text-[10.5px] font-sans font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                              <span>Comprobar publicación</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </a>
                      ) : (
                        <img
                          src={store.screenshotUrl}
                          alt={`Captura de ${store.storeName}`}
                          className="w-full h-full object-contain p-1.5"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Precio publicado tachado */}
                    <div className="flex items-baseline justify-between pt-1 border-t border-graphite/8">
                      <span className="text-xs font-sans text-graphite/55">
                        Precio publicado:
                      </span>
                      <span className="text-xl sm:text-2xl font-sans font-bold text-graphite/80 tracking-tight line-through decoration-graphite/35">
                        {store.publishedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Botón de acceso directo a la publicación */}
                  {isRealUrl && (
                    <a
                      href={store.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-3 py-2 px-3 rounded-lg bg-graphite/5 hover:bg-accent/10 hover:text-accent text-graphite font-medium text-xs tracking-wide flex items-center justify-center gap-1.5 transition-colors border border-graphite/8 hover:border-accent/20"
                    >
                      <span>{store.ctaLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* =========================================================================
            3. NUESTRO PRECIO (COMPACTO, CONTUNDENTE Y CON IMAGEN TRANSPARENTE)
            ========================================================================= */}
        <Reveal direction="up" duration={650}>
          <div className="mb-6 sm:mb-8 rounded-2xl p-4 sm:p-6 bg-night-950 text-bone shadow-premium relative overflow-hidden border border-white/10">
            {/* Subtle warm magenta glow */}
            <div 
              className="absolute -right-10 -bottom-10 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Copy principal */}
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/20 text-accent-light text-[11px] font-sans font-semibold uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-3 h-3 text-accent" />
                  <span>En nuestra tienda</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-bone tracking-tight">
                  {ourOffer.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-bone/70">
                  {ourOffer.badge}
                </p>
              </div>

              {/* Imagen con fondo transparente de la plancha LISO */}
              <div className="shrink-0 flex items-center justify-center py-1">
                <img
                  src={ourOffer.imageCutoutUrl}
                  alt="Plancha de vapor portátil LISO"
                  className="h-24 sm:h-28 lg:h-32 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)] drop-shadow-[0_0_12px_rgba(180,36,124,0.3)] hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Enlace rápido a la oferta */}
              <div className="shrink-0 text-center sm:text-right">
                <a
                  href="#oferta"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-accent/20 active:scale-[0.98]"
                >
                  <span>Pedir la mía</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            4. MICRO-BLOQUE UNIFICADO: CONTEXTO + COMPROBACIÓN DIRECTA
            ========================================================================= */}
        <Reveal direction="up" duration={700}>
          <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-graphite/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Lado Izquierdo: ¿Cómo podemos ofrecerlo a este precio? */}
            <div className="md:max-w-md space-y-1">
              <h4 className="font-display text-base sm:text-lg font-bold text-graphite">
                {operationalContext.title}
              </h4>
              <p className="text-xs sm:text-sm font-sans text-graphite/75 leading-relaxed">
                {operationalContext.body}
              </p>
            </div>

            {/* Lado Derecho: ¿Quieres comprobarlo? + 3 Botones de referencia */}
            <div className="space-y-2.5 md:text-right border-t md:border-t-0 border-graphite/10 pt-4 md:pt-0">
              <div>
                <h5 className="font-display text-sm sm:text-base font-bold text-graphite">
                  {verificationCallout.title}
                </h5>
                <p className="text-xs font-sans text-graphite/60">
                  {verificationCallout.description}
                </p>
              </div>

              {/* Los 3 botones directos a las páginas oficiales */}
              <div className="flex flex-wrap items-center md:justify-end gap-2 pt-1">
                {referenceStores.map((store) => (
                  <a
                    key={store.id}
                    href={store.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-accent hover:text-white border border-graphite/15 hover:border-accent text-graphite font-sans font-semibold text-xs transition-all shadow-subtle"
                    title={`Comprobar en ${store.storeName}`}
                  >
                    <span>{store.shortName}</span>
                    <span className="text-[10px] text-graphite/40 group-hover:text-white/70 font-normal">
                      ({store.publishedPrice})
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
};
