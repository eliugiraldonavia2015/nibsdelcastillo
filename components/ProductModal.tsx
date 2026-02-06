import React from 'react';
import { X, Star, ShoppingBag, Leaf, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-brand-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl shadow-brand-gold/10 border border-brand-gold/20 flex flex-col md:flex-row animate-float duration-75">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-brand-dark/50 rounded-full text-white hover:text-brand-gold transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-white/5">
           <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
           />
           <div className="absolute bottom-4 left-4 flex gap-2">
             {product.tags.map(tag => (
               <span key={tag} className="bg-brand-dark/80 backdrop-blur text-brand-gold text-xs px-3 py-1 uppercase tracking-wider border border-brand-gold/20">
                 {tag}
               </span>
             ))}
           </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">{product.name}</h2>
            <div className="flex items-center gap-4 mb-4">
               <span className="text-2xl text-brand-gold font-light">${product.price.toFixed(2)}</span>
               <div className="flex text-brand-accent">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                 ))}
               </div>
            </div>
          </div>

          <p className="text-brand-muted text-lg leading-relaxed mb-8 font-light">
            {product.description}
            <br/><br/>
            Nuestros nibs son seleccionados a mano en el Valle Sagrado, asegurando que cada bocado transporte la esencia pura del terroir ecuatoriano.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-brand-text">
               <Leaf size={18} className="text-green-500" />
               <span>100% Orgánico Certificado</span>
            </div>
             <div className="flex items-center gap-3 text-sm text-brand-text">
               <Check size={18} className="text-brand-gold" />
               <span>Envío gratuito en pedidos superiores a $50</span>
            </div>
          </div>

          <button 
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-brand-gold text-brand-dark py-4 px-6 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 group"
          >
            <ShoppingBag size={20} />
            Añadir a la Cesta
          </button>
        </div>
      </div>
    </div>
  );
};