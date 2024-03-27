import { ComponentPropsWithoutRef } from 'react';

import { Copyrights } from '~ui/atoms/copyrights';

import { cn } from '~utils/style';

export interface FooterProps extends ComponentPropsWithoutRef<'footer'> {}

export const Footer = ({ className, ...rest }: FooterProps) => {
  return (
    <footer
      className={cn(
        'flex w-full flex-col items-center justify-center bg-background',
        className
      )}
      {...rest}
    >
      <div className='flex w-full justify-center border-t border-background-contrast py-4'>
        <Copyrights />
      </div>
    </footer>
  );
};
