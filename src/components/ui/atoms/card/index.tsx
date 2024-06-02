import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

const Card = ({ asChild, className, ...rest }: CardProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'from-card-intense to-card-light/30 overflow-hidden rounded-xl bg-gradient-to-br backdrop-blur-md',
        className
      )}
      {...rest}
    />
  );
};

Card.displayName = 'Card';

export { Card };
