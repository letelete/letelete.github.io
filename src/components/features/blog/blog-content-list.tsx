import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { Content } from 'src/lib/content/provider';

import { Typography } from '~ui/atoms/typography';
import { TagsList } from '~ui/organisms/tags-list';

import { dayMonthNameAndYearDate, readingTime } from '~utils/string';

export interface BlogContentListProps {
  content: Content[];
}

export const BlogContentList = ({ content }: BlogContentListProps) => {
  const allTags = useMemo(
    () => [...new Set(content.map((content) => content.tags).flat())].sort(),
    [content]
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredContent = useMemo(() => {
    if (selectedTags.length) {
      return content.filter((content) =>
        content.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    return [...content];
  }, [content, selectedTags]);

  const handleSelectedTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  if (!content.length) {
    return <Typography className='text-center'>Coming soon!</Typography>;
  }

  return (
    <div className='flex flex-col gap-y-8'>
      <TagsList
        tagProps={{ className: 'text-base leading-6' }}
        tags={allTags}
        onChange={handleSelectedTagsChange}
        selectable
      />

      <ul className='flex w-full flex-col gap-y-8'>
        {filteredContent.map((content) => (
          <Link
            className='bg-transparent overflow-hidden rounded-lg p-2 transition-opacity hover:bg-primary-highlighted/10'
            key={content.slug}
            href={`/blog/${content.slug}`}
          >
            <article
              className='flex justify-between gap-x-12'
              key={content.slug}
            >
              <Typography
                className='whitespace-nowrap'
                variant='body-sm'
                weight='normal'
                color='hint'
              >
                {dayMonthNameAndYearDate(new Date(content.date))}
              </Typography>

              <div className='flex flex-1 flex-col'>
                <Typography className='underline' color='highlight' asChild>
                  <h3>{content.title}</h3>
                </Typography>

                <div className='mt-4'>
                  <Typography variant='sm' color='hint' weight='normal'>
                    {readingTime(content.date)}
                  </Typography>

                  <TagsList tags={content.tags} />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </ul>
    </div>
  );
};
