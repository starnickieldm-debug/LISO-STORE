import React, { useState } from 'react';
import { brandConfig, productSpecs } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { PolicyModal, PolicyTab } from '../ui/PolicyModal';

export const Footer: React.FC = () => {
  const { currentMarket } = useMarket();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PolicyTab>('shipping');

  const openPolicy = (tab: PolicyTab) => {
    setActiveTab(tab);
    setModalOpen(true);
  };

  return (
    <footer className="bg-night-950 text-bone/70 text-sm border-t border-night-700 pt-12 pb-28 md:py-14">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 pb-10 md:pb-12 border-b border-night-700">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="font-display italic text-2xl font-semibold tracking-tight text-bone">
                {brandConfig.name}
              </span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 border border-white/20 text-bone/60">
                EDICIÓN ORIGINAL
              </span>
            </div>
            <p className="text-xs text-bone/60 leading-relaxed font-sans">
              {brandConfig.tagline}
            </p>
            <p className="text-[12px] font-sans text-accent font-medium">
              {brandConfig.creativeConcept}
            </p>
          </div>

          {/* Col 2: Transparencia & Especificaciones */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold">
              Especificaciones Clave
            </h3>
            <ul className="text-xs space-y-1.5 text-bone/60 font-sans">
              <li>Potencia: {productSpecs.power}</li>
              <li>Voltaje: {productSpecs.voltage}</li>
              <li>Tanque: {productSpecs.tankCapacity} (~5 min)</li>
              <li>Temperatura: hasta {productSpecs.maxTemperature}</li>
              <li>Garantía: {brandConfig.factoryWarranty}</li>
            </ul>
          </div>

          {/* Col 3: Enlaces de Compra y Ayuda */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold">
              Atención & Ayuda
            </h3>
            <ul className="text-xs space-y-2 text-bone/60 font-sans">
              <li><a href="#faq" className="hover:text-bone transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#etiqueta" className="hover:text-bone transition-colors">Etiqueta de Honestidad</a></li>
              <li><a href="#oferta" className="hover:text-bone transition-colors">Soporte y Asistencia</a></li>
              <li><a href="#faq" className="hover:text-bone transition-colors">Soporte: hola@liso-care.com [CONFIRMAR]</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Políticas */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold">
              Información Legal
            </h3>
            <ul className="text-xs space-y-2 text-bone/60 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy('shipping')}
                  className="hover:text-bone transition-colors text-left focus:outline-none"
                >
                  Envíos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy('returns')}
                  className="hover:text-bone transition-colors text-left focus:outline-none"
                >
                  Devoluciones y reembolsos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy('warranty')}
                  className="hover:text-bone transition-colors text-left focus:outline-none"
                >
                  Garantía
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy('terms')}
                  className="hover:text-bone transition-colors text-left focus:outline-none"
                >
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicy('privacy')}
                  className="hover:text-bone transition-colors text-left focus:outline-none"
                >
                  Política de privacidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Country Indicator and Mandatory Lab Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-bone/50">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} {brandConfig.name}. Todos los derechos reservados.</p>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-bone/60 font-medium">🇨🇴 Colombia · Despachos a nivel nacional</span>
          </div>
          <p className="text-center sm:text-right text-bone/40 text-[10px]">
            {brandConfig.labClaimNote}
          </p>
        </div>

      </div>

      {/* Policy Details Modal */}
      <PolicyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </footer>
  );
};
