import { type HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';

import { cn } from '~utils/style';

export type SkeletonProps = HTMLMotionProps<'div'>;

const Skeleton = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1] }}
        transition={{
          duration: 0.75,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeOut',
        }}
        className={cn('bg-background-contrast', className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
