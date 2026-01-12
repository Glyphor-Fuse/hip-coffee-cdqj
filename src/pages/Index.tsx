import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';
import { Reveal } from '../components/motion/Reveal';
import { SignatureInteraction } from '../components/effects/SignatureInteraction';
import { SignatureEffect } from '../components/effects/SignatureEffect';

// --- TYPES ---
interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  cartId: number;
}

// --- DATA ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "HACKNEY DARK",
    desc: "Notes of dark chocolate, tobacco, and rain.",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "NEON BLEND",
    desc: "High acidity. Citrus punch. Not for the weak.",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1611854779393-1b2ae54f1996?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "V60 KIT - MATTE",
    desc: "Ceramic dripper in void black.",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2121&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "COLD BREW CANS",
    desc: "4-Pack. Nitro infused. 200mg Caffeine.",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop"
  }
];

export default function Index() {
  // --- STATE ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // --- CURSOR LOGIC ---
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // --- CART LOGIC ---
  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-[#080808] text-[#e0e0e0] font-mono min-h-screen overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* GLOBAL STYLES & FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');
        
        :root {
          --accent: #ccff00;
        }
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        
        .outline-text {
          -webkit-text-stroke: 1px #e0e0e0;
          color: transparent;
          transition: color 0.5s ease;
        }
        .outline-text:hover {
          color: #ccff00;
          -webkit-text-stroke: 1px #ccff00;
        }
        
        /* Hide default cursor */
        body, a, button { cursor: none; }
      `}</style>

      {/* CUSTOM CURSOR */}
      <div 
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference transition-all duration-300 ease-out border-2 border-[#ccff00]"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: isHovering ? 50 : 20,
          height: isHovering ? 50 : 20,
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovering ? '#ccff00' : 'transparent',
          opacity: isHovering ? 0.5 : 1
        }}
      />

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-exclusion">
        <div className="font-display font-extrabold text-2xl tracking-tighter hover-target">
          NIGHTSHADE
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative font-bold uppercase tracking-widest hover-target"
        >
          Cart [<span className="mx-1">{cart.length}</span>]
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-4 text-xs bg-[#ccff00] text-black w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <SignatureInteraction type="parallax" className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2574&auto=format&fit=crop" 
                alt="Dark Coffee Texture" 
                className="w-full h-full object-cover opacity-40 grayscale contrast-125"
              />
           </SignatureInteraction>
        </div>
        
        <div className="z-10 text-center relative">
          <SignatureInteraction type="text-reveal">
            <h1 className="font-display text-[clamp(3rem,10vw,12rem)] font-extrabold tracking-tighter leading-[0.9]">
              LONDON
            </h1>
          </SignatureInteraction>
          <SignatureInteraction type="text-reveal">
            <h1 className="font-display text-[clamp(3rem,10vw,12rem)] font-extrabold tracking-tighter leading-[0.9] outline-text hover-target">
              ROASTED
            </h1>
          </SignatureInteraction>
          <SignatureInteraction type="text-reveal">
            <p className="mt-8 tracking-[2px] uppercase text-sm md:text-base">
              Fuel for the Underground
            </p>
          </SignatureInteraction>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll to brew
        </motion.div>
      </header>

      {/* MARQUEE */}
      <div className="bg-[#ccff00] text-[#080808] py-4 overflow-hidden -rotate-2 scale-105 relative z-10 -mt-[5vh] border-y-2 border-[#080808]">
        <SignatureInteraction type="marquee" speed={20}>
          <span className="font-bold text-xl mx-4">
            ETHICALLY SOURCED // ROASTED IN HACKNEY // OPEN 6AM - 11PM // NO DEC AF // ETHICALLY SOURCED // ROASTED IN HACKNEY // OPEN 6AM - 11PM // NO DEC AF //
          </span>
        </SignatureInteraction>
      </div>

      {/* SHOP SECTION */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto" id="shop">
        <div className="mb-16 border-b border-[#2a2a2a] pb-8">
          <Reveal>
            <h2 className="font-display text-5xl uppercase">The Goods</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="group flex flex-col hover-target">
              <div className="w-full h-[400px] overflow-hidden bg-[#121212] relative mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] grayscale group-hover:scale-110 group-hover:grayscale-0"
                />
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-display mb-2">{product.name}</h3>
                  <p className="text-sm text-[#888] max-w-[80%]">{product.desc}</p>
                </div>
                <span className="font-bold text-[#ccff00]">£{product.price.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="mt-auto w-full p-4 border border-[#2a2a2a] text-[#e0e0e0] uppercase font-bold relative overflow-hidden group/btn transition-colors duration-300 hover:text-[#080808] hover:border-[#ccff00]"
              >
                <span className="relative z-10">Add to Cart</span>
                <div className="absolute inset-0 bg-[#ccff00] transform -translate-x-full transition-transform duration-300 ease-out group-hover/btn:translate-x-0 z-0" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT / LOCATION */}
      <section className="py-16 px-8 border-t border-[#2a2a2a] max-w-[1400px] mx-auto flex flex-wrap justify-between">
        <div className="flex-1 min-w-[300px] pr-8 mb-8 md:mb-0">
          <Reveal>
            <h3 className="font-display text-5xl mb-4">VISIT US</h3>
            <p className="mb-4">Hidden in the railway arches of East London.</p>
            <a href="#" className="underline decoration-[#ccff00] hover-target">Arch 23, Hackney Central, E8 1LL</a>
          </Reveal>
        </div>
        <div className="flex-1 min-w-[300px] mt-8 md:mt-0">
          <Reveal>
            <img 
              src="https://images.unsplash.com/photo-1442512595331-e89e7385a861?q=80&w=2670&auto=format&fit=crop" 
              className="w-full h-[300px] object-cover grayscale"
              alt="Cafe Interior"
            />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2a2a2a] py-16 px-8 mt-16 flex flex-col items-center text-center text-[#666]">
        <p> 2026 NIGHTSHADE COFFEE ROASTERS.</p>
        <p className="text-xs mt-4">MADE IN LONDON</p>
      </footer>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* OVERLAY */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-[5px] z-[999]"
            />
            
            {/* DRAWER */}
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
              className="fixed top-0 right-0 w-full max-w-[500px] h-screen bg-[#121212] z-[1000] border-l border-[#2a2a2a] p-8 flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#2a2a2a]">
                <h3 className="font-display text-2xl uppercase">YOUR STASH</h3>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="text-2xl hover:text-[#ccff00] transition-colors hover-target"
                >
                  <LuX />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center mt-[50%] opacity-50">Your cart is empty.</div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      key={item.cartId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 mb-6"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-[#222]" />
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="font-bold mb-1">{item.name}</div>
                        <div className="text-sm text-[#888]">£{item.price.toFixed(2)}</div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-[#666] text-xl ml-auto hover:text-white transition-colors hover-target"
                      >
                        <LuX />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="border-t border-[#2a2a2a] pt-8 mt-4">
                <div className="flex justify-between text-2xl font-display mb-4">
                  <span>TOTAL</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#ccff00] text-[#080808] p-6 font-extrabold uppercase text-xl hover:bg-white transition-colors hover-target">
                  CHECKOUT
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
