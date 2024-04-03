import { type HTMLMotionProps, motion } from 'framer-motion';

import { cn } from '~utils/style';

export type SkeletonProps = HTMLMotionProps<'div'>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <motion.div
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
};
