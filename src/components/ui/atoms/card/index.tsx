import { ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~utils/style';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

const Card = ({ asChild, className, ...rest }: CardProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'overflow-hidden rounded-xl bg-gradient-to-br from-card-intense to-card-light/30 shadow-inner-glass backdrop-blur-md',
        className
      )}
      {...rest}
    />
  );
};

Card.displayName = 'Card';

export { Card };
