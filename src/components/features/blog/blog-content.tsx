import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Content } from 'src/lib/content/provider';

import { BLOG_BASE_URL } from '~constants/index';

import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import { Markdown } from '~ui/atoms/markdown';

export interface BlogContentProps {
  content: Content;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <BlogTwoPaneContainer
      leading={
        <div>
          <Button size='inline' variant='link' asChild>
            <Link href={BLOG_BASE_URL}>
              <Icon name={'chevron-left'} className='mr-2' />
              Go back
            </Link>
          </Button>
          <h1>{content.title}</h1>
        </div>
      }
      trailing={
        <article>
          <MDXRemote
            source={content.body}
            options={{
              mdxOptions: {},
            }}
            components={Markdown}
          />
        </article>
      }
    />
  );
}
