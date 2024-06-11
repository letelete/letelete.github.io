import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '~utils/style';

export interface StickyHeaderSectionProps
  extends ComponentPropsWithoutRef<'div'> {
  header: ReactNode;
  body: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
}

export const StickyHeaderSection = ({
  header,
  body,
  className,
  headerClassName,
  bodyClassName,
  ...rest
}: StickyHeaderSectionProps) => (
  <div className={cn('relative', className)} {...rest}>
    <div
      className={cn(
        'bg-background-primary/50 sticky top-0 z-10 w-full pb-4 pt-20 backdrop-blur-md sm:pt-40',
        headerClassName
      )}
    >
      {header}
    </div>

    <div className={cn('relative z-0', bodyClassName)}>{body}</div>
  </div>
);
