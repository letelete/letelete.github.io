import { BLOG_BASE_URL, SOCIALS_URLS, TALKS_BASE_URL } from '~constants/index';
import {
  HorizontalScrollButtonContainer,
  HorizontalScrollCarousel,
  HorizontalScrollContentContainer,
} from '~ui/molecules/horizontal-scroll-carousel';
import { MicrophoneEmoji, PencilEmoji } from '~ui/atoms/emojis';
import { useEffect, useRef, useState } from 'react';

import { ArticleSegment } from '~ui/molecules/article-segment';
import { Button } from '~ui/atoms/button';
import { ExternalContentCard } from '~ui/molecules/youtube-card';
import { Icon } from '~ui/atoms/icon';
import Link from 'next/link';
import { TextUnderline } from '~ui/atoms/text-underline';
import { Typography } from '~ui/atoms/typography';
import { motion } from 'framer-motion';
import talkDevJs2023 from '/public/galleries/talks/devjs-2023.webp';
import talkSFI2023 from '/public/galleries/talks/sfi-2023.webp';
import useTailwind from '~hooks/use-tailwind';
import youtubeImg10 from '/public/galleries/youtube/img-10.png';

type Segment = 'write' | 'record' | 'speak';

const paragraphWithUnderline: { content: string; segment?: Segment }[] = [
  { content: 'I ' },
  { content: 'write', segment: 'write' },
  { content: ', ' },
  { content: 'record', segment: 'record' },
  { content: ', and ' },
  { content: 'speak', segment: 'speak' },
  { content: ' about programming.' },
];

const TEXT_UNDERLINE_SCOPE_ID = 'experience-section';

const articles = [
  {
    title:
      'Optimizing your React application for the upcoming “Interaction to Next Paint"',
    href: `${BLOG_BASE_URL}/articles/optimizing-your-react-application-for-the-upcoming-inp`,
    createdAt: new Date(Date.parse('2024-02-20')),
  },
  {
    title: 'Why your animation fails to run in 60 fps',
    href: `${BLOG_BASE_URL}/articles/why-your-animation-fails-to-run-in-60-fps`,
    createdAt: new Date(Date.parse('2024-01-16')),
  },
  {
    title: 'How zero-days killed my procrastination',
    href: `${BLOG_BASE_URL}/articles/how-zero-days-killed-my-procrastination`,
    createdAt: new Date(Date.parse('2023-08-12')),
  },
] as const;

const youtubeVideos = [
  {
    id: 'youtube-a',
    href: 'https://www.youtube.com/',
    title:
      'Why you should stop "Learning" design, and start doing it instead (this is a long title).',
    views: 95123,
    createdAt: new Date(Date.parse('2024-03-10')),
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
    id: 'youtube-c',
    href: 'https://www.youtube.com/',
    title: 'Stop "Learning" Design.',
    views: 508000,
    createdAt: new Date(Date.parse('2023-08-12')),
    thumbnail: youtubeImg10,
  },
] as const;

const talks = [
  {
    id: 'b0OtzS2b0u0',
    href: 'https://www.youtube.com/watch?v=b0OtzS2b0u0',
    title: 'Animating the web @ SFI',
    views: undefined,
    createdAt: new Date(Date.parse('2023-03-04')),
    thumbnail: talkDevJs2023,
  },
  {
    id: 'j29Uacx_nEs',
    href: 'https://www.youtube.com/watch?v=j29Uacx_nEs',
    title:
      'Animating the UI with performance in mind using React @ dev.js summit',
    createdAt: new Date(Date.parse('2023-10-12')),
    thumbnail: talkSFI2023,
  },
] as const;

export const ExperienceSection = () => {
  const tw = useTailwind();
  const [highlightedSegment, setHighlightedSegment] = useState<Segment | null>(
    null
  );

  const writeContainerRef = useRef<HTMLDivElement>(null);
  const writeRef = useRef<HTMLDivElement>(null);
  const isWriteInView = useInView(writeRef, { margin: '-60% 0px -40% 0px' });

  const recordRef = useRef<HTMLDivElement>(null);
  const isRecordInView = useInView(recordRef, { margin: '-60% 0px -40% 0px' });
  const recordScrollRef = useRef<HTMLDivElement>(null);

  const speakRef = useRef<HTMLDivElement>(null);
  const isSpeakInView = useInView(speakRef, { margin: '-60% 0px -40% 0px' });
  const speakScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isWriteInView) {
      setHighlightedSegment('write');
    }
    if (isRecordInView) {
      setHighlightedSegment('record');
    }
    if (isSpeakInView) {
      setHighlightedSegment('speak');
    }
  }, [isRecordInView, isSpeakInView, isWriteInView]);

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <div className='sticky top-0 z-20 w-full bg-background/50 pb-4 pt-20 backdrop-blur-md sm:pt-40'>
        <Typography className='layout-width-limiter layout-padding' asChild>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.8 }}
          >
            I believe knowledge sharing is a fundamental method to pursue
            expertise in a given field.
            <br />
            <span className='text-primary-highlighted'>
              {paragraphWithUnderline.map(({ content, segment }) => {
                if (!segment) {
                  return <span key={content}>{content}</span>;
                }

                return (
                  <TextUnderline
                    key={segment}
                    scopeId={TEXT_UNDERLINE_SCOPE_ID}
                    active={segment === highlightedSegment}
                  >
                    {content}
                  </TextUnderline>
                );
              })}
            </span>
          </motion.h2>
        </Typography>
      </div>

      <div className='relative z-0'>
        <figure
          ref={writeRef}
          className='layout-width-limiter layout-padding flex min-h-screen w-full items-center justify-center'
        >
          <div
            className='flex h-full w-full flex-col items-center justify-center gap-y-4'
            ref={writeContainerRef}
          >
            {articles.map(({ href, title, createdAt }, index) => (
              <motion.div
                className='w-full'
                key={href}
                transition={{ type: 'spring', bounce: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                initial={{ opacity: 0 }}
              >
                <ArticleSegment
                  style={{ opacity: 1 - index / articles.length }}
                  href={href}
                  title={title}
                  createdAt={createdAt}
                />
              </motion.div>
            ))}

            <motion.div
              className='flex-inline mx-auto mt-10'
              transition={{ type: 'spring', bounce: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ root: writeContainerRef, once: false, amount: 0.8 }}
              initial={{ opacity: 0 }}
            >
              <Button variant='link' asChild>
                <Link href={BLOG_BASE_URL}>
                  <PencilEmoji className='mr-2' />
                  Read my blog
                </Link>
              </Button>
            </motion.div>
          </div>
        </figure>

        <figure ref={recordRef} className='w-full'>
          <HorizontalScrollCarousel ref={recordScrollRef}>
            <HorizontalScrollButtonContainer
              ref={recordScrollRef}
              href={SOCIALS_URLS.youtube}
              label='Watch my YouTube channel'
              leading={
                <Icon
                  className='mr-2'
                  name='youtube'
                  color={tw.theme.colors.accent.DEFAULT}
                />
              }
            />

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
        </figure>

        <figure ref={speakRef} className='w-full'>
          <HorizontalScrollCarousel ref={speakScrollRef} reversed>
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
              label='Check my talks'
              leading={<MicrophoneEmoji className='mr-2' />}
              reversed
            />
          </HorizontalScrollCarousel>
        </figure>
      </div>
    </div>
  );
};
