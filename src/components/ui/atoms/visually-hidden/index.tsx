import { VisuallyHidden as VisuallyHiddenPrimitive } from '@radix-ui/react-visually-hidden';
import { ComponentPropsWithoutRef } from 'react';

export interface VisuallyHidden extends ComponentPropsWithoutRef<'span'> {}

export const VisuallyHidden = ({ children, ...props }: VisuallyHidden) => {
  return (
    <VisuallyHiddenPrimitive {...props}>{children}</VisuallyHiddenPrimitive>
  );
};
