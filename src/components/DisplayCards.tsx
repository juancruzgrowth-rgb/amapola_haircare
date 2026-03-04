import React from 'react';
import { cn } from '../lib/utils';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DisplayCardProps {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    category: string;
    onClick?: () => void;
    className?: string;
    key?: React.Key;
}

export function DisplayCard({ title, description, date, author, image, category, onClick, className }: DisplayCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={cn(
                "group relative flex flex-col gap-0 rounded-[2rem] border border-white/40 bg-white/50 backdrop-blur-sm overflow-hidden transition-all hover:border-brand-primary/30 hover:shadow-premium cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                        {category}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-8">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-brand-text-muted font-bold">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {author}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-serif font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-brand-text-light line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Leer más <ArrowRight size={14} />
                </div>
            </div>
        </motion.div>
    );
}

export function DisplayCards({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}>
            {children}
        </div>
    );
}
