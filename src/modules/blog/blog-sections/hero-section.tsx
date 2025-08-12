'use client';

import { useCallback } from 'react';

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

/* -------------------------------------------------------------------------------------------------
 * HeroSection
 * -----------------------------------------------------------------------------------------------*/

const HeroSection = () => {
  const relativeDayPart = useRelativeDayPart();

  const renderExperiencePopup = useCallback(() => {
    return <PopupVideoContent fileName={`nature-${relativeDayPart.part}`} />;
  }, [relativeDayPart.part]);

  return (
    <section className='layout-width-limiter layout-padding flex w-full items-center'>
      <figure className='flex w-full flex-col items-center'>
        <Typography className='text-center' variant='hero' asChild>
          <h1>
            I believe{' '}
            <span className='inline-block font-light italic'>
              <DynamicWeightOnHoverText text='knowledge sharing' />
            </span>{' '}
            is <span className='font-bold'>key</span> to becoming an{' '}
            <span className='font-light tracking-wider'>expert</span>.
          </h1>
        </Typography>

        <Typography variant='body-sm' className='mt-8 text-center' asChild>
          <h2>
            I write, record, and talk about{' '}
            <HighlightedWithPopup renderPopupContent={renderExperiencePopup}>
              programming
            </HighlightedWithPopup>{' '}
            and design.
          </h2>
        </Typography>

        <Typography
          color='hint'
          variant='sm'
          className='mt-0.5 text-center'
          asChild
        >
          <h2>All opinions are my own.</h2>
        </Typography>

        <AuthorName />

        <AuthorWorkTitle className='relative -mt-1' />

        <SocialButtons className='mt-4' />
      </figure>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

/* -----------------------------------------------------------------------------------------------*/

export { HeroSection };
