import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { brandConfig, productSpecs } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';
import { Check, ShieldCheck, Truck, Lock, RotateCcw, ChevronDown, Loader2 } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useShopifyCheckout } from '../../hooks/useShopifyCheckout';
import { LEGAL_SELLER } from '../../config/legalInfo';

const COLOR_CONFIG: Record<string, { swatchBg: string; border: string; label: string }> = {
  negro: { swatchBg: '#17181C', border: 'border-white/30', label: 'Negro' },
  gris: { swatchBg: '#5A5E6B', border: 'border-white/40', label: 'Gris' },
};

export const OfferSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const [policyAccordionOpen, setPolicyAccordionOpen] = useState<boolean>(false);
  const {
    isCheckingOut,
    error: checkoutError,
    colorOptions,
    selectedColor,
    setSelectedColor,
    initiateCheckout,
    clearError,
  } = useShopifyCheckout();

  return (
    <section 
      id="oferta" 
      className="py-20 sm:py-28 bg-night-950 text-bone border-b border-night-700 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Ambient Layer (e): Halo de luz detrás del bloque de compra y sello */}
      <div 
        className="pointer-events-none absolute top-1/3 -right-24 w-[500px] h-[500px] bg-halo-structural blur-3xl z-0" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Editorial Section Intro */}
        <Reveal direction="up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone tracking-tight">
              Tu LISO, lista para usar.
            </h2>
            <p className="text-base text-bone/70 mt-3">
              Todo lo que necesitas viene en la caja. La conectas y empiezas.
            </p>
          </div>
        </Reveal>

        {/* Conversion Main Box */}
        <Reveal direction="up" delay={120} duration={750}>
          {/* =========================================================================
              MOBILE PDP CHECKOUT EXPERIENCE (< 1024px) — 100% Native Mobile-First Flow
              ========================================================================= */}
          <div className="block lg:hidden space-y-5">
            
            {/* 1. Mobile Product Visual with Floating Badges */}
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-white/15 bg-night-950 shadow-2xl">
              <picture className="w-full h-full">
                <source srcSet="/images/liso-oferta.webp" type="image/webp" />
                <img 
                  src="/images/liso-oferta.jpg" 
                  alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-sans text-accent font-bold tracking-wider uppercase">
                KIT COMPLETO
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-sans text-bone/80 font-semibold tracking-wider uppercase">
                110–240 V DUAL
              </div>
            </div>

            {/* 2. Title, Pricing & Plug Match */}
            <div className="space-y-3 bg-night-950/80 border border-white/10 p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-accent font-bold block">
                  EDICIÓN ORIGINAL LISO
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-bone mt-0.5">
                  Plancha de vapor portátil LISO
                </h3>
              </div>

              {/* Price & Savings */}
              <div className="py-2.5 border-y border-white/10 space-y-1">
                {currentMarket.formattedCompareAtPrice && (
                  <div className="flex items-center gap-2 text-xs font-sans text-bone/50">
                    <span>Antes: </span>
                    <span className="line-through decoration-bone/40">{currentMarket.formattedCompareAtPrice}</span>
                    <span className="px-1.5 py-0.5 bg-accent/20 border border-accent/40 text-accent font-bold text-[10px] rounded">
                      AHORRA
                    </span>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-bone tracking-tight">
                    {currentMarket.formattedPrice}
                  </span>
                  <span className="text-xs font-sans uppercase tracking-wider text-accent font-semibold">
                    {currentMarket.shippingLabel}
                  </span>
                </div>
              </div>

              {/* Selector de Color (Mobile) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-wider text-bone/70 font-semibold">
                    COLOR: <span className="text-white font-bold">{selectedColor}</span>
                  </span>
                  <span className="text-[11px] font-sans text-accent font-medium">
                    110 V · Colombia
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map((color) => {
                    const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
                    const config = COLOR_CONFIG[color.toLowerCase()] || {
                      swatchBg: '#3A3D45',
                      border: 'border-white/30',
                      label: color,
                    };

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`relative p-2.5 flex items-center justify-between transition-all duration-200 cursor-pointer border rounded-lg ${
                          isSelected
                            ? 'bg-white/10 border-accent shadow-[0_0_12px_rgba(180,36,124,0.3)] ring-1 ring-accent'
                            : 'bg-night-950/70 border-white/15 hover:border-white/30 hover:bg-white/[0.04]'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-full border shadow-inner flex-shrink-0 flex items-center justify-center ${config.border}`}
                            style={{ backgroundColor: config.swatchBg }}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                            )}
                          </span>
                          <span className={`text-xs font-sans font-bold ${isSelected ? 'text-white' : 'text-bone/80'}`}>
                            {color}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enchufe Estándar Colombia Card */}
              <div className="p-2.5 bg-white/[0.04] border border-white/10 rounded-lg flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 border border-accent/60 bg-accent/15 text-accent font-sans font-bold text-xs flex items-center justify-center rounded">
                    110 V
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-bone">
                      <span>🇨🇴</span>
                      <span>Enchufe estándar para Colombia</span>
                    </div>
                    <span className="text-[11px] text-accent font-medium">
                      ✓ Clavija plana Tipo A/B · Conexión directa
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-sans text-bone/50 font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                  110 V
                </span>
              </div>

              {/* 3. Primary Buy CTA in the Thumb Zone */}
              <div className="pt-1">
                <CTAButton
                  size="large"
                  fullWidth
                  disabled={isCheckingOut}
                  onClick={() => initiateCheckout(selectedColor, 'CO')}
                  className="shadow-lg shadow-accent/25 py-3.5 text-base font-semibold"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Preparando pedido...</span>
                    </span>
                  ) : (
                    `Quiero LISO en ${selectedColor} — ${currentMarket.formattedPrice}`
                  )}
                </CTAButton>

                {checkoutError && (
                  <div className="mt-2.5 p-3 bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-sans flex items-start justify-between gap-2 animate-fadeIn rounded-lg">
                    <span>{checkoutError}</span>
                    <button
                      type="button"
                      onClick={clearError}
                      className="text-red-400 hover:text-white font-bold ml-2 text-sm leading-none cursor-pointer"
                      aria-label="Cerrar mensaje"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Pre-checkout Legal Notice */}
                <p className="mt-2.5 text-[10px] font-sans text-bone/60 leading-normal text-center">
                  Al solicitar tu pedido aceptas nuestros{' '}
                  <Link to="/terminos-y-condiciones" className="underline hover:text-bone text-bone/80">Términos</Link>
                  {', '}
                  <Link to="/politica-de-privacidad" className="underline hover:text-bone text-bone/80">Privacidad</Link>
                  {', '}
                  <Link to="/garantia" className="underline hover:text-bone text-bone/80">Garantía Legal (30 días)</Link>
                  {', '}
                  <Link to="/retracto-y-devoluciones" className="underline hover:text-bone text-bone/80">Retracto (5 días)</Link>
                  {' y '}
                  <Link to="/reversion-del-pago" className="underline hover:text-bone text-bone/80">Reversión</Link>.
                </p>

                {/* Trust Bullets */}
                <div className="flex items-center justify-between pt-2.5 text-[11px] font-sans text-bone/70 border-t border-white/5 mt-2.5">
                  <span className="inline-flex items-center gap-1 text-bone/90">
                    <span className="text-accent font-bold">✓</span> Envío gratis Colombia
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent font-bold">✓</span> Pago seguro
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent font-bold">✓</span> Garantía 30 días
                  </span>
                </div>

                {/* Discrete legal line under offer */}
                <div className="pt-2 text-center text-[10px] font-sans text-bone/50">
                  Compra segura · Envíos nacionales (15–20 días hábiles) · Garantía legal ·{' '}
                  <Link to="/terminos-y-condiciones" className="underline hover:text-bone/80">
                    Consulta nuestras políticas
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. What's in the Box (Compact View) */}
            <div className="p-4 bg-night-950/60 border border-white/10 rounded-xl space-y-2.5">
              <span className="text-xs font-sans uppercase tracking-wider text-bone/70 font-semibold block">
                ¿QUÉ RECIBES EN LA CAJA?
              </span>
              <ul className="space-y-1.5 text-xs text-bone">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                  <span>Plancha vaporizadora LISO (1200 W)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                  <span>Base dock térmica de apoyo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                  <span>Vaso medidor de 100 ml</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                  <span>Bolsa de transporte y protección</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                  <span>Manual de uso y guía rápida</span>
                </li>
              </ul>
            </div>

            {/* 5. Legal Guarantee Highlight */}
            <div className="p-4 bg-night-950/60 border border-white/10 rounded-xl flex items-center gap-4">
              <div className="flex-shrink-0">
                <RotatingGuaranteeStamp size={80} />
              </div>
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent stroke-[2.5]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-bone">
                    GARANTÍA LEGAL DE 30 DÍAS
                  </h4>
                </div>
                <p className="text-[11px] text-bone/80 leading-relaxed">
                  Cuentas con 30 días calendario de garantía legal desde la entrega física. Solución directa por defectos o fallas de fábrica con fletes cubiertos por LISO.
                </p>
              </div>
            </div>

            {/* 6. Quick Policy Accordion on Mobile */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setPolicyAccordionOpen(!policyAccordionOpen)}
                className="w-full py-2 flex items-center justify-between text-xs font-sans font-semibold text-bone/80 hover:text-white transition-colors"
                aria-expanded={policyAccordionOpen}
              >
                <span>Envíos, devoluciones y garantía</span>
                <ChevronDown 
                  className={`w-4 h-4 text-bone/60 transition-transform duration-200 ${
                    policyAccordionOpen ? 'rotate-180 text-accent' : ''
                  }`} 
                  aria-hidden="true" 
                />
              </button>

              {policyAccordionOpen && (
                <div className="pt-2 pb-1 space-y-2.5 text-xs text-bone/70 font-sans leading-relaxed border-t border-white/10 mt-1 animate-fadeIn">
                  <div>
                    <h5 className="font-semibold text-accent uppercase text-[10px] tracking-wider">Envíos Nacionales</h5>
                    <p className="text-[11px] mt-0.5">Envío gratis a toda Colombia. Tiempo estimado de entrega informado por la logística: 15–20 días hábiles. Despachos con número de guía y seguimiento en línea continuo hasta tu puerta.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-accent uppercase text-[10px] tracking-wider">Garantía y Devolución</h5>
                    <p className="text-[11px] mt-0.5">Cuenta con 30 días calendario de garantía legal por defectos de fabricación y 5 días hábiles para ejercer el derecho de retracto conforme al Estatuto del Consumidor en Colombia.</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* =========================================================================
              DESKTOP CONVERSION CONTAINER (>= 1024px) — 100% Unchanged Layout
              ========================================================================= */}
          <div className="hidden lg:block bg-night-900/90 border border-night-700 p-8 sm:p-10 lg:p-12 shadow-studio-hard-dark">
            <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left: Product Visual */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <div className="relative aspect-square sm:aspect-[3/4] w-full max-w-[420px] mx-auto lg:mx-0 overflow-hidden border border-white/15 bg-night-950 shadow-rim-warm group">
                <picture className="w-full h-full">
                  <source srcSet="/images/liso-oferta.webp" type="image/webp" />
                  <img 
                    src="/images/liso-oferta.jpg" 
                    alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-mech-s"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-sans text-bone/60 text-center tracking-wider uppercase font-medium">
                <span>VOLTAJE COMPATIBLE: 110–240 V DUAL</span>
              </div>
            </div>

            {/* Right: Offer Breakdown & Checkout Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Title & Model */}
              <div>
                <div>
                  <span className="text-xs font-sans font-semibold tracking-wider uppercase text-bone/60">
                    KIT COMPLETO
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-bone mt-1">
                  Plancha de vapor portátil LISO
                </h3>
              </div>

              {/* Price Presentation: Antes / Ahora */}
              <div className="py-3 border-y border-night-700 space-y-1">
                {currentMarket.formattedCompareAtPrice && (
                  <div className="text-xs font-sans text-bone/50 tracking-wider">
                    <span>Antes: </span>
                    <span className="line-through decoration-bone/40 font-medium">{currentMarket.formattedCompareAtPrice}</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-sans text-bone/60 font-medium">Ahora:</span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-bone tracking-tight">
                      {currentMarket.formattedPrice}
                    </span>
                  </div>
                  <span className="text-xs font-sans uppercase tracking-wider text-bone/60 font-medium">
                    Precio final · {currentMarket.shippingLabel}
                  </span>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-2">
                <span className="text-xs font-sans uppercase tracking-wider text-bone/70 font-semibold block">
                  ¿QUÉ RECIBES?
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-bone">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    <span>Plancha vaporizadora LISO (1200 W)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    <span>Base dock de apoyo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    <span>Vaso medidor de 100 ml</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    <span>Bolsa de transporte</span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    <span>Manual de uso y guía rápida</span>
                  </li>
                </ul>
              </div>

              {/* Selector de Color (Desktop) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-wider text-bone/70 font-semibold">
                    ELIGE TU COLOR: <span className="text-white font-bold">{selectedColor}</span>
                  </span>
                  <span className="text-[11px] font-sans text-accent font-medium">
                    Ambas opciones con clavija estándar 110 V
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {colorOptions.map((color) => {
                    const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
                    const config = COLOR_CONFIG[color.toLowerCase()] || {
                      swatchBg: '#3A3D45',
                      border: 'border-white/30',
                      label: color,
                    };

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`relative p-3.5 flex items-center justify-between transition-all duration-200 cursor-pointer border text-left rounded-lg ${
                          isSelected
                            ? 'bg-white/10 border-accent shadow-[0_0_15px_rgba(180,36,124,0.25)] ring-1 ring-accent'
                            : 'bg-night-950/80 border-white/15 hover:border-white/30 hover:bg-white/[0.04]'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full border shadow-inner flex-shrink-0 flex items-center justify-center ${config.border}`}
                            style={{ backgroundColor: config.swatchBg }}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                            )}
                          </span>
                          <div className="flex flex-col">
                            <span className={`text-sm font-sans font-bold ${isSelected ? 'text-white' : 'text-bone/80'}`}>
                              {color}
                            </span>
                            <span className="text-[11px] font-sans text-bone/50">
                              Disponibilidad inmediata
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enchufe Compatible para Colombia */}
              <div className="space-y-2 pt-1">
                <div className="p-3 sm:p-3.5 bg-night-950/80 border border-night-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-accent bg-accent/15 text-accent font-sans font-bold text-sm flex items-center justify-center flex-shrink-0">
                      110 V
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-sm font-sans font-semibold text-bone">
                        <span className="text-base" role="img" aria-label="Colombia">🇨🇴</span>
                        <span>Colombia</span>
                        <span className="text-xs font-normal text-bone/60 hidden sm:inline">· Enchufe estándar de clavija plana (110 V)</span>
                      </div>
                      <p className="text-xs text-accent font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                        <span>Conexión directa a la pared sin adaptadores</span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right flex-shrink-0">
                    <span className="text-[10px] font-sans font-semibold text-bone/50 uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1">
                      110 V ESTÁNDAR
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal Guarantee Highlight Card */}
              <div className="p-4 sm:p-5 bg-night-950 border border-night-700 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <RotatingGuaranteeStamp size={100} />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent stroke-[2.5]" />
                    <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-bone">
                      GARANTÍA LEGAL DE 30 DÍAS
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-bone/80 leading-relaxed font-medium">
                    Cuentas con 30 días calendario de garantía legal desde la entrega de tu producto. Si presenta cualquier falla de fábrica o funcionamiento, te brindamos solución directa con reparación, cambio o devolución sin intermediarios.
                  </p>
                  <p className="text-[10px] font-sans text-bone/50 italic">
                    Garantía amparada por la Ley 1480 de 2011 · Fletes de garantía asumidos en su totalidad por LISO.
                  </p>
                </div>
              </div>

              {/* Big Conversion CTA Button */}
              <div className="pt-2">
                <CTAButton
                  size="large"
                  fullWidth
                  disabled={isCheckingOut}
                  onClick={() => initiateCheckout(selectedColor, 'CO')}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Preparando pedido...</span>
                    </span>
                  ) : (
                    `Quiero LISO en ${selectedColor} — ${currentMarket.formattedPrice}`
                  )}
                </CTAButton>

                {checkoutError && (
                  <div className="mt-3 p-3 bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-sans flex items-start justify-between gap-2 animate-fadeIn">
                    <span>{checkoutError}</span>
                    <button
                      type="button"
                      onClick={clearError}
                      className="text-red-400 hover:text-white font-bold ml-2 text-sm leading-none cursor-pointer"
                      aria-label="Cerrar mensaje"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Pre-checkout Legal Notice */}
                <p className="mt-3 text-[11px] font-sans text-bone/60 leading-normal text-center max-w-lg mx-auto">
                  Al completar tu pedido aceptas nuestros{' '}
                  <Link to="/terminos-y-condiciones" className="underline hover:text-bone text-bone/80">Términos y Condiciones</Link>
                  {' y '}
                  <Link to="/politica-de-privacidad" className="underline hover:text-bone text-bone/80">Política de Privacidad</Link>.
                  {' '}Tu compra cuenta con{' '}
                  <Link to="/garantia" className="underline hover:text-bone text-bone/80">garantía legal (30 días calendario)</Link>
                  {', '}
                  <Link to="/retracto-y-devoluciones" className="underline hover:text-bone text-bone/80">derecho de retracto (5 días hábiles)</Link>
                  {' y '}
                  <Link to="/reversion-del-pago" className="underline hover:text-bone text-bone/80">reversión del pago</Link>.
                </p>

                {/* Compact Trust Row */}
                <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 pt-3 text-xs font-sans text-bone/80">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent font-bold">✓</span> Envío gratis a toda Colombia
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent font-bold">✓</span> Pago 100% seguro
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent font-bold">✓</span> Garantía legal 30 días
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent font-bold">✓</span> Seguimiento en línea
                  </span>
                </div>

                {/* Discrete legal line under offer */}
                <div className="pt-2 text-center text-[11px] font-sans text-bone/50">
                  Compra segura · Envíos nacionales (15–20 días hábiles) · Garantía legal ·{' '}
                  <Link to="/terminos-y-condiciones" className="underline hover:text-bone/80">
                    Consulta nuestras políticas
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-night-700 text-[11px] font-sans font-medium text-bone/70 text-center">
                <div className="p-2.5 bg-white/5 border border-white/10 space-y-0.5">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-bone/70" />
                  <p className="font-semibold text-bone">Envío</p>
                  <p className="text-bone/60 text-[10px]">15–20 días hábiles</p>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 space-y-0.5">
                  <Lock className="w-4 h-4 mx-auto mb-1 text-bone/70" />
                  <p className="font-semibold text-bone">Pago seguro</p>
                  <p className="text-bone/60 text-[10px]">Tus datos protegidos</p>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 space-y-0.5">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-bone/70" />
                  <p className="font-semibold text-bone">Garantía</p>
                  <p className="text-bone/60 text-[10px]">30 días legal</p>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 space-y-0.5">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1 text-bone/70" />
                  <p className="font-semibold text-bone">Retracto</p>
                  <p className="text-bone/60 text-[10px]">5 días hábiles</p>
                </div>
              </div>

              {/* Accordion: Envíos, devoluciones y garantía */}
              <div className="pt-3 border-t border-night-700">
                <button
                  type="button"
                  onClick={() => setPolicyAccordionOpen(!policyAccordionOpen)}
                  className="w-full py-2 flex items-center justify-between text-xs sm:text-sm font-sans font-semibold text-bone/80 hover:text-white transition-colors focus:outline-none group cursor-pointer"
                  aria-expanded={policyAccordionOpen}
                >
                  <span className="tracking-wide">Envíos, devoluciones y garantía</span>
                  <ChevronDown 
                    className={`w-4 h-4 text-bone/60 transition-transform duration-200 ${
                      policyAccordionOpen ? 'rotate-180 text-accent' : 'group-hover:text-bone'
                    }`} 
                    aria-hidden="true" 
                  />
                </button>

                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-mech-s ${
                    policyAccordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-2.5 pb-1 space-y-3 text-xs text-bone/75 font-sans leading-relaxed border-t border-white/10 mt-1.5">
                      {/* Envíos */}
                      <div className="space-y-1">
                        <h4 className="font-semibold text-bone uppercase tracking-wider text-[11px] text-accent">
                          Envíos Nacionales
                        </h4>
                        <p>
                          Envío gratis a toda Colombia. El tiempo estimado de entrega informado por la logística es de 15 a 20 días hábiles posteriores a la confirmación de la compra. Realizamos despachos con transportadoras reconocidas y te proporcionamos número de guía con seguimiento en línea continuo.
                        </p>
                        <p className="text-bone/60 text-[11px]">
                          Los tiempos son estimados y dependen de la cobertura y trayectos de las empresas transportadoras en cada municipio.
                        </p>
                      </div>

                      {/* Garantía Legal */}
                      <div className="space-y-1">
                        <h4 className="font-semibold text-bone uppercase tracking-wider text-[11px] text-accent">
                          Garantía Legal (30 días)
                        </h4>
                        <p>
                          Los productos LISO cuentan con una garantía legal de treinta (30) días calendario contados a partir de la entrega del producto al consumidor, amparada por la Ley 1480 de 2011 por defectos de calidad, idoneidad o funcionamiento técnico atribuibles al producto. Si requieres hacer efectiva la garantía, escríbenos a <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> o radica tu solicitud en <Link to="/pqr" className="text-accent underline">PQR</Link>. Los fletes válidos por garantía son asumidos por LISO.
                        </p>
                      </div>

                      {/* Derecho de Retracto */}
                      <div className="space-y-1">
                        <h4 className="font-semibold text-bone uppercase tracking-wider text-[11px] text-accent">
                          Derecho de Retracto y Devoluciones
                        </h4>
                        <p>
                          Conforme al artículo 47 del Estatuto del Consumidor, cuentas con 5 días hábiles tras la entrega para retractarte de la compra siempre que el producto esté sin uso y en su empaque original con todos sus accesorios. Conoce los detalles en nuestra <Link to="/retracto-y-devoluciones" className="text-accent underline">Política de Retracto</Link>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        </Reveal>

      </div>
    </section>
  );
};
