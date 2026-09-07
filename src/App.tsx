import React from 'react';
import { MarketProvider } from './context/MarketContext';
import { TrustBar } from './components/layout/TrustBar';
import { Navbar } from './components/layout/Navbar';
import { StickyBuyBar } from './components/layout/StickyBuyBar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';

import { HeroSection } from './components/sections/HeroSection';
import { ThreeGesturesSection } from './components/sections/ThreeGesturesSection';
import { BenefitEvidenceSection } from './components/sections/BenefitEvidenceSection';
import { EngineeringSection } from './components/sections/EngineeringSection';
import { HonestyLabelSection } from './components/sections/HonestyLabelSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { LifestyleScenesSection } from './components/sections/LifestyleScenesSection';
import { BoxContentsSection } from './components/sections/BoxContentsSection';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { OfferSection } from './components/sections/OfferSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';

export function App() {
  return (
    <MarketProvider>
      <div 
        className="min-h-screen flex flex-col bg-night-950 text-bone antialiased font-sans relative selection:bg-accent selection:text-white"
        style={{ backgroundColor: '#0B0C0F', color: '#F6F4EF' }}
      >
      {/* Barra sutil de progreso de lectura editorial */}
      <ScrollProgress />

      {/* Capa de textura editorial: grano de papel sutil al 2% */}
      <div className="paper-grain-overlay" aria-hidden="true" />

      {/* S0: Barra Superior de Confianza */}
      <TrustBar />

      {/* Navegación Principal */}
      <Navbar />

      {/* Recorrido psicológico estructurado */}
      <main className="flex-grow">
        {/* S1: Hero con layout 50/50, loop video y precio visible */}
        <HeroSection />

        {/* S2: El Método de los 3 Gestos */}
        <ThreeGesturesSection />

        {/* S3: Beneficios con Evidencia */}
        <BenefitEvidenceSection />

        {/* S4: Capítulo de Ingeniería (Oscuro #14151A) */}
        <EngineeringSection />

        {/* S5: Etiqueta de Honestidad */}
        <HonestyLabelSection />

        {/* S6: Comparativa Honesta */}
        <ComparisonSection />

        {/* S7: Escenas Reales */}
        <LifestyleScenesSection />

        {/* S8: Dentro de la Caja */}
        <BoxContentsSection />

        {/* S9: Prueba Social Transparente */}
        <SocialProofSection />

        {/* S10: Oferta + Compra Respaldada */}
        <OfferSection />

        {/* S11: FAQ Acordeón */}
        <FAQSection />

        {/* S12: CTA Final */}
        <FinalCTASection />
      </main>

      {/* Footer Minimalista */}
      <Footer />

      {/* Mobile Sticky Buy Bar (<768px, <=56px height, >=52px button) */}
      <StickyBuyBar />
    </div>
    </MarketProvider>
  );
}

export default App;
