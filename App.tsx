import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PRODUCTS, NAV_LINKS } from './constants';
import { Product, Page, CartItem } from './types';
import { Reveal } from './components/Reveal';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ArrowRight, Star, Leaf, Award, Globe, ShoppingCart, Filter, Send, Play, ChevronDown, Droplet, Sun, Wind, Box, Clock, Heart, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [shopFilter, setShopFilter] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = (page: Page, filter?: string) => {
    setCurrentPage(page);
    if (page === 'shop' && filter) {
      setShopFilter(filter);
    } else {
      setShopFilter(null);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- SUB-COMPONENTS FOR PAGES ---

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group relative bg-brand-card border border-white/5 overflow-hidden transition-all duration-500 hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
      <div className="aspect-[4/5] w-full overflow-hidden relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.tags.includes('Best Seller') && (
            <span className="bg-brand-gold text-brand-dark text-[10px] font-bold uppercase px-3 py-1 tracking-wider shadow-md">
              Best Seller
            </span>
          )}
           {product.tags.includes('New') && (
            <span className="bg-brand-accent text-white text-[10px] font-bold uppercase px-3 py-1 tracking-wider shadow-md">
              Nuevo
            </span>
          )}
        </div>
        
        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur text-brand-dark px-6 py-2 uppercase text-xs tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Ver Detalles
            </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-xl font-serif text-white group-hover:text-brand-gold transition-colors cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            {product.name}
          </h3>
        </div>
        <p className="text-sm text-brand-muted line-clamp-2 mb-4 font-light">{product.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <p className="text-lg font-medium text-brand-gold">${product.price.toFixed(2)}</p>
          <button 
             onClick={(e) => {
               e.stopPropagation();
               addToCart(product);
             }}
             className="text-xs uppercase font-bold tracking-widest text-brand-text hover:text-white border-b border-transparent hover:border-white transition-all pb-1"
           >
             Añadir +
           </button>
        </div>
      </div>
    </div>
  );

  const Hero = () => (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Restored to Picsum to ensure it loads */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/113/1920/1080" 
          alt="Dark Cacao Texture" 
          className="w-full h-full object-cover opacity-50 scale-105" 
        />
        {/* Gradient overlays for castle vibe */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/30 to-brand-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-dark/50 to-brand-dark" />
      </div>

      {/* Main Content Container - Centered */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20 flex flex-col items-center w-full">
        <Reveal width="100%">
           <div className="flex flex-col items-center mb-6 w-full">
             <div className="h-16 w-[1px] bg-brand-gold mb-6 opacity-50"></div>
             <p className="text-brand-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase">Est. 2024 &mdash; Valle Sagrado</p>
           </div>
        </Reveal>
        
        <Reveal delay={0.2} width="100%">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-8 leading-[0.9] tracking-tight w-full text-center">
            Nibs Del <br/>
            <span className="italic text-brand-gold/90 font-light relative inline-block px-4">
              Castillo
              {/* Decorative lines - Hidden on very small screens to avoid overflow */}
              <span className="hidden sm:block absolute top-1/2 -left-8 w-6 h-[1px] bg-brand-gold/50"></span>
              <span className="hidden sm:block absolute top-1/2 -right-8 w-6 h-[1px] bg-brand-gold/50"></span>
            </span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.4} width="100%">
          <div className="w-full flex justify-center">
            <p className="text-brand-text/80 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed text-center">
              Un legado de sabor forjado en la tradición. Cacao de origen único, procesado con la nobleza de la realeza y la pureza de la tierra.
            </p>
          </div>
        </Reveal>
        
        {/* Buttons - Using width="100%" on Reveal to fix the alignment issue */}
        <Reveal delay={0.6} width="100%">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="w-full sm:w-auto bg-brand-gold text-brand-dark px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(238,187,114,0.2)]"
            >
              Adquirir Cacao
            </button>
            <button 
              onClick={() => setCurrentPage('story')}
              className="w-full sm:w-auto text-white px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-all flex items-center justify-center gap-2 group"
            >
              <span className="w-8 h-[1px] bg-white group-hover:bg-brand-gold transition-colors"></span>
              Nuestro Legado
            </button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center animate-bounce duration-[2000ms]">
        <ChevronDown className="text-brand-gold/50" size={32} />
      </div>
    </div>
  );

  // --- PAGES RENDERERS ---

  const renderHome = () => (
    <>
      <Hero />
      
      {/* Introduction */}
      <section className="py-32 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal width="100%">
              <div>
                <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 block">La Fortaleza del Sabor</span>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                  Más que un ingrediente, <br/><span className="text-brand-gold italic">un tesoro.</span>
                </h2>
                <p className="text-brand-muted text-lg mb-8 leading-relaxed font-light">
                  En Nibs Del Castillo, tratamos cada grano de cacao como una joya. Cultivado en las faldas de montañas antiguas, nuestro cacao absorbe la riqueza mineral de la tierra volcánica, resultando en un perfil de sabor profundo, complejo y digno de paladares exigentes.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mt-12">
                   <div>
                     <h4 className="text-3xl font-serif text-white mb-1">24h</h4>
                     <p className="text-xs uppercase tracking-widest text-brand-gold">Conchado Lento</p>
                   </div>
                   <div>
                     <h4 className="text-3xl font-serif text-white mb-1">100%</h4>
                     <p className="text-xs uppercase tracking-widest text-brand-gold">Trazable</p>
                   </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3} width="100%">
              <div className="relative group flex justify-center lg:justify-end">
                 {/* Logo Container */}
                 <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-4">
                   {/* Background decorative glow */}
                   <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-3xl transform scale-75 animate-pulse"></div>
                   
                   <div className="relative w-full h-full rounded-full border-2 border-brand-gold/20 bg-brand-card shadow-2xl flex items-center justify-center overflow-hidden">
                     {/* USER LOGO - Using absolute path /logo.png */}
                     <img 
                      src="/logo.png" 
                      alt="Nibs Del Castillo Logo" 
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-[1.5s] z-10" 
                      onError={(e) => {
                        // Fallback to placeholder if not found
                        e.currentTarget.src = "https://via.placeholder.com/600x600/241a16/eebb72?text=LOGO+NOT+FOUND";
                      }}
                     />
                     {/* Gloss effect */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                   </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 bg-brand-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <Reveal width="100%">
              <div className="flex flex-col items-center">
                 <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Selección Real</span>
                 <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Los Favoritos de la Corte</h2>
                 <div className="w-24 h-1 bg-brand-accent rounded-full"></div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRODUCTS.slice(0, 3).map((product, idx) => (
              <Reveal key={product.id} delay={idx * 0.1} width="100%">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
             <button onClick={() => setCurrentPage('shop')} className="inline-block border border-brand-gold/30 text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
               Ver Toda la Colección
             </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-brand-dark border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-card to-[#1a0f0f] rounded-none border border-brand-gold/20 p-8 md:p-20 text-center relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-brand-gold/30"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-brand-gold/30"></div>
          
          <div className="relative z-10">
            <Leaf className="text-brand-gold mx-auto mb-6 opacity-80" size={32} />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 italic">Únete al Círculo Interno</h2>
            <p className="text-brand-muted text-lg mb-10 max-w-lg mx-auto font-light">
              Recibe invitaciones a catas privadas, acceso anticipado a cosechas limitadas y secretos de chocolatería.
            </p>
            <form className="max-w-md mx-auto flex flex-col md:flex-row gap-0" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full px-6 py-4 bg-brand-dark border border-brand-gold/30 text-white placeholder-brand-muted focus:outline-none focus:border-brand-gold transition-all"
              />
              <button className="bg-brand-gold text-brand-dark font-bold px-8 py-4 uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap mt-4 md:mt-0">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );

  const renderShop = () => {
    const displayedProducts = shopFilter 
      ? PRODUCTS.filter(p => p.tags.includes(shopFilter))
      : PRODUCTS;

    return (
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <Reveal width="100%">
          <div className="text-center mb-20 relative">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">La Tienda</h1>
            <p className="text-brand-muted max-w-2xl mx-auto font-light text-lg">Explora nuestra selección de nibs premium y derivados del cacao puro.</p>
          </div>
        </Reveal>

        {/* Filters Bar */}
        <div className="flex justify-between items-center mb-12 border-y border-white/5 py-6">
          <div className="flex items-center space-x-2 text-white">
            <Filter size={16} />
            <button 
              onClick={() => setShopFilter(null)} 
              className={`text-xs uppercase tracking-widest font-bold ${!shopFilter ? 'text-brand-gold' : 'text-brand-muted hover:text-white'}`}
            >
              Todos
            </button>
            <span className="text-brand-muted">/</span>
            <button 
              onClick={() => setShopFilter('Best Seller')} 
              className={`text-xs uppercase tracking-widest font-bold ${shopFilter === 'Best Seller' ? 'text-brand-gold' : 'text-brand-muted hover:text-white'}`}
            >
              Populares
            </button>
             <span className="text-brand-muted">/</span>
            <button 
              onClick={() => setShopFilter('Raw')} 
              className={`text-xs uppercase tracking-widest font-bold ${shopFilter === 'Raw' ? 'text-brand-gold' : 'text-brand-muted hover:text-white'}`}
            >
              Raw
            </button>
          </div>
          <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">{displayedProducts.length} Variedades</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 0.05} width="100%">
                 <ProductCard product={product} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-brand-muted text-lg">No se encontraron productos en esta categoría.</p>
              <button onClick={() => setShopFilter(null)} className="mt-4 text-brand-gold underline">Ver todos</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStory = () => (
    <div className="min-h-screen bg-brand-dark">
       {/* Hero for Story */}
       <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
          {/* Restored Picsum Image */}
          <img src="https://picsum.photos/id/338/1920/800" alt="Cacao Drying" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale sepia-[.2]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
          <div className="relative z-10 text-center px-4">
            <Reveal width="100%">
              <h1 className="font-serif text-6xl md:text-8xl text-white mb-6">Nuestra Historia</h1>
              <p className="text-brand-gold text-sm tracking-[0.3em] uppercase border-t border-b border-brand-gold/30 py-3 inline-block">Del Grano a la Barra &bull; Ecuador</p>
            </Reveal>
          </div>
       </div>

       <div className="max-w-5xl mx-auto px-4 py-32 space-y-40">
         {/* Step 1 */}
         <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 text-right md:text-left">
              <Reveal width="100%">
                <div className="text-brand-accent font-serif text-8xl mb-2 opacity-30 leading-none">01</div>
                <h3 className="text-4xl font-serif text-white mb-6">La Cosecha Real</h3>
                <p className="text-brand-muted leading-relaxed text-lg font-light">
                  Nuestra historia comienza en la sombra de los árboles madre en el Valle Sagrado. Solo cosechamos cuando la mazorca alcanza su tono dorado perfecto, señal de que los azúcares naturales están en su punto álgido.
                </p>
              </Reveal>
            </div>
            <div className="flex-1 relative">
              <Reveal delay={0.2} width="100%">
                <div className="absolute -inset-4 border border-brand-gold/20 rounded-full opacity-50 rotate-12"></div>
                {/* Restored Picsum Image */}
                <img src="https://picsum.photos/id/225/600/400" className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full" alt="Harvest" />
              </Reveal>
            </div>
         </div>

         {/* Step 2 */}
         <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="flex-1">
              <Reveal width="100%">
                <div className="text-brand-accent font-serif text-8xl mb-2 opacity-30 leading-none">02</div>
                <h3 className="text-4xl font-serif text-white mb-6">Alquimia (Fermentación)</h3>
                <p className="text-brand-muted leading-relaxed text-lg font-light">
                  En cajas de laurel de madera, los granos descansan durante 5 días. Es aquí donde la química natural transforma el amargor crudo en las notas florales y a nuez que caracterizan nuestro perfil.
                </p>
              </Reveal>
            </div>
            <div className="flex-1 relative">
              <Reveal delay={0.2} width="100%">
                 <div className="absolute -inset-4 border border-brand-gold/20 rounded-full opacity-50 -rotate-6"></div>
                {/* Restored Picsum Image */}
                <img src="https://picsum.photos/id/766/600/400" className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full" alt="Fermentation" />
              </Reveal>
            </div>
         </div>
         
         {/* Step 3 */}
         <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 text-right md:text-left">
              <Reveal width="100%">
                <div className="text-brand-accent font-serif text-8xl mb-2 opacity-30 leading-none">03</div>
                <h3 className="text-4xl font-serif text-white mb-6">Tostado de la Corte</h3>
                <p className="text-brand-muted leading-relaxed text-lg font-light">
                  El fuego lento y preciso despierta el espíritu del cacao. Nuestros maestros tostadores vigilan cada segundo para asegurar que el crujido sea perfecto sin sacrificar los delicados aromas frutales.
                </p>
              </Reveal>
            </div>
            <div className="flex-1 relative">
              <Reveal delay={0.2} width="100%">
                <div className="absolute -inset-4 border border-brand-gold/20 rounded-full opacity-50 rotate-12"></div>
                {/* Restored Picsum Image */}
                <img src="https://picsum.photos/id/425/600/400" className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full" alt="Roasting" />
              </Reveal>
            </div>
         </div>
       </div>
    </div>
  );

  const renderProcess = () => (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal width="100%">
          <div className="text-center mb-24">
             <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Maestría Artesanal</span>
             <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">El Proceso</h1>
             <p className="text-brand-muted text-lg font-light max-w-2xl mx-auto">Siete pasos de perfección. Desde la tierra volcánica hasta tu paladar, cada etapa es supervisada obsesivamente.</p>
          </div>
        </Reveal>

        <div className="relative border-l border-brand-gold/20 ml-4 md:ml-12 space-y-20">
          {[
            { title: 'Selección del Árbol', icon: <Leaf />, desc: 'Identificamos los árboles "Madre" genéticamente puros de cacao Nacional Arriba.' },
            { title: 'Cosecha Manual', icon: <Sun />, desc: 'Solo machete. Solo mazorcas maduras. Solo al amanecer para preservar la humedad.' },
            { title: 'Fermentación Anaeróbica', icon: <Box />, desc: '48 horas sin oxígeno para desarrollar precursores de sabor frutal intenso.' },
            { title: 'Secado Solar', icon: <Wind />, desc: 'En camas elevadas de bambú, bajo el sol ecuatorial, reduciendo la humedad al 7%.' },
            { title: 'Tostado Lento', icon: <Clock />, desc: 'Lotes pequeños. Calor indirecto. El momento exacto donde el aroma se abre.' },
            { title: 'Descascarillado', icon: <Droplet />, desc: 'Separación precisa de la cáscara mediante flujo de aire controlado.' },
            { title: 'Selección Final', icon: <CheckCircle2 />, desc: 'Ojos expertos retiran cualquier nib imperfecto manualmente.' }
          ].map((step, idx) => (
            <Reveal key={idx} width="100%" delay={idx * 0.1}>
              <div className="relative pl-12 md:pl-20 group">
                 {/* Glowing dot on hover */}
                 <div className="absolute -left-[19px] md:-left-[23px] top-2 w-3 h-3 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#eebb72]"></div>
                <div className="absolute -left-3 md:-left-4 top-0 bg-brand-dark border border-brand-gold text-brand-gold p-2 rounded-full z-10 transition-transform group-hover:scale-110">
                  {React.cloneElement(step.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-brand-gold transition-colors">{step.title}</h3>
                <p className="text-brand-muted font-light leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSustainability = () => (
    <div className="min-h-screen bg-brand-dark">
      <div className="relative h-[60vh] flex items-center justify-center bg-brand-card overflow-hidden">
        <img src="https://picsum.photos/id/10/1920/1080" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="Nature" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <Reveal width="100%">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Sostenibilidad Real</h1>
            <p className="text-xl text-brand-muted font-light">Devolvemos a la tierra más de lo que tomamos. Un compromiso inquebrantable con el Valle Sagrado.</p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <Reveal width="100%">
             <div className="bg-brand-card p-10 border border-white/5 hover:border-brand-accent/50 transition-colors h-full group hover:-translate-y-2 duration-500">
               <Globe size={48} className="text-brand-accent mx-auto mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
               <h3 className="text-2xl font-serif text-white mb-4">Huella de Carbono Negativa</h3>
               <p className="text-brand-muted font-light">Nuestros bosques de cacao capturan 4x más carbono del que emite nuestro procesamiento.</p>
             </div>
           </Reveal>
           <Reveal width="100%" delay={0.2}>
             <div className="bg-brand-card p-10 border border-white/5 hover:border-brand-accent/50 transition-colors h-full group hover:-translate-y-2 duration-500">
               <Heart size={48} className="text-brand-accent mx-auto mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
               <h3 className="text-2xl font-serif text-white mb-4">Comercio Directo Real</h3>
               <p className="text-brand-muted font-light">Pagamos un 300% por encima del precio de mercado de la bolsa de NY directamente a 45 familias agricultoras.</p>
             </div>
           </Reveal>
           <Reveal width="100%" delay={0.4}>
             <div className="bg-brand-card p-10 border border-white/5 hover:border-brand-accent/50 transition-colors h-full group hover:-translate-y-2 duration-500">
               <Leaf size={48} className="text-brand-accent mx-auto mb-6 group-hover:scale-110 transition-transform" strokeWidth={1} />
               <h3 className="text-2xl font-serif text-white mb-4">Agricultura Regenerativa</h3>
               <p className="text-brand-muted font-light">No usamos monocultivos. Nuestro cacao crece en un sistema agroforestal biodiverso.</p>
             </div>
           </Reveal>
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal width="100%">
          <h1 className="font-serif text-5xl text-white mb-16 text-center">El Diario del Cacao</h1>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: 'Por qué tus nibs necesitan respirar antes de comer', date: 'Oct 12, 2024', img: 'https://picsum.photos/id/42/600/400' },
            { title: 'Maridaje: Nibs y Cabernet Sauvignon', date: 'Sep 28, 2024', img: 'https://picsum.photos/id/55/600/400' },
            { title: 'La leyenda de Moctezuma y el grano sagrado', date: 'Sep 15, 2024', img: 'https://picsum.photos/id/88/600/400' },
            { title: 'Receta: Avena nocturna con Nibs y Sal Marina', date: 'Ago 30, 2024', img: 'https://picsum.photos/id/102/600/400' },
            { title: 'Visita a la finca: Cosecha de verano', date: 'Ago 10, 2024', img: 'https://picsum.photos/id/202/600/400' },
            { title: 'Beneficios de los flavonoides para la concentración', date: 'Jul 22, 2024', img: 'https://picsum.photos/id/292/600/400' },
          ].map((post, i) => (
            <Reveal key={i} width="100%" delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="overflow-hidden mb-4 relative aspect-[3/2] border border-white/5">
                  <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur px-3 py-1 text-xs text-brand-gold uppercase tracking-widest z-20">{post.date}</div>
                </div>
                <h3 className="text-2xl font-serif text-white group-hover:text-brand-gold transition-colors leading-tight mb-2">{post.title}</h3>
                <button className="text-brand-muted text-sm uppercase tracking-widest group-hover:text-white transition-colors border-b border-transparent group-hover:border-white pb-1">Leer Artículo</button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24 px-4">
       <div className="max-w-6xl mx-auto">
          <Reveal width="100%">
            <div className="text-center mb-16">
              <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Membresía Real</span>
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Suscripciones</h1>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto font-light">
                Recibe la cosecha más fresca mensualmente. Ahorra un 20% y obtén acceso exclusivo a lotes experimentales.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Tier 1 */}
            <Reveal width="100%" delay={0}>
              <div className="bg-brand-card/50 border border-white/5 p-8 text-center hover:bg-brand-card transition-all group">
                <h3 className="font-serif text-2xl text-white mb-2">Explorador</h3>
                <p className="text-3xl text-brand-gold font-bold mb-6">$22<span className="text-sm text-brand-muted font-normal">/mes</span></p>
                <ul className="text-brand-muted text-sm space-y-4 mb-8 text-left pl-4">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> 1 Bolsa de 500g (Original)</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Recetas mensuales</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Envío gratuito</li>
                </ul>
                <button className="w-full border border-brand-gold text-brand-gold py-3 uppercase text-xs font-bold tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all">Suscribirse</button>
              </div>
            </Reveal>

            {/* Tier 2 (Featured) */}
            <Reveal width="100%" delay={0.1}>
              <div className="bg-brand-card border border-brand-gold/30 p-10 text-center relative transform md:scale-105 shadow-2xl shadow-brand-gold/5 group">
                <div className="absolute top-0 inset-x-0 bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-widest py-1">Más Popular</div>
                <h3 className="font-serif text-3xl text-white mb-2 mt-4">Connaisseur</h3>
                <p className="text-4xl text-brand-gold font-bold mb-6">$40<span className="text-sm text-brand-muted font-normal">/mes</span></p>
                <ul className="text-white text-sm space-y-4 mb-8 text-left pl-4">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> 2 Bolsas de 500g (A elección)</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Acceso a "Small Batch"</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Regalo sorpresa trimestral</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Envío prioritario</li>
                </ul>
                <button className="w-full bg-brand-gold text-brand-dark py-4 uppercase text-xs font-bold tracking-widest hover:bg-white transition-all shadow-lg">Suscribirse</button>
              </div>
            </Reveal>

            {/* Tier 3 */}
            <Reveal width="100%" delay={0.2}>
               <div className="bg-brand-card/50 border border-white/5 p-8 text-center hover:bg-brand-card transition-all group">
                <h3 className="font-serif text-2xl text-white mb-2">Emperador</h3>
                <p className="text-3xl text-brand-gold font-bold mb-6">$75<span className="text-sm text-brand-muted font-normal">/mes</span></p>
                <ul className="text-brand-muted text-sm space-y-4 mb-8 text-left pl-4">
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> 4 Bolsas de 500g</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Bloque Ceremonial incluido</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Consultoría privada con Chef</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} className="text-brand-gold" /> Envío gratuito global</li>
                </ul>
                <button className="w-full border border-brand-gold text-brand-gold py-3 uppercase text-xs font-bold tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all">Suscribirse</button>
              </div>
            </Reveal>
          </div>
       </div>
    </div>
  );

  const renderGifts = () => (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24 px-4">
      <Reveal width="100%">
         <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Regalos de la Realeza</h1>
            <p className="text-brand-muted text-lg max-w-2xl mx-auto font-light">
              Cajas de madera hechas a mano, notas caligrafiadas y el cacao más fino. El detalle perfecto para quien lo tiene todo.
            </p>
          </div>
      </Reveal>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
         <Reveal width="100%">
           <div className="relative aspect-square md:aspect-[16/9] group overflow-hidden cursor-pointer">
             <img src="https://picsum.photos/id/40/800/600" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gift Box" />
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="text-center border-2 border-white/20 p-8 backdrop-blur-sm bg-black/20 transform transition-transform group-hover:-translate-y-2">
                  <h3 className="text-3xl font-serif text-white mb-2">La Caja del Tesoro</h3>
                  <p className="text-brand-gold uppercase text-xs tracking-widest font-bold">Incluye 3 variedades + Molinillo</p>
                  <span className="block mt-6 text-white text-lg font-serif italic group-hover:underline">$85.00</span>
                </div>
             </div>
           </div>
         </Reveal>
         <Reveal width="100%" delay={0.2}>
           <div className="relative aspect-square md:aspect-[16/9] group overflow-hidden cursor-pointer">
             <img src="https://picsum.photos/id/250/800/600" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Ceremonial Set" />
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="text-center border-2 border-white/20 p-8 backdrop-blur-sm bg-black/20 transform transition-transform group-hover:-translate-y-2">
                  <h3 className="text-3xl font-serif text-white mb-2">Ritual Ceremonial</h3>
                  <p className="text-brand-gold uppercase text-xs tracking-widest font-bold">Bloque Puro + Taza de Arcilla</p>
                  <span className="block mt-6 text-white text-lg font-serif italic group-hover:underline">$120.00</span>
                </div>
             </div>
           </div>
         </Reveal>
      </div>

      <div className="mt-16 text-center">
         <p className="text-brand-muted italic mb-6">¿Deseas personalizar un regalo corporativo?</p>
         <button onClick={() => setCurrentPage('contact')} className="text-brand-gold border-b border-brand-gold pb-1 hover:text-white hover:border-white transition-colors uppercase text-xs tracking-widest font-bold">Contáctanos</button>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="pt-32 pb-24 px-4 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Audiencia Real</h1>
            <p className="text-brand-muted text-lg font-light">Estamos a su servicio para consultas, pedidos especiales o alianzas.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <Reveal delay={0.1} width="100%">
            <div className="bg-brand-card p-12 h-full border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="space-y-12 relative z-10">
                <div>
                  <h3 className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">La Fortaleza (Sede)</h3>
                  <p className="text-white text-2xl font-serif">Av. del Cacao 123<br/>Valle Sagrado, Ecuador</p>
                </div>
                <div>
                   <h3 className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">Horario de Atención</h3>
                  <p className="text-brand-muted text-lg">Lunes - Viernes: 9am - 6pm<br/>Sábados: 10am - 4pm</p>
                </div>
                <div>
                   <h3 className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">Correspondencia</h3>
                  <p className="text-brand-muted text-lg hover:text-white transition-colors cursor-pointer">hola@nibsdelcastillo.com</p>
                  <p className="text-brand-muted text-lg mt-2">+593 99 123 4567</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.3} width="100%">
            <form className="space-y-8 bg-transparent p-4" onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado (demo)'); }}>
              <div className="relative group">
                <input type="text" placeholder="Su Nombre" className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl placeholder-white/30 focus:border-brand-gold outline-none transition-colors" />
              </div>
              <div className="relative group">
                <input type="email" placeholder="Correo Electrónico" className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl placeholder-white/30 focus:border-brand-gold outline-none transition-colors" />
              </div>
              <div className="relative group">
                <textarea rows={3} placeholder="¿En qué podemos servirle?" className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl placeholder-white/30 focus:border-brand-gold outline-none transition-colors resize-none"></textarea>
              </div>
              <button className="w-full md:w-auto bg-brand-text text-brand-dark py-4 px-12 font-bold uppercase tracking-[0.2em] hover:bg-brand-gold transition-all flex items-center justify-center gap-4 mt-8">
                Enviar Mensiva <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-brand-dark min-h-screen text-brand-text font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar 
        currentPage={currentPage} 
        setPage={(page) => handleNavigation(page)} 
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
        clearCart={() => setCartItems([])}
      />

      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'shop' && renderShop()}
        {currentPage === 'story' && renderStory()}
        {currentPage === 'contact' && renderContact()}
        {currentPage === 'process' && renderProcess()}
        {currentPage === 'sustainability' && renderSustainability()}
        {currentPage === 'blog' && renderBlog()}
        {currentPage === 'subscriptions' && renderSubscriptions()}
        {currentPage === 'gifts' && renderGifts()}
      </main>

      <Footer onNavigate={handleNavigation} />
    </div>
  );
}