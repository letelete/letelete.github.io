import { ComponentPropsWithoutRef, Suspense } from 'react';
import { cn } from '~/utils/style';

function AppSuspense({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <Suspense
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
    </Suspense>
  );
}
AppSuspense.displayName = 'AppSuspense';

export { AppSuspense };
