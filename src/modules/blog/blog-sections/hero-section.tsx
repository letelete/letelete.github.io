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
      <figure className='flex flex-col'>
        <Typography variant='hero' asChild>
          <h1>
            <p>
              I believe{' '}
              <span className='font-light italic'>
                <DynamicWeightOnHoverText text='knowledge sharing' />
              </span>{' '}
              is <span className='font-bold'>key</span> to
            </p>
            <p>
              becoming an{' '}
              <span className='font-light tracking-wider'>expert</span>.
            </p>
          </h1>
        </Typography>

        <Typography variant='body-sm' className='mt-8' asChild>
          <h2>
            I convey my{' '}
            <HighlightedWithPopup renderPopupContent={renderExperiencePopup}>
              experience
            </HighlightedWithPopup>{' '}
            to help humans by writing, recording, and speaking about programming
            and design.
          </h2>
        </Typography>

        <AuthorName />

        <AuthorWorkTitle />
      </figure>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

/* -----------------------------------------------------------------------------------------------*/

export { HeroSection };
