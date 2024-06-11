import { PropsWithChildren } from 'react';

import { Typography, TypographyProps } from '~ui/atoms/typography';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * SectionHeadline
 * -----------------------------------------------------------------------------------------------*/

interface SectionHeadlineProps extends TypographyProps {}

const SectionHeadline = ({
  className,
  children,
  ...rest
}: PropsWithChildren<SectionHeadlineProps>) => (
  <Typography
    className={cn('pb-content-sm sm:pb-content mx-auto text-center', className)}
    asChild
    {...rest}
  >
    <h3>{children}</h3>
  </Typography>
);

SectionHeadline.displayName = 'SectionHeadline';

/* -----------------------------------------------------------------------------------------------*/

export { SectionHeadline };
export type { SectionHeadlineProps };
