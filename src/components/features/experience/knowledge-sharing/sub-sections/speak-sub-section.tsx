'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { TALKS_PATH } from '~constants/index';

import { Button } from '~ui/atoms/button';
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
import talkSoon from '/public/galleries/talks/soon.webp';

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

      <HorizontalScrollButtonContainer ref={speakScrollRef} reversed>
        <Button variant='link' size='inline' asChild>
          <Link href={TALKS_PATH}>
            <MicrophoneEmoji className='mr-2' />
            Check all of my talks
          </Link>
        </Button>
      </HorizontalScrollButtonContainer>
    </HorizontalScrollCarousel>
  );
};

const talks = [
  {
    id: 'soon-10',
    href: '#',
    title: 'Rethinking UI building strategies @ SFI',
    views: undefined,
    createdAt: new Date(Date.parse('2024-04-06')),
    thumbnail: talkSoon,
  },
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
