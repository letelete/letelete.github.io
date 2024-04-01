'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { BLOG_PATH } from '~constants/index';

import { Content } from '~lib/content/provider';

import { Button } from '~ui/atoms/button';
import { MicrophoneEmoji } from '~ui/atoms/emojis';
import {
  HorizontalScrollButtonContainer,
  HorizontalScrollCarousel,
  HorizontalScrollCarouselProps,
  HorizontalScrollContentContainer,
} from '~ui/molecules/horizontal-scroll-carousel';
import { ExternalContentCard } from '~ui/molecules/youtube-card';

export interface SpeakSubSectionProps extends HorizontalScrollCarouselProps {
  data: Content[];
}

export const SpeakSubSection = ({ data, ...rest }: SpeakSubSectionProps) => {
  const speakScrollRef = useRef<HTMLDivElement>(null);

  return (
    <HorizontalScrollCarousel ref={speakScrollRef} reversed {...rest}>
      {data.map((talk) => (
        <HorizontalScrollContentContainer key={talk.slug}>
          <ExternalContentCard
            href={`${BLOG_PATH}/${talk.slug}`}
            title={talk.title}
            createdAt={new Date(talk.date)}
            thumbnail={talk.thumbnail}
          />
        </HorizontalScrollContentContainer>
      ))}

      <HorizontalScrollButtonContainer ref={speakScrollRef} reversed>
        <Button variant='link' size='inline' asChild>
          <Link href={BLOG_PATH}>
            <MicrophoneEmoji className='mr-2' />
            Check all of my talks
          </Link>
        </Button>
      </HorizontalScrollButtonContainer>
    </HorizontalScrollCarousel>
  );
};
