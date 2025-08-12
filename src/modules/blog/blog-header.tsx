'use client';

import Link from 'next/link';

import { ButtonWithVideo } from '~ui/atoms/button';
import { ForMobile, ForNonMobile } from '~ui/atoms/responsive';
import { ThemeToggle } from '~ui/atoms/theme/theme-toggle';
import { AppHeader } from '~ui/molecules/app-header';
import { Logo } from '~ui/widgets/logo';

/* -------------------------------------------------------------------------------------------------
 * BlogHeader
 * -----------------------------------------------------------------------------------------------*/

const BlogHeader = () => {
  return (
    <AppHeader innerClassName='flex gap-x-2 justify-center'>
      <nav className='flex items-center gap-x-2'>
        <ButtonWithVideo videoFileName='header-button-home' asChild>
          <Link href='/'>
            <ForMobile>
              <Logo variant='light' width={20} />
            </ForMobile>
            <ForNonMobile>
              <Logo variant='light' width={40} />
            </ForNonMobile>
          </Link>
        </ButtonWithVideo>

        <ThemeToggle />
      </nav>
    </AppHeader>
  );
};

BlogHeader.displayName = 'BlogHeader';

/* -----------------------------------------------------------------------------------------------*/

export { BlogHeader };
