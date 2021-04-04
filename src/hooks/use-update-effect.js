import { useRef, useEffect } from 'react';

function useUpdateEffect(effect, deps) {
  const mounted = useRef(false);

  useEffect((...args) => {
    if (mounted.current) {
      effect(...args);
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { useUpdateEffect };
