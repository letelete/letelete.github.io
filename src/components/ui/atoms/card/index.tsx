import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '~utils/style';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <figure
        ref={ref}
        className={cn(
          'from-card-intense to-card-light/30 rounded-xl bg-gradient-to-br shadow-inner-glass backdrop-blur-md',
          className
        )}
        {...rest}
      >
        {children}
      </figure>
    );
  }
);

Card.displayName = 'Card';

export { Card };
