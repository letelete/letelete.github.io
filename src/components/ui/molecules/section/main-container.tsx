import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { cn } from '~utils/style';

const MainContainer = forwardRef<
  ElementRef<'main'>,
  ComponentPropsWithoutRef<'main'>
>(({ children, className, ...rest }, ref) => {
  return (
    <main
      className={cn('relative min-h-screen w-full space-y-6', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </main>
  );
});

MainContainer.displayName = 'MainContainer';

export { MainContainer };
