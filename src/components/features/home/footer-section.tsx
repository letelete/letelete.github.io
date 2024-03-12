import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface FooterSectionProps extends ComponentPropsWithoutRef<'div'> {}

export const FooterSection = ({ className, ...rest }: FooterSectionProps) => {
  return (
    <div className={cn('min-h-96 w-full bg-black', className)} {...rest}></div>
  );
};
