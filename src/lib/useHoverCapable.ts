import { useEffect, useState } from 'react';

// true em dispositivos com mouse (hover funciona de verdade),
// false em touch-only (celular/tablet) — onde a interação vira clique.
export function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHoverCapable(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return hoverCapable;
}