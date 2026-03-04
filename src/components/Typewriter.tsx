import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../lib/utils';

interface TypewriterProps {
    texts: string[];
    delay?: number;
    initialDelay?: number;
    deleteSpeed?: number;
    typeSpeed?: number;
    loop?: boolean;
    cursorChar?: string | React.ReactNode;
    showCursor?: boolean;
    cursorClassName?: string;
    hideCursorOnType?: boolean;
    cursorAnimationVariants?: Variants;
    className?: string;
}

const Typewriter = ({
    texts,
    delay = 1500,
    initialDelay = 0,
    deleteSpeed = 50,
    typeSpeed = 80,
    loop = true,
    cursorChar = "|",
    showCursor = true,
    cursorClassName = "ml-1 text-brand-primary font-light",
    hideCursorOnType = false,
    cursorAnimationVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } },
    },
    className,
}: TypewriterProps) => {
    const [displayText, setDisplayText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = texts[currentTextIndex];
        let timer: NodeJS.Timeout;

        if (!isDeleting && currentIndex <= currentFullText.length) {
            // Type next char
            timer = setTimeout(() => {
                setDisplayText(currentFullText.substring(0, currentIndex));
                setCurrentIndex(prev => prev + 1);
            }, currentIndex === 0 ? initialDelay : typeSpeed);
        } else if (isDeleting && currentIndex >= 0) {
            // Delete next char
            timer = setTimeout(() => {
                setDisplayText(currentFullText.substring(0, currentIndex));
                setCurrentIndex(prev => prev - 1);
            }, deleteSpeed);
        }

        // Handles state Transitions
        if (!isDeleting && currentIndex > currentFullText.length) {
            timer = setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && currentIndex < 0) {
            setIsDeleting(false);
            setCurrentIndex(0);
            setCurrentTextIndex(prev => (prev + 1) % texts.length);
            if (!loop && currentTextIndex === texts.length - 1) {
                // Stop if not looping
            }
        }

        return () => clearTimeout(timer);
    }, [currentIndex, isDeleting, currentTextIndex, texts, delay, deleteSpeed, typeSpeed, loop]);

    return (
        <div className={cn("inline whitespace-pre-wrap tracking-tight", className)}>
            <span>{displayText}</span>
            {showCursor && (
                <motion.span
                    variants={cursorAnimationVariants}
                    initial="initial"
                    animate="animate"
                    className={cn(
                        cursorClassName,
                        hideCursorOnType && (currentIndex < texts[currentTextIndex].length || isDeleting) ? "hidden" : ""
                    )}
                >
                    {cursorChar}
                </motion.span>
            )}
        </div>
    );
};

export { Typewriter };
