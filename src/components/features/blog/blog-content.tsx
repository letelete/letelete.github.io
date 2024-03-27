'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Content, ContentType } from 'src/lib/content/provider';

import { BLOG_BASE_URL } from '~constants/index';

import { BlogMarkdown } from '~features/blog/blog-markdown';
import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import useTailwind from '~hooks/use-tailwind';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';
import { Footer } from '~ui/molecules/footer';
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
  const tw = useTailwind();

  return (
    <BlogTwoPaneContainer
      leadingClassName='max-w-[35%]'
      leading={
        <div>
          <Typography
            className='flex items-center gap-x-1'
            variant='body-sm'
            color='hint'
            weight='bold'
          >
            <Button
              className='relative mt-0.5'
              size='inline'
              variant='link'
              asChild
            >
              <Link href={BLOG_BASE_URL}>
                <Icon
                  name='arrow-left'
                  color={tw.theme.colors.primary.highlighted}
                />
                Go back
              </Link>
            </Button>

            {`/ ${contentTypeToHeader[content.type]}`}
          </Typography>

          <Typography className='mt-4' variant='hero' color='highlight' asChild>
            <h1>{content.title}</h1>
          </Typography>

          <div className='mt-8'>
            <Typography
              className='mt-2 space-x-2'
              variant='body-sm'
              color='hint'
              weight='normal'
            >
              <span>{dayMonthNameAndYearDate(new Date(content.date))}</span>
              <span>&bull;</span>
              <span>{readingTime(content.body)}</span>
            </Typography>

            <TagsList className='mt-2' tags={content.tags} />
          </div>
        </div>
      }
      trailing={
        <article>
          <MDXRemote
            source={content.body}
            components={BlogMarkdown}
            options={{
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
                development: process.env.NODE_ENV === 'development',
              },
            }}
          />

          <Footer className='mt-24' />
        </article>
      }
    />
  );
}
