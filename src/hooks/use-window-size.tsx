import { useLayoutEffect } from 'react';

export const useWindowSize = (onResize: () => (() => void) | void) => {
  useLayoutEffect(() => {
    let cleanupFn: (() => void) | void;

    const handleResize = () => {
      cleanupFn = onResize();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupFn?.();
    };
  }, [onResize]);
};
