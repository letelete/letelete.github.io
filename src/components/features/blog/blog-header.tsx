'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

import { UnicornEmoji } from '~ui/atoms/emojis';
import { Typography } from '~ui/atoms/typography';
import { AppHeader, AppHeaderProps } from '~ui/molecules/app-header';

const BlogHeader = forwardRef<HTMLDivElement, AppHeaderProps>((props, ref) => {
  return (
    <AppHeader
      className='fixed'
      innerClassName='justify-between'
      {...props}
      ref={ref}
    >
      <Link href='/blog'>
        <Typography variant='body' color='highlight'>
          <span className='font-bold'> blog</span>
          .kawka.me
        </Typography>
      </Link>

      <Link href='/'>
        <Typography variant='body' color='highlight'>
          <UnicornEmoji className='mr-2' />
          about me
        </Typography>
      </Link>
    </AppHeader>
  );
});

BlogHeader.displayName = 'BlogHeader';

export { BlogHeader };
