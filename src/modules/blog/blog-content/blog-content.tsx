import { Content } from '~lib/content/provider';

import { BlogContentArticle } from '~modules/blog/blog-content/blog-content-article';
import { BlogContentFooter } from '~modules/blog/blog-content/blog-content-footer';
import { BlogContentHeader } from '~modules/blog/blog-content/blog-content-header';
import { BlogTwoPaneContainer } from '~modules/blog/blog-two-pane-container';

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
            content={content}
          />
        </>
      }
    />
  );
}
