import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
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
  ChevronDown,
  ChevronUp,
  MessageCircleMore,
  CreditCard,
  MapPin,
  Info,
  Flower,
  Flower2,
  X as XIcon
} from 'lucide-react';
import { cn } from './lib/utils';
import { Product, CartItem, QuizAnswers } from './types';
import { PRODUCTS, WHATSAPP_ORDER_NUMBER } from './constants';
import { ShinyButton } from './components/ShinyButton';
import { CircularGallery, GalleryItem } from './components/ui/circular-gallery';
import { PrivacyPage, CookiesPage, TermsPage } from './components/LegalPages';
import { Typewriter } from './components/Typewriter';
import { DisplayCard, DisplayCards } from './components/DisplayCards';
import { BlogDetailPage } from './components/blog/BlogDetailPage';
import { ReelsCarousel } from './components/ReelsCarousel';

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.85 1.56V6.79a4.85 4.85 0 0 1-1.08-.1z" />
  </svg>
);

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1000000-0000-0000-0000-000000000001',
    title: "Cómo Determinar tu Tipo de Porosidad Capilar",
    description: "La porosidad define cómo tu cabello absorbe y retiene la humedad. Conocerla es el primer paso para construir una rutina que de verdad funcione.",
    date: "5 may 2026",
    author: "Amapola",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop&auto=format",
    category: "Educación"
  },
  {
    id: 'b2000000-0000-0000-0000-000000000002',
    title: "Rutina Capilar para Cabello Seco: Guía Paso a Paso",
    description: "El cabello seco necesita hidratación profunda y protección constante. Esta guía completa te explica cómo armar una rutina eficaz sin complicarte.",
    date: "8 may 2026",
    author: "Amapola",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop&auto=format",
    category: "Rutinas"
  },
  {
    id: 'b3000000-0000-0000-0000-000000000003',
    title: "Los Mejores Ingredientes Naturales para el Crecimiento Capilar",
    description: "Antes de gastar en suplementos, descubre qué activos naturales aplicados directamente en el cuero cabelludo sí tienen evidencia científica detrás.",
    date: "10 may 2026",
    author: "Amapola",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=500&fit=crop&auto=format",
    category: "Ingredientes"
  }
];

const reviewImages: GalleryItem[] = [
  { url: '/reviews/review-1.png', alt: 'Reseña cliente 1' },
  { url: '/reviews/review-2.png', alt: 'Reseña cliente 2' },
  { url: '/reviews/review-3.png', alt: 'Reseña cliente 3' },
  { url: '/reviews/review-4.png', alt: 'Reseña cliente 4' },
  { url: '/reviews/review-5.png', alt: 'Reseña cliente 5' },
  { url: '/reviews/review-6.png', alt: 'Reseña cliente 6' },
  { url: '/reviews/review-7.png', alt: 'Reseña cliente 7' },
  { url: '/reviews/review-8.png', alt: 'Reseña cliente 8' },
  { url: '/reviews/review-9.png', alt: 'Reseña cliente 9' },
  { url: '/reviews/review-10.png', alt: 'Reseña cliente 10' },
  { url: '/reviews/review-11.png', alt: 'Reseña cliente 11' },
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
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-500 px-6 md:px-12 flex items-center justify-between",
      isScrolled ? "glass-premium" : "bg-transparent"
    )}>
      <button
        onClick={() => setActivePage('home')}
        className="flex items-center"
      >
        <img src="/logo-navbar-mobile.svg" alt="Amapola Haircare" className="block md:hidden h-10 w-auto max-w-[150px] object-contain" />
        <img src="/logo-navbar.svg" alt="Amapola Haircare" className="hidden md:block h-14 w-auto max-w-[200px] object-contain" />
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
          className="relative p-2 hover:bg-brand-primary/10 rounded-lg transition-colors group"
          aria-label="Ver carrito"
        >
          <ShoppingBag size={22} className="group-hover:text-brand-primary transition-colors" />
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

const Footer = ({ setActivePage }: { setActivePage?: (p: string) => void }) => (
  <footer className="bg-brand-text text-white/70 py-20 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center mb-6">
          <img src="/logo-footer.svg" alt="Amapola Haircare" className="h-24 md:h-32 w-auto object-contain" referrerPolicy="no-referrer" />
        </div>
        <p className="text-sm leading-relaxed mb-8">
          Cuidado capilar personalizado con ingredientes naturales. Tu cabello merece lo mejor.
        </p>
        <div className="flex gap-4">
          <a href="https://instagram.com/amapolahaircare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <Instagram size={18} />
          </a>
          <a href="https://tiktok.com/@amapolahaircare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <TikTokIcon />
          </a>
          <a href="mailto:hola@amapolahaircare.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-white font-serif font-semibold mb-6">Tienda</h4>
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => setActivePage?.('products')} className="hover:text-brand-primary-light transition-colors">Todos los productos</button></li>
          <li><button onClick={() => setActivePage?.('products')} className="hover:text-brand-primary-light transition-colors">Limpieza</button></li>
          <li><button onClick={() => setActivePage?.('products')} className="hover:text-brand-primary-light transition-colors">Hidratación</button></li>
          <li><button onClick={() => setActivePage?.('products')} className="hover:text-brand-primary-light transition-colors">Tratamientos</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-serif font-semibold mb-6">Aprende</h4>
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => setActivePage?.('quiz')} className="hover:text-brand-primary-light transition-colors">Quiz Capilar</button></li>
          <li><button onClick={() => setActivePage?.('blog')} className="hover:text-brand-primary-light transition-colors">Guías de cuidado</button></li>
          <li><button onClick={() => setActivePage?.('blog')} className="hover:text-brand-primary-light transition-colors">Blog</button></li>
          <li><button onClick={() => setActivePage?.('home')} className="hover:text-brand-primary-light transition-colors">FAQ</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-serif font-semibold mb-6">Legal</h4>
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => setActivePage?.('privacy')} className="hover:text-brand-primary-light transition-colors">Privacidad</button></li>
          <li><button onClick={() => setActivePage?.('cookies')} className="hover:text-brand-primary-light transition-colors">Cookies</button></li>
          <li><button onClick={() => setActivePage?.('terms')} className="hover:text-brand-primary-light transition-colors">Términos</button></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
      <span>© 2026 Amapola Haircare. Todos los derechos reservados.</span>
      <div className="flex gap-6">
        <button onClick={() => setActivePage?.('privacy')} className="hover:text-white transition-colors">Privacidad</button>
        <button onClick={() => setActivePage?.('cookies')} className="hover:text-white transition-colors">Cookies</button>
        <button onClick={() => setActivePage?.('terms')} className="hover:text-white transition-colors">Términos</button>
      </div>
    </div>
  </footer>
);

const ProductCard = ({ product, onAddToCart, onSelectProduct }: { product: Product; onAddToCart: (p: Product) => void; onSelectProduct?: (id: string) => void; key?: string | number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-white rounded-2xl overflow-hidden border border-brand-bg-alt hover:shadow-premium hover-magnetic transition-all duration-500"
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
        className="absolute bottom-4 right-4 h-12 px-4 bg-white/95 md:bg-white rounded-xl flex items-center gap-2 shadow-lg opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-brand-primary hover:text-white backdrop-blur-sm md:backdrop-blur-none"
      >
        <Plus size={18} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Agregar al carrito</span>
      </button>
    </div>
    <div className="p-6">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2 block">
        {product.category}
      </span>
      <h3
        onClick={() => onSelectProduct?.(product.id)}
        className="text-lg font-serif font-semibold mb-2 group-hover:text-brand-primary transition-colors cursor-pointer hover:underline"
      >
        {product.name}
      </h3>
      <p className="text-2xl font-bold text-brand-text">
        {product.price.toFixed(2)} <span className="text-sm font-normal">€</span>
      </p>
      <p className="text-sm text-brand-text-light mt-3 leading-relaxed line-clamp-2">
        {product.description}
      </p>
      {onSelectProduct && (
        <button
          onClick={() => onSelectProduct(product.id)}
          className="mt-3 text-xs font-bold text-brand-primary uppercase tracking-widest hover:underline"
        >
          Ver detalle →
        </button>
      )}
    </div>
  </motion.article>
);

const ProductDetailPage = ({
  productId,
  onNavigate,
  onAddToCart,
}: {
  productId: string | null;
  onNavigate: (page: string) => void;
  onAddToCart: (p: Product) => void;
}) => {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Producto no encontrado.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center gap-2 text-sm text-brand-text-light hover:text-brand-primary mb-12 transition-colors"
        >
          <ChevronLeft size={16} /> Volver a productos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-brand-bg-alt shadow-premium">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {product.badge && (
              <span className="absolute top-6 left-6 px-4 py-2 bg-brand-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.subtitle && (
              <span className="text-[11px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-3 block">
                {product.subtitle}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-brand-text">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-brand-text mb-6">
              {product.price.toFixed(2)} <span className="text-base font-normal">€</span>
            </p>
            <p className="text-brand-text-light leading-relaxed mb-8 text-lg">
              {product.fullDescription || product.description}
            </p>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-primary/90 transition-all mb-12 flex items-center justify-center gap-3"
            >
              <Plus size={18} /> Agregar al carrito
            </button>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-4">Beneficios</h3>
                <ul className="space-y-3">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-text-light">
                      <span className="w-2 h-2 rounded-full bg-brand-primary mt-2 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ideal for */}
            {product.idealFor && (
              <div className="mb-10 p-6 bg-brand-bg-alt rounded-2xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-2">Ideal para</h3>
                <p className="text-brand-text-light">{product.idealFor}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-4">Ingredientes protagonistas</h3>
                <div className="space-y-3">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="border-l-2 border-brand-primary/30 pl-4">
                      <span className="font-semibold text-brand-text text-sm">{ing.name}</span>
                      <p className="text-brand-text-light text-sm">{ing.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-2">Ritual de uso sugerido</h3>
                <p className="text-brand-text-light text-sm leading-relaxed">{product.usage}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Se puede usar el Gotero Capilar cada día?",
      a: "Sí, el Gotero Capilar está diseñado para uso diario. Al ser una fórmula concentrada a base de aceites naturales ligeros, no deja residuo ni apelmaza el cabello. Aplica 3–5 gotas sobre el cabello seco o húmedo, distribuyendo desde medios a puntas. Evita el cuero cabelludo si tu cabello tiende a ser graso."
    },
    {
      q: "¿Cuánto tarda en llegar mi pedido?",
      a: "Todos nuestros productos se elaboran a mano y a pedido, lo que garantiza que recibirás una fórmula fresca y sin conservantes agresivos. Por eso el tiempo de preparación es de 3 a 5 días hábiles antes del envío. Una vez despachado, el paquete llega en 24–48 horas dentro de Barcelona. ¡Vale la pena la espera!"
    },
    {
      q: "¿Los productos son aptos para el método curly?",
      a: "Totalmente. Toda la línea Amapola está formulada sin sulfatos, siliconas, alcoholes secantes ni parabenos. Son compatibles con el método curly (Curly Girl Method) desde el champú hasta el tratamiento. Si sigues el método, te recomendamos empezar con una limpieza con el Champú Pelo Seco y continuar con el Acondicionador o el Tratamiento Profundo."
    },
    {
      q: "¿Los productos tienen sulfatos o parabenos?",
      a: "No contienen ninguno de los dos. En Amapola creemos en la cosmética limpia y transparente: sin sulfatos agresivos, sin parabenos, sin siliconas y sin derivados del petróleo. Cada ingrediente está elegido por su eficacia y su respeto por la salud del cabello y del cuero cabelludo."
    },
    {
      q: "¿Realizáis envíos fuera de Barcelona?",
      a: "Por el momento estamos operando con envíos dentro de Barcelona, para garantizar que cada pedido llegue en perfectas condiciones. Estamos trabajando activamente en nuestra logística para que pronto más Amapolas de toda España (y más allá) puedan recibir sus productos. ¡Síguenos en redes para enterarte cuando lleguemos a tu ciudad!"
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

const NewsletterSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus('success');
      setName('');
      setEmail('');
      setConsent(false);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-bg-alt relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">
          Newsletter
        </span>
        <h2 className="text-4xl md:text-6xl font-serif mb-6 text-brand-text leading-tight">
          Únete a nuestra <em className="italic text-brand-primary">comunidad</em>
        </h2>
        <p className="text-lg text-brand-text-light mb-12 max-w-xl mx-auto leading-relaxed">
          Recibe consejos capilares, rutinas y novedades cada semana. Sin spam, solo contenido cuidado para ti.
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-8 py-6 bg-white rounded-2xl shadow-md border border-brand-bg"
          >
            <p className="font-serif text-2xl text-brand-primary mb-2">¡Bienvenida a Amapola!</p>
            <p className="text-sm text-brand-text-light">
              Revisa tu correo — pronto empezarás a recibir nuestro contenido.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre (opcional)"
                className="w-full px-5 py-4 bg-white border border-brand-bg-alt rounded-xl text-sm focus:border-brand-primary outline-none transition-all"
                disabled={status === 'loading'}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-5 py-4 bg-white border border-brand-bg-alt rounded-xl text-sm focus:border-brand-primary outline-none transition-all"
                disabled={status === 'loading'}
              />
            </div>

            <label className="flex items-start gap-3 text-xs text-brand-text-light text-left max-w-md mx-auto cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-brand-primary size-4 flex-shrink-0"
                disabled={status === 'loading'}
              />
              <span className="leading-relaxed">
                Acepto recibir contenido de Amapola y el tratamiento de mis datos según la política de privacidad. Puedo darme de baja en cualquier momento.
              </span>
            </label>

            <ShinyButton
              type="submit"
              disabled={status === 'loading' || !consent || !email}
              className="px-12 py-3"
            >
              {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
            </ShinyButton>

            {status === 'error' && (
              <p className="text-sm text-brand-primary mt-3">
                Hubo un problema: {errorMsg}. Inténtalo de nuevo en unos minutos.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

// --- Pages ---

const Home = ({ onNavigate, onAddToCart, onSelectPost, onSelectProduct }: { onNavigate: (p: string) => void; onAddToCart: (p: Product) => void; onSelectPost: (id: string) => void; onSelectProduct: (id: string) => void }) => {
  const [flowers, setFlowers] = useState<{id: number; x: number; y: number}[]>([]);
  const flowerIdRef = useRef(0);
  const lastFlowerTime = useRef(0);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const now = Date.now();
    if (now - lastFlowerTime.current < 100) return;
    lastFlowerTime.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = flowerIdRef.current++;
    setFlowers(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setFlowers(prev => prev.filter(f => f.id !== id)), 900);
  };

  return (
  <div className="overflow-hidden">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-brand-bg via-brand-bg-alt to-brand-accent/10 overflow-hidden" onMouseMove={handleHeroMouseMove}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white rounded-full text-xs font-bold text-brand-primary uppercase tracking-widest mb-8">
            Cuidado capilar natural
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] text-brand-text">
            Tu cabello merece una rutina <em className="italic text-brand-primary block md:inline">única</em>
          </h1>
          <p className="text-lg text-brand-text-light mb-12 max-w-lg leading-relaxed">
            Descubre los productos ideales para tu tipo de cabello con nuestro quiz personalizado. Recibe una rutina diseñada solo para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ShinyButton
              onClick={() => onNavigate('quiz')}
              className="px-10 py-3 flex items-center justify-center pulse-cta"
            >
              Descubrir Mi Rutina
            </ShinyButton>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white text-brand-primary border-2 border-brand-primary/20 px-10 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
            >
              Ver Productos
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center h-[500px] sm:h-[520px] lg:h-[560px] mt-8 lg:mt-8"
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -3 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative z-10 w-2/3 aspect-[9/16] rounded-2xl overflow-hidden shadow-premium -translate-x-8 -translate-y-8 animate-float"
          >
            <img
              src="/logo-gigant.png"
              alt="Amapola Gotero Capilar"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="absolute z-20 w-1/2 aspect-[9/16] rounded-2xl overflow-hidden shadow-premium translate-x-12 translate-y-12 border-4 border-white animate-float [animation-delay:1s]"
          >
            <img
              src="/hero-2.png"
              alt="Amapola Haircare"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-2xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-primary/10 rounded-full blur-3xl opacity-50" />
        </motion.div>
      </div>
      {flowers.map(f => (
        <motion.span
          key={f.id}
          initial={{ scale: 0, opacity: 1, y: 0, rotate: 0 }}
          animate={{ scale: 1.4, opacity: 0, y: -40, rotate: f.id % 2 === 0 ? 45 : -30 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            left: f.x,
            top: f.y,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 20,
            color: '#b35151',
          }}
        >
          {f.id % 2 === 0 ? <Flower size={28} /> : <Flower2 size={28} />}
        </motion.span>
      ))}
    </section>

    {/* Typewriter Why Choose Us Section */}
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 text-center">
      <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-12">Por qué elegir Amapola</h2>
      <div className="min-h-[140px] md:min-h-[120px] mb-8">
        <Typewriter
          texts={[
            "Cosmética 100% natural, honesta y respetuosa con tu salud capilar.",
            "Rutinas adaptadas a tus necesidades reales, sin ingredientes tóxicos.",
            "Resultados profesionales con la calidez y el cuidado de una marca artesanal."
          ]}
          className="text-3xl md:text-5xl font-serif leading-tight text-brand-text"
          typeSpeed={40}
          delay={2500}
          showCursor={true}
        />
      </div>
    </div>

    <div className="section-divider" />

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
          {['gotero', 'acondicionador', 'tratamiento-profundo'].map(id => {
            const product = PRODUCTS.find(p => p.id === id);
            return product ? <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onSelectProduct={onSelectProduct} /> : null;
          })}
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
          <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10">
            <img
              src="/img-kleo-productos.png"
              alt="Kleo con productos Amapola"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-primary/10 rounded-full pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Nuestra Historia</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Productos naturales, resultados reales</h2>
          <div className="space-y-6 text-brand-text-light leading-relaxed">
            <p>
              Amapola Haircare nació de la pasión de una sola emprendedora por el cuidado natural. Kleo desarrolló sus propios métodos y fórmulas que hoy comparte con miles de mujeres.
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

    <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">¿No sabes por dónde empezar?</h2>
          <p className="text-lg text-brand-text-light mb-10 leading-relaxed">
            Haz nuestro Quiz Capilar en menos de 1 minuto y recibe una rutina personalizada con los productos ideales para tu tipo de cabello.
          </p>
          <div className="space-y-4 mb-12">
            {[
              { icon: <Clock size={18} />, text: "Menos de 1 minuto" },
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
            src="/quiz-cta.png"
            alt="Quiz Capilar Amapola"
            className="rounded-[2.5rem] shadow-2xl w-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Lo que dicen nuestras Amapolas</h2>
          <p className="text-lg text-brand-text-light max-w-xl mx-auto leading-relaxed">
            Ellas ya han transformado su cabello siguiendo nuestras rutinas personalizadas. Estas son sus reseñas reales.
          </p>
        </div>

        <CircularGallery items={reviewImages} radius={480} autoRotateSpeed={0.018} className="my-16 md:my-20" />

        <div className="text-center mt-16">
          <ShinyButton
            onClick={() => onNavigate('quiz')}
            className="px-10 py-3"
          >
            Quiero mi rutina personalizada
          </ShinyButton>
        </div>
      </div>
    </section>

    {/* Latest Blog Posts Section */}
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Nuestro diario</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-text">Lo último en el Blog</h2>
        </div>
        <button
          onClick={() => onNavigate('blog')}
          className="group flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs hover:translate-x-2 transition-transform self-center md:self-end"
        >
          Ver todos los artículos <ArrowRight size={16} />
        </button>
      </div>

      <DisplayCards>
        {BLOG_POSTS.map((post) => (
          <DisplayCard key={post.id} {...post} onClick={() => onSelectPost(post.id)} />
        ))}
      </DisplayCards>
    </section>

    <div className="section-divider" />

    {/* Reels Instagram Section — activar cuando Kleo tenga Meta Developer */}
    {/* <ReelsCarousel onAddToCart={onAddToCart} /> */}

    <NewsletterSection />

    <FAQ />
  </div>
  );
};

const ProductsPage = ({ onAddToCart, onSelectProduct }: { onAddToCart: (p: Product) => void; onSelectProduct?: (id: string) => void }) => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'limpieza', label: 'Limpieza' },
    { id: 'hidratacion-nutricion', label: 'Hidratación & Nutrición' },
    { id: 'tratamiento', label: 'Tratamiento' },
    { id: 'crecimiento', label: 'Crecimiento' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Nuestra colección</span>
          <h1 className="text-5xl font-serif mb-6 text-gradient">Productos</h1>
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
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all border hover-magnetic",
                filter === cat.id
                  ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                  : "bg-white border-brand-bg-alt text-brand-text-light hover:border-brand-primary/30 shadow-sm"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

// SVG Hair Icons for quiz options — consistent line art style
const HairIcon = ({ type }: { type: string }) => {
  const cls = "text-brand-primary";
  if (type === 'liso') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <line x1="9" y1="8" x2="9" y2="30" />
      <line x1="18" y1="6" x2="18" y2="30" />
      <line x1="27" y1="8" x2="27" y2="30" />
    </svg>
  );
  if (type === 'ondulado') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M9 8 Q9 14 9 20 Q9 24 12 27 Q15 30 9 30" />
      <path d="M18 6 Q18 12 18 18 Q18 22 21 25 Q24 28 18 30" />
      <path d="M27 8 Q27 14 27 20 Q27 24 30 27 Q33 30 27 30" />
    </svg>
  );
  if (type === 'rizado') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M9 8 Q13 10 13 14 Q13 18 9 20 Q5 22 5 26 Q5 30 9 30" />
      <path d="M18 6 Q22 8 22 12 Q22 16 18 18 Q14 20 14 24 Q14 28 18 30" />
      <path d="M27 8 Q31 10 31 14 Q31 18 27 20 Q23 22 23 26 Q23 30 27 30" />
    </svg>
  );
  if (type === 'coily') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M9 8 Q12 9 12 12 Q12 15 9 16 Q6 17 6 20 Q6 23 9 24 Q12 25 12 28 Q12 31 9 30" />
      <path d="M18 6 Q21 7 21 10 Q21 13 18 14 Q15 15 15 18 Q15 21 18 22 Q21 23 21 26 Q21 29 18 30" />
      <path d="M27 8 Q30 9 30 12 Q30 15 27 16 Q24 17 24 20 Q24 23 27 24 Q30 25 30 28 Q30 31 27 30" />
    </svg>
  );
  if (type === 'normal') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <circle cx="18" cy="18" r="11" />
      <path d="M13 18 L16 21 L23 14" />
    </svg>
  );
  if (type === 'graso') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M18 6 Q21 10 21 13 Q21 17 18 17 Q15 17 15 13 Q15 10 18 6Z" />
      <path d="M11 14 Q13 18 13 20 Q13 23 11 23 Q9 23 9 20 Q9 18 11 14Z" />
      <path d="M25 14 Q27 18 27 20 Q27 23 25 23 Q23 23 23 20 Q23 18 25 14Z" />
      <path d="M9 28 Q13 25 18 25 Q23 25 27 28" />
    </svg>
  );
  if (type === 'seco') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M18 6 Q22 12 22 18 Q22 24 18 30 Q14 24 14 18 Q14 12 18 6Z" />
      <path d="M14 18 L16 20 L20 16" strokeDasharray="2 2" />
      <line x1="10" y1="22" x2="14" y2="26" strokeDasharray="2 2" />
      <line x1="22" y1="22" x2="26" y2="26" strokeDasharray="2 2" />
    </svg>
  );
  if (type === 'sensible') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <path d="M18 28 Q10 22 10 16 Q10 11 14 11 Q16 11 18 13 Q20 11 22 11 Q26 11 26 16 Q26 22 18 28Z" />
      <line x1="18" y1="16" x2="18" y2="20" /><circle cx="18" cy="23" r="1" fill="currentColor" />
    </svg>
  );
  if (type === 'caida') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M12 8 L12 22" /><path d="M18 6 L18 26" /><path d="M24 8 L24 22" />
      <path d="M10 22 L12 26 L14 22" /><path d="M16 26 L18 30 L20 26" /><path d="M22 22 L24 26 L26 22" />
    </svg>
  );
  if (type === 'sequedad') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M18 6 Q22 12 22 18 Q22 24 18 30 Q14 24 14 18 Q14 12 18 6Z" />
      <line x1="14" y1="16" x2="22" y2="16" strokeDasharray="2 2" />
    </svg>
  );
  if (type === 'frizz') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <path d="M9 8 Q14 11 9 16 Q4 21 9 26 Q14 31 9 30" />
      <path d="M18 6 Q23 9 18 14 Q13 19 18 24 Q23 29 18 30" />
      <path d="M27 8 Q32 11 27 16 Q22 21 27 26 Q32 31 27 30" />
    </svg>
  );
  if (type === 'brillo') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <line x1="18" y1="4" x2="18" y2="8" /><line x1="18" y1="28" x2="18" y2="32" />
      <line x1="4" y1="18" x2="8" y2="18" /><line x1="28" y1="18" x2="32" y2="18" />
      <circle cx="18" cy="18" r="7" />
      <line x1="8" y1="8" x2="11" y2="11" /><line x1="25" y1="25" x2="28" y2="28" />
      <line x1="28" y1="8" x2="25" y2="11" /><line x1="11" y1="25" x2="8" y2="28" />
    </svg>
  );
  // Porosity icons — arrow direction = absorption level
  if (type === 'poro-baja') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <rect x="8" y="8" width="20" height="14" rx="3" />
      <path d="M18 22 L18 30" /><path d="M15 27 L18 30 L21 27" />
    </svg>
  );
  if (type === 'poro-media') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <rect x="8" y="10" width="20" height="14" rx="3" />
      <line x1="13" y1="17" x2="23" y2="17" />
    </svg>
  );
  if (type === 'poro-alta') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <rect x="8" y="14" width="20" height="14" rx="3" strokeDasharray="4 2" />
      <path d="M18 14 L18 6" /><path d="M15 9 L18 6 L21 9" />
    </svg>
  );
  if (type === 'poro-nose') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cls}>
      <circle cx="18" cy="18" r="12" />
      <path d="M14 14 Q18 11 22 14 Q24 17 18 19" /><circle cx="18" cy="23" r="1.5" fill="currentColor" />
    </svg>
  );
  return null;
};

const QuizPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPorosityInfo, setShowPorosityInfo] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const updateAnswer = (field: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "Quiz Capilar",
      subtitle: "Descubre tu rutina ideal en menos de 1 minuto",
      content: (
        <div className="text-center py-8">
          <img
            src="/logo-quiz.svg"
            alt="Amapola"
            className="mx-auto mb-8 h-44 w-auto object-contain"
          />
          <p className="text-brand-text-light mb-12 text-lg">
            Responde unas preguntas sencillas y te crearemos una <strong>rutina personalizada</strong> con los productos ideales para tu tipo de cabello.
          </p>
          <div className="flex flex-col gap-4 items-center mb-12">
            {[
              { icon: <Clock size={20} />, text: "Menos de 1 minuto" },
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
        { id: 'liso', label: 'Liso', svgType: 'liso', desc: 'Sin ondas ni curvas naturales' },
        { id: 'ondulado', label: 'Ondulado', svgType: 'ondulado', desc: 'Ondas suaves en forma de S' },
        { id: 'rizado', label: 'Rizado', svgType: 'rizado', desc: 'Rizos definidos en espiral' },
        { id: 'coily', label: 'Coily / Afro', svgType: 'coily', desc: 'Rizos muy apretados' }
      ]
    },
    {
      field: 'hair_porosity',
      title: "¿Conoces tu porosidad capilar?",
      options: [
        { id: 'baja', label: 'Baja', svgType: 'poro-baja', desc: 'El agua tarda en absorber' },
        { id: 'media', label: 'Media', svgType: 'poro-media', desc: 'Absorbe bien la humedad' },
        { id: 'alta', label: 'Alta', svgType: 'poro-alta', desc: 'Absorbe rápido pero se seca rápido' },
        { id: 'no_se', label: 'No lo sé', svgType: 'poro-nose', desc: '¡Te ayudamos a descubrirlo!', showInfo: true }
      ]
    },
    {
      field: 'scalp_condition',
      title: "¿Cómo describirías tu cuero cabelludo?",
      options: [
        { id: 'normal', label: 'Normal', svgType: 'normal' },
        { id: 'graso', label: 'Graso', svgType: 'graso' },
        { id: 'seco', label: 'Seco', svgType: 'seco' },
        { id: 'sensible', label: 'Sensible', svgType: 'sensible' }
      ]
    },
    {
      field: 'main_concern',
      title: "¿Cuál es tu mayor preocupación?",
      options: [
        { id: 'caida', label: 'Caída del cabello', svgType: 'caida' },
        { id: 'sequedad', label: 'Sequedad', svgType: 'sequedad' },
        { id: 'frizz', label: 'Frizz / Encrespamiento', svgType: 'frizz' },
        { id: 'brillo', label: 'Falta de brillo', svgType: 'brillo' }
      ]
    },
    {
      title: "¿Dónde enviamos tu rutina?",
      subtitle: "Recibirás un PDF personalizado con tu rutina ideal",
      content: (
        <form className="space-y-6 py-4" onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          try {
            const res = await fetch('/api/quiz/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(answers),
            });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              throw new Error(data.error || `HTTP ${res.status}`);
            }
            nextStep();
          } catch (err) {
            console.error('Quiz submit failed:', err);
            alert('Hubo un problema enviando tu rutina. Por favor inténtalo de nuevo en unos minutos.');
          } finally {
            setIsSubmitting(false);
          }
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
            <input type="checkbox" required className="mt-1 accent-brand-primary size-4" />
            <span className="text-xs text-brand-text-light leading-relaxed">
              Acepto el tratamiento de mis datos personales según la{' '}
              <button
                type="button"
                onClick={() => window.scrollTo(0, 0)} /* In a real app we'd navigate to privacy */
                className="text-brand-primary font-bold hover:underline"
              >
                política de privacidad
              </button>{' '}
              y los{' '}
              <button
                type="button"
                className="text-brand-primary font-bold hover:underline"
              >
                términos y condiciones
              </button>.
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
      title: "¡Listo!",
      content: (
        <div className="text-center py-12">
          <div className="text-6xl mb-8">✉️</div>
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
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-br from-brand-bg to-brand-bg-alt flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-primary blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-secondary blur-[120px] rounded-full" />
      </div>
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-premium overflow-hidden relative z-10"
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
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gradient">{current.title}</h2>
          {current.subtitle && <p className="text-brand-text-light mb-10 text-sm md:text-base leading-relaxed">{current.subtitle}</p>}

          {current.options ? (
            <div className="grid gap-4 mb-12">
              {current.options.map((opt: { id: string; label: string; svgType?: string; desc?: string; showInfo?: boolean }) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    updateAnswer(current.field as keyof QuizAnswers, opt.id);
                    if (opt.showInfo) {
                      setShowPorosityInfo(true);
                    } else {
                      setShowPorosityInfo(false);
                      nextStep();
                    }
                  }}
                  className={cn(
                    "flex items-center gap-6 p-6 rounded-2xl border-2 text-left transition-all hover-magnetic",
                    answers[current.field as keyof QuizAnswers] === opt.id
                      ? "border-brand-primary bg-brand-primary/5 shadow-md"
                      : "border-brand-bg-alt hover:border-brand-primary/30 bg-white/50"
                  )}
                >
                  {opt.svgType && <HairIcon type={opt.svgType} />}
                  <div>
                    <div className="font-bold">{opt.label}</div>
                    {opt.desc && <div className="text-xs text-brand-text-light mt-1">{opt.desc}</div>}
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    {opt.showInfo && (
                      <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-full uppercase tracking-wide">Info</span>
                    )}
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      answers[current.field as keyof QuizAnswers] === opt.id ? "border-brand-primary" : "border-brand-bg-alt"
                    )}>
                      {answers[current.field as keyof QuizAnswers] === opt.id && <div className="w-3 h-3 bg-brand-primary rounded-full" />}
                    </div>
                  </div>
                </button>
              ))}

              {/* Porosity explanation box */}
              <AnimatePresence>
                {showPorosityInfo && current.field === 'hair_porosity' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-2xl border-2 border-brand-accent/40 bg-brand-accent/5 p-6 overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-brand-text flex items-center gap-2">
                        <Info size={18} className="text-brand-primary flex-shrink-0" />
                        ¿Cómo saber tu porosidad?
                      </h4>
                      <button onClick={() => setShowPorosityInfo(false)} className="text-brand-text-light hover:text-brand-primary">
                        <XIcon size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-brand-text-light leading-relaxed mb-3">
                      <strong className="text-brand-text">Prueba del vaso:</strong> Coloca un mechón limpio y seco en un vaso de agua.
                    </p>
                    <ul className="text-sm text-brand-text-light space-y-2 mb-4">
                      <li className="flex gap-2"><span className="text-brand-primary font-bold">•</span> <span><strong>Se hunde rápido</strong> → Porosidad alta (absorbe todo enseguida)</span></li>
                      <li className="flex gap-2"><span className="text-brand-primary font-bold">•</span> <span><strong>Flota un rato y baja</strong> → Porosidad media</span></li>
                      <li className="flex gap-2"><span className="text-brand-primary font-bold">•</span> <span><strong>Sigue flotando</strong> → Porosidad baja (le cuesta absorber)</span></li>
                    </ul>
                    <p className="text-xs text-brand-text-light italic">Si no tienes tiempo ahora, no te preocupes: con tus otras respuestas crearemos una rutina igualmente adaptada.</p>
                    <button
                      onClick={() => { setShowPorosityInfo(false); nextStep(); }}
                      className="mt-4 text-sm font-bold text-brand-primary hover:underline flex items-center gap-1"
                    >
                      Continuar sin saber mi porosidad <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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

interface ApiBlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  published_at: string;
}

interface BlogPageProps {
  onNavigate: (p: string) => void;
  onSelectPost: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

const BlogPage = ({ onNavigate: _onNavigate, onSelectPost, onAddToCart: _onAddToCart }: BlogPageProps) => {
  const [posts, setPosts] = useState<ApiBlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(false);
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    fetch('/api/blog/posts?limit=12')
      .then(res => {
        if (!res.ok) throw new Error('Error loading posts');
        return res.json();
      })
      .then((data: ApiBlogPost[]) => {
        setPosts(data);
        setLoadingPosts(false);
      })
      .catch(() => {
        setPostsError(true);
        setLoadingPosts(false);
      });
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterError('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, name: newsletterName || undefined }),
      });
      if (!res.ok) throw new Error('Error al suscribirse');
      setNewsletterSuccess(true);
    } catch {
      setNewsletterError('Hubo un error. Por favor, inténtalo de nuevo.');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const formatPostDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Nuestro diario</span>
          <h1 className="text-5xl font-serif mb-6 text-gradient">Blog & Educación</h1>
          <p className="text-brand-text-light max-w-xl mx-auto">
            Consejos expertas, rutinas y todo lo que necesitas saber para cuidar tu cabello de forma natural.
          </p>
        </header>

        {loadingPosts && (
          <DisplayCards>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[2rem] bg-gray-100 animate-pulse overflow-hidden"
                style={{ height: '380px' }}
              />
            ))}
          </DisplayCards>
        )}

        {postsError && (
          <p className="text-center text-brand-text-light py-20">
            No se pudieron cargar los artículos. Inténtalo más tarde.
          </p>
        )}

        {!loadingPosts && !postsError && posts.length > 0 && (
          <DisplayCards>
            {posts.map(post => (
              <DisplayCard
                key={post.id}
                title={post.title}
                description={post.excerpt}
                date={formatPostDate(post.published_at)}
                author="Amapola"
                image={post.image_url}
                category={post.category}
                onClick={() => onSelectPost(post.id)}
              />
            ))}
          </DisplayCards>
        )}

        {!loadingPosts && !postsError && posts.length === 0 && (
          <p className="text-center text-brand-text-light py-20">
            Aún no hay artículos publicados. ¡Vuelve pronto!
          </p>
        )}

        {/* Newsletter */}
        <section className="mt-24 flex flex-col items-center text-center">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Newsletter</span>
          <h2 className="text-3xl font-serif font-bold text-brand-text mb-3">
            ¿Te gustó este contenido?
          </h2>
          <p className="text-brand-text-light mb-10 max-w-md">
            Suscríbete y recibe nuestras entradas directamente en tu email.
          </p>

          {newsletterSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg w-full rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 px-8 py-6 text-brand-secondary font-bold"
            >
              Ya estás suscrita. ¡Gracias por unirte a la comunidad Amapola!
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-lg w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={newsletterName}
                onChange={e => setNewsletterName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-brand-bg-alt bg-white text-brand-text placeholder:text-brand-text-light focus:outline-none focus:border-brand-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Tu email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-brand-bg-alt bg-white text-brand-text placeholder:text-brand-text-light focus:outline-none focus:border-brand-primary transition-colors"
              />
              {newsletterError && (
                <p className="text-sm text-red-500">{newsletterError}</p>
              )}
              <ShinyButton type="submit" disabled={newsletterSubmitting} className="w-full py-3">
                {newsletterSubmitting ? 'Suscribiendo...' : 'Suscribirme al blog'}
              </ShinyButton>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.847L.057 23.882a.5.5 0 0 0 .61.61l6.102-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.804 9.804 0 0 1-5.006-1.372l-.359-.214-3.722.889.904-3.629-.234-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

const DELIVERY_FEE = 5.00;

const BIZUM_DISPLAY = '+34 625 443 926';

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
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'bizum' | 'cash'>('bizum');
  const [form, setForm] = useState({ name: '', phone: '', address: '', floor: '', postal: '' });
  const [formError, setFormError] = useState('');

  const subtotal = items.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shipping = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + shipping;

  const handleDeliveryChange = (type: 'delivery' | 'pickup') => {
    setDeliveryType(type);
    if (type === 'delivery') setPaymentMethod('bizum');
  };

  const buildWhatsAppMessage = () => {
    const lines = items.map(i => `  • ${i.name} x${i.quantity} — ${(i.price * i.quantity).toFixed(2)}€`).join('\n');
    const addressDetail = [form.address, form.floor, form.postal ? `CP ${form.postal}` : '', 'Barcelona'].filter(Boolean).join(', ');
    const deliveryLine = deliveryType === 'delivery'
      ? `Envio a domicilio (+${DELIVERY_FEE.toFixed(2)}€)\n  📍 ${addressDetail}`
      : `Recogida en domicilio de la fundadora (gratis)`;
    const paymentLine = paymentMethod === 'bizum'
      ? `Bizum al ${BIZUM_DISPLAY}\n  Adjunto el comprobante a continuacion.`
      : `En mano al recoger`;
    return encodeURIComponent(
      `Hola! 👋 Quiero hacer este pedido:\n\n` +
      `*Datos:*\n` +
      `  • Nombre: ${form.name}\n` +
      `  • Telefono: ${form.phone}\n\n` +
      `*Productos:*\n${lines}\n\n` +
      `*Entrega:* ${deliveryLine}\n\n` +
      `*Pago:* ${paymentLine}\n\n` +
      `  Envio: ${shipping === 0 ? 'Gratis (recogida)' : `${shipping.toFixed(2)}€`}\n` +
      `  Total: ${total.toFixed(2)}€\n\n` +
      `Podeis confirmarlo? ✅`
    );
  };

  const handleWhatsAppOrder = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError('Por favor completa tu nombre y teléfono para continuar.');
      return;
    }
    if (deliveryType === 'delivery' && (!form.address.trim() || !form.postal.trim())) {
      setFormError('Por favor introduce la dirección y el código postal.');
      return;
    }
    setFormError('');
    window.open(`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank');
  };

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

  const inputClass = "w-full px-4 py-3 rounded-xl border border-brand-bg-alt bg-white text-sm focus:outline-none focus:border-brand-primary placeholder:text-brand-text-light/60 transition-all";

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif mb-12">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-6 p-6 bg-white rounded-2xl border border-brand-bg-alt items-center hover:shadow-md transition-shadow group"
                >
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-premium p-8 rounded-[2rem] border border-white/40 h-fit sticky top-32 space-y-8"
          >
            {/* Customer data */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-5">Tus datos</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Teléfono *"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Delivery type */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Entrega</h3>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryType === 'delivery' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg-alt bg-white hover:border-brand-primary/40'}`}>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={deliveryType === 'delivery'}
                    onChange={() => handleDeliveryChange('delivery')}
                    className="mt-0.5 accent-brand-primary"
                  />
                  <div>
                    <p className="font-bold text-sm">Envío a domicilio</p>
                    <p className="text-xs text-brand-text-light mt-0.5">Solo Barcelona · +{DELIVERY_FEE.toFixed(2)} €</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryType === 'pickup' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg-alt bg-white hover:border-brand-primary/40'}`}>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={deliveryType === 'pickup'}
                    onChange={() => handleDeliveryChange('pickup')}
                    className="mt-0.5 accent-brand-primary"
                  />
                  <div>
                    <p className="font-bold text-sm">Recoger en domicilio</p>
                    <p className="text-xs text-brand-text-light mt-0.5">Gratis · La fundadora te indica la dirección</p>
                  </div>
                </label>
              </div>

              {/* Address fields (delivery only) */}
              <AnimatePresence>
                {deliveryType === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-3">
                      <input
                        type="text"
                        placeholder="Calle y número *"
                        value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="Piso y puerta (ej: 3º 2ª)"
                        value={form.floor}
                        onChange={e => setForm(f => ({ ...f, floor: e.target.value }))}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="Código postal *"
                        value={form.postal}
                        onChange={e => setForm(f => ({ ...f, postal: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payment method */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Pago</h3>
              <AnimatePresence mode="wait">
                {deliveryType === 'delivery' ? (
                  <motion.div
                    key="payment-delivery"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-4 space-y-2"
                  >
                    <p className="text-sm font-bold flex items-center gap-2">
                      <span>Bizum</span>
                      <span className="text-[10px] font-normal bg-brand-primary text-white px-2 py-0.5 rounded-full">Obligatorio</span>
                    </p>
                    <p className="text-xs text-brand-text-light leading-relaxed">
                      El envío a domicilio requiere pago previo. Envía el importe por Bizum a:
                    </p>
                    <p className="text-sm font-bold text-brand-primary tracking-wide">{BIZUM_DISPLAY}</p>
                    <p className="text-xs text-brand-text-light">Al enviar el pedido por WhatsApp, adjunta el comprobante del Bizum en el mismo chat.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment-pickup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'bizum' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg-alt bg-white hover:border-brand-primary/40'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bizum"
                        checked={paymentMethod === 'bizum'}
                        onChange={() => setPaymentMethod('bizum')}
                        className="mt-0.5 accent-brand-primary"
                      />
                      <div>
                        <p className="font-bold text-sm">Pagar por Bizum</p>
                        <p className="text-xs text-brand-text-light mt-0.5">Transferencia previa al {BIZUM_DISPLAY}</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg-alt bg-white hover:border-brand-primary/40'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="mt-0.5 accent-brand-primary"
                      />
                      <div>
                        <p className="font-bold text-sm">Pagar en mano al recoger</p>
                        <p className="text-xs text-brand-text-light mt-0.5">Efectivo o Bizum en el momento de recogida</p>
                      </div>
                    </label>
                    {paymentMethod === 'bizum' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-brand-text-light bg-brand-bg rounded-lg px-3 py-2"
                      >
                        Recuerda adjuntar el comprobante del Bizum en el chat de WhatsApp.
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="border-t border-brand-bg-alt pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-brand-text-light">Subtotal</span>
                <span className="font-bold">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-text-light">Envío</span>
                <span className="font-bold">{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-brand-bg-alt">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Error */}
            {formError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                {formError}
              </motion.p>
            )}

            {/* CTA */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-3 bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl hover:bg-brand-primary-dark hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <WhatsAppIcon />
              Enviar pedido
            </button>
            <p className="text-center text-[11px] text-brand-text-light leading-relaxed">
              Se abrirá WhatsApp con tu pedido completo. La fundadora lo confirmará y coordinará la entrega contigo.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
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
            {activePage === 'home' && <Home onNavigate={setActivePage} onAddToCart={addToCart} onSelectPost={(id) => { setSelectedPostId(id); setActivePage('blog-detail'); }} onSelectProduct={(id) => { setSelectedProductId(id); setActivePage('product-detail'); }} />}
            {activePage === 'products' && <ProductsPage onAddToCart={addToCart} onSelectProduct={(id) => { setSelectedProductId(id); setActivePage('product-detail'); }} />}
            {activePage === 'product-detail' && (
              <ProductDetailPage
                productId={selectedProductId}
                onNavigate={setActivePage}
                onAddToCart={addToCart}
              />
            )}
            {activePage === 'quiz' && <QuizPage />}
            {activePage === 'blog' && (
              <BlogPage
                onNavigate={setActivePage}
                onSelectPost={(id) => { setSelectedPostId(id); setActivePage('blog-detail'); }}
                onAddToCart={addToCart}
              />
            )}
            {activePage === 'blog-detail' && (
              <BlogDetailPage
                postId={selectedPostId}
                onNavigate={setActivePage}
                onAddToCart={addToCart}
              />
            )}
            {activePage === 'privacy' && <PrivacyPage />}
            {activePage === 'cookies' && <CookiesPage />}
            {activePage === 'terms' && <TermsPage />}
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

      <Footer setActivePage={setActivePage} />

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
