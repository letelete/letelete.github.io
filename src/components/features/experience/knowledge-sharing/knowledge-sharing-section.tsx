'use client';

import { useCallback, useRef, useState } from 'react';
import { ContentType } from 'src/lib/content/provider';

import { KNOWLEDGE_SHARING_HEADER } from '~constants/index';

import { WriteSubSection } from '~features/experience/knowledge-sharing/sub-sections/write-sub-section';

import { Navbar } from '~ui/atoms/navbar';
import { Navigatable, NavigatableHandler } from '~ui/atoms/navigatable';
import { StickyHeaderSectionProps } from '~ui/atoms/sticky-header-section';
import { StickyHeaderSection } from '~ui/atoms/sticky-header-section';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

import { RecordSubSection } from './sub-sections/record-sub-section';
import { SpeakSubSection } from './sub-sections/speak-sub-section';

export const NAVBAR_SCOPE_ID = 'knowledge-sharing-section-navigation';

export interface KnowledgeSharingSectionProps
  extends Partial<StickyHeaderSectionProps> {}

export const KnowledgeSharingSection = ({
  className,
  ...rest
}: KnowledgeSharingSectionProps) => {
  const [highlightedSegment, setHighlightedSegment] =
    useState<ContentType | null>(null);

  const navigatableHandler = useRef<NavigatableHandler>(null);

  const handleSectionInView = useCallback((sectionId: string) => {
    setHighlightedSegment(sectionId as ContentType);
  }, []);

  const handleSelectSection = useCallback((sectionId: string) => {
    navigatableHandler.current?.scrollTo?.(sectionId);
  }, []);

  return (
    <StickyHeaderSection
      className={cn(className)}
      header={
        <Typography className='layout-width-limiter layout-padding' asChild>
          <h2>
            I believe knowledge sharing is a fundamental method to pursue
            expertise in a given field.
            <br />
            <span className='text-primary-highlighted'>
              {KNOWLEDGE_SHARING_HEADER.map(({ content, type, className }) => {
                if (!type) {
                  return (
                    <span key={content} className={className}>
                      {content}
                    </span>
                  );
                }

                return (
                  <nav
                    key={type}
                    className={cn('nav-card inline-flex', className)}
                  >
                    <Navbar.ItemInline
                      scopeId={NAVBAR_SCOPE_ID}
                      item={{ label: content, id: type }}
                      selected={highlightedSegment === type}
                      onClick={() => handleSelectSection(type)}
                    />
                  </nav>
                );
              })}
            </span>
          </h2>
        </Typography>
      }
      body={
        <Navigatable
          onSectionInView={handleSectionInView}
          ref={navigatableHandler}
        >
          <Navigatable.Section
            sectionId='write'
            className='layout-width-limiter layout-padding'
          >
            <WriteSubSection />
          </Navigatable.Section>

          <Navigatable.Section sectionId='record'>
            <RecordSubSection />
          </Navigatable.Section>

          <Navigatable.Section sectionId='speak'>
            <SpeakSubSection />
          </Navigatable.Section>
        </Navigatable>
      }
      {...rest}
    />
  );
};
