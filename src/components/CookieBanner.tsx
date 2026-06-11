import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';

const CONSENT_KEY = 'amapola_cookie_consent';

export default function CookieBanner({ onOpenCookies }: { onOpenCookies: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      /* localStorage no disponible (modo privado, etc.) — no mostrar */
    }
  }, []);

  const decide = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* localStorage no disponible — continuar igualmente */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[120]"
        >
          <div className="bg-brand-bg border border-brand-bg-alt rounded-2xl shadow-premium p-6 md:p-7">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-brand-accent-light flex items-center justify-center">
                <Cookie size={18} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-text leading-tight">Cuidamos tu privacidad</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-text-muted mt-1">Aviso de cookies</p>
              </div>
            </div>
            <p className="text-sm text-brand-text-light leading-relaxed mb-5">
              Usamos cookies propias para que la tienda funcione (como recordar tu carrito). Puedes aceptarlas o
              quedarte solo con las esenciales. Más detalles en nuestra{' '}
              <button
                onClick={onOpenCookies}
                className="text-brand-primary font-medium underline underline-offset-2 hover:text-brand-primary-dark transition-colors"
              >
                política de cookies
              </button>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => decide('accepted')}
                className="flex-1 bg-brand-primary text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-primary-dark transition-colors"
              >
                Aceptar
              </button>
              <button
                onClick={() => decide('rejected')}
                className="flex-1 bg-white text-brand-primary border-2 border-brand-primary/20 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-brand-primary/40 transition-colors"
              >
                Solo esenciales
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
