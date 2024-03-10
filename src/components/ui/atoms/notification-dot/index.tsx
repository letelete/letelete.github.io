import { type VariantProps, cva } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'framer-motion';

import { cn } from '~utils/style';

const notificationDotVariants = cva(
  'bg-destructive aspect-square rounded-full',
  {
    variants: {
      size: {
        default: 'h-[0.625rem] w-[0.625rem]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface NotificationDotProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof notificationDotVariants> {}

const motionVariants = {
  hide: { scale: 0 },
  show: { scale: 1 },
};

const motionTransition = {
  delay: 0.25,
  type: 'spring',
};

export const NotificationDot = ({
  className,
  size,
  ...rest
}: NotificationDotProps) => {
  return (
    <motion.div
      initial='hide'
      animate='show'
      exit='hide'
      variants={motionVariants}
      transition={motionTransition}
      className={cn(notificationDotVariants({ size }), className)}
      {...rest}
    />
  );
};
