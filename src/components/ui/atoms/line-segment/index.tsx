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
      className={cn(
        'flex w-full flex-col items-start gap-y-2 sm:flex-row sm:items-center',
        className
      )}
      {...rest}
    >
      {leading}

      <div className='flex w-full flex-1 items-center gap-x-6 pl-6'>
        <div className='bg-ctx-primary-fg-decorative h-[1px] w-full' />

        <div className='sm:self-[none] inline self-end'>{trailing}</div>
      </div>
    </div>
  );
};
