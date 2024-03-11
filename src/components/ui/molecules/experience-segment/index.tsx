import { ReactNode } from 'react';

import { LineSegment, LineSegmentProps } from '~ui/atoms/line-segment';
import { Typography } from '~ui/atoms/typography';
import { NotificationDotPulse } from '~ui/molecules/notification-dot-pulse';

import { monthNameAndYearDate } from '~utils/string';

export interface ExperienceSegmentProps extends Partial<LineSegmentProps> {
  leading: ReactNode;
  title: string;
  subtitle?: string;
  startDate: Date;
  endDate?: Date | 'Now';
}

export const ExperienceSegment = ({
  leading,
  title,
  subtitle,
  startDate,
  endDate,
  ...rest
}: ExperienceSegmentProps) => {
  return (
    <LineSegment
      leading={
        <div className='flex flex-nowrap items-center gap-x-2 whitespace-nowrap'>
          {leading}

          <Typography variant='body-sm' color='highlight' prose={false}>
            {title}
          </Typography>

          {subtitle && (
            <Typography prose={false} variant='body-sm'>
              {subtitle}
            </Typography>
          )}
        </div>
      }
      trailing={
        <Typography
          className='whitespace-nowrap'
          prose={false}
          variant='body-sm'
          weight='regular'
          color='hint'
        >
          {monthNameAndYearDate(startDate)}
          {endDate && (
            <>
              {' - '}
              {typeof endDate === 'string' ? (
                <span className='relative'>
                  Now
                  <NotificationDotPulse className='absolute -right-4 top-1/2 -translate-y-1/2' />
                </span>
              ) : (
                monthNameAndYearDate(endDate)
              )}
            </>
          )}
        </Typography>
      }
      {...rest}
    />
  );
};
