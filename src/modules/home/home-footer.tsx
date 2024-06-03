'use client';

import Link from 'next/link';

import { PORTFOLIO_GITHUB_REPOSITORY_URL } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { Card } from '~ui/atoms/card';
import { Typography } from '~ui/atoms/typography';
import { SectionHeadline } from '~ui/molecules/section/section-headline';

/* -------------------------------------------------------------------------------------------------
 * HomeFooter
 * -----------------------------------------------------------------------------------------------*/

const HomeFooter = () => {
  return (
    <Card className='layout-width-limiter layout-padding w-full'>
      <footer className='flex min-h-screen w-full flex-col items-center justify-center rounded-xl bg-ctx-accent-secondary'>
        <SectionHeadline inverse>
          <span className='text-foreground-primary'>
            {'This site is built on top of '}
          </span>
          {
            'Next.js, using React, Typescript, Shadcn/UI, Framer-Motion, and more - '
          }

          <Button
            className='inline whitespace-break-spaces text-base'
            variant='link'
            size='inline'
            asChild
            inverse
          >
            <Link href={PORTFOLIO_GITHUB_REPOSITORY_URL}>
              check the source-code on GitHub!
            </Link>
          </Button>
        </SectionHeadline>

        <SectionHeadline inverse>
          {'Thanks to '}

          {artists.map(({ name, href }, index) => (
            <span key={href}>
              {index === artists.length - 1 && ' and '}

              <Button
                className='inline text-base'
                variant='link'
                size='inline'
                inverse
                asChild
              >
                <Link href={href}>{name}</Link>
              </Button>

              {index < artists.length - 1 && ', '}
            </span>
          ))}

          {' for keeping my headphones busy while working on it.'}
        </SectionHeadline>
      </footer>
    </Card>
  );
};

HomeFooter.displayName = 'HomeFooter';

/* -----------------------------------------------------------------------------------------------*/

const artists = [
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
    name: 'Milky Chance',
    href: 'https://open.spotify.com/artist/1hzfo8twXdOegF3xireCYs',
  },
  {
    name: '83FM by Steez',
    href: 'https://open.spotify.com/playlist/1nQnvsp6fqgdQyerSMtFGQ?si=bb69bac8bcfc41e5',
  },
];

/* -----------------------------------------------------------------------------------------------*/

export { HomeFooter };
