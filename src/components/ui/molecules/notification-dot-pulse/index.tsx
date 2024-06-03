import { motion } from 'framer-motion';

import {
  NotificationDot,
  NotificationDotProps,
} from '~ui/atoms/notification-dot';

import { cn } from '~utils/style';

export interface NotificationDotPulseProps extends NotificationDotProps {}

export const NotificationDotPulse = ({
  className,
  ...rest
}: NotificationDotPulseProps) => {
  return (
    <div aria-hidden className={cn('relative', className)}>
      <PulsatingNotificationDot
        className='z-0 opacity-50'
        scale={2.75}
        {...rest}
      />
      <PulsatingNotificationDot
        className='z-10 opacity-80'
        scale={1.75}
        {...rest}
      />
      <NotificationDot className='relative z-20' {...rest} />
    </div>
  );
};

interface PulsatingNotificationDot extends NotificationDotProps {
  scale: number;
}
const PulsatingNotificationDot = ({
  className,
  scale,
  ...rest
}: PulsatingNotificationDot) => (
  <motion.div
    className={cn('absolute left-0 top-0 origin-center scale-0', className)}
    animate={{ scale: [1, scale], opacity: 0 }}
    transition={{
      repeat: Infinity,
      repatType: 'mirror',
      ease: 'easeOut',
      duration: 1,
    }}
  >
    <NotificationDot {...rest} />
  </motion.div>
);
