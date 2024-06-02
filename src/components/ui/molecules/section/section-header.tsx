import { ComponentPropsWithoutRef } from 'react';

import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * SectionHeader
 * -----------------------------------------------------------------------------------------------*/

interface SectionHeaderProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  className,
  ...rest
}: SectionHeaderProps) => {
  return (
    <div
      className={cn('flex w-full flex-col items-end pb-24', className)}
      {...rest}
    >
      <Typography variant='hero' weight='light' color='primary' italic asChild>
        <h2>{title}</h2>
      </Typography>

      {subtitle && (
        <Typography color='secondary' className='text-left'>
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';

/* -----------------------------------------------------------------------------------------------*/

export { SectionHeader };
export type { SectionHeaderProps };
