import { ReactNode, useCallback } from 'react';

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
  const checkExperienceEndDate = useCallback(
    (endDate: unknown): endDate is 'Now' =>
      typeof endDate === 'string' && endDate === 'Now',
    []
  );

  const isExperienceActive = checkExperienceEndDate(endDate);

  return (
    <LineSegment
      leading={
        <div className='flex max-w-full flex-nowrap items-start gap-x-2'>
          <div className='relative inline'>{leading}</div>

          <div className='flex w-full flex-1 flex-col flex-wrap gap-x-2 sm:flex-row'>
            <Typography
              variant='body-sm'
              color='highlight'
              prose={false}
              balance={false}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography prose={false} balance={false} variant='body-sm'>
                {subtitle}
              </Typography>
            )}
          </div>
        </div>
      }
      trailing={
        <Typography
          className='flex flex-nowrap items-center gap-x-1 whitespace-nowrap'
          prose={false}
          balance={false}
          variant='body-sm'
          weight='normal'
          color='hint'
          asChild
        >
          <div>
            {monthNameAndYearDate(startDate)}
            {endDate && (
              <>
                <span>&#8212;</span>

                {isExperienceActive ? (
                  <>
                    <span className='text-accent'>Now</span>
                    <NotificationDotPulse />
                  </>
                ) : (
                  monthNameAndYearDate(endDate)
                )}
              </>
            )}
          </div>
        </Typography>
      }
      {...rest}
    />
  );
};
