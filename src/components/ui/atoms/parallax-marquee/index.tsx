import {
  MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { ComponentPropsWithoutRef, useRef } from 'react';

import { useAnimationFrameInView } from '~hooks/use-animation-frame-in-view';

import { cn } from '~utils/style';

export interface ParallaxMarqueeProps extends ComponentPropsWithoutRef<'div'> {
  baseVelocity: number;
}

export const ParallaxMarquee = ({
  children,
  baseVelocity,
  className,
  ...rest
}: ParallaxMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity as MotionValue<number>,
    [0, 1000],
    [0, 5],
    {
      clamp: false,
    }
  );

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrameInView(containerRef, (t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={cn(
        'flex flex-nowrap overflow-hidden whitespace-nowrap',
        className
      )}
      ref={containerRef}
      {...rest}
    >
      <motion.div
        className='flex flex-nowrap gap-x-4 whitespace-nowrap'
        style={{ x }}
      >
        <div className='flex gap-x-4'>{children}</div>
        <div className='flex gap-x-4'>{children}</div>
        <div className='flex gap-x-4'>{children}</div>
        <div className='flex gap-x-4'>{children}</div>
      </motion.div>
    </div>
  );
};
