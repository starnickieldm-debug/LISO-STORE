import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
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
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Ingeniería", href: "/#ingenieria" },
    { label: "Etiqueta", href: "/#etiqueta" },
    { label: "Comparativa", href: "/#comparativa" },
    { label: "FAQ", href: "/#faq" }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-200 ${
        isScrolled 
          ? 'border-b border-graphite/10 shadow-sm py-2 sm:py-2.5' 
          : 'border-b border-transparent py-3 sm:py-4'
      }`}
      style={{ backgroundColor: 'rgba(245, 241, 234, 0.92)' }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo / Typography in Playfair Display Italic */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="font-display italic font-semibold text-2xl sm:text-2xl tracking-tighter text-graphite group-hover:text-accent transition-colors">
              {brandConfig.name}
            </span>
            <span className="text-[10px] font-mono font-medium tracking-widest text-graphite/50 border border-graphite/20 px-1.5 py-0.5 rounded-none uppercase hidden xs:inline-block">
              CARE
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase text-graphite/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-graphite transition-colors hover:underline underline-offset-8 decoration-accent decoration-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Action CTA (Visible in desktop; in mobile appears when scrolling) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href="/#oferta"
            className={`items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase bg-accent hover:bg-accent-hover text-white transition-all rounded-none ${
              isScrolled ? 'inline-flex' : 'hidden sm:inline-flex'
            }`}
          >
            <span className="hidden sm:inline">Pedir LISO — {currentMarket.formattedPrice}</span>
            <span className="sm:hidden">Pedir LISO</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-graphite hover:text-accent focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bone/98 backdrop-blur-xl border-b border-graphite/10 px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-graphite/85 active:text-accent active:bg-graphite/5 py-2.5 px-2 rounded border-b border-graphite/10 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-graphite/30 text-xs font-mono">→</span>
              </a>
            ))}

            <a
              href="/#oferta"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center min-h-[50px] text-sm font-semibold tracking-wide uppercase bg-accent active:scale-[0.98] text-white transition-transform shadow-lg shadow-accent/20"
            >
              Pedir LISO — {currentMarket.formattedPrice}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
