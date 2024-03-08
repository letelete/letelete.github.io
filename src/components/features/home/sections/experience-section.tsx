import { useEffect, useRef, useState } from 'react';

import { ArticleSegment } from '~ui/molecules/article-segment';
import { BLOG_BASE_URL } from '~constants/index';
import { Button } from '~ui/atoms/button';
import Link from 'next/link';
import { TextUnderline } from '~ui/atoms/text-underline';
import { Typography } from '~ui/atoms/typography';
import { useInView } from 'framer-motion';

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

export const ExperienceSection = () => {
  const [highlightedSegment, setHighlightedSegment] =
    useState<Segment>('write');

  const writeRef = useRef<HTMLDivElement>(null);
  const isWriteInView = useInView(writeRef, { margin: '-60% 0px -40% 0px' });

  const recordRef = useRef<HTMLDivElement>(null);
  const isRecordInView = useInView(recordRef, { margin: '-60% 0px -40% 0px' });

  const speakRef = useRef<HTMLDivElement>(null);
  const isSpeakInView = useInView(speakRef, { margin: '-60% 0px -40% 0px' });

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
      <div className='sticky top-0 z-20 w-full bg-background pb-4 pt-20'>
        <Typography className='layout-width-limiter layout-padding' asChild>
          <h2>
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
          </h2>
        </Typography>
      </div>

      <div className='relative z-0'>
        <figure
          ref={writeRef}
          className='layout-width-limiter layout-padding flex min-h-[50vh] w-full items-center justify-center'
        >
          <div className='flex h-full w-full flex-col items-center justify-center gap-y-4'>
            {articles.map(({ href, title, createdAt }, index) => (
              <ArticleSegment
                style={{ opacity: 1 - index / articles.length }}
                key={href}
                href={href}
                title={title}
                createdAt={createdAt}
              />
            ))}

            <Button className='mx-auto mt-8' variant='link' asChild>
              <Link href={BLOG_BASE_URL}>Read my blog</Link>
            </Button>
          </div>
        </figure>

        <figure ref={recordRef} className='min-h-screen w-full'>
          2
        </figure>

        <figure ref={speakRef} className='min-h-screen w-full'>
          3
        </figure>
      </div>
    </div>
  );
};
