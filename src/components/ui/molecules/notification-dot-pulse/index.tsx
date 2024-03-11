'use client';

import { motion } from 'framer-motion';

import {
  NotificationDot,
  NotificationDotProps,
} from '~ui/atoms/notification-dot';

import { cn } from '~utils/style';

export interface NotificationDotPulseProps extends NotificationDotProps {}

const dots = new Array(2).fill(null);

export const NotificationDotPulse = ({
  className,
  ...rest
}: NotificationDotPulseProps) => {
  return (
    <div className={cn('relative', className)}>
      {dots.map((_, index) => (
        <motion.div
          key={index}
          className='absolute left-0 top-0 origin-center'
          initial={{
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: 1 + (index + 1) * 0.5,
            opacity: 0,
          }}
          transition={{
            repeat: Infinity,
            repatType: 'mirror',
            ease: 'easeOut',
            duration: 1,
          }}
          style={{
            zIndex: dots.length - index,
          }}
        >
          <NotificationDot {...rest} />
        </motion.div>
      ))}

      <NotificationDot
        style={{ position: 'relative', zIndex: dots.length }}
        {...rest}
      />
    </div>
  );
};
