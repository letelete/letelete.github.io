'use client';

import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import { BlogMarkdownComponents } from '~/modules/blog/pages/content/blog-content-markdown-components';

export interface BlogContentArticle {
  body: string;
}

const BlogContentArticle = React.memo(({ body }: BlogContentArticle) => (
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
