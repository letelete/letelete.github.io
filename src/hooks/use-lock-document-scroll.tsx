import * as React from 'react';

const CLASS_NAME = 'lock-scroll';

const useLockScroll = (options?: {
  immediate?: boolean;
  forceScrollPosition?: number;
}) => {
  const getElement = React.useCallback(
    () => document.querySelector('html'),
    []
  );

  const lockScroll = React.useCallback(() => {
    const element = getElement();

    if (!element) {
      return;
    }

    element.classList.add(CLASS_NAME);
  }, [getElement]);

  const unlockScroll = React.useCallback(() => {
    const element = getElement();

    if (!element) {
      return;
    }

    element.classList.remove(CLASS_NAME);

    if (options?.forceScrollPosition) {
      element.scrollTo({ top: options.forceScrollPosition });
    }
  }, [getElement, options?.forceScrollPosition]);

  React.useLayoutEffect(() => {
    if (options?.immediate) {
      lockScroll();
    }
  }, [lockScroll, options?.immediate]);

  React.useEffect(() => {
    return () => unlockScroll();
  }, [unlockScroll]);

  return { lockScroll, unlockScroll };
};

useLockScroll.displayName = 'useLockScroll';

export { useLockScroll };
