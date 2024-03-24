import { HTMLMotionProps, motion } from 'framer-motion';

export interface HeartBeatMotionProps extends HTMLMotionProps<'div'> {}

export const HeartBeatMotion = ({
  children,
  ...rest
}: HeartBeatMotionProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1.2 }}
      transition={{
        repeat: Infinity,
        repatType: 'reverse',
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
