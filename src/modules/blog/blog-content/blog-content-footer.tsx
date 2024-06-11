'use client';

import { memo } from 'react';

import { BLOG_PATH_WITH_CATEGORY } from '~constants/index';

import { Content } from '~lib/content/provider';

import { BlogContentGoBackButton } from '~modules/blog/blog-content/blog-content-go-back-button';
import { BlogContentLikeButton } from '~modules/blog/blog-content/blog-content-like-button';

import { ForMobile } from '~ui/atoms/responsive';
import { Footer, FooterProps } from '~ui/molecules/footer';

export interface BlogContentFooterProps extends Omit<FooterProps, 'content'> {
  content: Content;
}

const BlogContentFooter = memo(
  ({ content, ...props }: BlogContentFooterProps) => {
    return (
      <Footer {...props}>
        <ForMobile>
          <BlogContentLikeButton contentSlug={content.slug} size='sm' />
        </ForMobile>

        <BlogContentGoBackButton
          className='mt-8 py-4'
          href={BLOG_PATH_WITH_CATEGORY(content.type)}
        />
      </Footer>
    );
  }
);

BlogContentFooter.displayName = 'BlogContentFooter';

export { BlogContentFooter };
