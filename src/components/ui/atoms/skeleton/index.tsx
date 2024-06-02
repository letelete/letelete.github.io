import { VariantProps, cva } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef, memo } from 'react';

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
        className={cn('bg-background-secondary', className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
export { Skeleton };

const textSkeletonVariants = cva(cn('w-full rounded-full'), {
  variants: {
    variant: {
      hero: 'h-8',
      heading: 'h-7',
      subheading: 'h-7',
      body: 'h-6',
      'body-sm': 'h-5',
      sm: 'h-4',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});
export interface TextSkeletonProps
  extends SkeletonProps,
    VariantProps<typeof textSkeletonVariants> {}
const TextSkeleton = memo(
  ({ variant, className, ...rest }: TextSkeletonProps) => {
    return (
      <Skeleton
        className={cn(textSkeletonVariants({ variant }), className)}
        {...rest}
      />
    );
  }
);
TextSkeleton.displayName = 'TextSkeleton';
export { TextSkeleton };
