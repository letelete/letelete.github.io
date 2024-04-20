import {
  Children,
  ForwardedRef,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
} from 'react';

import { cn } from '~utils/style';

export interface ForMobileProps {
  children: ReactNode;
}
/**
 * Displays `children` on mobile-screen breakpoint.
 * Otherwise, removes it from the DOM.
 */
const ForMobile = forwardRef<unknown, ForMobileProps>(({ children }, ref) => {
  const child = Children.only(children) as ReactElement<{
    className?: string;
    ref: ForwardedRef<unknown>;
  }>;

  return cloneElement(child, {
    className: cn(child.props.className, 'sm:hidden'),
    ref: ref,
  });
});
ForMobile.displayName = 'ForMobile';
export { ForMobile };

export interface ForNonMobileProps {
  children: ReactNode;
}
/**
 * Displays `children` on a breakpoint larger than the mobile breakpoint.
 * Otherwise, removes it from the DOM.
 */
const ForNonMobile = forwardRef<unknown, ForNonMobileProps>(
  ({ children }, ref) => {
    const child = Children.only(children) as ReactElement<{
      className?: string;
      ref: ForwardedRef<unknown>;
    }>;

    return cloneElement(child, {
      className: cn(child.props.className, 'max-sm:hidden'),
      ref: ref,
    });
  }
);
ForNonMobile.displayName = 'ForNonMobile';
export { ForNonMobile };
