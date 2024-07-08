import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

import { Content } from '~lib/content/provider';

import { ForMobile, ForNonMobile } from '~ui/atoms/responsive';
import { Typography } from '~ui/atoms/typography';
import { ContentIcon } from '~ui/molecules/content-icon';
import { TagsList } from '~ui/organisms/tags-list';

import { dayMonthNameAndYearDate, readingTime } from '~utils/string';
import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * BlogItem
 * -----------------------------------------------------------------------------------------------*/

interface BlogItemProps extends Partial<LinkProps> {
  content: Content;
  className?: string;
}

const BlogItem = ({ content, className, ...rest }: BlogItemProps) => {
  return (
    <Link
      className={cn(
        'flex w-full cursor-pointer overflow-hidden rounded-lg bg-ctx-primary p-2 transition-colors hover:bg-ctx-secondary/40',
        className
      )}
      key={content.slug}
      href={`/blog/${content.slug}`}
      {...rest}
    >
      <article className='flex w-full flex-col' key={content.slug}>
        <div className='flex w-full flex-1 gap-x-4 sm:gap-x-12'>
          <div className='flex-initial'>
            <ForMobile>
              <ItemThumbnail className='mb-4 max-w-36' content={content} />
            </ForMobile>

            <Typography
              className='whitespace-nowrap'
              variant='body-sm'
              weight='normal'
              color='hint'
            >
              {dayMonthNameAndYearDate(new Date(content.date))}
            </Typography>
          </div>

          <ForNonMobile>
            <ItemThumbnail className='max-w-48' content={content} />
          </ForNonMobile>

          <div className='flex flex-1 flex-col'>
            <Typography
              className='inline-block underline'
              asChild
              prose={false}
            >
              <h3>
                <ContentIcon
                  className='inline align-middle'
                  contentType={content.type}
                />{' '}
                {content.title}
              </h3>
            </Typography>

            <div className='mt-4'>
              <Typography variant='sm' color='hint' weight='normal'>
                {readingTime(content.body)}
              </Typography>

              <TagsList tags={content.tags} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ItemThumbnail
 * -----------------------------------------------------------------------------------------------*/

interface ItemThumbnailProps {
  content: Content;
  className?: string;
}

const ItemThumbnail = ({ content, className }: ItemThumbnailProps) => {
  return (
    <div
      className={cn(
        'relative flex aspect-video h-min w-full flex-initial flex-col items-center justify-center overflow-hidden rounded-xl bg-ctx-secondary',
        className
      )}
    >
      {content.thumbnail ? (
        <Image
          fill
          priority
          sizes='100%'
          className='object-cover'
          src={content.thumbnail}
          alt={content.description}
        />
      ) : (
        <Typography
          className='uppercase'
          variant='sm'
          color='secondary'
          weight='bold'
        >
          Soon
        </Typography>
      )}
    </div>
  );
};

ItemThumbnail.displayName = 'ItemThumbnail';

/* -----------------------------------------------------------------------------------------------*/

export { BlogItem };
export type { BlogItemProps };
