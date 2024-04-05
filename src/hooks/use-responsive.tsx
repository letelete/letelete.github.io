import { useMediaQuery } from 'react-responsive';

import { tw } from '~utils/style';

export const breakpoints = tw.theme.screens;

export type Breakpoint = keyof typeof breakpoints;

export const useResponsiveValue = <TValue,>(
  breakpoint: string,
  defaultValue: TValue,
  breakpointValue: TValue
) => {
  const isBreakpoint = useMediaQuery({ query: `(min-width: ${breakpoint})` });

  if (isBreakpoint) {
    return breakpointValue;
  }

  return defaultValue;
};

export const useResponsiveMinWidth = (breakpoint: string) => {
  const isBreakpointOrGreater = useMediaQuery({
    query: `(min-width: ${breakpoint})`,
  });

  return isBreakpointOrGreater;
};

export const useIsMobile = () => {
  const isTabletOrGreater = useResponsiveMinWidth(breakpoints.sm);

  return !isTabletOrGreater;
};
