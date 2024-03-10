import { LineSegment, LineSegmentProps } from '~ui/atoms/line-segment';

import { NotificationDotPulse } from '~ui/molecules/notification-dot-pulse';
import { ReactNode } from 'react';
import { Typography } from '~ui/atoms/typography';
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
                  <NotificationDotPulse className='absolute left-[90%] top-0' />
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
