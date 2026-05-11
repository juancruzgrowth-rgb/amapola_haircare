import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Product } from '../../types';
import { PRODUCTS } from '../../constants';
import { ProductCTA } from './ProductCTA';

interface BlogPostDetail {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  related_product_id: string;
  product_recommendation_text: string;
  target_audience: 'female' | 'male' | 'both';
  published_at: string;
}

interface BlogDetailPageProps {
  postId: string;
  onNavigate: (page: string) => void;
  onAddToCart: (p: Product) => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="font-serif font-bold text-xl text-brand-text mt-8 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="font-serif font-bold text-2xl text-brand-text mt-10 mb-4 pb-2 border-b border-brand-bg-alt">
          {trimmed.slice(3)}
        </h2>
      );
    }
    return (
      <p key={i} className="text-brand-text-light leading-relaxed text-base">
        {trimmed}
      </p>
    );
  });
}

export function BlogDetailPage({ postId, onNavigate, onAddToCart }: BlogDetailPageProps) {
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/blog/posts/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data: BlogPostDetail) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-brand-bg-alt border-t-brand-primary animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-xl font-serif text-brand-text">Post no encontrado</p>
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-brand-primary font-bold text-sm hover:underline"
        >
          <ArrowLeft size={16} />
          Volver al blog
        </button>
      </div>
    );
  }

  const relatedProduct = PRODUCTS.find(p => p.id === post.related_product_id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 px-6 md:px-12 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-brand-primary font-bold text-sm hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Volver al blog
        </button>

        <div className="mb-4">
          <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest">
            {post.category}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mb-6 leading-tight max-w-3xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-5 text-[11px] uppercase tracking-widest text-brand-text-light font-bold mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formatDate(post.published_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={12} />
            Amapola
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden mb-10 aspect-video w-full">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mobile: ProductCTA below hero */}
        {relatedProduct && (
          <div className="md:hidden mb-10">
            <ProductCTA
              productId={post.related_product_id}
              recommendationText={post.product_recommendation_text}
              onAddToCart={onAddToCart}
            />
          </div>
        )}

        <div className="flex gap-12">
          {/* Main content — 2/3 */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-5">
              {renderContent(post.content)}
            </div>

            {/* End CTA box */}
            {relatedProduct && (
              <div
                className="mt-12 rounded-2xl p-8 border border-amber-100"
                style={{ backgroundColor: '#FDF6F0' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2">
                  Selección Amapola
                </p>
                <h3 className="font-serif text-2xl font-bold text-brand-text mb-3">
                  Te recomendamos para ti
                </h3>
                <p className="text-brand-text-light text-sm leading-relaxed mb-5">
                  {post.product_recommendation_text}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-serif font-bold text-lg text-brand-text">{relatedProduct.name}</p>
                    <p className="text-brand-primary font-bold">{relatedProduct.price.toFixed(2).replace('.', ',')} €</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(relatedProduct)}
                    className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-brand-primary/90 active:scale-95 transition-all"
                  >
                    Sumar al carrito
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — 1/3, desktop only */}
          {relatedProduct && (
            <div className="hidden md:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <ProductCTA
                  productId={post.related_product_id}
                  recommendationText={post.product_recommendation_text}
                  onAddToCart={onAddToCart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
