import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '~utils/style';

export interface LineSegmentProps extends ComponentPropsWithoutRef<'div'> {
  leading: ReactNode;
  trailing: ReactNode;
}

export const LineSegment = ({
  leading,
  trailing,
  className,
  ...rest
}: LineSegmentProps) => {
  return (
    <div
      className={cn('flex w-full items-center gap-x-6', className)}
      {...rest}
    >
      {leading}

      <div className='bg-primary-hint-100 h-[1px] w-full' />

      {trailing}
    </div>
  );
};
