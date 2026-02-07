import * as React from 'react';
import { cn } from '~utils/style';

interface SectionContainerProps
  extends React.ComponentPropsWithoutRef<'section'> {}

const SectionContainer = React.forwardRef<
  HTMLDivElement,
  SectionContainerProps
>(({ children, className, ...rest }, ref) => {
  return (
    <section
      className={cn(
        'layout-width-limiter layout-padding flex w-full flex-col',
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </section>
  );
});

SectionContainer.displayName = 'SectionContainer';

export { SectionContainer };
export type { SectionContainerProps };
