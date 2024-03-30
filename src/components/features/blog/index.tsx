'use client';

import { useMemo, useState } from 'react';

import { BlogContentList } from '~features/blog/blog-content-list';
import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { Content, ContentType } from '~lib/content/provider';

import { Typography } from '~ui/atoms/typography';
import { KnowledgeSharingNavigation } from '~ui/organisms/knowledge-sharing-navigation';

export const NAVBAR_SCOPE_ID = 'blog-navigation';

export interface BlogProps {
  content: Content[];
}

export const Blog = ({ content }: BlogProps) => {
  const [currentSegment, setCurrentSegment] = useState(
    'article' as ContentType
  );
  const currentContent = useMemo(
    () => content.filter((content) => content.type === currentSegment),
    [content, currentSegment]
  );

  return (
    <BlogTwoPaneContainer
      leading={
        <div>
          <Typography variant='hero' asChild>
            <h1>
              {
                'I believe knowledge sharing is a fundamental method to pursue expertise in a given field. '
              }
              <KnowledgeSharingNavigation
                className='mt-4 transition-colors'
                scopeId='blog-home-navigation'
                renderNavItemContent={(item) => (
                  <Typography
                    variant='hero'
                    color={item.selected ? 'accent' : 'hint'}
                  >
                    {item.content}
                  </Typography>
                )}
                onChange={(segments) =>
                  setCurrentSegment(
                    segments.find((segment) => segment.selected)?.type ??
                      'article'
                  )
                }
              />
            </h1>
          </Typography>
        </div>
      }
      trailing={<BlogContentList content={currentContent} />}
    />
  );
};
