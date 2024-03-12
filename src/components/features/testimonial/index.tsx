import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { PORTFOLIO_GITHUB_REPOSITORY_URL } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface TestimonialProps extends ComponentPropsWithoutRef<'div'> {}

export const Testimonial = ({ className, ...rest }: TestimonialProps) => {
  return (
    <div
      className={cn('flex flex-col justify-center gap-y-24', className)}
      {...rest}
    >
      <Typography variant='body' className='text-center'>
        <span className='text-primary-highlighted'>
          {'This site is built on top of '}
        </span>
        {
          'Next.js, using React, Typescript, Shadcn/UI, Framer-Motion, and more - '
        }

        <Button
          className='inline text-base'
          variant='link'
          size='inline'
          asChild
        >
          <Link href={PORTFOLIO_GITHUB_REPOSITORY_URL}>
            check the source-code on GitHub!
          </Link>
        </Button>
      </Typography>

      <Typography className='text-center'>
        {'Thanks to '}

        {artists.map(({ name, href }, index) => (
          <span key={href}>
            {index === artists.length - 1 && ' and '}

            <Button
              className='inline text-base'
              variant='link'
              size='inline'
              asChild
            >
              <Link href={href}>{name}</Link>
            </Button>

            {index < artists.length - 1 && ', '}
          </span>
        ))}

        {' for keeping my headphones busy while working on it.'}
      </Typography>
    </div>
  );
};

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
