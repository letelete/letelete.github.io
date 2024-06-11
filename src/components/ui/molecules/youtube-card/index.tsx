import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import { Card, CardProps } from '~ui/atoms/card';
import { Icon } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';

import { compactNumber, relativeTime } from '~utils/string';
import { cn, tw } from '~utils/style';

export interface ExternalContentCardProps extends CardProps {
  href: string;
  title: string;
  createdAt: Date;
  thumbnail: string | StaticImport;
  views?: number;
}

export const ExternalContentCard = ({
  href,
  title,
  views,
  createdAt,
  thumbnail,
  className,
  ...rest
}: ExternalContentCardProps) => {
  const formattedViews = views ? `${compactNumber(views)} views` : null;
  const formattedCreatedAt = relativeTime(createdAt);

  return (
    <Card
      className={cn('w-[min(26rem,90vw)] p-2', className)}
      asChild
      {...rest}
    >
      <a href={href} className='m-0 flex flex-col p-0' tabIndex={0}>
        <Image
          className='h-auto w-full rounded-lg object-cover'
          src={thumbnail}
          width={720}
          height={404}
          alt=''
        />

        <div className='w-full px-2 py-4'>
          <Typography className='truncate' weight='medium'>
            {title}
          </Typography>

          <div className='flex w-full flex-1 items-center justify-between'>
            <Typography className='truncate' variant='body-sm'>
              {formattedViews && (
                <>
                  <span>{formattedViews}</span>
                  <span className='color-primary-hint mx-2'>&#8226;</span>
                </>
              )}
              <span>{formattedCreatedAt}</span>
            </Typography>

            <Icon
              className='aspect-square h-6 w-6 flex-shrink-0'
              size={24}
              name='arrow-up-right'
              color={tw.theme.colors.ctx.primary.fg.solid}
            />
          </div>
        </div>
      </a>
    </Card>
  );
};
