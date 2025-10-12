'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { memo } from 'react';
import rehypeHighlight from 'rehype-highlight';

import { BlogMarkdownComponents } from '~modules/blog/explorer/renderers/reader/content/blog-markdown-components';

export interface BlogContentArticle {
  body: string;
}

const BlogContentArticle = memo(({ body }: BlogContentArticle) => (
  <article>
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
