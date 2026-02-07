import * as React from 'react';
import { VisuallyHidden as VisuallyHiddenPrimitive } from '@radix-ui/react-visually-hidden';

export interface VisuallyHidden
  extends React.ComponentPropsWithoutRef<'span'> {}

export const VisuallyHidden = ({ children, ...props }: VisuallyHidden) => {
  return (
    <VisuallyHiddenPrimitive {...props}>{children}</VisuallyHiddenPrimitive>
  );
};
