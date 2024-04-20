import { BlogContentArticle } from '~features/blog/blog-content/blog-content-article';
import { BlogContentFooter } from '~features/blog/blog-content/blog-content-footer';
import { BlogContentHeader } from '~features/blog/blog-content/blog-content-header';
import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { Content } from '~lib/content/provider';

export interface BlogContentProps {
  content: Content;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <BlogTwoPaneContainer
      leadingClassName='sm:max-w-[35%]'
      leading={<BlogContentHeader content={content} />}
      trailing={
        <>
          <BlogContentArticle body={content.body} />

          <BlogContentFooter
            className='relative z-50 mt-16 sm:mt-24'
            slug={content.slug}
          />
        </>
      }
    />
  );
}
