import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface AppHeaderProps extends ComponentPropsWithoutRef<'header'> {}

export const AppHeader = ({ className, children, ...rest }: AppHeaderProps) => {
  return (
    <header
      className={cn(
        'layout-width-limiter layout-padding sticky top-0 z-50 flex w-full flex-row items-center bg-gradient-to-b from-background to-background/10 py-10 backdrop-blur-sm',
        className
      )}
      {...rest}
    >
      {children}
    </header>
  );
};
