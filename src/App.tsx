import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { TrustBar } from './components/layout/TrustBar';
import { Navbar } from './components/layout/Navbar';
import { StickyBuyBar } from './components/layout/StickyBuyBar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HeroSection } from './components/sections/HeroSection';
import { VisualProofSection } from './components/sections/VisualProofSection';
import { ThreeGesturesSection } from './components/sections/ThreeGesturesSection';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { HonestyLabelSection } from './components/sections/HonestyLabelSection';
import { OfferSection } from './components/sections/OfferSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';

// Lazy load legal policy subpages to keep the main landing bundle ultralight
const TerminosCondicionesPage = lazy(() => import('./pages/TerminosCondicionesPage').then(m => ({ default: m.TerminosCondicionesPage })));
const PoliticaPrivacidadPage = lazy(() => import('./pages/PoliticaPrivacidadPage').then(m => ({ default: m.PoliticaPrivacidadPage })));
const GarantiaPage = lazy(() => import('./pages/GarantiaPage').then(m => ({ default: m.GarantiaPage })));
const RetractoDevolucionesPage = lazy(() => import('./pages/RetractoDevolucionesPage').then(m => ({ default: m.RetractoDevolucionesPage })));
const ReversionPagoPage = lazy(() => import('./pages/ReversionPagoPage').then(m => ({ default: m.ReversionPagoPage })));
const EnviosPage = lazy(() => import('./pages/EnviosPage').then(m => ({ default: m.EnviosPage })));
const PQRPage = lazy(() => import('./pages/PQRPage').then(m => ({ default: m.PQRPage })));

const HomePage: React.FC = () => (
  <main className="flex-grow">
    {/* 01. Hook comercial, propuesta de valor y precio transparente */}
    <HeroSection />

    {/* 02. Prueba visual inmediata: 6 videos de telas (Satisface la expectativa del video de TikTok) */}
    <VisualProofSection />

    {/* 03. Mecánica simple en 3 gestos + Manifiesto y slider Antes/Después */}
    <ThreeGesturesSection />

    {/* 04. Prueba social masiva: 9 videos UGC de uso cotidiano con audio */}
    <SocialProofSection />

    {/* 05. Comparativa racional de valor: LISO frente a plancha tradicional y vaporizadores */}
    <ComparisonSection />

    {/* 06. Etiqueta de Honestidad: Lo que hace de forma excelente vs. para lo que no está diseñada */}
    <HonestyLabelSection />

    {/* 07. PDP Oficial / Selector de color, cantidad, kit completo y Checkout Shopify */}
    <OfferSection />

    {/* 09. Resolución de objeciones operativas y dudas finales */}
    <FAQSection />

    {/* 10. Cierre emocional de salida */}
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
        <TrustBar />
        <Navbar />

        <Suspense fallback={null}>
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
        </Suspense>

        <Footer />
        <StickyBuyBar />
      </div>
    </MarketProvider>
  );
}

export default App;
