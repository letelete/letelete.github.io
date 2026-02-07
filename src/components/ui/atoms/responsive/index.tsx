'use client';

import * as React from 'react';
import { cn } from '~utils/style';

interface ForMobileProps {
  children: React.ReactNode;
}
/**
 * Displays `children` on mobile-screen breakpoint.
 * Otherwise, removes it from the DOM.
 */
const ForMobile = React.forwardRef<unknown, ForMobileProps>(
  ({ children }, ref) => {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
      ref: React.ForwardedRef<unknown>;
    }>;

    return React.cloneElement(child, {
      className: cn(child.props.className, 'sm:hidden'),
      ref: ref,
    });
  }
);

ForMobile.displayName = 'ForMobile';

interface ForNonMobileProps {
  children: React.ReactNode;
}
/**
 * Displays `children` on a breakpoint larger than the mobile breakpoint.
 * Otherwise, removes it from the DOM.
 */
const ForNonMobile = React.forwardRef<unknown, ForNonMobileProps>(
  ({ children }, ref) => {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
      ref: React.ForwardedRef<unknown>;
    }>;

    return React.cloneElement(child, {
      className: cn(child.props.className, 'max-sm:hidden'),
      ref: ref,
    });
  }
);

ForNonMobile.displayName = 'ForNonMobile';

function useIsMobile(mobileBreakpoint = 640) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
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
