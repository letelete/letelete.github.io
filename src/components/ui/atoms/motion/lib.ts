export const clearClipPath = 'inset(0% 0% 0% 0% round 10px)';
export const clipPathToBottom = 'inset(90% 0% 10% 0% round 10px)';

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
  initial: { scale: 0.5, y: 10, clipPath: clipPathToBottom },
  animate: { scale: 1, y: 0, clipPath: clearClipPath },
  exit: { clipPath: clipPathToBottom },
};
