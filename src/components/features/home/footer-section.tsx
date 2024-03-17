import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface FooterSectionProps extends ComponentPropsWithoutRef<'div'> {}

export const FooterSection = ({ className, ...rest }: FooterSectionProps) => {
  return (
    <div className={cn('min-h-48 w-full bg-background', className)} {...rest}></div>
  );
};
