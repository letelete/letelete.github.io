import { memo } from 'react';

import { Typography, TypographyProps } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface CopyrightsProps extends TypographyProps {}

export const Copyrights = memo(({ className, ...rest }: CopyrightsProps) => {
  return (
    <Typography
      variant='sm'
      color='hint'
      className={cn('w-full  text-center', className)}
      {...rest}
    >
      All rights reserved &copy; Bruno Kawka 2024
    </Typography>
  );
});

Copyrights.displayName = 'Copyrights';
