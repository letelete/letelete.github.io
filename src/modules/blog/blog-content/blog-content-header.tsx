'use client';

import { AnimatePresence } from 'framer-motion';

import { BLOG_PATH_WITH_CATEGORY } from '~constants/index';

import { Content, ContentType } from '~lib/content/provider';

import { BlogContentGoBackButton } from '~modules/blog/blog-content/blog-content-go-back-button';
import { BlogContentLikeButton } from '~modules/blog/blog-content/blog-content-like-button';

import { RevealInUpMotion } from '~ui/atoms/motion';
import { ForNonMobile } from '~ui/atoms/responsive';
import { Typography } from '~ui/atoms/typography';
import { TagsList } from '~ui/organisms/tags-list';

import { dayMonthNameAndYearDate, readingTime } from '~utils/string';

export interface BlogContentHeader {
  content: Content;
}

export const BlogContentHeader = ({ content }: BlogContentHeader) => {
  return (
    <header className='w-full'>
      <Typography
        className='flex items-center gap-x-1'
        variant='body-sm'
        color='hint'
        weight='bold'
      >
        <BlogContentGoBackButton href={BLOG_PATH_WITH_CATEGORY(content.type)} />

        {`/ ${contentTypeToHeader[content.type]}`}
      </Typography>

      <Typography className='mt-4' variant='hero' color='highlight' asChild>
        <h1>{content.title}</h1>
      </Typography>

      <div className='mt-4 sm:mt-8'>
        <Typography
          className='space-x-2'
          variant='body-sm'
          color='hint'
          weight='normal'
        >
          <span>{dayMonthNameAndYearDate(new Date(content.date))}</span>
          <span>&bull;</span>
          <span>{readingTime(content.body)}</span>
        </Typography>

        <TagsList className='sm:mt-2' tags={content.tags} />
      </div>

      <AnimatePresence>
        <ForNonMobile>
          <RevealInUpMotion className='mt-12' transition={{ delay: 1 }}>
            <BlogContentLikeButton contentSlug={content.slug} />
          </RevealInUpMotion>
        </ForNonMobile>
      </AnimatePresence>
    </header>
  );
};

const contentTypeToHeader: Record<ContentType, string> = {
  article: 'Reading article',
  'youtube-video': 'Watching a YouTube video',
  talk: 'Seeing a talk',
};
