import dayjs from 'dayjs';
import Link from 'next/link';

import useTailwind from '~hooks/use-tailwind';
import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import { LineSegment, LineSegmentProps } from '~ui/atoms/line-segment';
import { Typography } from '~ui/atoms/typography';

export interface ArticleSegmentProps extends Partial<LineSegmentProps> {
  href: string;
  title: string;
  createdAt: Date;
}

export const ArticleSegment = ({
  href,
  title,
  createdAt,
  ...rest
}: ArticleSegmentProps) => {
  const tw = useTailwind();
  return (
    <LineSegment
      leading={
        <div className='flex items-start gap-x-3'>
          <Icon
            className='aspect-square h-8 w-8'
            size={32}
            name='arrow-up-right'
            color={tw.theme.colors.primary.highlighted}
          />

          <Button
            className='max-w-prose whitespace-break-spaces text-sm text-primary'
            variant='link'
            asChild
          >
            <Link href={href}>{title}</Link>
          </Button>
        </div>
      }
      trailing={
        <Typography className='text-primary-hint-100 text-sm' weight='regular'>
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </Typography>
      }
      {...rest}
    />
  );
};
