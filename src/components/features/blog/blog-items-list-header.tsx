'use client';

import { useMemo } from 'react';

import { Content, ContentType } from '~lib/content/provider';

import { Typography } from '~ui/atoms/typography';
import {
  KnowledgeSharingNavigation,
  SelectableSegment,
} from '~ui/organisms/knowledge-sharing-navigation';

export interface BlogItemsListHeaderProps {
  contents: Content[];
  currentSegment: ContentType;
  onSegmentChange?: (segment: ContentType) => void;
}

export const BlogItemsListHeader = ({
  contents,
  currentSegment,
  onSegmentChange,
}: BlogItemsListHeaderProps) => {
  const segments = useMemo<SelectableSegment[]>(
    () =>
      contents.map((content) => ({
        type: content.type,
        selected: currentSegment === content.type,
      })),
    [contents, currentSegment]
  );

  return (
    <header>
      <Typography variant='hero' asChild>
        <h1>
          {
            'I believe knowledge sharing is a fundamental method to pursue expertise in a given field. '
          }
          <KnowledgeSharingNavigation
            className='mt-4 transition-colors'
            scopeId='blog-items-list-header'
            segments={segments}
            renderNavItemContent={(item) => (
              <Typography
                variant='hero'
                color={item.selected ? 'accent' : 'hint'}
              >
                {item.content}
              </Typography>
            )}
            onChange={(segments) =>
              onSegmentChange?.(
                segments.find((segment) => segment.selected)?.type ?? 'article'
              )
            }
          />
        </h1>
      </Typography>
    </header>
  );
};
