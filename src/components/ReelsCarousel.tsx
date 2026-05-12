import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Product } from '../types';

interface Reel {
  id: string;
  videoSrc: string;
  thumbnail: string;
  caption: string;
  product?: Product;
  instagramUrl: string;
}

const REELS: Reel[] = [
  {
    id: '1',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel1/400/700',
    caption: '¿Sabes cuál es tu tipo de cabello? 💫',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '2',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel2/400/700',
    caption: 'Rutina de noche para un cabello hidratado ✨',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '3',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel3/400/700',
    caption: 'Así se usa el Gotero Capilar de Amapola 🌿',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '4',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel4/400/700',
    caption: 'Test de porosidad fácil en casa 🧪',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '5',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel5/400/700',
    caption: 'Resultados reales de nuestras Amapolas 🌸',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
];

const AUTOPLAY_INTERVAL = 5000;

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.85 1.56V6.79a4.85 4.85 0 0 1-1.08-.1z" />
  </svg>
);

interface PhoneMockupProps {
  reel: Reel;
  isCenter: boolean;
  onClick: () => void;
  onAddToCart?: (p: Product) => void;
  key?: string;
}

const PhoneMockup = ({ reel, isCenter, onClick, onAddToCart }: PhoneMockupProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isCenter) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isCenter]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame */}
      <motion.div
        animate={{
          scale: isCenter ? 1 : 0.82,
          opacity: isCenter ? 1 : 0.55,
          y: isCenter ? 0 : 20,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative cursor-pointer select-none"
        onClick={onClick}
        style={{ width: 220 }}
      >
        {/* Phone shell */}
        <div className="relative rounded-[2.8rem] overflow-hidden bg-brand-text shadow-[0_0_0_3px_#1a1a1a,0_0_0_6px_#3a3a3a,0_24px_60px_rgba(0,0,0,0.45)]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-24 h-6 bg-brand-text rounded-b-2xl flex items-center justify-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#2a2a2a]" />
            <div className="w-1 h-1 rounded-full bg-[#3a3a3a]" />
          </div>

          {/* Screen */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '9/16', width: '100%' }}>
            {isCenter ? (
              <video
                ref={videoRef}
                src={reel.videoSrc}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 px-4 pointer-events-none">
              <p className="text-white text-xs font-medium leading-tight line-clamp-2">{reel.caption}</p>
            </div>

            {/* Instagram logo */}
            <div className="absolute top-8 right-3 pointer-events-none">
              <Instagram size={16} className="text-white/80" />
            </div>

            {/* Center play indicator on side videos */}
            {!isCenter && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[9px] border-y-transparent ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Home button area */}
          <div className="bg-brand-text flex items-center justify-center py-2">
            <div className="w-24 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Product CTA below center phone */}
      <AnimatePresence>
        {isCenter && reel.product && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-3 bg-white rounded-xl shadow-premium px-4 py-3 border border-brand-bg-alt"
            style={{ width: 220 }}
          >
            <img src={reel.product.image} alt={reel.product.name} className="w-10 h-10 rounded-lg object-cover bg-brand-bg-alt" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-brand-text truncate">{reel.product.name}</p>
              <p className="text-xs text-brand-primary font-semibold">{reel.product.price.toFixed(2)} €</p>
            </div>
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(reel.product!)}
                className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors flex-shrink-0"
              >
                <Plus size={16} />
              </button>
            )}
          </motion.div>
        )}
        {isCenter && !reel.product && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ width: 220, height: 56 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const ReelsCarousel = ({ onAddToCart }: { onAddToCart?: (p: Product) => void }) => {
  const [centerIndex, setCenterIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCenterIndex(i => (i + 1) % REELS.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCenterIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(advance, AUTOPLAY_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [advance, isPaused]);

  const prev = () => goTo((centerIndex - 1 + REELS.length) % REELS.length);
  const next = () => goTo((centerIndex + 1) % REELS.length);

  // Show 5 items centered on centerIndex
  const visible = [-2, -1, 0, 1, 2].map(offset => {
    const idx = (centerIndex + offset + REELS.length) % REELS.length;
    return { reel: REELS[idx], offset };
  });

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">@amapolahaircare</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Sígueme en Instagram</h2>
          <p className="text-brand-text-light max-w-md mx-auto">
            Consejos, rutinas y resultados reales. Únete a la comunidad Amapola.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-start justify-center gap-4 md:gap-6">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-48 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all -translate-x-2 md:translate-x-0"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-start justify-center gap-3 md:gap-5">
            {visible.map(({ reel, offset }) => (
              <PhoneMockup
                key={reel.id}
                reel={reel}
                isCenter={offset === 0}
                onClick={() => offset !== 0 && goTo((centerIndex + offset + REELS.length) % REELS.length)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 top-48 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all translate-x-2 md:translate-x-0"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {REELS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === centerIndex
                  ? "w-6 h-2 bg-brand-primary"
                  : "w-2 h-2 bg-brand-text/20 hover:bg-brand-primary/40"
              )}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com/amapolahaircare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-brand-text-light hover:text-brand-primary transition-colors font-medium"
            >
              <Instagram size={16} /> Instagram
            </a>
            <span className="text-brand-bg-alt">·</span>
            <a
              href="https://tiktok.com/@amapolahaircare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-brand-text-light hover:text-brand-primary transition-colors font-medium"
            >
              <TikTokIcon /> TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

