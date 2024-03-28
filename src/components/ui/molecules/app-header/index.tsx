import {
  HTMLMotionProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { ReactNode, forwardRef, useState } from 'react';

import { cn, vhToPx } from '~utils/style';

export interface AppHeaderProps extends HTMLMotionProps<'header'> {
  innerClassName?: string;
  children?: ReactNode;
}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ className, innerClassName, children, ...rest }, ref) => {
    const { scrollY } = useScroll();
    const [compact, setCompact] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
      const previous = scrollY.getPrevious();
      const delta = latest - (previous ?? 0);
      const isCompactView = delta > 0 && latest > vhToPx(30);

      setCompact(isCompactView);
    });

    return (
      <motion.header
        ref={ref}
        variants={{
          compact: { padding: '0.5rem 0' },
          normal: { padding: '2.5rem 0' },
        }}
        initial='normal'
        animate={compact ? 'compact' : 'normal'}
        className={cn(
          'sticky top-0 z-50 flex w-full bg-gradient-to-b from-background to-background/50 backdrop-blur-md',
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
