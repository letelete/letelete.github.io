import * as React from 'react';
import { cn } from '~utils/style';

const SectionsGroupContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...rest }, ref) => {
  return (
    <div
      className={cn('w-full space-y-section-sm sm:space-y-section', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

SectionsGroupContainer.displayName = 'SectionsGroupContainer';

export { SectionsGroupContainer };
