'use client';

import Image from 'next/image';

import { BLOG_PATH } from '~constants/index';

import { useBlogContext } from '~modules/blog';

import { ContentCard, ContentCardContainer } from '~ui/molecules/content-card';
import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';

/* -------------------------------------------------------------------------------------------------
 * HighlightedContributionsSection
 * -----------------------------------------------------------------------------------------------*/

const HighlightedContributionsSection = () => {
  const { highlightedContents } = useBlogContext();

  return (
    <SectionContainer>
      <SectionHeader title='Top-rated contributions' />

      <ContentCardContainer>
        {highlightedContents.map((content) => (
          <ContentCard
            href={`${BLOG_PATH}/${content.slug}`}
            key={content.slug}
            label={content.title}
            title={content.description}
            contentType={content.type}
            display={
              content.thumbnail ? (
                <Image
                  fill
                  priority
                  sizes='100%'
                  className='object-cover'
                  src={content.thumbnail}
                  alt={content.description}
                />
              ) : null
            }
          />
        ))}
      </ContentCardContainer>
    </SectionContainer>
  );
};

HighlightedContributionsSection.displayName = 'HighlightedContributionsSection';

/* -----------------------------------------------------------------------------------------------*/

export { HighlightedContributionsSection };
