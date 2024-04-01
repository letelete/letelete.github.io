'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { WriteSubSection } from '~features/experience/knowledge-sharing/sub-sections/write-sub-section';

import { Content, ContentType } from '~lib/content/provider';

import { Navigatable, NavigatableHandler } from '~ui/atoms/navigatable';
import { StickyHeaderSectionProps } from '~ui/atoms/sticky-header-section';
import { StickyHeaderSection } from '~ui/atoms/sticky-header-section';
import { Typography } from '~ui/atoms/typography';
import {
  KnowledgeSharingNavigation,
  SelectableSegment,
} from '~ui/organisms/knowledge-sharing-navigation';
import {
  getKnowledgeSharingSelectableSections,
  getSelectedSegment,
  updateSegmentsWithSelected,
} from '~ui/organisms/knowledge-sharing-navigation/utils';

import { cn } from '~utils/style';

import { RecordSubSection } from './sub-sections/record-sub-section';
import { SpeakSubSection } from './sub-sections/speak-sub-section';

export interface KnowledgeSharingSectionProps
  extends Partial<StickyHeaderSectionProps> {
  data: Content[];
}

export const KnowledgeSharingSection = ({
  data,
  className,
  ...rest
}: KnowledgeSharingSectionProps) => {
  const articles = useMemo(
    () => data.filter((content) => content.type === 'article'),
    [data]
  );
  const youtubeVideos = useMemo(
    () => data.filter((content) => content.type === 'youtube-video'),
    [data]
  );
  const talks = useMemo(
    () => data.filter((content) => content.type === 'talk'),
    [data]
  );

  const [segments, setSegments] = useState(
    getKnowledgeSharingSelectableSections()
  );

  const navigatableHandler = useRef<NavigatableHandler>(null);

  const handleSectionInView = useCallback((sectionId: string) => {
    setSegments((segments) =>
      updateSegmentsWithSelected(segments, sectionId as ContentType)
    );
  }, []);

  const handleSegmentsChange = useCallback((segments: SelectableSegment[]) => {
    const currentSegment = getSelectedSegment(segments)?.type ?? 'article';

    navigatableHandler.current?.scrollTo?.(currentSegment);
  }, []);

  return (
    <StickyHeaderSection
      className={cn(className)}
      header={
        <Typography className='layout-width-limiter layout-padding' asChild>
          <h2>
            I believe knowledge sharing is a fundamental method to pursue
            expertise in a given field.
            <KnowledgeSharingNavigation
              segments={segments}
              scopeId='knowledge-sharing-section-navigation'
              onChange={handleSegmentsChange}
            />
          </h2>
        </Typography>
      }
      body={
        <Navigatable
          onSectionInView={handleSectionInView}
          ref={navigatableHandler}
        >
          <Navigatable.Section
            sectionId={'article' satisfies ContentType}
            className='layout-width-limiter layout-padding'
          >
            <WriteSubSection data={articles} />
          </Navigatable.Section>

          <Navigatable.Section
            sectionId={'youtube-video' satisfies ContentType}
          >
            <RecordSubSection data={youtubeVideos} />
          </Navigatable.Section>

          <Navigatable.Section sectionId={'talk' satisfies ContentType}>
            <SpeakSubSection data={talks} />
          </Navigatable.Section>
        </Navigatable>
      }
      {...rest}
    />
  );
};
