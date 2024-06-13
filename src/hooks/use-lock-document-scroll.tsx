import { useCallback, useLayoutEffect } from 'react';

const CLASS_NAME = 'lock-scroll';

const useLockScroll = (options?: {
  immediate?: boolean;
  forceScrollPosition?: number;
}) => {
  const getElement = useCallback(() => document.querySelector('html'), []);

  const lockScroll = useCallback(() => {
    const element = getElement();

    if (!element) {
      return;
    }

    element.classList.add(CLASS_NAME);
  }, [getElement]);

  const unlockScroll = useCallback(() => {
    const element = getElement();

    if (!element) {
      return;
    }

    element.classList.remove(CLASS_NAME);

    if (options?.forceScrollPosition) {
      element.scrollTo({ top: options.forceScrollPosition });
    }
  }, [getElement, options?.forceScrollPosition]);

  useLayoutEffect(() => {
    if (options?.immediate) {
      lockScroll();
    }
  }, [lockScroll, options?.immediate]);

  return { lockScroll, unlockScroll };
};

useLockScroll.displayName = 'useLockScroll';

/* -----------------------------------------------------------------------------------------------*/

export { useLockScroll };
