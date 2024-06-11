import { ComponentPropsWithoutRef } from 'react';

import { Copyrights } from '~ui/atoms/copyrights';

import { cn } from '~utils/style';

export interface FooterProps extends ComponentPropsWithoutRef<'footer'> {}

export const Footer = ({ className, children, ...rest }: FooterProps) => {
  return (
    <footer
      className={cn(
        'bg-background-primary flex w-full flex-col items-center justify-center',
        className
      )}
      {...rest}
    >
      {children}

      <div className='flex w-full justify-center py-4'>
        <Copyrights />
      </div>
    </footer>
  );
};
