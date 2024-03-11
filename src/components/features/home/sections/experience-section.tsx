import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { BLOG_BASE_URL, SOCIALS_URLS, TALKS_BASE_URL } from '~constants/index';

import useTailwind from '~hooks/use-tailwind';

import { Button } from '~ui/atoms/button';
import {
  LaptopEmoji,
  MicrophoneEmoji,
  PencilEmoji,
  TrophyEmoji,
  VideoCameraEmoji,
  WhiteQuestionMarkEmoji,
} from '~ui/atoms/emojis';
import { Icon } from '~ui/atoms/icon';
import { TextUnderline } from '~ui/atoms/text-underline';
import { Typography } from '~ui/atoms/typography';
import { ArticleSegment } from '~ui/molecules/article-segment';
import { ExperienceSegment } from '~ui/molecules/experience-segment';
import {
  HorizontalScrollButtonContainer,
  HorizontalScrollCarousel,
  HorizontalScrollContentContainer,
} from '~ui/molecules/horizontal-scroll-carousel';
import { ExternalContentCard } from '~ui/molecules/youtube-card';

import talkDevJs2023 from '/public/galleries/talks/devjs-2023.webp';
import talkSFI2023 from '/public/galleries/talks/sfi-2023.webp';
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

const experience = [
  {
    id: 'exp-history__android-developer-at-mifos-initiative',
    leading: <LaptopEmoji />,
    title: 'Android Developer',
    subtitle: 'Mobile-Wallet @ Mifos Initiative',
    startDate: new Date(Date.parse('2018-10-01')),
    endDate: new Date(Date.parse('2019-01-01')),
  },
  {
    id: 'exp-history__google-code-in-winner',
    leading: <TrophyEmoji />,
    title: 'Google Code-In Winner',
    subtitle: 'International coding contest',
    startDate: new Date(Date.parse('2019-01-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__freelance-full-stack-developer',
    leading: <LaptopEmoji />,
    title: 'Freelance Full-Stack Developer',
    subtitle: undefined,
    startDate: new Date(Date.parse('2020-12-01')),
    endDate: new Date(Date.parse('2022-02-01')),
  },
  {
    id: 'exp-history__frontend-engineer-upside',
    leading: <LaptopEmoji />,
    title: 'Frontend Engineer',
    subtitle: '@ Upsidelab',
    startDate: new Date(Date.parse('2022-03-01')),
    endDate: 'Now',
  },
  {
    id: 'exp-history__technical-recruiter-upside',
    leading: <LaptopEmoji />,
    title: 'Technical Recruiter',
    subtitle: '@ Upsidelab',
    startDate: new Date(Date.parse('2022-07-01')),
    endDate: 'Now',
  },
  {
    id: 'exp-history__public-speaker-animating-the-web-sfi',
    leading: <MicrophoneEmoji />,
    title: 'Public Speaker',
    subtitle: '"Animating the Web" @ SFI',
    startDate: new Date(Date.parse('2023-03-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__webinar-speaker-animating-the-ui-with-performance-in-mind-using-react',
    leading: <MicrophoneEmoji />,
    title: 'Webinar Speaker',
    subtitle:
      '"Animating the UI with performance in mind using React" @ dev.js summit',
    startDate: new Date(Date.parse('2023-10-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__youtube-content-creator',
    leading: <VideoCameraEmoji />,
    title: 'YouTube content creator',
    subtitle: '@brunokawka',
    startDate: new Date(Date.parse('2024-03-01')),
    endDate: 'Now',
  },
  {
    id: 'exp-history__public-speaker-rethinking-ui-building-strategies-sfi',
    leading: <MicrophoneEmoji />,
    title: 'Public Speaker',
    subtitle: '"Rethinking UI building strategies" @ SFI',
    startDate: new Date(Date.parse('2024-04-01')),
    endDate: undefined,
  },
  {
    id: 'exp-history__soon',
    leading: <WhiteQuestionMarkEmoji />,
    title: 'Soon',
    subtitle: undefined,
    startDate: new Date(),
    endDate: undefined,
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
      <div className='relative'>
        <div className='sticky top-0 z-10 w-full bg-background/50 pb-4 pt-20 backdrop-blur-md sm:pt-40'>
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
                label='Check all of my talks'
                leading={<MicrophoneEmoji className='mr-2' />}
                reversed
              />
            </HorizontalScrollCarousel>
          </figure>
        </div>
      </div>

      <div className='relative'>
        <div className='sticky top-0 z-30 w-full bg-background/50 pb-4 pt-20 backdrop-blur-md sm:pt-40'>
          <Typography className='layout-width-limiter layout-padding' asChild>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.8 }}
            >
              I was working on some awesome projects, collaborating with amazing
              people, and creating my own things.
              <br />
              <span className='text-primary-highlighted'>
                I gathered the most valuable experiences and listed them
                chronologically.
              </span>
            </motion.h2>
          </Typography>
        </div>

        <div className='relative z-20 mt-28'>
          <figure className='layout-width-limiter layout-padding flex h-full w-full flex-col items-center justify-center gap-y-4'>
            {experience.map(
              ({ id, leading, title, subtitle, startDate, endDate }, index) => (
                <motion.div
                  className='w-full'
                  key={id}
                  transition={{ type: 'spring', bounce: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  initial={{ opacity: 0 }}
                >
                  <ExperienceSegment
                    style={{
                      opacity:
                        index === experience.length - 1 ? 0.34 : undefined,
                    }}
                    leading={leading}
                    title={title}
                    subtitle={subtitle}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </motion.div>
              )
            )}
          </figure>
        </div>
      </div>
    </div>
  );
};
