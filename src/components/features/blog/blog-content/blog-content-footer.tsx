'use client';

import { memo } from 'react';

import { BLOG_PATH } from '~constants/index';

import { BlogContentLikeButton } from '~features/blog/blog-content/blog-content-like-button';

import { ForMobile } from '~ui/atoms/responsive';
import { GoBackButton } from '~ui/molecules/buttons/go-back-button';
import { Footer, FooterProps } from '~ui/molecules/footer';

export interface BlogContentFooterProps extends FooterProps {
  slug: string;
}

const BlogContentFooter = memo(({ slug, ...props }: BlogContentFooterProps) => {
  return (
    <Footer {...props}>
      <ForMobile>
        <BlogContentLikeButton contentSlug={slug} size='sm' />
      </ForMobile>

      <GoBackButton className='mt-8 py-4' href={BLOG_PATH} />
    </Footer>
  );
});

BlogContentFooter.displayName = 'BlogContentFooter';

export { BlogContentFooter };
