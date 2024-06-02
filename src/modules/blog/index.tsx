'use client';

import { useMemo, useState } from 'react';
import { BlogItemsList } from 'src/modules/blog/blog-items-list';
import { BlogItemsListHeader } from 'src/modules/blog/blog-items-list-header';
import { BlogTwoPaneContainer } from 'src/modules/blog/blog-two-pane-container';

import { Content, ContentType } from '~lib/content/provider';

export const NAVBAR_SCOPE_ID = 'blog-navigation';

export interface BlogProps {
  contents: Content[];
}

export const Blog = ({ contents }: BlogProps) => {
  const [currentSegment, setCurrentSegment] = useState<ContentType>('article');
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
