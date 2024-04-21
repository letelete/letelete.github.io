export const heartBeatMotionVariants = {
  initial: { scale: 0 },
  animate: { scale: [0.75, 1.25] },
  transition: {
    repeat: Infinity,
    repeatType: 'reverse',
    type: 'spring',
  },
};

export const fadeInMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const revealInUpMotionVariants = {
  initial: { opacity: 0, scale: 0.5, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.5, y: 10 },
};

export const popInMotionVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};
