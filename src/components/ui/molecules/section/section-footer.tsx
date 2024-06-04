'use client';

import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { PropsWithChildren, useRef, useState } from 'react';

import { PORTFOLIO_GITHUB_REPOSITORY_URL } from '~constants/index';

import { useElementGeometry } from '~hooks/use-element-geometry';

import { Button } from '~ui/atoms/button';
import { Card } from '~ui/atoms/card';
import { Copyrights } from '~ui/atoms/copyrights';
import { CoffeeEmoji, PixelArtHeartEmoji } from '~ui/atoms/emojis';
import { Typography } from '~ui/atoms/typography';
import { HeartButton } from '~ui/molecules/buttons/heart-button';
import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeadline } from '~ui/molecules/section/section-headline';
import { Logo } from '~ui/widgets/logo';

/* -------------------------------------------------------------------------------------------------
 * SectionFooter
 * -----------------------------------------------------------------------------------------------*/

const INITIAL_BACKGROUND_SIZE = 48;
// The background shape is a circle. In a circle, the diagonal is equivalent to its diameter.
const INITIAL_BACKGROUND_DIAGONAL = INITIAL_BACKGROUND_SIZE;

const MIN_FOOTER_CONTENT_HEIGHT_VH = 80;

const SectionFooter = ({ children }: PropsWithChildren) => {
  const [heartPhase, setHeartPhase] = useState<'last' | number>('last');

  const cardContainerRef = useRef<HTMLDivElement>(null);

  const backgroundContainerRef = useRef<HTMLDivElement>(null);
  const backgroundGeometry = useElementGeometry(backgroundContainerRef);

  const backgroundHeight = backgroundGeometry?.height ?? 0;
  const backgroundWidth = backgroundGeometry?.width ?? 0;
  const halfOfBackgroundHeight = backgroundHeight / 2;

  const cardDiagonal = Math.sqrt(
    Math.pow(backgroundHeight, 2) + Math.pow(backgroundWidth, 2)
  );
  const finalScaleToFillCard = cardDiagonal / INITIAL_BACKGROUND_DIAGONAL;

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start 0.5', `${MIN_FOOTER_CONTENT_HEIGHT_VH / 2}vh 60vh`],
  });
  const scrollYProgressSpring = useSpring(scrollYProgress, {
    bounce: 0,
  }) as MotionValue<number>;

  const scale = useTransform(
    scrollYProgressSpring,
    [0, 0.5, 1],
    [0.2, 1, finalScaleToFillCard]
  );
  const y = useTransform(
    scrollYProgressSpring,
    [0, 1],
    [-halfOfBackgroundHeight + INITIAL_BACKGROUND_SIZE, 0]
  );
  const opacity = useTransform(
    scale,
    [finalScaleToFillCard / 2, finalScaleToFillCard],
    [0, 1]
  );

  return (
    <SectionContainer className='pb-8'>
      <Card ref={cardContainerRef} className='relative w-full'>
        <div
          ref={backgroundContainerRef}
          className='absolute inset-0 m-4 flex items-center justify-center overflow-hidden rounded-xl sm:m-6'
        >
          <motion.div
            style={{
              y,
              scale,
              height: INITIAL_BACKGROUND_SIZE,
              width: INITIAL_BACKGROUND_SIZE,
            }}
            className='rounded-full bg-ctx-primary-inverse'
          />
        </div>

        <motion.footer
          style={{ opacity, minHeight: `${MIN_FOOTER_CONTENT_HEIGHT_VH}vh` }}
          className='relative z-10 flex w-full flex-col overflow-hidden rounded-xl p-12'
        >
          <div className='flex flex-1 flex-col items-center justify-center gap-y-24'>
            {children}

            <OpenSourceHeadline />

            <ArtistsHeadline />
          </div>

          <div className='flex w-full justify-between'>
            <Logo variant='light' />

            <Button inverse asChild>
              <Link href='/#contact'>Get in touch</Link>
            </Button>
          </div>
        </motion.footer>
      </Card>

      <div className='mt-8 flex flex-col items-center justify-center'>
        <div className='flex gap-x-1'>
          <Typography variant='body-sm'>Made with</Typography>
          <HeartButton
            size='xs'
            onClick={(phase: number, phasesLength: number) =>
              setHeartPhase((phase + 1) % phasesLength)
            }
            phase={heartPhase}
          />
          <Typography variant='body-sm'>
            and a lot of <CoffeeEmoji className='w-5' />
          </Typography>
        </div>

        <Copyrights />
      </div>
    </SectionContainer>
  );
};

SectionFooter.displayName = 'SectionFooter';

/* -------------------------------------------------------------------------------------------------
 * OpenSourceHeadline
 * -----------------------------------------------------------------------------------------------*/

const OpenSourceHeadline = () => (
  <SectionHeadline className='pb-0' inverse>
    <span className='text-foreground-primary'>
      This site is built on top of{' '}
    </span>
    Next.js, using React, Typescript, Shadcn/UI, Framer-Motion, and more &#8212;{' '}
    <Button
      className='inline whitespace-break-spaces text-base'
      variant='link'
      size='inline'
      inverse
    >
      <Link href={PORTFOLIO_GITHUB_REPOSITORY_URL}>
        check the source-code on GitHub!
      </Link>
    </Button>
  </SectionHeadline>
);

OpenSourceHeadline.displayName = 'OpenSourceHeadline';

/* -------------------------------------------------------------------------------------------------
 * ArtistsHeadline
 * -----------------------------------------------------------------------------------------------*/

const artists = [
  {
    name: 'Berlioz',
    href: 'https://open.spotify.com/artist/3k3RY7kR8f0vp8Cq27P141?si=C-r3P0bdTSOA4PS4SalrxA',
  },
  {
    name: 'Sir Chloe',
    href: 'https://open.spotify.com/artist/6rniTPs9zN26kYnkPdFl1U',
  },
  {
    name: 'Mother Mother',
    href: 'https://open.spotify.com/artist/0e86yPdC41PGRkLp2Q1Bph',
  },
  {
    name: 'Prometh',
    href: 'https://open.spotify.com/artist/6saU4WOQFf2JMuZZHNVqWX',
  },
  {
    name: 'Flume',
    href: 'https://open.spotify.com/artist/6nxWCVXbOlEVRexSbLsTer',
  },
  {
    name: '83FM by Steez',
    href: 'https://open.spotify.com/playlist/1nQnvsp6fqgdQyerSMtFGQ?si=bb69bac8bcfc41e5',
  },
];

/* -----------------------------------------------------------------------------------------------*/

const ArtistsHeadline = () => (
  <SectionHeadline className='pb-0' inverse>
    Thanks to{' '}
    {artists.map(({ name, href }, index) => (
      <span key={href}>
        {index === artists.length - 1 && ' and '}

        <Button
          className='inline text-base'
          variant='link'
          size='inline'
          asChild
          inverse
        >
          <Link href={href}>{name}</Link>
        </Button>

        {index < artists.length - 1 && ', '}
      </span>
    ))}{' '}
    for keeping my headphones busy while working on it.
  </SectionHeadline>
);

ArtistsHeadline.displayName = 'ArtistsHeadline';

/* -----------------------------------------------------------------------------------------------*/

export { SectionFooter };
