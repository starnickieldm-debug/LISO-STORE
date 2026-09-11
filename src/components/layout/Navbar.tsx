import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentMarket } = useMarket();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // While hero is present and visible under navbar, stay integrated with hero color
        setIsInHero(rect.bottom > 70);
      } else {
        // Fallback for non-homepage routes
        setIsInHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { label: "Demostración", href: "/#demostracion-visual" },
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Comparativa", href: "/#comparativa" },
    { label: "Ingeniería", href: "/#ingenieria" },
    { label: "FAQ", href: "/#faq" }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled 
          ? 'py-2 sm:py-2.5' 
          : 'py-3 sm:py-3.5'
      } ${
        isInHero
          ? 'border-b border-graphite/10 shadow-sm'
          : 'border-b border-white/15 shadow-lg shadow-black/30'
      }`}
      style={{ 
        backgroundColor: isInHero 
          ? (isScrolled ? 'rgba(245, 241, 234, 0.92)' : '#F5F1EA') 
          : 'rgba(33, 31, 29, 0.92)'
      }}
    >
      <div className="max-w-[1600px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
        
        {/* Brand Logo / Typography in Playfair Display Italic */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className={`font-display italic font-semibold text-2xl sm:text-2xl tracking-tighter transition-colors ${
              isInHero ? 'text-graphite group-hover:text-accent' : 'text-bone group-hover:text-accent'
            }`}>
              {brandConfig.name}
            </span>
            <span className={`text-[10px] font-sans font-medium tracking-widest px-1.5 py-0.5 rounded-none uppercase hidden xs:inline-block border transition-colors ${
              isInHero ? 'text-graphite/70 border-graphite/25' : 'text-bone/60 border-white/20'
            }`}>
              CARE
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase transition-colors ${
          isInHero ? 'text-graphite/75' : 'text-bone/70'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors hover:underline underline-offset-8 decoration-accent decoration-2 ${
                isInHero ? 'hover:text-graphite' : 'hover:text-white'
              }`}
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
            <span className="hidden sm:inline">Pide la tuya – {currentMarket.formattedPrice}</span>
            <span className="sm:hidden">Pide la tuya</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 focus:outline-none transition-colors ${
              isInHero ? 'text-graphite hover:text-accent' : 'text-bone hover:text-accent'
            }`}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-xl border-b px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl animate-fadeIn ${
          isInHero 
            ? 'bg-[#F5F1EA]/98 border-graphite/15 text-graphite' 
            : 'bg-[#111216]/98 border-white/15 text-bone'
        }`}>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2.5 px-2 rounded border-b transition-colors flex items-center justify-between ${
                  isInHero 
                    ? 'text-graphite/90 border-graphite/10 active:text-accent active:bg-graphite/5' 
                    : 'text-bone/85 border-white/10 active:text-accent active:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <span className={`text-xs font-sans ${isInHero ? 'text-graphite/40' : 'text-bone/40'}`}>→</span>
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
