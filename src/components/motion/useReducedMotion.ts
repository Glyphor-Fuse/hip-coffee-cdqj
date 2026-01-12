import { useMediaQuery } from 'framer-motion';

export function useReducedMotion() {
  const shouldReduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  return shouldReduceMotion;
}