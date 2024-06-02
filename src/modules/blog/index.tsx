'use client';

import { Content } from '~lib/content/provider';

import { BlogItemsList } from '~modules/blog/blog-items-list';
import { BlogItemsListHeader } from '~modules/blog/blog-items-list-header';
import { BlogTwoPaneContainer } from '~modules/blog/blog-two-pane-container';

export const NAVBAR_SCOPE_ID = 'blog-navigation';

export interface BlogProps {
  contents: Content[];
}

export const Blog = ({ contents }: BlogProps) => {
  return (
    <BlogTwoPaneContainer
      leading={<BlogItemsListHeader />}
      trailing={<BlogItemsList items={contents} />}
    />
  );
};
