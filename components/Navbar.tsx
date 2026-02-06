import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X, Crown } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  cartCount: number;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, cartCount, openCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-brand-dark/95 backdrop-blur-md border-brand-gold/20 py-2' 
          : 'bg-transparent border-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button (Left) */}
          <div className="flex items-center md:hidden z-50 w-12">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-text hover:text-brand-gold transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Left Nav */}
          <div className="hidden md:flex flex-1 justify-end space-x-12 pr-12">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <button
                key={link.value}
                onClick={() => setPage(link.value as Page)}
                className={`text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                  currentPage === link.value ? 'text-brand-gold' : 'text-brand-text hover:text-brand-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center Logo - The Crest */}
          <div className="flex-shrink-0 flex items-center justify-center relative z-10 group cursor-pointer" onClick={() => setPage('home')}>
             {/* Logo Container */}
             <div className={`relative transition-all duration-500 flex items-center justify-center ${scrolled ? 'w-14 h-14 md:w-16 md:h-16' : 'w-20 h-20 md:w-32 md:h-32'}`}>
                <div className="absolute inset-0 bg-brand-dark rounded-full shadow-2xl shadow-black/50 border-2 border-brand-gold/30"></div>
                
                {/* Logo Icon / Image */}
                <div className="relative z-10 text-brand-gold p-3 rounded-full border border-brand-gold/20 bg-brand-dark/50">
                   <Crown size={scrolled ? 24 : 32} strokeWidth={1} className="drop-shadow-lg" />
                </div>
             </div>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden md:flex flex-1 justify-start space-x-12 pl-12">
            {NAV_LINKS.slice(2, 4).map((link) => (
              <button
                key={link.value}
                onClick={() => setPage(link.value as Page)}
                className={`text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                  currentPage === link.value ? 'text-brand-gold' : 'text-brand-text hover:text-brand-gold'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart Icon (Right) */}
          <div className="flex items-center justify-end w-12 md:w-auto relative md:absolute md:right-8 lg:right-12">
            <button onClick={openCart} className="group relative text-brand-text hover:text-brand-gold transition-colors p-2">
              <ShoppingBag size={24} strokeWidth={1} className="group-hover:fill-brand-gold/10 transition-all" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-brand-dark bg-brand-gold rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-dark/98 z-40 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center space-y-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.value}
              onClick={() => {
                setPage(link.value as Page);
                setIsOpen(false);
              }}
              className="text-2xl font-serif text-white hover:text-brand-gold hover:italic transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};