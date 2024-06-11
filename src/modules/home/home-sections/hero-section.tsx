'use client';

import { useCallback } from 'react';

import { useRelativeDayPart } from '~hooks/use-relative-day-part';

import { DynamicWeightOnHoverText } from '~ui/atoms/dynamic-weight-on-hover-text';
import { Typography } from '~ui/atoms/typography';
import {
  HighlightedWithPopup,
  PopupVideoContent,
} from '~ui/organisms/highlighted-with-popup';
import { Listenable, ListenableHighlight } from '~ui/organisms/listenable';
import { SocialButtons } from '~ui/widgets/social-buttons';

export const HeroSection = () => {
  const relativeDayPart = useRelativeDayPart();

  const renderNaturalPopup = useCallback(() => {
    return <PopupVideoContent fileName={`nature-${relativeDayPart.part}`} />;
  }, [relativeDayPart.part]);

  return (
    <section className='layout-width-limiter layout-padding flex w-full items-center'>
      <figure className='flex flex-col'>
        <Typography variant='hero' asChild>
          <h1>
            <p>
              A great product sweats the{' '}
              <span className='font-light italic'>
                <DynamicWeightOnHoverText text='details' />
              </span>
              ,
            </p>
            <p>
              strives for <span className='font-bold'>accessibility</span>,
            </p>
            <p>
              and runs{' '}
              <span className='font-light tracking-wider'>smoothly</span> on
              every device.
            </p>
          </h1>
        </Typography>

        <Typography variant='body-sm' className='mt-8' asChild>
          <h2>
            I help teams build, scale, and release great products
            <br />
            that feel{' '}
            <HighlightedWithPopup renderPopupContent={renderNaturalPopup}>
              natural
            </HighlightedWithPopup>
            .
          </h2>
        </Typography>

        <Listenable
          playAriaLabel='Listen to name pronunciation'
          src='/sfx/author-name-pronunciation.mp3'
          className='mt-24'
        >
          <Typography>
            <ListenableHighlight segments={[[0, 400]]} text='Bruno' />{' '}
            <ListenableHighlight segments={[[400]]} text='Kawka' />
          </Typography>
        </Listenable>

        <Typography color='secondary'>
          Frontend Engineer <span className='italic'>@Upside</span>
        </Typography>

        <SocialButtons className='mt-4' />
      </figure>
    </section>
  );
};
