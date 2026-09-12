import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { brandConfig, productSpecs } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';
import { Check, ShieldCheck, Truck, Lock, RotateCcw, ChevronDown, Loader2, Minus, Plus, CreditCard, Sparkles } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useShopifyCheckout } from '../../hooks/useShopifyCheckout';
import { LEGAL_SELLER } from '../../config/legalInfo';
import { ProductGallery } from '../ui/ProductGallery';

const COLOR_CONFIG: Record<string, { swatchBg: string; border: string; label: string }> = {
  negro: { swatchBg: '#17181C', border: 'border-graphite/30', label: 'Negro' },
  gris: { swatchBg: '#5A5E6B', border: 'border-graphite/30', label: 'Gris' },
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
    quantity,
    setQuantity,
    unitColors,
    setUnitColor,
    setAllUnitColors,
    initiateCheckout,
    clearError,
  } = useShopifyCheckout();

  // Precios dinámicos calculados según la cantidad seleccionada
  const unitPrice = currentMarket.price;
  const unitCompareAtPrice = currentMarket.compareAtPrice || 250000;
  const totalPrice = unitPrice * quantity;
  const totalCompareAtPrice = unitCompareAtPrice * quantity;
  const totalSavings = totalCompareAtPrice - totalPrice;

  const formattedTotalPrice = `$${totalPrice.toLocaleString('es-CO')}`;
  const formattedTotalCompareAt = `$${totalCompareAtPrice.toLocaleString('es-CO')}`;
  const formattedSavings = `$${totalSavings.toLocaleString('es-CO')}`;

  // Resumen dinámico de colores seleccionados
  const colorCounts = unitColors.reduce<Record<string, number>>((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});

  const summaryParts = Object.entries(colorCounts).map(([color, count]) => `${count}x ${color}`);
  const summaryString = summaryParts.join(' · ') || `${quantity}x ${selectedColor}`;

  const areAllSameColor = Object.keys(colorCounts).length <= 1;
  const shortSummary = Object.entries(colorCounts).map(([color, count]) => `${count} ${color}`).join(', ');

  const ctaButtonText = quantity === 1
    ? `Pedir LISO en ${selectedColor} — ${formattedTotalPrice}`
    : areAllSameColor
      ? `Pedir ${quantity} unidades en ${unitColors[0] || selectedColor} — ${formattedTotalPrice}`
      : `Pedir ${quantity} unidades combinadas (${shortSummary}) — ${formattedTotalPrice}`;


  return (
    <section 
      id="oferta" 
      className="py-8 sm:py-12 lg:py-16 bg-white text-graphite border-y border-graphite/10 relative overflow-visible scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Mobile Product Header (Centered above gallery on mobile) */}
        <div className="block md:hidden text-center mb-6">
          <span className="text-xs font-sans font-bold tracking-widest uppercase text-accent block mb-1.5">
            KIT COMPLETO · CASA Y VIAJES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-graphite tracking-tight leading-tight">
            Plancha de vapor portátil LISO
          </h2>
        </div>

        {/* =========================================================================
            PDP NATIVE CONTAINER — Sticky High-Impact Visual + Scrolling Buy Flow
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start relative">
          
          {/* LEFT COLUMN: Sticky Full-Viewport Product Gallery (Static during right-column scroll) */}
          <div className="md:col-span-6 lg:col-span-6 xl:col-span-7 md:sticky md:top-24 h-[55vh] md:h-[calc(100dvh-6.5rem)] md:min-h-[500px] flex flex-col">
            <ProductGallery selectedColor={selectedColor} className="h-full flex-1" />
          </div>

          {/* RIGHT COLUMN: Scrolling Details & Buy Actions */}
          <div className="md:col-span-6 lg:col-span-6 xl:col-span-5 space-y-6 lg:space-y-7">
              
              {/* Product Title & Model (Desktop Only, High-Impact Scale) */}
              <div className="hidden md:block">
                <span className="text-xs sm:text-sm font-sans font-bold tracking-widest uppercase text-accent block mb-1.5">
                  KIT COMPLETO · CASA Y VIAJES
                </span>
                <h2 className="font-display text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-graphite tracking-tight leading-[1.12]">
                  Plancha de vapor portátil LISO
                </h2>
              </div>

              {/* Price Presentation: Antes / Ahora */}
              <div className="py-3 border-y border-graphite/10 space-y-1">
                {currentMarket.formattedCompareAtPrice && (
                  <div className="flex items-center gap-2 text-xs font-sans text-graphite/50 tracking-wider">
                    <span>Antes: </span>
                    <span className="line-through decoration-graphite/40 font-medium">
                      {quantity > 1 ? formattedTotalCompareAt : currentMarket.formattedCompareAtPrice}
                    </span>
                    <span className="px-1.5 py-0.5 bg-accent/10 border border-accent/30 text-accent font-bold text-[10px] rounded">
                      AHORRA {quantity > 1 ? formattedSavings : '24%'}
                    </span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-sans text-graphite/60 font-medium">
                      {quantity > 1 ? `Total (${quantity} unds):` : 'Ahora:'}
                    </span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-graphite tracking-tight">
                      {quantity > 1 ? formattedTotalPrice : currentMarket.formattedPrice}
                    </span>
                    {quantity > 1 && (
                      <span className="text-xs text-graphite/50 font-sans">
                        ({currentMarket.formattedPrice} c/u)
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-sans uppercase tracking-wider text-accent font-semibold">
                    Precio final · {currentMarket.shippingLabel}
                  </span>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-2.5">
                <span className="text-xs sm:text-sm font-sans uppercase tracking-wider text-graphite/75 font-bold block">
                  ¿QUÉ RECIBES EN LA CAJA?
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm md:text-[15px] font-sans text-graphite/90">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                    <span>Plancha vaporizadora LISO (1200 W)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                    <span>Base de apoyo resistente al calor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                    <span>Vaso dosificador de 100 ml</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                    <span>Bolsa de viaje y transporte (cabe en cualquier maleta)</span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3] flex-shrink-0" />
                    <span>Manual de uso y guía rápida</span>
                  </li>
                </ul>
              </div>

              {/* 3 Pilares de Ingeniería y Rendimiento LISO® (Opción C) */}
              <div className="p-3.5 bg-[#FAF8F5] border border-graphite/12 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-accent font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    INGENIERÍA Y RENDIMIENTO LISO®
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-graphite/50 font-semibold">
                    110 V COLOMBIA
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div className="p-2 sm:p-2.5 bg-white rounded-xl border border-graphite/10 shadow-2xs space-y-0.5">
                    <span className="text-base sm:text-lg font-bold text-graphite block leading-tight font-display">1200 W</span>
                    <span className="text-[11px] sm:text-xs font-bold text-graphite block leading-tight">Potencia Directa</span>
                    <span className="text-[10px] text-graphite/60 leading-tight block hidden xs:block">Sin baterías débiles</span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-white rounded-xl border border-graphite/10 shadow-2xs space-y-0.5">
                    <span className="text-base sm:text-lg font-bold text-graphite block leading-tight font-display">90°</span>
                    <span className="text-[11px] sm:text-xs font-bold text-graphite block leading-tight">Giro Patentado</span>
                    <span className="text-[10px] text-graphite/60 leading-tight block hidden xs:block">Gancho o tabla en 1 clic</span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-white rounded-xl border border-graphite/10 shadow-2xs space-y-0.5">
                    <span className="text-base sm:text-lg font-bold text-graphite block leading-tight font-display">3 seg</span>
                    <span className="text-[11px] sm:text-xs font-bold text-graphite block leading-tight">Vapor Flash</span>
                    <span className="text-[10px] text-graphite/60 leading-tight block hidden xs:block">150 °C aluminio cerámico</span>
                  </div>
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-sans uppercase tracking-wider text-graphite/75 font-bold">
                    CANTIDAD
                  </span>
                  <span className="text-xs font-sans text-accent font-medium shrink-0">
                    {quantity > 1 ? `${quantity} unidades seleccionadas` : '1 unidad'}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-graphite/12 rounded-xl space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
                  {/* Top Row on Mobile: Stepper Controls (Left) + Subtotal (Right) | Left & Middle on Desktop */}
                  <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0 sm:flex-1">
                    {/* Stepper Controls */}
                    <div className="flex items-center border border-graphite/20 bg-white rounded-lg overflow-hidden shadow-xs shrink-0">
                      <button
                        type="button"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        disabled={quantity <= 1 || isCheckingOut}
                        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-graphite hover:bg-graphite/5 active:bg-graphite/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-10 sm:w-12 text-center font-display font-bold text-base sm:text-lg text-graphite select-none">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                        disabled={quantity >= 10 || isCheckingOut}
                        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-graphite hover:bg-graphite/5 active:bg-graphite/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Product & Dispatch Label on Tablet/Desktop */}
                    <div className="hidden sm:flex flex-col min-w-0 flex-1 px-1">
                      <span className="text-xs sm:text-sm font-sans font-bold text-graphite truncate">
                        {quantity === 1 ? `1 plancha LISO (${selectedColor})` : `${quantity} planchas LISO`}
                      </span>
                      <span className="text-[10.5px] font-sans text-graphite/50 truncate">
                        {quantity > 1 ? `Colores: ${summaryString}` : 'Lista para despacho'}
                      </span>
                    </div>

                    {/* Subtotal on Mobile (aligned right with stepper on top row) */}
                    <div className="sm:hidden text-right shrink-0">
                      {quantity > 1 && (
                        <span className="block text-[11px] font-sans text-graphite/50 line-through leading-tight">
                          {formattedTotalCompareAt}
                        </span>
                      )}
                      <span className="text-sm xs:text-base font-display font-bold text-graphite leading-tight">
                        {formattedTotalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Sub-Row: Product & Dispatch status */}
                  <div className="sm:hidden flex items-center justify-between text-[11.5px] font-sans border-t border-graphite/10 pt-2 text-graphite/60 gap-2">
                    <span className="font-semibold text-graphite truncate min-w-0">
                      {quantity === 1 ? `1 plancha LISO (${selectedColor})` : `${quantity} planchas LISO`}
                    </span>
                    <span className="text-accent font-medium text-[11px] shrink-0">
                      {quantity > 1 ? `Colores: ${summaryString}` : '✓ Disponible para despacho'}
                    </span>
                  </div>

                  {/* Subtotal on Tablet/Desktop (Right column) */}
                  <div className="hidden sm:block text-right pl-2 shrink-0">
                    {quantity > 1 && (
                      <span className="block text-[11px] font-sans text-graphite/50 line-through">
                        {formattedTotalCompareAt}
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-display font-bold text-graphite">
                      {formattedTotalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selector de Color: Individual o Por Unidad si cantidad > 1 */}
              {quantity === 1 ? (
                /* Modo 1 Unidad: Selector clásico de 2 columnas */
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-sans uppercase tracking-wider text-graphite/70 font-semibold truncate">
                      ELIGE TU COLOR: <span className="text-graphite font-bold">{selectedColor}</span>
                    </span>
                    <span className="text-[11px] font-sans text-accent font-medium shrink-0">
                      110 V · Colombia
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map((color) => {
                      const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
                      const config = COLOR_CONFIG[color.toLowerCase()] || {
                        swatchBg: '#3A3D45',
                        border: 'border-graphite/30',
                        label: color,
                      };

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`relative p-2.5 sm:p-3 flex items-center justify-between gap-1.5 transition-all duration-200 cursor-pointer border text-left rounded-xl overflow-hidden ${
                            isSelected
                              ? 'bg-accent/5 border-accent shadow-xs ring-1 ring-accent'
                              : 'bg-[#FAF8F5] border-graphite/15 hover:border-graphite/30 hover:bg-graphite/[0.02]'
                          }`}
                          aria-pressed={isSelected}
                        >
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                            <span
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border shadow-inner shrink-0 flex items-center justify-center ${config.border}`}
                              style={{ backgroundColor: config.swatchBg }}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                              )}
                            </span>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className={`text-xs sm:text-sm font-sans font-bold truncate ${isSelected ? 'text-graphite' : 'text-graphite/80'}`}>
                                {color}
                              </span>
                              <span className="text-[10px] sm:text-[10.5px] font-sans text-graphite/50 truncate">
                                <span className="sm:hidden">Disponible</span>
                                <span className="hidden sm:inline">Disponibilidad inmediata</span>
                              </span>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Modo Multi-Unidad: Selector personalizado por cada unidad */
                <div className="space-y-2.5 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-sans uppercase tracking-wider text-graphite/70 font-semibold">
                        COLOR POR UNIDAD ({quantity} TOTAL)
                      </span>
                      <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent font-bold text-[10px] rounded-full">
                        Combina como quieras
                      </span>
                    </div>

                    {/* Atajo rápido: aplicar mismo color a todas */}
                    <div className="flex items-center gap-1.5 text-[10.5px] font-sans text-graphite/60">
                      <span>Todas:</span>
                      {colorOptions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setAllUnitColors(c)}
                          className="px-2 py-0.5 rounded bg-graphite/5 hover:bg-graphite/10 text-graphite text-[10.5px] font-semibold transition-colors cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filas interactivas por cada plancha */}
                  <div className={`space-y-2 ${quantity > 4 ? 'max-h-[300px] overflow-y-auto pr-1' : ''}`}>
                    {unitColors.map((currentColor, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 sm:p-3 bg-[#FAF8F5] border border-graphite/10 rounded-xl flex items-center justify-between gap-2 sm:gap-3 transition-colors hover:border-graphite/20"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/15 border border-accent/30 text-accent font-sans font-bold text-[11px] sm:text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs sm:text-sm font-sans font-bold text-graphite block truncate">
                              Plancha #{idx + 1}
                            </span>
                            <span className="text-[10px] font-sans text-graphite/50 block truncate">
                              Color: <strong className="text-graphite font-semibold">{currentColor}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Botones de color para esta unidad */}
                        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                          {colorOptions.map((color) => {
                            const isSelected = currentColor.toLowerCase() === color.toLowerCase();
                            const config = COLOR_CONFIG[color.toLowerCase()] || {
                              swatchBg: '#3A3D45',
                              border: 'border-graphite/30',
                              label: color,
                            };

                            return (
                              <button
                                key={color}
                                type="button"
                                onClick={() => setUnitColor(idx, color)}
                                className={`px-2 sm:px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-sans font-semibold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-accent/15 border-accent text-accent shadow-xs ring-1 ring-accent'
                                    : 'bg-white border-graphite/15 text-graphite/70 hover:text-graphite hover:border-graphite/30'
                                }`}
                                aria-pressed={isSelected}
                              >
                                <span
                                  className={`w-3.5 h-3.5 rounded-full border shadow-inner shrink-0 ${config.border}`}
                                  style={{ backgroundColor: config.swatchBg }}
                                />
                                <span>{color}</span>
                                {isSelected && (
                                  <Check className="w-3 h-3 text-accent stroke-[3] ml-0.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumen dinámico de combinación */}
                  <div className="p-2.5 px-3 rounded-xl bg-accent/5 border border-accent/20 text-xs font-sans flex items-center justify-between gap-2">
                    <span className="text-graphite/70 font-medium shrink-0">Tu pedido incluye:</span>
                    <span className="font-bold text-graphite tracking-wide truncate text-right">
                      {summaryString}
                    </span>
                  </div>
                </div>
              )}

              {/* Enchufe Compatible para Colombia */}
              <div className="space-y-2 pt-1">
                <div className="p-3 bg-[#FAF8F5] border border-graphite/12 flex items-center justify-between gap-3 sm:gap-4 rounded-xl">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 border border-accent/30 bg-accent/10 text-accent font-sans font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 rounded-lg">
                      110 V
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-graphite">
                        <span className="text-base" role="img" aria-label="Colombia">🇨🇴</span>
                        <span>Colombia</span>
                        <span className="text-xs font-normal text-graphite/60 hidden sm:inline">· Enchufe estándar de clavija plana (110 V)</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-accent font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-accent stroke-[3] shrink-0" />
                        <span className="truncate">Conexión directa a la pared sin adaptadores</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Guarantee Highlight Card */}
              <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-graphite/12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-xl">
                <div className="flex-shrink-0">
                  <RotatingGuaranteeStamp size={90} textColor="text-graphite" />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent stroke-[2.5]" />
                    <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-graphite">
                      GARANTÍA LEGAL DE 30 DÍAS
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-graphite/80 leading-relaxed font-medium">
                    Cuentas con 30 días calendario de garantía legal desde la entrega de tu producto. Si presenta cualquier falla de fábrica o funcionamiento, te brindamos solución directa con reparación, cambio o devolución sin intermediarios.
                  </p>
                  <p className="text-[10px] font-sans text-graphite/50 italic">
                    Garantía amparada por la Ley 1480 de 2011 · Costos de envío por garantía asumidos en su totalidad por LISO.
                  </p>
                </div>
              </div>

              {/* Big Conversion CTA Button */}
              <div className="pt-2">
                <CTAButton
                  size="large"
                  fullWidth
                  disabled={isCheckingOut}
                  onClick={() => initiateCheckout(unitColors, quantity, 'CO')}
                  className="rounded-xl shadow-lg shadow-accent/20"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Preparando pedido...</span>
                    </span>
                  ) : (
                    ctaButtonText
                  )}
                </CTAButton>

                {checkoutError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-start justify-between gap-2 animate-fadeIn rounded-lg">
                    <span>{checkoutError}</span>
                    <button
                      type="button"
                      onClick={clearError}
                      className="text-red-500 hover:text-red-800 font-bold ml-2 text-sm leading-none cursor-pointer"
                      aria-label="Cerrar mensaje"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Pre-checkout Legal Notice */}
                <p className="mt-3 text-[11px] font-sans text-graphite/60 leading-normal text-center max-w-lg mx-auto">
                  Al completar tu pedido aceptas nuestros{' '}
                  <Link to="/terminos-y-condiciones" className="underline hover:text-graphite text-graphite/80">Términos</Link>
                  {' y '}
                  <Link to="/politica-de-privacidad" className="underline hover:text-graphite text-graphite/80">Privacidad</Link>.
                  {' '}Compra protegida con{' '}
                  <Link to="/garantia" className="underline hover:text-graphite text-graphite/80">garantía legal</Link>.
                </p>

                {/* Payment Methods Reassurance Strip */}
                <div className="mt-4 p-3.5 bg-[#FAF8F5] border border-graphite/12 rounded-xl space-y-2 text-left">
                  <div className="flex items-center justify-between text-[11px] font-sans text-graphite/70">
                    <span className="font-semibold uppercase tracking-wider text-[10.5px] text-graphite/90 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-accent" />
                      Medios de pago en Colombia
                    </span>
                    <span className="text-emerald-600 font-medium text-[10.5px] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Conexión SSL 256-bit
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold text-graphite border border-graphite/15 shadow-xs">
                      PSE
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-semibold text-graphite/90 border border-graphite/15 shadow-xs">
                      Tarjetas Débito / Crédito
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold text-graphite border border-graphite/15 shadow-xs">
                      Nequi
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold text-graphite border border-graphite/15 shadow-xs">
                      Daviplata
                    </span>
                    <span className="px-2.5 py-1 rounded bg-accent/10 text-[11px] font-bold text-accent border border-accent/30 shadow-xs">
                      Addi
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-graphite/50 leading-relaxed">
                    Pagos procesados directamente a través de la pasarela oficial y protegida de Shopify. Sin comisiones extra ni cobros ocultos.
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-graphite/10 text-[11px] font-sans font-medium text-graphite/70 text-center">
                <div className="p-2.5 bg-[#FAF8F5] border border-graphite/12 space-y-0.5 rounded-lg">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <p className="font-semibold text-graphite">Envío gratis</p>
                  <p className="text-graphite/60 text-[10px]">Guía y rastreo nacional</p>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] border border-graphite/12 space-y-0.5 rounded-lg">
                  <Lock className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <p className="font-semibold text-graphite">Pago 100% seguro</p>
                  <p className="text-graphite/60 text-[10px]">PSE, Tarjetas, Nequi</p>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] border border-graphite/12 space-y-0.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <p className="font-semibold text-graphite">Garantía legal</p>
                  <p className="text-graphite/60 text-[10px]">30 días directa LISO</p>
                </div>
                <div className="p-2.5 bg-[#FAF8F5] border border-graphite/12 space-y-0.5 rounded-lg">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <p className="font-semibold text-graphite">Retracto legal</p>
                  <p className="text-graphite/60 text-[10px]">Ley 1480 Estatuto</p>
                </div>
              </div>

              {/* Accordion: Envíos, devoluciones y garantía */}
              <div className="pt-3 border-t border-graphite/10">
                <button
                  type="button"
                  onClick={() => setPolicyAccordionOpen(!policyAccordionOpen)}
                  className="w-full py-2 flex items-center justify-between text-xs sm:text-sm font-sans font-semibold text-graphite/80 hover:text-accent transition-colors focus:outline-none group cursor-pointer"
                  aria-expanded={policyAccordionOpen}
                >
                  <span className="tracking-wide">Envíos, devoluciones y garantía</span>
                  <ChevronDown 
                    className={`w-4 h-4 text-graphite/60 transition-transform duration-200 ${
                      policyAccordionOpen ? 'rotate-180 text-accent' : 'group-hover:text-graphite'
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
                    <div className="pt-2.5 pb-1 space-y-3 text-xs text-graphite/75 font-sans leading-relaxed border-t border-graphite/10 mt-1.5">
                      {/* Envíos */}
                      <div className="space-y-1">
                        <h4 className="font-semibold uppercase tracking-wider text-[11px] text-accent">
                          Envíos Nacionales
                        </h4>
                        <p>
                          Envío gratis a toda Colombia. Despachamos tu pedido directamente desde fábrica con entrega estimada de 15 a 20 días hábiles. Te proporcionamos número de guía y seguimiento en línea continuo hasta la entrega en tu domicilio.
                        </p>
                        <p className="text-graphite/60 text-[11px]">
                          Los tiempos son estimados y dependen de la cobertura y trayectos de las empresas transportadoras en cada municipio.
                        </p>
                      </div>

                      {/* Garantía Legal */}
                      <div className="space-y-1">
                        <h4 className="font-semibold uppercase tracking-wider text-[11px] text-accent">
                          Garantía Legal (30 días)
                        </h4>
                        <p>
                          Los productos LISO cuentan con una garantía legal de treinta (30) días calendario contados a partir de la entrega del producto al consumidor, amparada por la Ley 1480 de 2011 por defectos de calidad, idoneidad o funcionamiento técnico atribuibles al producto. Si requieres hacer efectiva la garantía, escríbenos a <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline">{LEGAL_SELLER.contactEmail}</a> o radica tu solicitud en <Link to="/pqr" className="text-accent underline">PQR</Link>. Los costos de envío válidos por garantía son asumidos por LISO.
                        </p>
                      </div>

                      {/* Derecho de Retracto */}
                      <div className="space-y-1">
                        <h4 className="font-semibold uppercase tracking-wider text-[11px] text-accent">
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
    </section>
  );
};
