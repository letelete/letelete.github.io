'use client';

import Link from 'next/link';

import { BLOG_PATH } from '~constants/index';

import { BlogLogo } from '~modules/blog/blog-logo';

import { ButtonWithVideo } from '~ui/atoms/button';
import { ThemeToggle } from '~ui/atoms/theme/theme-toggle';
import { AppHeader } from '~ui/molecules/app-header';

/* -------------------------------------------------------------------------------------------------
 * BlogHeader
 * -----------------------------------------------------------------------------------------------*/

const BlogHeader = () => {
  return (
    <AppHeader innerClassName='flex gap-x-2 justify-between'>
      <Link title='Blog' href={BLOG_PATH}>
        <BlogLogo />
      </Link>

      <nav className='flex items-center gap-x-2'>
        <ButtonWithVideo videoFileName='header-button-home' asChild>
          <Link href='/'>Portfolio</Link>
        </ButtonWithVideo>

        <ThemeToggle />
      </nav>
    </AppHeader>
  );
};

BlogHeader.displayName = 'BlogHeader';

/* -----------------------------------------------------------------------------------------------*/

export { BlogHeader };
