'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { memo } from 'react';
import rehypeHighlight from 'rehype-highlight';

import { BlogMarkdown } from '~features/blog/blog-markdown';

export interface BlogContentArticle {
  body: string;
}

const BlogContentArticle = memo(({ body }: BlogContentArticle) => (
  <article>
    <MDXRemote
      source={body}
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
));

BlogContentArticle.displayName = 'BlogContentArticle';

export { BlogContentArticle };
