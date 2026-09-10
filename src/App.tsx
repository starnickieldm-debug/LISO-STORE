import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { TrustBar } from './components/layout/TrustBar';
import { Navbar } from './components/layout/Navbar';
import { StickyBuyBar } from './components/layout/StickyBuyBar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ScrollToTop } from './components/common/ScrollToTop';

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

import { TerminosCondicionesPage } from './pages/TerminosCondicionesPage';
import { PoliticaPrivacidadPage } from './pages/PoliticaPrivacidadPage';
import { GarantiaPage } from './pages/GarantiaPage';
import { RetractoDevolucionesPage } from './pages/RetractoDevolucionesPage';
import { ReversionPagoPage } from './pages/ReversionPagoPage';
import { EnviosPage } from './pages/EnviosPage';
import { PQRPage } from './pages/PQRPage';

const HomePage: React.FC = () => (
  <main className="flex-grow">
    <HeroSection />
    <ThreeGesturesSection />
    <BenefitEvidenceSection />
    <EngineeringSection />
    <HonestyLabelSection />
    <ComparisonSection />
    <LifestyleScenesSection />
    <BoxContentsSection />
    <SocialProofSection />
    <OfferSection />
    <FAQSection />
    <FinalCTASection />
  </main>
);

export function App() {
  return (
    <MarketProvider>
      <ScrollToTop />
      <div 
        className="min-h-screen flex flex-col bg-bone text-graphite antialiased font-sans relative selection:bg-accent selection:text-white"
        style={{ backgroundColor: '#F5F1EA', color: '#17181C' }}
      >
        <ScrollProgress />
        <div className="paper-grain-overlay" aria-hidden="true" />
        <TrustBar />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondicionesPage />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidadPage />} />
          <Route path="/garantia" element={<GarantiaPage />} />
          <Route path="/retracto-y-devoluciones" element={<RetractoDevolucionesPage />} />
          <Route path="/reversion-del-pago" element={<ReversionPagoPage />} />
          <Route path="/envios" element={<EnviosPage />} />
          <Route path="/pqr" element={<PQRPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
        <StickyBuyBar />
      </div>
    </MarketProvider>
  );
}

export default App;
