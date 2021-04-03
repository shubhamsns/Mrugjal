import { useRef, useEffect } from 'react';

function useUpdateEffect(effect, deps) {
  const mounted = useRef(false);

  useEffect((...args) => {
    if (mounted.current) {
      effect(...args);
    } else {
      mounted.current = true;
    }
  }, deps);
}

export { useUpdateEffect };
