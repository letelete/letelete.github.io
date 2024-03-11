import {
  MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { ComponentPropsWithoutRef, useRef } from 'react';

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

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div
      className={cn(
        'flex flex-nowrap overflow-hidden whitespace-nowrap',
        className
      )}
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
