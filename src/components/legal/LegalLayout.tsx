import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ExternalLink, Scale, FileText, Lock, RotateCcw, Truck, HelpCircle } from 'lucide-react';
import { LEGAL_SELLER } from '../../config/legalInfo';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  badge?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  subtitle,
  badge = 'INFORMACIÓN AL CONSUMIDOR',
  lastUpdated = LEGAL_SELLER.lastUpdated,
  children,
}) => {
  const legalLinks = [
    { label: 'Términos y Condiciones', path: '/terminos-y-condiciones', icon: <FileText className="w-3.5 h-3.5" /> },
    { label: 'Privacidad y Datos', path: '/politica-de-privacidad', icon: <Lock className="w-3.5 h-3.5" /> },
    { label: 'Garantía Legal', path: '/garantia', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { label: 'Retracto y Devoluciones', path: '/retracto-y-devoluciones', icon: <RotateCcw className="w-3.5 h-3.5" /> },
    { label: 'Reversión del Pago', path: '/reversion-del-pago', icon: <Scale className="w-3.5 h-3.5" /> },
    { label: 'Envíos y Entregas', path: '/envios', icon: <Truck className="w-3.5 h-3.5" /> },
    { label: 'PQR y Atención', path: '/pqr', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="bg-night-950 text-bone min-h-screen">
      {/* Header Bar with Back Navigation */}
      <div className="border-b border-white/10 bg-night-900/60 backdrop-blur-md sticky top-[57px] sm:top-[65px] z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4 text-xs font-sans">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-bone/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver a la tienda</span>
          </Link>
          <div className="flex items-center gap-2 text-bone/50 text-[11px] hidden sm:flex">
            <span>🇨🇴 Colombia</span>
            <span>·</span>
            <span>Estatuto del Consumidor (Ley 1480 de 2011)</span>
          </div>
        </div>
      </div>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Document Header */}
        <header className="mb-10 sm:mb-14 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-accent uppercase mb-3">
            <Scale className="w-3 h-3 text-accent" />
            <span>{badge}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl lg:text-[2.6rem] font-bold text-bone tracking-tight leading-[1.15] mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-bone/75 font-sans leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans text-bone/60">
            <div>
              <span className="text-bone/40 block text-[10px] uppercase tracking-wider">Vendedor</span>
              <span className="text-bone/90 font-medium">{LEGAL_SELLER.name}</span>
            </div>
            <div>
              <span className="text-bone/40 block text-[10px] uppercase tracking-wider">RUT / Identificación</span>
              <span className="text-bone/90 font-medium">{LEGAL_SELLER.rut}</span>
            </div>
            <div>
              <span className="text-bone/40 block text-[10px] uppercase tracking-wider">Última actualización</span>
              <span className="text-bone/90 font-medium">{lastUpdated}</span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none text-xs sm:text-sm text-bone/80 font-sans leading-relaxed space-y-8">
          {children}
        </article>

        {/* Seller Notification Summary Card */}
        <div className="mt-12 p-5 bg-white/[0.03] border border-white/10 rounded-xl space-y-2 text-xs font-sans text-bone/70">
          <div className="flex items-center gap-2 text-bone font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Canal Oficial de Notificaciones y Atención</span>
          </div>
          <p>
            Para cualquier notificación judicial, petición, queja o reclamo legal relacionada con LISO:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-bone/80">
            <div>
              <span className="text-bone/40 block">Titular:</span>
              <span className="font-medium text-bone">{LEGAL_SELLER.name} ({LEGAL_SELLER.type})</span>
            </div>
            <div>
              <span className="text-bone/40 block">Dirección de notificaciones:</span>
              <span>{LEGAL_SELLER.notificationAddress}</span>
            </div>
            <div>
              <span className="text-bone/40 block">Correo electrónico oficial:</span>
              <a href={`mailto:${LEGAL_SELLER.contactEmail}`} className="text-accent underline font-medium">
                {LEGAL_SELLER.contactEmail}
              </a>
            </div>
            <div>
              <span className="text-bone/40 block">Autoridad competente:</span>
              <a 
                href={LEGAL_SELLER.sicUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-bone/90 hover:text-accent transition-colors underline"
              >
                <span>{LEGAL_SELLER.sicLabel}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Discrete Legal Navigation Sub-Bar */}
        <nav className="mt-12 pt-8 border-t border-white/10" aria-label="Otras políticas legales">
          <h3 className="text-xs font-sans uppercase tracking-wider text-bone/50 font-semibold mb-3">
            Otras secciones legales de LISO
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {legalLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans text-bone/70 hover:text-white transition-colors flex items-center gap-2 rounded"
              >
                <span className="text-accent">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
};
