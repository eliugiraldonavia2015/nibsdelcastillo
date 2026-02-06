import React, { useState } from 'react';
import { X, Lock, CreditCard, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  clearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, total, clearCart }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-dark/95 flex items-center justify-center p-4">
        <div className="bg-brand-card p-12 rounded-lg border border-brand-gold/20 max-w-lg text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="font-serif text-3xl text-brand-gold mb-4">¡Gracias por tu pedido!</h2>
          <p className="text-brand-muted mb-8">
            Hemos recibido tu orden con éxito. Recibirás un correo electrónico con los detalles de envío y seguimiento en breve.
          </p>
          <button 
            onClick={onClose}
            className="bg-brand-accent text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-brand-dark transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center px-0 sm:px-4 pb-0 sm:pb-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-brand-dark w-full max-w-5xl h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl shadow-2xl border border-white/10 flex flex-col md:flex-row">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-muted hover:text-white z-20">
          <X size={24} />
        </button>

        {/* Order Summary (Left) */}
        <div className="w-full md:w-1/3 bg-brand-card/50 p-8 border-r border-white/5 order-2 md:order-1">
          <h3 className="font-serif text-xl text-white mb-6">Resumen del Pedido</h3>
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 text-sm">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white line-clamp-1">{item.name}</p>
                  <p className="text-brand-muted">{item.tags[0]}</p>
                </div>
                <p className="text-brand-gold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-brand-muted">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brand-muted">
              <span>Envío</span>
              <span>Calculado después</span>
            </div>
            <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-white/10 mt-2">
              <span>Total</span>
              <span className="font-serif text-brand-gold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form (Right) */}
        <div className="w-full md:w-2/3 p-8 order-1 md:order-2">
           <div className="flex items-center gap-2 mb-8 text-brand-gold">
             <Lock size={16} />
             <span className="text-xs uppercase tracking-widest font-bold">Checkout Seguro</span>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
             {/* Contact */}
             <div>
               <h4 className="text-white font-serif mb-4">Contacto</h4>
               <input required type="email" placeholder="Email" className="w-full bg-transparent border border-white/20 p-3 rounded text-white focus:border-brand-gold outline-none" />
             </div>

             {/* Shipping */}
             <div>
               <h4 className="text-white font-serif mb-4">Envío</h4>
               <div className="grid grid-cols-2 gap-4">
                 <input required type="text" placeholder="Nombre" className="col-span-1 bg-transparent border border-white/20 p-3 rounded text-white focus:border-brand-gold outline-none" />
                 <input required type="text" placeholder="Apellidos" className="col-span-1 bg-transparent border border-white/20 p-3 rounded text-white focus:border-brand-gold outline-none" />
                 <input required type="text" placeholder="Dirección" className="col-span-2 bg-transparent border border-white/20 p-3 rounded text-white focus:border-brand-gold outline-none" />
                 <input required type="text" placeholder="Ciudad" className="col-span-1 bg-transparent border border-white/20 p-3 rounded text-white focus:border-brand-gold outline-none" />
                 <input required type="text" placeholder="Código Postal" className="col-span-1 bg-transparent border border-white/20 p-3 rounded text-white focus:border-brand-gold outline-none" />
               </div>
             </div>

             {/* Payment Mock */}
             <div>
               <h4 className="text-white font-serif mb-4">Pago</h4>
               <div className="border border-brand-gold/40 rounded p-4 bg-brand-gold/5 flex items-center justify-between cursor-not-allowed opacity-80">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-brand-gold" />
                    <span className="text-sm text-white">Tarjeta de Crédito (Demo)</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-white/10 rounded"></div>
                    <div className="w-8 h-5 bg-white/10 rounded"></div>
                  </div>
               </div>
             </div>

             <button 
              disabled={loading}
              className="w-full bg-brand-accent text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all mt-4 disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
            </button>
           </form>
        </div>

      </div>
    </div>
  );
};