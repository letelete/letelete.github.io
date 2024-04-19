import { BLOG_PATH } from '~constants/index';

import { ContentViewsCounter } from '~features/blog/content-views-counter';
import { LikeContentButton } from '~features/blog/like-content-button';

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
      <LikeContentButton contentSlug={slug} />

      <ContentViewsCounter className='mt-8' contentSlug={slug} />

      <GoBackButton className='mt-8 py-4' href={BLOG_PATH} />
    </Footer>
  );
};
