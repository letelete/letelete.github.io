import { UseInViewOptions, useAnimationFrame, useInView } from 'framer-motion';
import { RefObject } from 'react';

export type FrameCallback = (timestamp: number, delta: number) => void;

/**
 * Triggers animation frame `callback` when element with provided `ref` is in view.
 */
export const useAnimationFrameInView = (
  ref: RefObject<Element>,
  callback: FrameCallback,
  inViewOptions?: UseInViewOptions
) => {
  const isInView = useInView(ref, inViewOptions);

  useAnimationFrame((timestamp, delta) => {
    if (isInView) {
      callback(timestamp, delta);
    }
  });
};
