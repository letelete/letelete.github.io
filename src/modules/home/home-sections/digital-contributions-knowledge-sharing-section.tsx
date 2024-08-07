'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { BLOG_PATH } from '~constants/index';

import { Content } from '~lib/content/provider';

import { useHomeContext } from '~modules/home';

import { ContentCard, ContentCardContainer } from '~ui/molecules/content-card';
import { InlinePlatformRedirectStackOverflow } from '~ui/molecules/inline-platform-redirect-with-icon';
import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';
import { SectionHeadline } from '~ui/molecules/section/section-headline';

/* -------------------------------------------------------------------------------------------------
 * DigitalContributionsKnowledgeSharing
 * -----------------------------------------------------------------------------------------------*/

const DigitalContributionsKnowledgeSharing = () => {
  const context = useHomeContext();

  const article = useMemo(
    () => context.blogContent.find((content) => content.type === 'article'),
    [context.blogContent]
  );

  const youtubeVideo = useMemo(
    () =>
      context.blogContent.find((content) => content.type === 'youtube-video'),
    [context.blogContent]
  );

  const talk = useMemo(
    () => context.blogContent.find((content) => content.type === 'talk'),
    [context.blogContent]
  );

  const contents = useMemo(
    () =>
      [
        { content: article, label: 'Last article' },
        { content: youtubeVideo, label: 'Last video' },
        { content: talk, label: 'Last talk' },
      ].filter((entry): entry is { content: Content; label: string } =>
        Boolean(entry.content)
      ),
    [article, talk, youtubeVideo]
  );

  return (
    <SectionContainer>
      <SectionHeader
        title='Digital Contributions'
        subtitle='Knowledge sharing'
      />

      <ContentCardContainer>
        {contents.map((entry) => (
          <ContentCard
            href={`${BLOG_PATH}/${entry.content.slug}`}
            key={entry.content.slug}
            label={entry.label}
            title={entry.content.title}
            display={
              entry.content.thumbnail ? (
                <Image
                  fill
                  priority
                  sizes='100%'
                  className='object-contain'
                  src={entry.content.thumbnail}
                  alt={entry.content.description}
                />
              ) : null
            }
          />
        ))}
      </ContentCardContainer>

      <SectionHeadline className='mt-content'>
        I also help humans on <InlinePlatformRedirectStackOverflow />
      </SectionHeadline>
    </SectionContainer>
  );
};

DigitalContributionsKnowledgeSharing.displayName =
  'DigitalContributionsKnowledgeSharing';

/* -----------------------------------------------------------------------------------------------*/

export { DigitalContributionsKnowledgeSharing };
