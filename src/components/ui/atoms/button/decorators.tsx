import { type HTMLMotionProps, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, ComponentType } from 'react';

/**
 * Converts `Button` into `MotionButton`.
 * Provides "idle", and "hovered" motion variants.
 */
export const asHoverableButton = <T extends ComponentPropsWithoutRef<'button'>>(
  Button: ComponentType<T> | string
) => {
  const MotionButton = motion(Button);

  return [
    MotionButton,
    {
      initial: 'idle',
      whileHover: 'hovered',
      whileFocus: 'hovered',
    } as const satisfies HTMLMotionProps<'button'>,
  ] as const;
};
