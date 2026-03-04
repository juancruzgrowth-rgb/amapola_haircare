import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Instagram, Facebook, MessageCircle, Mail, MapPin } from "lucide-react";

interface SocialIconProps {
    icon: React.ReactNode;
    href: string;
    label: string;
    className?: string;
    color?: string;
    key?: React.Key;
}

export function SocialIcon({ icon, href, label, className, color = "var(--color-brand-primary)" }: SocialIconProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{
                y: -8,
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl bg-white/50 backdrop-blur-sm border border-white/40 text-brand-text-light transition-all shadow-sm hover:text-brand-primary hover:border-brand-primary/20",
                className
            )}
        >
            <div className="transition-transform group-hover:scale-110">
                {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 28 } as any) : icon}
            </div>
        </motion.a>
    );
}

export function SocialIcons({ icons, className }: { icons: SocialIconProps[], className?: string }) {
    return (
        <div className={cn("flex flex-wrap items-center justify-center gap-6", className)}>
            {icons.map((icon, i) => (
                <SocialIcon key={i} {...icon} />
            ))}
        </div>
    );
}
