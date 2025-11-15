'use client';

import { useCallback } from 'react';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';

import { useRelativeDayPart } from '~hooks/use-relative-day-part';

import { DynamicWeightOnHoverText } from '~ui/atoms/dynamic-weight-on-hover-text';
import { Typography } from '~ui/atoms/typography';
import {
  HighlightedWithPopup,
  PopupVideoContent,
} from '~ui/organisms/highlighted-with-popup';
import { AuthorName } from '~ui/widgets/author-name';
import { AuthorWorkTitle } from '~ui/widgets/author-work-title';
import { SocialButtons } from '~ui/widgets/social-buttons';

const BlogHeroSection = () => {
  const relativeDayPart = useRelativeDayPart();

  const renderNaturalPopup = useCallback(() => {
    return <PopupVideoContent fileName={`nature-${relativeDayPart.part}`} />;
  }, [relativeDayPart.part]);

  return (
    <SectionContainer className='layout-width-limiter layout-padding flex w-full items-center'>
      <figure className='flex w-full flex-col items-center text-center'>
        <Typography variant='hero' asChild>
          <h1>
            {'I believe '}
            <span className='font-light italic'>
              <DynamicWeightOnHoverText text='knowledge' />
            </span>{' '}
            <span className='font-light italic'>
              <DynamicWeightOnHoverText text='sharing' />
            </span>
            {' is '}
            <span className='font-bold'>key</span>
            {' to becoming an '}
            <DynamicWeightOnHoverText text='expert' />
          </h1>
        </Typography>

        <Typography className='mt-8' variant='body-sm' asChild>
          <h2>
            {'I write, record, and talk about programming, design and '}{' '}
            <HighlightedWithPopup renderPopupContent={renderNaturalPopup}>
              lifestyle
            </HighlightedWithPopup>
            .
          </h2>
        </Typography>

        <Typography className='mt-1' variant='sm' color='hint' asChild>
          <h2>{'All opinions are my own.'}</h2>
        </Typography>

        <AuthorName />

        <AuthorWorkTitle />

        <SocialButtons className='mt-4' />
      </figure>
    </SectionContainer>
  );
};
BlogHeroSection.displayName = 'BlogHeroSection';

export { BlogHeroSection };
