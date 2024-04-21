import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';

import {
  fadeInMotionVariants,
  heartBeatMotionVariants,
  popInMotionVariants,
  revealInUpMotionVariants,
} from '~ui/atoms/motion/lib';

export interface HeartBeatMotionProps extends HTMLMotionProps<'div'> {}
const HeartBeatMotion = forwardRef<HTMLDivElement, HeartBeatMotionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={heartBeatMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
HeartBeatMotion.displayName = 'HeartBeatMotion';
export { HeartBeatMotion };

export interface FadeInMotionProps extends HTMLMotionProps<'div'> {}
const FadeInMotion = forwardRef<HTMLDivElement, FadeInMotionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={fadeInMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
FadeInMotion.displayName = 'FadeInMotion';
export { FadeInMotion };

export interface RevealInUpMotionProps extends HTMLMotionProps<'div'> {}
const RevealInUpMotion = forwardRef<HTMLDivElement, RevealInUpMotionProps>(
  ({ children, transition, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        transition={{ type: 'spring', duration: 1, ...transition }}
        variants={revealInUpMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
RevealInUpMotion.displayName = 'RevealInUpMotion';
export { RevealInUpMotion };

export interface PopInMotionProps extends HTMLMotionProps<'div'> {}
const PopInMotion = forwardRef<HTMLDivElement, PopInMotionProps>(
  ({ children, transition, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        transition={{ type: 'spring', ...transition }}
        variants={popInMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
PopInMotion.displayName = 'PopInMotion';
export { PopInMotion };
