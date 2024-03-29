'use client';

import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';

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
  return (
    <AppHeader
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

      <Link href='/'>
        <Typography variant='body' color='highlight' asChild>
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
