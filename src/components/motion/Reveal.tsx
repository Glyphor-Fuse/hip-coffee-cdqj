import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: 'fit-content' | '100%';
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "", 
  delay = 0.25, 
  width = "fit-content" 
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ width, overflow: 'hidden' }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
