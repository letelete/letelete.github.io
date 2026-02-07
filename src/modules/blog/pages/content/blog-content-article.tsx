'use client';

import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import { Button } from '~/components/ui/atoms/button';
import { Icon } from '~/components/ui/atoms/icon';
import { Typography } from '~/components/ui/atoms/typography';
import { BLOG_PATH } from '~/constants';
import { BlogMarkdownComponents } from '~/modules/blog/pages/content/blog-content-markdown-components';

export interface BlogContentArticle {
  body: string;
  title: string;
}

const BlogContentArticle = React.memo(({ body, title }: BlogContentArticle) => (
  <article>
    <div className='mb-4 flex items-center gap-x-3'>
      <Button size='icon' variant='ghost' asChild>
        <Link title='Back to blog' aria-label='Back to blog' href={BLOG_PATH}>
          <Icon name='arrow-left' className='h-4 w-4' />
        </Link>
      </Button>
      <Typography asChild variant='heading' weight='medium' prose={false}>
        <h1>{title}</h1>
      </Typography>
    </div>
    <MDXRemote
      source={body}
      components={BlogMarkdownComponents}
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
));

BlogContentArticle.displayName = 'BlogContentArticle';

export { BlogContentArticle };
