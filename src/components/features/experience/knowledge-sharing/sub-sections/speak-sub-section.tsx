'use client';

import { useRef } from 'react';

import { TALKS_BASE_URL } from '~constants/index';

import { MicrophoneEmoji } from '~ui/atoms/emojis';
import {
  HorizontalScrollButtonContainer,
  HorizontalScrollCarousel,
  HorizontalScrollCarouselProps,
  HorizontalScrollContentContainer,
} from '~ui/molecules/horizontal-scroll-carousel';
import { ExternalContentCard } from '~ui/molecules/youtube-card';

import talkDevJs2023 from '/public/galleries/talks/devjs-2023.webp';
import talkSFI2023 from '/public/galleries/talks/sfi-2023.webp';

export const SpeakSubSection = ({ ...rest }: HorizontalScrollCarouselProps) => {
  const speakScrollRef = useRef<HTMLDivElement>(null);

  return (
    <HorizontalScrollCarousel ref={speakScrollRef} reversed {...rest}>
      {talks.map((talk) => (
        <HorizontalScrollContentContainer key={talk.id}>
          <ExternalContentCard
            href={talk.href}
            title={talk.title}
            createdAt={talk.createdAt}
            thumbnail={talk.thumbnail}
          />
        </HorizontalScrollContentContainer>
      ))}

      <HorizontalScrollButtonContainer
        ref={speakScrollRef}
        href={TALKS_BASE_URL}
        label='Check all of my talks'
        leading={<MicrophoneEmoji className='mr-2' />}
        reversed
      />
    </HorizontalScrollCarousel>
  );
};

const talks = [
  {
    id: 'j29Uacx_nEs',
    href: 'https://www.youtube.com/watch?v=j29Uacx_nEs',
    title:
      'Animating the UI with performance in mind using React @ dev.js summit',
    createdAt: new Date(Date.parse('2023-10-12')),

    thumbnail: talkDevJs2023,
  },
  {
    id: 'b0OtzS2b0u0',
    href: 'https://www.youtube.com/watch?v=b0OtzS2b0u0',
    title: 'Animating the web @ SFI',
    views: undefined,
    createdAt: new Date(Date.parse('2023-03-04')),
    thumbnail: talkSFI2023,
  },
] as const;
