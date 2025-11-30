'use client';

import {
  Children,
  ForwardedRef,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { cn } from '~utils/style';

interface ForMobileProps {
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

interface ForNonMobileProps {
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

function useIsMobile(mobileBreakpoint = 640) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < mobileBreakpoint);
    return () => mql.removeEventListener('change', onChange);
  }, [mobileBreakpoint]);

  return !!isMobile;
}

export { ForMobile, ForNonMobile, useIsMobile };
export type { ForMobileProps, ForNonMobileProps };
