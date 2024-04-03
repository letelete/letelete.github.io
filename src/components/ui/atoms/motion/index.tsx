import { HTMLMotionProps, motion } from 'framer-motion';

export interface HeartBeatMotionProps extends HTMLMotionProps<'div'> {}

export const HeartBeatMotion = ({
  children,
  ...rest
}: HeartBeatMotionProps) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0.75, 1.25] }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        type: 'spring',
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface FadeInMotionProps extends HTMLMotionProps<'div'> {}

export const FadeInMotion = ({ children, ...rest }: FadeInMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
