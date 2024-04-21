'use client';

import { useMemo } from 'react';

import { BlogItemsList } from '~features/blog/blog-items-list';
import { BlogItemsListHeader } from '~features/blog/blog-items-list-header';
import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { useContentTypeQueryState } from '~hooks/use-query-state';

import { Content } from '~lib/content/provider';

export const NAVBAR_SCOPE_ID = 'blog-navigation';

export interface BlogProps {
  contents: Content[];
}

export const Blog = ({ contents }: BlogProps) => {
  const [currentSegment, setCurrentSegment] = useContentTypeQueryState();
  const currentContent = useMemo(
    () => contents.filter((content) => content.type === currentSegment),
    [contents, currentSegment]
  );

  return (
    <BlogTwoPaneContainer
      leading={
        <BlogItemsListHeader
          contents={contents}
          currentSegment={currentSegment}
          onSegmentChange={(value) => void setCurrentSegment(value)}
        />
      }
      trailing={<BlogItemsList items={currentContent} />}
    />
  );
};
