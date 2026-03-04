import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={cn("overflow-hidden h-[600px] relative", props.className)}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...props.testimonials, ...props.testimonials].map((testimonial, i) => (
          <div 
            className="p-8 rounded-2xl border border-brand-bg-alt bg-white shadow-sm hover:shadow-md transition-shadow max-w-xs w-full mx-auto" 
            key={i}
          >
            <div className="text-brand-text-light text-sm italic leading-relaxed">"{testimonial.text}"</div>
            <div className="flex items-center gap-3 mt-6">
              <img
                width={40}
                height={40}
                src={testimonial.image}
                alt={testimonial.name}
                className="h-10 w-10 rounded-full object-cover border border-brand-bg-alt"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="font-serif font-bold text-sm tracking-tight leading-5">{testimonial.name}</div>
                <div className="text-[10px] uppercase font-bold text-brand-primary/60 tracking-widest">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      {/* Gradient overlays for smooth fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-brand-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-bg to-transparent z-10 pointer-events-none" />
    </div>
  );
};
