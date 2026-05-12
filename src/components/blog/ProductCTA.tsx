import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Product } from '../../types';
import { PRODUCTS } from '../../constants';

interface ProductCTAProps {
  productId: string;
  recommendationText: string;
  onAddToCart: (p: Product) => void;
}

export function ProductCTA({ productId, recommendationText, onAddToCart }: ProductCTAProps) {
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return null;

  const categoryLabels: Record<Product['category'], string> = {
    limpieza: 'Limpieza',
    'hidratacion-nutricion': 'Hidratación & Nutrición',
    tratamiento: 'Tratamiento',
    crecimiento: 'Crecimiento',
  };

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-rose-100 bg-white shadow-md overflow-hidden">
      <div className="bg-gradient-to-br from-rose-50 to-amber-50 px-6 py-4 border-b border-rose-100">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
          Producto recomendado
        </span>
      </div>

      <div className="p-6 flex flex-col gap-5">
        <div className="aspect-square w-full rounded-xl overflow-hidden bg-brand-bg-alt">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">
            {categoryLabels[product.category]}
          </span>
          <h3 className="font-serif font-bold text-lg text-brand-text leading-snug">
            {product.name}
          </h3>
          <p className="text-brand-primary font-bold text-base">
            {product.price.toFixed(2).replace('.', ',')} €
          </p>
        </div>

        <blockquote className="border-l-2 border-brand-accent pl-4 py-1">
          <p className="text-sm text-brand-text-light italic leading-relaxed">
            "{recommendationText}"
          </p>
        </blockquote>

        <button
          onClick={handleAdd}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300",
            added
              ? "bg-brand-secondary text-white"
              : "bg-brand-primary text-white hover:bg-brand-primary/90 active:scale-95"
          )}
        >
          {added ? (
            <>
              <Check size={16} />
              Añadido
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              Sumar al carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
}
