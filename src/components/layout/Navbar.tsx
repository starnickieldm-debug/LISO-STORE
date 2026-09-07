import React, { useState, useEffect } from 'react';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CountrySelector } from '../ui/CountrySelector';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentMarket } = useMarket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Ingeniería", href: "#ingenieria" },
    { label: "Etiqueta", href: "#etiqueta" },
    { label: "Comparativa", href: "#comparativa" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-200 ${
        isScrolled 
          ? 'border-b border-white/10 shadow-lg shadow-black/30 py-2 sm:py-2.5' 
          : 'border-b border-transparent py-3 sm:py-4'
      }`}
      style={{ backgroundColor: 'rgba(11, 12, 15, 0.85)' }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo / Typography in Playfair Display Italic */}
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-2 group">
            <span className="font-display italic font-semibold text-2xl sm:text-2xl tracking-tighter text-bone group-hover:text-accent transition-colors">
              {brandConfig.name}
            </span>
            <span className="text-[10px] font-mono font-medium tracking-widest text-bone/50 border border-white/20 px-1.5 py-0.5 rounded-none uppercase hidden xs:inline-block">
              CARE
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase text-bone/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-bone transition-colors hover:underline underline-offset-8 decoration-accent decoration-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Action CTA (Visible in desktop AND mobile sticky nav) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <CountrySelector variant="navbar" />

          <a
            href="#oferta"
            className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase bg-accent hover:bg-accent-hover text-white transition-all rounded-none"
          >
            <span className="hidden sm:inline">Lo quiero — {currentMarket.formattedPrice}</span>
            <span className="sm:hidden">Comprar</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-bone hover:text-accent focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-night-900/95 backdrop-blur-md border-b border-white/15 px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-bone/80 hover:text-accent py-1 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2">
              <CountrySelector variant="drawer" />
            </div>

            <a
              href="#oferta"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center min-h-[48px] text-sm font-semibold tracking-wide uppercase bg-accent text-white"
            >
              Lo quiero — {currentMarket.formattedPrice}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
