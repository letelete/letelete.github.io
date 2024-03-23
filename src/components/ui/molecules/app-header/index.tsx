import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '~utils/style';

export interface AppHeaderProps extends ComponentPropsWithoutRef<'header'> {
  innerClassName?: string;
}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ className, innerClassName, children, ...rest }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-50 flex w-full bg-gradient-to-b from-background to-background/10 py-10 backdrop-blur-sm',
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
      </header>
    );
  }
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
