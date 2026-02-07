import * as React from 'react';
import { cn } from '~/utils/style';

function AppSuspense({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <React.Suspense
      fallback={
        <div
          className={cn(
            'relative z-0 flex h-full w-full items-center justify-center',
            className
          )}
          {...rest}
        >
          Loading...
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}
AppSuspense.displayName = 'AppSuspense';

export { AppSuspense };
