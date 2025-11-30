import * as React from 'react';
import { UseInViewOptions, useAnimationFrame, useInView } from 'framer-motion';

export type FrameCallback = (timestamp: number, delta: number) => void;

/**
 * Triggers animation frame `callback` when element with provided `ref` is in view.
 */
export const useAnimationFrameInView = (
  ref: React.RefObject<Element>,
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
