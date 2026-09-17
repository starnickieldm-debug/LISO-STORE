import React from 'react';
import { priceTransparencyConfig } from '../../config/priceTransparency';
import { Reveal } from '../ui/Reveal';
import { ExternalLink, Clock, ShieldCheck, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const PriceTransparencySection: React.FC = () => {
  const {
    sectionId,
    title,
    subtitle,
    referenceStores,
    ourOffer,
    operationalContext,
    deliveryNotice,
    verificationCallout,
  } = priceTransparencyConfig;

  return (
    <section
      id={sectionId}
      className="py-12 sm:py-16 lg:py-20 bg-white text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Background Texture: Architectural micro-grid for transparency/editorial feel */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.03]"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(#262320_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* =========================================================================
            1. ENCABEZADO DE SECCIÓN
            ========================================================================= */}
        <Reveal direction="up" duration={600}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite tracking-tight leading-[1.12]">
              {title}
            </h2>
            <p className="mt-3.5 text-base sm:text-lg font-sans text-graphite/75 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </Reveal>

        {/* =========================================================================
            2. COMPARATIVA VISUAL DE PRECIOS: COMERCIOS DE REFERENCIA
            ========================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {referenceStores.map((store, index) => {
              const isRealUrl = store.referenceUrl.startsWith('http');

              return (
                <Reveal key={store.id} direction="up" duration={650 + index * 80}>
                  <div className="h-full flex flex-col justify-between rounded-2xl p-4 sm:p-5 bg-white border border-graphite/12 shadow-card hover:border-graphite/25 transition-all">
                    <div className="space-y-3.5">
                      {/* Cabecera de la tarjeta del comercio */}
                      <div className="flex items-center justify-between gap-2 border-b border-graphite/8 pb-2.5">
                        <span className="text-[11px] font-mono font-bold tracking-wider text-graphite/60 uppercase">
                          {store.storeName}
                        </span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-graphite/5 text-graphite/60">
                          Referencia {index + 1}
                        </span>
                      </div>

                      {/* Contenedor de Captura / Placeholder Screenshot */}
                      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-graphite/15 bg-white flex flex-col items-center justify-center p-1 text-center relative group">
                        {store.screenshotUrl ? (
                          isRealUrl ? (
                            <a
                              href={store.referenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full h-full block relative overflow-hidden group/img cursor-pointer"
                              title={`Abrir publicación en ${store.storeName}`}
                            >
                              <img
                                src={store.screenshotUrl}
                                alt={`Captura de ${store.storeName}`}
                                className="w-full h-full object-contain rounded-lg group-hover/img:scale-102 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-graphite/0 group-hover/img:bg-graphite/15 transition-colors flex items-center justify-center pointer-events-none">
                                <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-night-950/85 text-white text-[11px] font-sans px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                  <span>Ver en {store.storeName}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </span>
                              </div>
                            </a>
                          ) : (
                            <img
                              src={store.screenshotUrl}
                              alt={`Captura de ${store.storeName}`}
                              className="w-full h-full object-contain rounded-lg"
                              loading="lazy"
                            />
                          )
                        ) : (
                          <div className="space-y-1 p-3">
                            <span className="font-mono text-[11px] font-semibold text-graphite/60 block bg-white/80 px-2 py-1 rounded border border-graphite/10">
                              {store.screenshotPlaceholder}
                            </span>
                            <span className="text-[10px] text-graphite/45 block">
                              Captura de publicación externa
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Precio Publicado de Referencia */}
                      <div className="pt-1">
                        <span className="text-xs font-sans text-graphite/55 block">
                          Precio publicado:
                        </span>
                        <span className="text-2xl sm:text-[1.65rem] font-sans font-bold text-graphite/85 tracking-tight line-through decoration-graphite/35">
                          {store.publishedPrice}
                        </span>
                      </div>
                    </div>

                    {/* Botón de Comprobación Directa */}
                    <div className="pt-4 mt-2 border-t border-graphite/8">
                      {isRealUrl ? (
                        <a
                          href={store.referenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>{store.ctaLabel}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <div
                          className="w-full py-2.5 px-3 rounded-lg bg-graphite/5 text-graphite/70 font-mono text-xs flex items-center justify-center gap-1.5 cursor-default select-none border border-graphite/10"
                          title="Placeholder de URL pendiente de configuración"
                        >
                          <span>{store.referenceUrl}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-graphite/40" />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* =========================================================================
              4. NUESTRO PRECIO (DESTACADO HONESTO Y CLARO)
              ========================================================================= */}
          <Reveal direction="up" duration={750}>
            <div className="rounded-2xl p-5 sm:p-7 bg-night-950 text-bone shadow-premium relative overflow-hidden border border-white/10">
              {/* Subtle background glow */}
              <div 
                className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/20 border border-accent/35 text-accent-light text-xs font-sans font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>{ourOffer.label}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
                    Plancha de vapor LISO
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-bone/70 max-w-xl">
                    {ourOffer.differenceNote}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline md:items-end gap-3 sm:gap-5 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                  <div className="space-y-0.5">
                    <span className="text-xs font-sans text-bone/60 block">
                      Precio directo:
                    </span>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-bone tracking-tight">
                      {ourOffer.price}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-block text-xs font-sans font-semibold text-accent px-2.5 py-1 rounded bg-white/10 border border-white/10">
                      {ourOffer.shippingBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            5. CONTEXTO OPERATIVO + 6. TIEMPO DE ENTREGA (2 TARJETAS TRANSPARENTES)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
          
          {/* Tarjeta 5: ¿Por qué podemos ofrecerla por menos? */}
          <Reveal direction="up" duration={700}>
            <div className="h-full p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-graphite/10 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-accent">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-graphite">
                    {operationalContext.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-sans text-graphite/75 leading-relaxed">
                  {operationalContext.body}
                </p>
              </div>
              <div className="pt-2 border-t border-graphite/8 text-[11px] font-sans text-graphite/50 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Sin costos de intermediación minorista ni márgenes inflados.</span>
              </div>
            </div>
          </Reveal>

          {/* Tarjeta 6: Tiempo de entrega claro y honesto */}
          <Reveal direction="up" duration={750}>
            <div className="h-full p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-accent/25 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-accent">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-graphite">
                    {deliveryNotice.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-sans font-medium text-graphite leading-relaxed">
                  {deliveryNotice.primaryText}
                </p>
              </div>
              <div className="pt-2 border-t border-graphite/8">
                <p className="text-[11.5px] font-sans text-graphite/60 leading-normal">
                  {deliveryNotice.secondaryText}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =========================================================================
            7. "COMPRUÉBALO TÚ MISMO" (LLAMADO DE TRANSPARENCIA)
            ========================================================================= */}
        <Reveal direction="up" duration={800}>
          <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-graphite/10 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-display text-base sm:text-lg font-bold text-graphite">
                {verificationCallout.title}
              </h4>
              <p className="text-xs sm:text-sm font-sans text-graphite/70">
                {verificationCallout.description}
              </p>
            </div>

            {/* Botones de inspección rápida de referencias */}
            <div className="flex flex-wrap items-center gap-2">
              {referenceStores.map((store, i) => {
                const isReal = store.referenceUrl.startsWith('http');
                return isReal ? (
                  <a
                    key={store.id}
                    href={store.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-xs px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent font-semibold transition-colors"
                  >
                    <span>{store.storeName} ({store.publishedPrice})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span
                    key={store.id}
                    className="font-mono text-[11px] px-2.5 py-1 rounded bg-graphite/5 border border-graphite/10 text-graphite/70"
                  >
                    Ref {i + 1}: {store.pricePlaceholder || store.publishedPrice}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
