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
    <section className={cn('flex h-full w-full', className)} {...rest}>
      <div className={cn('flex h-full w-0 flex-1', leadingClassName)}>
        {leading}
      </div>

      <div className={cn('flex h-full w-0 flex-1', trailingClassName)}>
        {trailing}
      </div>
    </section>
  );
};
