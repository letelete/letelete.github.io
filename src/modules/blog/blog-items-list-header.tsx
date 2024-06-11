'use client';

import { Content, ContentType } from '~lib/content/provider';

import { Typography } from '~ui/atoms/typography';

export interface BlogItemsListHeaderProps {
  contents: Content[];
  currentSegment: ContentType;
  onSegmentChange?: (segment: ContentType) => void;
}

export const BlogItemsListHeader = () => {
  return (
    <header>
      <Typography variant='hero' asChild>
        <h1>
          {
            'I believe knowledge sharing is a fundamental method to pursue expertise in a given field. '
          }
        </h1>
      </Typography>
    </header>
  );
};
