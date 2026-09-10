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
import { MovingTickerBar } from './components/ui/MovingTickerBar';

const technicalTickerItems = [
  { text: "1200 W DE POTENCIA CONTINUA POR CABLE", badge: "POTENCIA" },
  { text: "PANTALLA DIGITAL LED A 150 °C", badge: "CONTROL" },
  { text: "PLACA GIRATORIA 90° CON DOBLE EJE", badge: "ERGONOMÍA" },
  { text: "VAPOR PRESURIZADO LISTO EN SEGUNDOS", badge: "RAPIDEZ" },
  { text: "CÁMARA TÉRMICA EN ALEACIÓN DE ALUMINIO INYECTADO", badge: "MATERIAL" },
  { text: "100 ML DE CAPACIDAD CALIBRADA", badge: "DEPÓSITO" },
  { text: "100% PORTÁTIL PARA VIAJES Y HOGAR", badge: "DISEÑO" }
];

const trustTickerItems = [
  { text: "ENVÍO GRATIS A TODO EL TERRITORIO COLOMBIANO", badge: "COBERTURA" },
  { text: "PAGO SEGURO CON PSE, TARJETAS Y ADDI", badge: "SEGURIDAD" },
  { text: "GARANTÍA LEGAL DE 30 DÍAS CALENDARIO", badge: "RESPALDO" },
  { text: "GUÍA DE RASTREO EN LÍNEA DESDE EL DESPACHO", badge: "TRANSPARENCIA" },
  { text: "ATENCIÓN Y SOPORTE OFICIAL EN ESPAÑOL", badge: "SERVICIO" },
  { text: "EMPAQUE PROTEGIDO LISTO PARA USAR DESDE EL MINUTO CERO", badge: "CALIDAD" }
];

const HomePage: React.FC = () => (
  <main className="flex-grow">
    <HeroSection />
    <ThreeGesturesSection />
    <BenefitEvidenceSection />
    <MovingTickerBar items={technicalTickerItems} theme="dark" speedSeconds={32} />
    <EngineeringSection />
    <HonestyLabelSection />
    <ComparisonSection />
    <LifestyleScenesSection />
    <BoxContentsSection />
    <MovingTickerBar items={trustTickerItems} theme="light" speedSeconds={36} />
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
        style={{ backgroundColor: '#F5F1EA', color: '#262320' }}
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
