import {
  HTMLMotionProps,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useVelocity,
} from 'framer-motion';
import { ReactNode, forwardRef, useState } from 'react';

import { cn, vhToPx } from '~utils/style';

export interface AppHeaderProps extends HTMLMotionProps<'header'> {
  innerClassName?: string;
  children?: ReactNode;
  mode?: 'compact' | 'normal' | 'dynamic';
}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ className, innerClassName, children, mode = 'dynamic', ...rest }, ref) => {
    const [compact, setCompact] = useState(false);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const scrollDistanceStartY = useMotionValue(0);

    useMotionValueEvent(scrollVelocity, 'change', (latest) => {
      // If scroll is slow enough, the velocity will reset `scrollDistanceStartY`
      // to avoid displaying normal view immediately when user scrolls up.
      if (latest * 10000 === 0) {
        scrollDistanceStartY.set(scrollY.get());
      }
    });

    useMotionValueEvent(scrollY, 'change', (latest) => {
      if (mode === 'compact') {
        setCompact(true);
        return;
      }
      if (mode === 'normal') {
        setCompact(false);
        return;
      }

      const MIN_SCROLL_OFFSET_COMPACT_VIEW = 0;
      const MIN_SCROLL_OFFSET_NORMAL_VIEW = 256;

      const previous = scrollY.getPrevious() ?? 0;
      const delta = latest - previous;
      const forceNormalView = latest <= vhToPx(30);

      let distance = latest - scrollDistanceStartY.get();

      if (forceNormalView) {
        setCompact(false);
      } else {
        const directionChanged = delta * distance < 0;
        if (directionChanged) {
          scrollDistanceStartY.set(latest);
          distance = 0;
        }

        const scrollOffset = Math.abs(distance);
        const isScrollingDown = delta > 0;

        setCompact((isNowCompact) =>
          isScrollingDown
            ? scrollOffset >= MIN_SCROLL_OFFSET_COMPACT_VIEW
            : isNowCompact && scrollOffset < MIN_SCROLL_OFFSET_NORMAL_VIEW
        );
      }
    });

    return (
      <motion.header
        layout
        ref={ref}
        variants={{
          compact: {
            padding: '0.5rem 0',
          },
          normal: {
            padding: '2.5rem 0',
          },
        }}
        initial='normal'
        animate={compact ? 'compact' : 'normal'}
        className={cn(
          'to-ctx-primary/25 from-ctx-primary sticky top-0 z-50 flex w-full bg-gradient-to-b backdrop-blur-sm',
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            'layout-width-limiter layout-padding flex w-full items-center',
            innerClassName
          )}
        >
          {children}
        </div>
      </motion.header>
    );
  }
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
