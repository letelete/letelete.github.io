import { HTMLMotionProps, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '~utils/style';

export interface FadeOverlayProps extends ComponentPropsWithoutRef<'div'> {
  overlayProps?: HTMLMotionProps<'div'>;
  overflow?: boolean;
}

const FadeOverlay = forwardRef<HTMLDivElement, FadeOverlayProps>(
  ({ className, overlayProps, children, overflow, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative h-full w-full',
          !overflow && 'overflow-hidden',
          className
        )}
        {...rest}
      >
        {children}

        <motion.div
          {...overlayProps}
          className={cn(
            'from-background-primary absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r to-transparent',
            overlayProps?.className
          )}
        />
      </div>
    );
  }
);

FadeOverlay.displayName = 'FadeOverlay';

export { FadeOverlay };
