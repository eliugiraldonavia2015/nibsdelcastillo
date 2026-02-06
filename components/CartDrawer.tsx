import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-brand-card border-l border-brand-gold/20 z-[70] transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-dark">
            <h2 className="text-xl font-serif text-brand-gold font-bold italic">Tu Selección</h2>
            <button onClick={onClose} className="text-brand-muted hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-brand-muted space-y-4">
                <div className="p-4 rounded-full bg-white/5">
                   <ShoppingBag size={48} className="opacity-50 text-brand-gold" />
                </div>
                <p className="font-light">Tu carrito está esperando.</p>
                <button onClick={onClose} className="text-brand-accent border-b border-brand-accent hover:text-white hover:border-white transition-all pb-1 uppercase text-xs tracking-widest font-bold">
                  Explorar Tienda
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 animate-fadeIn">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-brand-gold/20">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between text-base font-medium text-white">
                        <h3 className="line-clamp-1 font-serif">{item.name}</h3>
                        <p className="ml-4 text-brand-gold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-xs text-brand-muted capitalize italic">{item.tags[0]}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mt-2">
                      <div className="flex items-center border border-white/20 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-brand-gold hover:text-brand-dark text-white transition-colors"
                        >-</button>
                        <span className="px-2 text-white font-mono text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-brand-gold hover:text-brand-dark text-white transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-muted hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/10 p-6 bg-brand-dark">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p className="uppercase text-xs tracking-widest text-brand-muted">Subtotal</p>
                <p className="font-serif text-2xl text-brand-gold">${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-xs text-brand-muted mb-6">
                Gastos de envío e impuestos calculados en el siguiente paso.
              </p>
              <button 
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full flex items-center justify-center rounded-sm bg-brand-gold px-6 py-4 text-sm uppercase tracking-widest font-bold text-brand-dark hover:bg-white transition-all duration-300 group shadow-lg shadow-brand-gold/10"
              >
                Proceder al Pago
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};