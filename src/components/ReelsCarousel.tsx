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
    thumbnail: 'https://picsum.photos/seed/reel1/500/650',
    caption: '¿Sabes cuál es tu tipo de cabello? 💫',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '2',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel2/500/650',
    caption: 'Rutina de noche para un cabello hidratado ✨',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '3',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel3/500/650',
    caption: 'Así se usa el Gotero Capilar de Amapola 🌿',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '4',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel4/500/650',
    caption: 'Test de porosidad fácil en casa 🧪',
    instagramUrl: 'https://instagram.com/amapolahaircare',
  },
  {
    id: '5',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/seed/reel5/500/650',
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

// Phone dimensions: wider and less elongated than before for a more modern look
const CENTER_WIDTH = 300;
const SIDE_WIDTH = 260;
// 9/13 ratio feels modern and compact vs the very tall 9/16
const SCREEN_RATIO = 13 / 9;

interface PhoneMockupProps {
  reel: Reel;
  isCenter: boolean;
  isSide: boolean;
  onClick: () => void;
  onAddToCart?: (p: Product) => void;
  key?: string;
}

const PhoneMockup = ({ reel, isCenter, isSide, onClick, onAddToCart }: PhoneMockupProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const width = isCenter ? CENTER_WIDTH : SIDE_WIDTH;

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
      <motion.div
        animate={{
          scale: isCenter ? 1 : isSide ? 0.88 : 0.72,
          opacity: isCenter ? 1 : isSide ? 0.6 : 0,
          y: isCenter ? 0 : 18,
          pointerEvents: isCenter ? 'auto' : 'auto',
        }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="relative cursor-pointer select-none"
        onClick={onClick}
        style={{ width }}
      >
        {/* Outer glow for center phone */}
        {isCenter && (
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
            style={{
              boxShadow: '0 0 60px rgba(167, 87, 84, 0.18), 0 32px 80px rgba(0,0,0,0.28)',
              borderRadius: '2.5rem',
            }}
          />
        )}

        {/* Phone frame */}
        <div
          className="relative overflow-hidden bg-[#111111]"
          style={{
            borderRadius: '2.5rem',
            boxShadow: isCenter
              ? '0 0 0 2px #2a2a2a, 0 0 0 4px #1a1a1a, 0 24px 64px rgba(0,0,0,0.5)'
              : '0 0 0 2px #2a2a2a, 0 0 0 4px #1a1a1a, 0 12px 32px rgba(0,0,0,0.35)',
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-[#111111] flex items-center justify-center gap-1.5"
            style={{ width: 96, height: 28, borderRadius: 999 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#222]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-[#333]" />
          </div>

          {/* Screen */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: `9/${SCREEN_RATIO * 9}`, width: '100%' }}
          >
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />

            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 px-5 pointer-events-none">
              <p className="text-white text-sm font-medium leading-snug line-clamp-2 drop-shadow-sm">
                {reel.caption}
              </p>
            </div>

            {/* Instagram badge top-right */}
            <div className="absolute top-10 right-4 pointer-events-none flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Instagram size={13} className="text-white/90" />
              {isCenter && (
                <span className="text-white/80 text-[10px] font-semibold tracking-wide">Seguir</span>
              )}
            </div>

            {/* Play indicator on side phones */}
            {!isCenter && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <div className="w-0 h-0 border-l-[18px] border-l-white border-y-[11px] border-y-transparent ml-1.5" />
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar (home indicator) */}
          <div className="bg-[#111111] flex items-center justify-center py-2.5">
            <div className="w-28 h-1 bg-white/15 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Product CTA below center phone */}
      <AnimatePresence>
        {isCenter && reel.product && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 bg-white rounded-2xl shadow-lg px-4 py-3 border border-brand-bg-alt"
            style={{ width: CENTER_WIDTH }}
          >
            <img
              src={reel.product.image}
              alt={reel.product.name}
              className="w-11 h-11 rounded-xl object-cover bg-brand-bg-alt flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-brand-text truncate">{reel.product.name}</p>
              <p className="text-sm text-brand-primary font-semibold">{reel.product.price.toFixed(2)} €</p>
            </div>
            {onAddToCart && (
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(reel.product!); }}
                className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors flex-shrink-0 shadow-sm"
              >
                <Plus size={17} />
              </button>
            )}
          </motion.div>
        )}
        {isCenter && !reel.product && (
          <motion.div style={{ width: CENTER_WIDTH, height: 56 }} />
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

  // 3 visible: left(-1), center(0), right(+1)
  const visible = [-1, 0, 1].map(offset => {
    const idx = (centerIndex + offset + REELS.length) % REELS.length;
    return { reel: REELS[idx], offset };
  });

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">
            @amapolahaircare
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Sígueme en Instagram</h2>
          <p className="text-brand-text-light max-w-md mx-auto">
            Consejos, rutinas y resultados reales. Únete a la comunidad Amapola.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all -translate-x-2 md:translate-x-0 border border-brand-bg-alt"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-end justify-center gap-3 md:gap-6 py-4 px-12">
            {visible.map(({ reel, offset }) => (
              <PhoneMockup
                key={reel.id}
                reel={reel}
                isCenter={offset === 0}
                isSide={offset !== 0}
                onClick={() => offset !== 0 && goTo((centerIndex + offset + REELS.length) % REELS.length)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all translate-x-2 md:translate-x-0 border border-brand-bg-alt"
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
                'rounded-full transition-all duration-300',
                i === centerIndex
                  ? 'w-6 h-2 bg-brand-primary'
                  : 'w-2 h-2 bg-brand-text/20 hover:bg-brand-primary/40'
              )}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com/amapolahaircare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-brand-text-light hover:text-brand-primary transition-colors font-medium"
            >
              <Instagram size={16} /> Instagram
            </a>
            <span className="text-brand-text/20">·</span>
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
