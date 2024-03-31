'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, useRef } from 'react';

import { UnicornEmoji } from '~ui/atoms/emojis';
import { Typography } from '~ui/atoms/typography';
import { AppHeader, AppHeaderProps } from '~ui/molecules/app-header';

const itemMotionVariants: Variants = {
  compact: { scale: 0.875 },
  normal: { scale: 1 },
} as const;

const itemWithColorsMotionVariants: Variants = {
  compact: { ...itemMotionVariants.compact, filter: 'grayscale(1)' },
  normal: { ...itemMotionVariants.normal, filter: 'grayscale(0)' },
} as const;

const BlogHeader = forwardRef<HTMLDivElement, AppHeaderProps>((props, ref) => {
  const playerRef = useRef<Player>(null);

  return (
    <AppHeader
      onAnimationComplete={(event) => {
        if (event === 'normal') {
          playerRef.current?.play();
        }
      }}
      className='fixed'
      innerClassName='justify-between'
      {...props}
      ref={ref}
    >
      <Link href='/blog'>
        <Typography variant='body' color='highlight' asChild>
          <motion.p variants={itemMotionVariants}>
            <span className='font-bold'> blog</span>
            .kawka.me
          </motion.p>
        </Typography>
      </Link>

      <Link href='/' className='relative'>
        <div className='absolute left-0 top-0 z-10 -translate-x-[1rem] -translate-y-[1.25rem]'>
          <Player
            ref={playerRef}
            speed={1.75}
            src='https://lottie.host/b873f2ac-a29c-405c-a67a-c4d6eec58068/dgMwBjRg72.json'
            style={{ height: '3rem', width: '3rem' }}
          />
        </div>
        <Typography
          className='relative z-20'
          variant='body'
          color='highlight'
          asChild
        >
          <motion.p variants={itemWithColorsMotionVariants}>
            <UnicornEmoji className='mr-2' />
            about me
          </motion.p>
        </Typography>
      </Link>
    </AppHeader>
  );
});

BlogHeader.displayName = 'BlogHeader';

export { BlogHeader };
