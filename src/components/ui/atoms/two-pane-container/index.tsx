import { ReactNode } from 'react';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface TwoPaneContainerProps extends ComponentPropsWithoutRef<'div'> {
  leading: ReactNode;
  trailing: ReactNode;
  leadingClassName?: string;
  trailingClassName?: string;
}

export const TwoPaneContainer = ({
  leading,
  trailing,
  className,
  leadingClassName,
  trailingClassName,
  ...rest
}: TwoPaneContainerProps) => {
  return (
    <section
      className={cn('flex w-full flex-col sm:flex-row', className)}
      {...rest}
    >
      <div
        className={cn('flex w-full flex-1 sm:h-full sm:w-0', leadingClassName)}
      >
        {leading}
      </div>

      <div
        className={cn('flex w-full flex-1 sm:h-full sm:w-0', trailingClassName)}
      >
        {trailing}
      </div>
    </section>
  );
};
