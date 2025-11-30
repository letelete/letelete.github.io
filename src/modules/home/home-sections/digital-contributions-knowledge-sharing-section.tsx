'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { useHomeContext } from '~modules/home';
import { ContentCard, ContentCardContainer } from '~ui/molecules/content-card';
import { InlinePlatformRedirectStackOverflow } from '~ui/molecules/inline-platform-redirect-with-icon';
import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';
import { SectionHeadline } from '~ui/molecules/section/section-headline';
import { BLOG_PATH } from '~/constants';

const DigitalContributionsKnowledgeSharing = () => {
  const context = useHomeContext();

  const contents = useMemo(
    () => context.blogContent.highlight.slice(0, 3),
    [context.blogContent.highlight]
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
            href={`${BLOG_PATH}/${entry.slug}`}
            key={entry.slug}
            label={entry.title}
            title={entry.description}
            display={
              <Image
                fill
                priority
                sizes='100%'
                className='object-contain'
                src={entry.thumbnail}
                alt=''
              />
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

export { DigitalContributionsKnowledgeSharing };
