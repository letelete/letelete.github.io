import Link, { LinkProps } from 'next/link';

import { Content } from '~lib/content/provider';

import { Typography } from '~ui/atoms/typography';
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
        'flex cursor-pointer overflow-hidden rounded-lg bg-ctx-primary p-2 transition-colors',
        className
      )}
      key={content.slug}
      href={`/blog/${content.slug}`}
      {...rest}
    >
      <article className='flex justify-between gap-x-12' key={content.slug}>
        <Typography
          className='whitespace-nowrap'
          variant='body-sm'
          weight='normal'
          color='hint'
        >
          {dayMonthNameAndYearDate(new Date(content.date))}
        </Typography>

        <div className='flex flex-1 flex-col'>
          <Typography className='underline' asChild>
            <h3>{content.title}</h3>
          </Typography>

          <div className='mt-4'>
            <Typography variant='sm' color='hint' weight='normal'>
              {readingTime(content.body)}
            </Typography>

            <TagsList tags={content.tags} />
          </div>
        </div>
      </article>
    </Link>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { BlogItem };
export type { BlogItemProps };
