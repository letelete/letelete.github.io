'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { SOCIALS } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import {
  HorizontalScrollButtonContainer,
  HorizontalScrollCarousel,
  HorizontalScrollCarouselProps,
  HorizontalScrollContentContainer,
} from '~ui/molecules/horizontal-scroll-carousel';
import { ExternalContentCard } from '~ui/molecules/youtube-card';

import { tw } from '~utils/style';

import youtubeSoonThumbnail from '/public/galleries/youtube/soon.webp';

export const RecordSubSection = ({
  ...rest
}: HorizontalScrollCarouselProps) => {
  const recordScrollRef = useRef<HTMLDivElement>(null);

  return (
    <HorizontalScrollCarousel ref={recordScrollRef} {...rest}>
      <HorizontalScrollButtonContainer ref={recordScrollRef}>
        <Button variant='link' size='inline' asChild>
          <Link href={SOCIALS.youtube.url}>
            <Icon
              className='mr-2'
              name='youtube'
              color={tw.theme.colors.socials.youtube}
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
    id: 'soon-10',
    href: '#',
    title: 'Coming soon',
    views: 0,
    createdAt: new Date(Date.now()),
    thumbnail: youtubeSoonThumbnail,
  },
  {
    id: 'soon-20',
    href: '#',
    title: 'Coming soon',
    views: 0,
    createdAt: new Date(Date.now()),
    thumbnail: youtubeSoonThumbnail,
  },
  {
    id: 'soon-30',
    href: '#',
    title: 'Coming soon',
    views: 0,
    createdAt: new Date(Date.now()),
    thumbnail: youtubeSoonThumbnail,
  },
] as const;
