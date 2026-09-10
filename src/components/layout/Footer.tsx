import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig, productSpecs } from '../../config/siteContent';
import { LEGAL_SELLER, LEGAL_COMMERCIAL } from '../../config/legalInfo';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer 
      className="bg-night-950 text-bone/70 text-sm border-t border-white/10 pt-12 pb-28 md:py-14"
      style={{ backgroundColor: '#14151A' }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 pb-10 md:pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <Link to="/" className="font-display italic text-2xl font-semibold tracking-tight text-bone hover:text-accent transition-colors">
                {brandConfig.name}
              </Link>
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
              <li>Voltaje: 110 V (red doméstica Colombia)</li>
              <li>Tanque: {productSpecs.tankCapacity} (~5 min)</li>
              <li>Temperatura: hasta {productSpecs.maxTemperature}</li>
              <li>Garantía: {LEGAL_COMMERCIAL.warrantyTerm} (Garantía Legal)</li>
            </ul>
          </div>

          {/* Col 3: Atención & Soporte */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold">
              Atención & Soporte
            </h3>
            <ul className="text-xs space-y-2 text-bone/60 font-sans">
              <li><a href="/#faq" className="hover:text-bone transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="/#etiqueta" className="hover:text-bone transition-colors">Etiqueta de Honestidad</a></li>
              <li><Link to="/envios" className="hover:text-bone transition-colors">Envíos nacionales ({LEGAL_COMMERCIAL.shippingEstimate})</Link></li>
              <li>
                <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="hover:text-bone transition-colors">
                  Atención: {LEGAL_SELLER.contactEmail}
                </a>
              </li>
              <li>
                <Link to="/pqr" className="hover:text-bone transition-colors text-accent font-medium">
                  Radicar PQR / Atención al Cliente →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Información al Consumidor */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold">
              Legal
            </h3>
            <ul className="text-xs space-y-2 text-bone/60 font-sans">
              <li>
                <Link to="/terminos-y-condiciones" className="hover:text-bone transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidad" className="hover:text-bone transition-colors">
                  Privacidad y tratamiento de datos
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="hover:text-bone transition-colors">
                  Garantía ({LEGAL_COMMERCIAL.warrantyTerm})
                </Link>
              </li>
              <li>
                <Link to="/retracto-y-devoluciones" className="hover:text-bone transition-colors">
                  Retracto y devoluciones
                </Link>
              </li>
              <li>
                <Link to="/reversion-del-pago" className="hover:text-bone transition-colors">
                  Reversión del pago
                </Link>
              </li>
              <li>
                <Link to="/envios" className="hover:text-bone transition-colors">
                  Envíos y entregas
                </Link>
              </li>
              <li>
                <Link to="/pqr" className="hover:text-bone transition-colors">
                  PQR
                </Link>
              </li>
              <li className="pt-1 border-t border-white/10">
                <a
                  href={LEGAL_SELLER.sicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone transition-colors text-bone/50 hover:text-accent flex items-center gap-1.5 text-[11px]"
                  title="Superintendencia de Industria y Comercio de Colombia"
                >
                  <span>Superintendencia de Industria y Comercio (SIC)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Seller Info & Country Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-bone/50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {brandConfig.name}. Todos los derechos reservados.</p>
            <span className="text-white/20 hidden sm:inline">·</span>
            <p>Vendedor: <strong className="text-bone/80">{LEGAL_SELLER.name}</strong> · NIT: {LEGAL_SELLER.nit} · Ibagué, Tolima, Colombia</p>
          </div>
          <div className="flex items-center gap-2 text-bone/60 font-medium">
            <span>🇨🇴 Colombia · Despachos a nivel nacional</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
