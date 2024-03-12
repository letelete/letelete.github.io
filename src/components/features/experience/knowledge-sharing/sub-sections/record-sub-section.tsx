'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { SOCIALS_URLS } from '~constants/index';

import useTailwind from '~hooks/use-tailwind';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import {
  HorizontalScrollButtonContainer,
  HorizontalScrollCarousel,
  HorizontalScrollCarouselProps,
  HorizontalScrollContentContainer,
} from '~ui/molecules/horizontal-scroll-carousel';
import { ExternalContentCard } from '~ui/molecules/youtube-card';

import youtubeImg10 from '/public/galleries/youtube/img-10.png';

export const RecordSubSection = ({
  ...rest
}: HorizontalScrollCarouselProps) => {
  const tw = useTailwind();
  const recordScrollRef = useRef<HTMLDivElement>(null);

  return (
    <HorizontalScrollCarousel ref={recordScrollRef} {...rest}>
      <HorizontalScrollButtonContainer ref={recordScrollRef}>
        <Button variant='link' size='inline' asChild>
          <Link href={SOCIALS_URLS.youtube}>
            <Icon
              className='mr-2'
              name='youtube'
              color={tw.theme.colors.accent.DEFAULT}
            />
            Watch my YouTube channel
          </Link>
        </Button>
      </HorizontalScrollButtonContainer>

      {youtubeVideos.map((video) => (
        <HorizontalScrollContentContainer key={video.id}>
          <ExternalContentCard
            href={video.href}
            title={video.title}
            views={video.views}
            createdAt={video.createdAt}
            thumbnail={video.thumbnail}
          />
        </HorizontalScrollContentContainer>
      ))}
    </HorizontalScrollCarousel>
  );
};

const youtubeVideos = [
  {
    id: 'youtube-c',
    href: 'https://www.youtube.com/',
    title: 'Stop "Learning" Design.',
    views: 508000,
    createdAt: new Date(Date.parse('2023-08-12')),
    thumbnail: youtubeImg10,
  },
  {
    id: 'youtube-b',
    href: 'https://www.youtube.com/',
    title: 'Stop "Learning" Design.',
    views: 12300,
    createdAt: new Date(Date.parse('2023-08-12')),
    thumbnail: youtubeImg10,
  },
  {
    id: 'youtube-a',
    href: 'https://www.youtube.com/',
    title:
      'Why you should stop "Learning" design, and start doing it instead (this is a long title).',
    views: 95123,
    createdAt: new Date(Date.parse('2024-03-10')),
    thumbnail: youtubeImg10,
  },
] as const;
