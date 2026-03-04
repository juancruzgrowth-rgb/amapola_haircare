import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Check, 
  ArrowRight, 
  Instagram, 
  MessageCircle, 
  Mail,
  Clock,
  Gift,
  ClipboardList,
  Trash2,
  Plus,
  Minus,
  Play,
  ChevronDown,
  ChevronUp,
  MessageCircleMore
} from 'lucide-react';
import { cn } from './lib/utils';
import { Product, CartItem, QuizAnswers } from './types';
import { PRODUCTS } from './constants';
import { ShinyButton } from './components/ShinyButton';
import { TestimonialsColumn, Testimonial } from './components/TestimonialsColumn';

const testimonials: Testimonial[] = [
  {
    name: "Elena G.",
    role: "Cabello Rizado",
    image: "https://picsum.photos/seed/user1/100/100",
    text: "Llevaba años buscando productos que de verdad funcionaran para mi pelo rizado. La rutina que me recomendó el quiz ha sido un antes y un después. ¡Mis rizos nunca estuvieron tan definidos!"
  },
  {
    name: "Sofía R.",
    role: "Cabello Seco",
    image: "https://picsum.photos/seed/user2/100/100",
    text: "La mascarilla reparadora es increíble. Tenía el pelo super dañado por la decoloración y en un mes noté una diferencia brutal. Ahora mi pelo brilla de verdad."
  },
  {
    name: "Lucía M.",
    role: "Cuero Cabelludo Sensible",
    image: "https://picsum.photos/seed/user3/100/100",
    text: "Me encanta que todo sea natural y que me expliquen exactamente cómo usar cada producto. El PDF personalizado es un detallazo. ¡Se nota que les importa de verdad!"
  },
  {
    name: "Valentina P.",
    role: "Cabello Liso",
    image: "https://picsum.photos/seed/user4/100/100",
    text: "El champú nutritivo deja mi pelo limpio pero sin esa sensación de sequedad. Es la primera vez que siento mi cabello liso con tanto volumen y vida."
  },
  {
    name: "Martina S.",
    role: "Cabello Ondulado",
    image: "https://picsum.photos/seed/user5/100/100",
    text: "Increíble cómo han mejorado mis ondas. El sérum de brillo es mi producto favorito, no deja el pelo pesado y el aroma es simplemente delicioso."
  }
];

// --- Components ---

const Navbar = ({ 
  activePage, 
  setActivePage, 
  cartCount 
}: { 
  activePage: string; 
  setActivePage: (p: string) => void; 
  cartCount: number;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'products', label: 'Productos' },
    { id: 'quiz', label: 'Quiz Capilar' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 px-6 md:px-12 flex items-center justify-between",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <button 
        onClick={() => setActivePage('home')}
        className="text-2xl font-serif font-bold text-brand-primary flex items-center gap-2"
      >
        <span className="text-3xl">🌺</span>
        <span className="hidden sm:inline">Amapola</span>
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => setActivePage(link.id)}
            className={cn(
              "text-sm font-medium transition-colors relative py-1",
              activePage === link.id ? "text-brand-primary" : "text-brand-text-light hover:text-brand-primary"
            )}
          >
            {link.label}
            {activePage === link.id && (
              <motion.div 
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActivePage('cart')}
          className="relative p-2 hover:bg-black/5 rounded-lg transition-colors"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 w-5 h-5 bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white"
            >
              {cartCount}
            </motion.span>
          )}
        </button>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-white shadow-xl p-8 flex flex-col gap-6 md:hidden border-t border-brand-bg-alt"
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-xl font-serif text-left",
                  activePage === link.id ? "text-brand-primary font-bold" : "text-brand-text-light"
                )}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActivePage('cart');
                setIsMobileMenuOpen(false);
              }}
              className="text-xl font-serif text-left text-brand-text-light"
            >
              Carrito ({cartCount})
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-text text-white/70 py-20 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="text-2xl font-serif font-bold text-white flex items-center gap-2 mb-6">
          <span>🌺</span> Amapola
        </div>
        <p className="text-sm leading-relaxed mb-8">
          Cuidado capilar personalizado con ingredientes naturales. Tu cabello merece lo mejor.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <Instagram size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <MessageCircle size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-white font-serif font-semibold mb-6">Tienda</h4>
        <ul className="space-y-4 text-sm">
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Todos los productos</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Limpieza</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Hidratación</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Tratamientos</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-serif font-semibold mb-6">Aprende</h4>
        <ul className="space-y-4 text-sm">
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Quiz Capilar</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Guías de cuidado</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Blog</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">FAQ</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-serif font-semibold mb-6">Legal</h4>
        <ul className="space-y-4 text-sm">
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Privacidad</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Cookies</a></li>
          <li><a href="#" className="hover:text-brand-primary-light transition-colors">Términos</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
      <span>© 2026 Amapola Haircare. Todos los derechos reservados.</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        <a href="#" className="hover:text-white transition-colors">Cookies</a>
        <a href="#" className="hover:text-white transition-colors">Términos</a>
      </div>
    </div>
  </footer>
);

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void; key?: string | number }) => (
  <motion.article 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-white rounded-2xl overflow-hidden border border-brand-bg-alt hover:shadow-xl transition-all duration-500"
  >
    <div className="relative aspect-square overflow-hidden bg-brand-bg-alt">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      {product.badge && (
        <span className="absolute top-4 left-4 px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
          {product.badge}
        </span>
      )}
      <button 
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 right-4 h-12 px-4 bg-white rounded-xl flex items-center gap-2 shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-brand-primary hover:text-white"
      >
        <Plus size={18} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Agregar al carrito</span>
      </button>
    </div>
    <div className="p-6">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2 block">
        {product.category}
      </span>
      <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-brand-primary transition-colors">
        {product.name}
      </h3>
      <p className="text-2xl font-bold text-brand-text">
        {product.price.toFixed(2)} <span className="text-sm font-normal">€</span>
      </p>
    </div>
  </motion.article>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Los productos son aptos para el método curly?",
      a: "¡Sí! Todos nuestros productos están formulados sin sulfatos, siliconas ni alcoholes secantes, por lo que son 100% aptos para el método curly."
    },
    {
      q: "¿Cuánto tarda en llegar mi pedido?",
      a: "Los envíos suelen tardar entre 24 y 48 horas laborables en la península. Recibirás un número de seguimiento en cuanto el pedido salga de nuestro taller."
    },
    {
      q: "¿Cómo sé cuál es mi porosidad capilar?",
      a: "Te recomendamos hacer nuestro Quiz Capilar. En él incluimos preguntas clave que nos ayudan a determinar tu porosidad y recomendarte la rutina ideal."
    },
    {
      q: "¿Los productos contienen sulfatos o parabenos?",
      a: "No. En Amapola Haircare apostamos por la cosmética natural y limpia. Nuestras fórmulas están libres de sulfatos, parabenos y derivados del petróleo."
    },
    {
      q: "¿Hacéis envíos a toda España?",
      a: "Sí, realizamos envíos a toda la península, Baleares y Canarias. Los gastos de envío son gratuitos en pedidos superiores a 30€."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Dudas comunes</span>
          <h2 className="text-4xl md:text-5xl font-serif">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-brand-bg-alt rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-brand-bg/50 transition-colors"
              >
                <span className="font-bold text-brand-text">{faq.q}</span>
                {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-brand-text-light leading-relaxed border-t border-brand-bg-alt/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChatbotButton = () => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => alert('Chatbot próximamente...')}
    className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-brand-primary text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-brand-primary-dark transition-colors group"
  >
    <MessageCircleMore size={28} />
    <span className="absolute right-full mr-4 px-4 py-2 bg-brand-text text-white text-xs font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      ¿Necesitas ayuda?
    </span>
  </motion.button>
);

// --- Pages ---

const Home = ({ onNavigate, onAddToCart }: { onNavigate: (p: string) => void; onAddToCart: (p: Product) => void }) => (
  <div className="overflow-hidden">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-brand-bg via-brand-bg-alt to-brand-accent/10">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-accent/5 blur-3xl rounded-full translate-y-1/4 -translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white rounded-full text-xs font-bold text-brand-primary uppercase tracking-widest mb-8">
            🌿 Cuidado capilar natural
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
            Tu cabello merece una rutina <em className="italic text-brand-primary">única</em>
          </h1>
          <p className="text-lg text-brand-text-light mb-12 max-w-lg leading-relaxed">
            Descubre los productos ideales para tu tipo de cabello con nuestro quiz personalizado. Recibe una rutina diseñada solo para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ShinyButton 
              onClick={() => onNavigate('quiz')}
              className="px-10 py-3 flex items-center justify-center"
            >
              Descubrir Mi Rutina
            </ShinyButton>
            <button 
              onClick={() => onNavigate('products')}
              className="bg-white text-brand-primary border-2 border-brand-primary/20 px-10 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center"
            >
              Ver Productos
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center h-[500px]"
        >
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30, rotate: -3 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative z-10 w-2/3 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl -translate-x-8 -translate-y-8"
          >
            <img 
              src="https://picsum.photos/seed/product-hero/800/1000" 
              alt="Amapola Product"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Founder Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="absolute z-20 w-1/2 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl translate-x-12 translate-y-12 border-4 border-white"
          >
            <img 
              src="https://picsum.photos/seed/founder-hero/800/1000" 
              alt="Amparo Founder"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-2xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-primary/10 rounded-full blur-3xl opacity-50" />
        </motion.div>
      </div>
    </section>

    {/* Featured Products (Moved up) */}
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Lo más vendido</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Productos estrella</h2>
          <p className="text-brand-text-light max-w-xl mx-auto">
            Los favoritos de nuestra comunidad para un cabello sano, brillante y lleno de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PRODUCTS.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => onNavigate('products')}
            className="bg-white text-brand-primary border-2 border-brand-primary/20 px-10 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    </section>

    {/* About the Brand & Founder (VSL Video) */}
    <section className="py-32 px-6 md:px-12 bg-brand-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-black group cursor-pointer">
            <video 
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              className="w-full h-full object-cover opacity-90"
              controls
              poster="https://picsum.photos/seed/founder-vsl/1280/720"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
              <div className="w-20 h-20 bg-brand-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand-primary text-white py-4 px-8 rounded-xl shadow-xl z-20 hidden md:block">
            <p className="text-sm font-bold tracking-widest uppercase">Mensaje de Amparo</p>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-primary/10 rounded-full pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Nuestra Historia</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Conocimiento propio, resultados reales</h2>
          <div className="space-y-6 text-brand-text-light leading-relaxed">
            <p>
              Amapola Haircare nació de la pasión de una sola emprendedora por el cuidado natural. Tras años de estudio y experimentación, Amparo desarrolló sus propios métodos y fórmulas que hoy comparte con miles de mujeres.
            </p>
            <p>
              No somos una gran corporación; somos un proyecto personal donde cada producto ha sido probado y perfeccionado por su creadora. Creemos en la transparencia de los ingredientes y en la eficacia de lo natural.
            </p>
          </div>
          <div className="mt-12">
            <button 
              onClick={() => onNavigate('quiz')}
              className="text-brand-primary font-bold uppercase tracking-widest text-sm flex items-center group"
            >
              Conoce más sobre nuestro método
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Quiz CTA */}
    <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1">
          <div className="text-5xl mb-8">💆‍♀️</div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">¿No sabes por dónde empezar?</h2>
          <p className="text-lg text-brand-text-light mb-10 leading-relaxed">
            Haz nuestro Quiz Capilar en menos de 2 minutos y recibe una rutina personalizada con los productos ideales para tu tipo de cabello.
          </p>
          <div className="space-y-4 mb-12">
            {[
              { icon: <Clock size={18} />, text: "Menos de 2 minutos" },
              { icon: <ClipboardList size={18} />, text: "Rutina personalizada en PDF" },
              { icon: <Gift size={18} />, text: "100% gratuito, sin compromiso" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium">
                <span className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-primary shadow-sm">
                  {item.icon}
                </span>
                {item.text}
              </div>
            ))}
          </div>
          <ShinyButton 
            onClick={() => onNavigate('quiz')}
            className="px-10 py-3 flex items-center"
          >
            Hacer el Quiz Capilar
          </ShinyButton>
        </div>
        <div className="flex-1">
          <img 
            src="https://picsum.photos/seed/quiz-cta/800/800" 
            alt="Quiz Capilar"
            className="rounded-[2.5rem] shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Lo que dicen nuestras clientas</h2>
          <p className="text-lg text-brand-text-light mb-12 leading-relaxed">
            Cientos de mujeres ya han transformado su cabello siguiendo nuestras rutinas personalizadas. Estos son algunos de sus resultados reales.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-serif font-bold text-brand-primary mb-1">500+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-brand-text-light">Clientas Felices</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-brand-primary mb-1">4.9/5</div>
              <div className="text-xs uppercase font-bold tracking-widest text-brand-text-light">Calificación Media</div>
            </div>
          </div>
          <div className="mt-12">
            <ShinyButton 
              onClick={() => onNavigate('quiz')}
              className="px-10 py-3"
            >
              Quiero mi rutina personalizada
            </ShinyButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={25} />
          <TestimonialsColumn testimonials={testimonials.slice(2, 5)} duration={35} className="mt-12 md:mt-24" />
        </div>
      </div>
    </section>

    <FAQ />
  </div>
);

const ProductsPage = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'limpieza', label: 'Limpieza' },
    { id: 'hidratacion', label: 'Hidratación' },
    { id: 'tratamiento', label: 'Tratamientos' },
    { id: 'styling', label: 'Styling' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Nuestra colección</span>
          <h1 className="text-5xl font-serif mb-6">Productos</h1>
          <p className="text-brand-text-light max-w-xl">
            Cada producto está formulado para cuidar tu cabello de forma natural y efectiva.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all border",
                filter === cat.id 
                  ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "bg-white border-brand-bg-alt text-brand-text-light hover:border-brand-primary/30"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

const QuizPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const updateAnswer = (field: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "💆‍♀️ Quiz Capilar",
      subtitle: "Descubre tu rutina ideal en menos de 2 minutos",
      content: (
        <div className="text-center py-8">
          <p className="text-brand-text-light mb-12 text-lg">
            Responde unas preguntas sencillas y te crearemos una <strong>rutina personalizada</strong> con los productos ideales para tu tipo de cabello.
          </p>
          <div className="flex flex-col gap-4 items-center mb-12">
            {[
              { icon: <Clock size={20} />, text: "Menos de 2 minutos" },
              { icon: <Gift size={20} />, text: "100% gratis" },
              { icon: <ClipboardList size={20} />, text: "PDF personalizado" }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 font-medium">
                <span className="text-brand-primary">{f.icon}</span> {f.text}
              </div>
            ))}
          </div>
          <ShinyButton onClick={nextStep} className="px-12 py-3">
            Empezar
          </ShinyButton>
        </div>
      )
    },
    {
      field: 'hair_type',
      title: "¿Cuál es tu tipo de cabello?",
      options: [
        { id: 'liso', label: 'Liso', icon: '〰️', desc: 'Sin ondas ni curvas naturales' },
        { id: 'ondulado', label: 'Ondulado', icon: '🌊', desc: 'Ondas suaves en forma de S' },
        { id: 'rizado', label: 'Rizado', icon: '🔄', desc: 'Rizos definidos en espiral' },
        { id: 'coily', label: 'Coily / Afro', icon: '🌀', desc: 'Rizos muy apretados' }
      ]
    },
    {
      field: 'hair_porosity',
      title: "¿Conoces tu porosidad capilar?",
      options: [
        { id: 'baja', label: 'Baja', icon: '🛡️', desc: 'El agua tarda en absorber' },
        { id: 'media', label: 'Media', icon: '⚖️', desc: 'Absorbe bien la humedad' },
        { id: 'alta', label: 'Alta', icon: '🧽', desc: 'Absorbe rápido pero se seca rápido' },
        { id: 'no_se', label: 'No lo sé', icon: '🤷', desc: '¡Te ayudamos a descubrirlo!' }
      ]
    },
    {
      field: 'scalp_condition',
      title: "¿Cómo describirías tu cuero cabelludo?",
      options: [
        { id: 'normal', label: 'Normal', icon: '✅' },
        { id: 'graso', label: 'Graso', icon: '💧' },
        { id: 'seco', label: 'Seco', icon: '🏜️' },
        { id: 'sensible', label: 'Sensible', icon: '🩹' }
      ]
    },
    {
      field: 'main_concern',
      title: "¿Cuál es tu mayor preocupación?",
      options: [
        { id: 'caida', label: 'Caída del cabello', icon: '📉' },
        { id: 'sequedad', label: 'Sequedad', icon: '🌵' },
        { id: 'frizz', label: 'Frizz / Encrespamiento', icon: '⚡' },
        { id: 'brillo', label: 'Falta de brillo', icon: '💫' }
      ]
    },
    {
      title: "¿Dónde enviamos tu rutina?",
      subtitle: "Recibirás un PDF personalizado con tu rutina ideal",
      content: (
        <form className="space-y-6 py-4" onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            nextStep();
          }, 2000);
        }}>
          <div>
            <label className="block text-sm font-bold mb-2">Tu nombre *</label>
            <input 
              type="text" 
              required
              className="w-full p-4 bg-brand-bg border-2 border-brand-bg-alt rounded-xl focus:border-brand-primary outline-none transition-all"
              placeholder="María"
              onChange={(e) => updateAnswer('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Tu email *</label>
            <input 
              type="email" 
              required
              className="w-full p-4 bg-brand-bg border-2 border-brand-bg-alt rounded-xl focus:border-brand-primary outline-none transition-all"
              placeholder="maria@email.com"
              onChange={(e) => updateAnswer('email', e.target.value)}
            />
          </div>
          <div className="flex items-start gap-3 pt-4">
            <input type="checkbox" required className="mt-1 accent-brand-primary" />
            <span className="text-xs text-brand-text-light leading-relaxed">
              Acepto el tratamiento de mis datos personales según la política de privacidad.
            </span>
          </div>
          <ShinyButton 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3"
          >
            {isSubmitting ? "Enviando..." : "Obtener Mi Rutina"}
          </ShinyButton>
        </form>
      )
    },
    {
      title: "🎉 ¡Listo!",
      content: (
        <div className="text-center py-12">
          <div className="text-6xl mb-8">📬</div>
          <h3 className="text-2xl font-serif font-bold mb-6">Estamos preparando tu rutina</h3>
          <p className="text-brand-text-light mb-12">
            En unos minutos recibirás en tu email un <strong>PDF personalizado</strong> con tu rutina capilar ideal.
          </p>
          <button onClick={() => window.location.reload()} className="bg-brand-primary text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest shadow-lg">
            Volver al inicio
          </button>
        </div>
      )
    }
  ];

  const current = steps[step];
  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-br from-brand-bg to-brand-bg-alt flex items-center justify-center">
      <motion.div 
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="h-1.5 bg-brand-bg-alt">
          <motion.div 
            className="h-full bg-brand-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-10 md:p-16">
          {step > 0 && step < steps.length - 1 && (
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-4 block">
              Pregunta {step} de {steps.length - 3}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-serif mb-4">{current.title}</h2>
          {current.subtitle && <p className="text-brand-text-light mb-10">{current.subtitle}</p>}

          {current.options ? (
            <div className="grid gap-4 mb-12">
              {current.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    updateAnswer(current.field as keyof QuizAnswers, opt.id);
                    nextStep();
                  }}
                  className={cn(
                    "flex items-center gap-6 p-6 rounded-2xl border-2 text-left transition-all",
                    answers[current.field as keyof QuizAnswers] === opt.id
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-brand-bg-alt hover:border-brand-primary/30 bg-brand-bg/50"
                  )}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <div>
                    <div className="font-bold">{opt.label}</div>
                    {opt.desc && <div className="text-xs text-brand-text-light mt-1">{opt.desc}</div>}
                  </div>
                  <div className={cn(
                    "ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    answers[current.field as keyof QuizAnswers] === opt.id ? "border-brand-primary" : "border-brand-bg-alt"
                  )}>
                    {answers[current.field as keyof QuizAnswers] === opt.id && <div className="w-3 h-3 bg-brand-primary rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          ) : current.content}

          {step > 0 && step < steps.length - 1 && (
            <button onClick={prevStep} className="text-sm font-bold text-brand-text-light hover:text-brand-primary transition-colors flex items-center gap-2">
              ← Atrás
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CartPage = ({ 
  items, 
  onUpdateQty, 
  onRemove, 
  onNavigate 
}: { 
  items: CartItem[]; 
  onUpdateQty: (id: string, d: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (p: string) => void;
}) => {
  const subtotal = items.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = subtotal >= 30 ? 0 : 4.90;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-8 opacity-30">🛒</div>
          <h2 className="text-3xl font-serif mb-6">Tu carrito está vacío</h2>
          <p className="text-brand-text-light mb-10">¡Descubre nuestros productos y encuentra tu rutina ideal!</p>
          <button 
            onClick={() => onNavigate('products')}
            className="bg-brand-primary text-white px-10 py-3 rounded-lg font-bold uppercase tracking-widest shadow-lg"
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif mb-12">Tu Carrito</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-6 p-6 bg-white rounded-2xl border border-brand-bg-alt items-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-brand-bg-alt flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-brand-primary font-bold">{item.price.toFixed(2)} €</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-3 bg-brand-bg rounded-lg p-1 border border-brand-bg-alt">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-3 text-brand-text-light hover:text-brand-primary transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-[2rem] border border-brand-bg-alt h-fit sticky top-32">
            <h3 className="text-2xl font-serif font-bold mb-8 pb-6 border-bottom border-brand-bg-alt">Resumen</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-brand-text-light">Subtotal</span>
                <span className="font-bold">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-text-light">Envío</span>
                <span className="font-bold">{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} €`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-brand-primary font-medium italic">
                  Envío gratis en pedidos superiores a 30€
                </p>
              )}
            </div>
            <div className="flex justify-between text-xl font-bold pt-6 border-t border-brand-bg-alt mb-10">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold uppercase tracking-widest shadow-xl hover:bg-brand-primary-dark transition-all">
              Finalizar Compra
            </button>
            <p className="text-center mt-6 text-[10px] text-brand-text-light uppercase tracking-widest">
              🔒 Pago seguro con Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToastMsg(`${product.name} añadido`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartCount={cartCount} 
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activePage === 'home' && <Home onNavigate={setActivePage} onAddToCart={addToCart} />}
            {activePage === 'products' && <ProductsPage onAddToCart={addToCart} />}
            {activePage === 'quiz' && <QuizPage />}
            {activePage === 'cart' && (
              <CartPage 
                items={cart} 
                onUpdateQty={updateCartQty} 
                onRemove={removeFromCart} 
                onNavigate={setActivePage}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <ChatbotButton />

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 right-8 bg-brand-text text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3"
          >
            <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
              <Check size={14} />
            </div>
            <span className="text-sm font-medium">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
