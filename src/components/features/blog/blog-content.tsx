'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';

import { BLOG_PATH } from '~constants/index';

import { BlogContentFooter } from '~features/blog/blog-content-footer';
import { BlogMarkdown } from '~features/blog/blog-markdown';
import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { Content, ContentType } from '~lib/content/provider';

import { Typography } from '~ui/atoms/typography';
import { GoBackButton } from '~ui/molecules/buttons/go-back-button';
import { TagsList } from '~ui/organisms/tags-list';

import { dayMonthNameAndYearDate, readingTime } from '~utils/string';

export interface BlogContentProps {
  content: Content;
}

const contentTypeToHeader: Record<ContentType, string> = {
  article: 'Reading article',
  'youtube-video': 'Watching a YouTube video',
  talk: 'Seeing a talk',
};

export function BlogContent({ content }: BlogContentProps) {
  return (
    <BlogTwoPaneContainer
      leadingClassName='sm:max-w-[35%]'
      leading={
        <div className='w-full'>
          <Typography
            className='flex items-center gap-x-1'
            variant='body-sm'
            color='hint'
            weight='bold'
          >
            <GoBackButton href={BLOG_PATH} />

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
        </div>
      }
      trailing={
        <>
          <article>
            <MDXRemote
              source={content.body}
              components={BlogMarkdown}
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  //@ts-expect-error https://github.com/hashicorp/next-mdx-remote/issues/86
                  rehypePlugins: [[rehypeHighlight, {}]],
                  development: process.env.NODE_ENV === 'development',
                },
              }}
            />
          </article>

          <BlogContentFooter
            className='relative z-50 mt-16 sm:mt-24'
            slug={content.slug}
          />
        </>
      }
    />
  );
}
