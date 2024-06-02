import Link from 'next/link';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import { LineSegment, LineSegmentProps } from '~ui/atoms/line-segment';
import { Typography } from '~ui/atoms/typography';

import { monthNameAndYearDate } from '~utils/string';
import { tw } from '~utils/style';

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
  return (
    <LineSegment
      leading={
        <div className='flex items-start gap-x-3'>
          <Icon
            className='aspect-square h-4 w-4 flex-shrink-0 flex-grow'
            name='arrow-up-right'
            color={tw.theme.colors.foreground.primary}
          />

          <Button
            className='flex-shrink-1 text-foreground-secondary line-clamp-3 h-fit max-w-prose whitespace-break-spaces text-sm'
            variant='link'
            size='inline'
            asChild
          >
            <Link href={href}>{title}</Link>
          </Button>
        </div>
      }
      trailing={
        <Typography
          className='text-foreground-secondary whitespace-nowrap text-sm'
          weight='normal'
        >
          {monthNameAndYearDate(createdAt)}
        </Typography>
      }
      {...rest}
    />
  );
};
