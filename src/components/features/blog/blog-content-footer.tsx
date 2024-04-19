import { BLOG_PATH } from '~constants/index';

import { BlogContentLikeButton } from '~features/blog/blog-content-like-button';
import { BlogContentViewsCounter } from '~features/blog/blog-content-views-counter';

import { GoBackButton } from '~ui/molecules/buttons/go-back-button';
import { Footer, FooterProps } from '~ui/molecules/footer';

export interface BlogContentFooterProps extends FooterProps {
  slug: string;
}

export const BlogContentFooter = ({
  slug,
  ...props
}: BlogContentFooterProps) => {
  return (
    <Footer {...props}>
      <BlogContentLikeButton contentSlug={slug} />

      <BlogContentViewsCounter className='mt-8' contentSlug={slug} />

      <GoBackButton className='mt-8 py-4' href={BLOG_PATH} />
    </Footer>
  );
};
