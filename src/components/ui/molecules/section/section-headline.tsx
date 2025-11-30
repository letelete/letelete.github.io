import * as React from 'react';
import { Typography, TypographyProps } from '~ui/atoms/typography';
import { cn } from '~utils/style';

interface SectionHeadlineProps extends TypographyProps {
  disablePadding?: boolean;
}

const SectionHeadline = ({
  className,
  children,
  disablePadding,
  ...rest
}: React.PropsWithChildren<SectionHeadlineProps>) => (
  <Typography
    className={cn(
      'mx-auto text-center',
      disablePadding || 'pb-content-sm  sm:pb-content',
      className
    )}
    asChild
    {...rest}
  >
    <h3>{children}</h3>
  </Typography>
);

SectionHeadline.displayName = 'SectionHeadline';

export { SectionHeadline };
export type { SectionHeadlineProps };
