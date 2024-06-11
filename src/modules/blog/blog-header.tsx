'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, useCallback, useRef } from 'react';

import { Button } from '~ui/atoms/button';
import { UnicornEmoji } from '~ui/atoms/emojis';
import { Typography } from '~ui/atoms/typography';
import { AppHeader, AppHeaderProps } from '~ui/molecules/app-header';

const MotionLink = motion(Link);

const itemWithColorsMotionVariants: Variants = {
  compact: { filter: 'grayscale(1)' },
  normal: { filter: 'grayscale(0)' },
} as const;

const BlogHeader = forwardRef<HTMLDivElement, AppHeaderProps>((props, ref) => {
  const playerRef = useRef<Player>(null);

  const handleAboutHover = useCallback(() => {
    playerRef.current?.setPlayerDirection(1);
    playerRef.current?.setPlayerSpeed(2);
    playerRef.current?.play();
  }, []);

  const handleAboutBlur = useCallback(() => {
    playerRef.current?.setPlayerDirection(-1);
    playerRef.current?.setPlayerSpeed(4);
    playerRef.current?.play();
  }, []);

  return (
    <AppHeader
      onAnimationComplete={(event) => {
        if (event === 'normal') {
          handleAboutHover();
        }
      }}
      className='fixed'
      innerClassName='justify-between'
      {...props}
      ref={ref}
    >
      <Link href='/blog'>
        <Typography variant='body'>
          <span className='font-bold'> blog</span>
          .kawka.me
        </Typography>
      </Link>

      <Button
        variant='ghost'
        size='inline'
        className='px-1 hover:bg-transparent'
        onFocus={handleAboutHover}
        onMouseEnter={handleAboutHover}
        onMouseLeave={handleAboutBlur}
        onBlur={handleAboutBlur}
        asChild
      >
        <MotionLink href='/' className='relative'>
          <div className='absolute left-0 top-0 z-10 -translate-x-[1rem] -translate-y-[1.25rem]'>
            <Player
              ref={playerRef}
              speed={1.75}
              src='https://lottie.host/b873f2ac-a29c-405c-a67a-c4d6eec58068/dgMwBjRg72.json'
              style={{ height: '3rem', width: '3rem' }}
            />
          </div>
          <Typography className='relative z-20' variant='body' asChild>
            <motion.p variants={itemWithColorsMotionVariants}>
              <UnicornEmoji className='mr-2' />
              about me
            </motion.p>
          </Typography>
        </MotionLink>
      </Button>
    </AppHeader>
  );
});

BlogHeader.displayName = 'BlogHeader';

export { BlogHeader };
