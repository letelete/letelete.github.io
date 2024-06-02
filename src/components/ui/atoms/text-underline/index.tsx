import { motion } from 'framer-motion';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~utils/style';

export interface TextUnderlineProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Allows to animate the underline within the given scopeId only.
   */
  scopeId: string;
  active?: boolean;
}

export const TextUnderline = ({
  scopeId,
  active,
  children,
  className,
  ...rest
}: TextUnderlineProps) => {
  return (
    <span className={cn('relative', className)} {...rest}>
      <div className='bg-primary-hint absolute left-0 top-full z-0 h-0.5 w-full rounded-sm' />

      {active && (
        <motion.div
          layoutId={`text-underline__highlight#${scopeId}`}
          className='bg-accent absolute left-0 top-full z-0 h-0.5 w-full rounded-sm'
        />
      )}

      {children}
    </span>
  );
};
