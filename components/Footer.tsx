import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page, filter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-card border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
             <span 
               className="font-serif text-2xl font-bold text-brand-accent tracking-tighter cursor-pointer"
               onClick={() => onNavigate('home')}
             >
              Nibs <span className="text-white font-light italic">Del Castillo</span>
            </span>
            <p className="text-brand-muted text-sm leading-relaxed">
              Elaborando los mejores nibs de cacao orgánico para chefs, panaderos y amantes de la comida consciente en todo el mundo.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-brand-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white hover:text-brand-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-serif font-bold mb-6">Tienda</h3>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-brand-gold transition-colors text-left">Todos los Productos</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Best Seller')} className="hover:text-brand-gold transition-colors text-left">Best Sellers</button>
              </li>
              <li>
                <button onClick={() => onNavigate('gifts')} className="hover:text-brand-gold transition-colors text-left">Sets de Regalo</button>
              </li>
              <li>
                <button onClick={() => onNavigate('subscriptions')} className="hover:text-brand-gold transition-colors text-left">Suscripciones</button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-serif font-bold mb-6">Nosotros</h3>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-brand-gold transition-colors text-left">Nuestra Historia</button>
              </li>
              <li>
                <button onClick={() => onNavigate('process')} className="hover:text-brand-gold transition-colors text-left">El Proceso</button>
              </li>
              <li>
                <button onClick={() => onNavigate('sustainability')} className="hover:text-brand-gold transition-colors text-left">Sostenibilidad</button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-brand-gold transition-colors text-left">Blog</button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif font-bold mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-brand-gold flex-shrink-0" />
                <span>Av. del Cacao 123, Valle Sagrado, Ecuador</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-gold flex-shrink-0" />
                <span>+593 99 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-gold flex-shrink-0" />
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">hola@nibsdelcastillo.com</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted">
          <p>&copy; 2024 Nibs Del Castillo. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};