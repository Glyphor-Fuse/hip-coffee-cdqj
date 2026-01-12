import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../motion/useReducedMotion';

interface SignatureInteractionProps {
  children: React.ReactNode;
  type: 'text-reveal' | 'clip-reveal' | 'parallax' | 'marquee' | 'sticky-progress' | 'hover';
  className?: string;
  speed?: number;
}

export const SignatureInteraction: React.FC<SignatureInteractionProps> = ({ 
  children, 
  type, 
  className = "",
  speed = 20
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const shouldReduceMotion = useReducedMotion();

  if (type === 'parallax') {
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
    
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div style={{ y: shouldReduceMotion ? 0 : y, scale: shouldReduceMotion ? 1.1 : scale }} className="w-full h-full">
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === 'marquee') {
    return (
      <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
        <motion.div
          className="flex"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: speed,
            repeatType: "loop"
          }}
        >
          {children}
          {children}
          {children}
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === 'text-reveal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (type === 'hover') {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
};
