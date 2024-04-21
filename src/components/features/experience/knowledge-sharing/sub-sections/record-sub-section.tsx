'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { BLOG_PATH, BLOG_PATH_WITH_CATEGORY } from '~constants/index';

import { Content } from '~lib/content/provider';

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

export interface RecordSubSectionProps extends HorizontalScrollCarouselProps {
  data: Content[];
}

export const RecordSubSection = ({ data, ...rest }: RecordSubSectionProps) => {
  const recordScrollRef = useRef<HTMLDivElement>(null);

  return (
    <HorizontalScrollCarousel ref={recordScrollRef} {...rest}>
      <HorizontalScrollButtonContainer ref={recordScrollRef}>
        <Button variant='link' size='inline' asChild>
          <Link href={BLOG_PATH_WITH_CATEGORY('youtube-video')}>
            <Icon
              className='mr-2'
              name='youtube'
              color={tw.theme.colors.socials.youtube}
            />
            Watch my YouTube channel
          </Link>
        </Button>
      </HorizontalScrollButtonContainer>

      {data.map((video) => (
        <HorizontalScrollContentContainer key={video.slug}>
          <ExternalContentCard
            href={`${BLOG_PATH}/${video.slug}`}
            title={video.title}
            createdAt={new Date(video.date)}
            thumbnail={video.thumbnail}
          />
        </HorizontalScrollContentContainer>
      ))}
    </HorizontalScrollCarousel>
  );
};
