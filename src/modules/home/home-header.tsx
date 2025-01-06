'use client';

import { MotionConfig, motion } from 'framer-motion';
import Link from 'next/link';

import { BLOG_PATH } from '~constants/index';

import { ButtonWithVideo } from '~ui/atoms/button';
import { LAYOUT_ID_HOME_LOGO } from '~ui/atoms/motion';
import { ThemeToggle } from '~ui/atoms/theme/theme-toggle';
import { AppHeader } from '~ui/molecules/app-header';
import { Logo } from '~ui/widgets/logo';

/* -------------------------------------------------------------------------------------------------
 * HomeHeader
 * -----------------------------------------------------------------------------------------------*/

const HomeHeader = () => {
  return (
    <AppHeader innerClassName='flex gap-x-2 justify-between'>
      <Link title='Home' href={'/'}>
        <Logo layoutId={LAYOUT_ID_HOME_LOGO} />
      </Link>

      <MotionConfig transition={{ type: 'spring', duration: 0.5, bounce: 0 }}>
        <motion.nav layout='position' className='flex items-center gap-x-2'>
          <ButtonWithVideo
            whenVideo={{ inverse: true }}
            variant='outline'
            asChild
            videoFileName='header-button-home'
          >
            <Link href={BLOG_PATH}>Blog</Link>
          </ButtonWithVideo>

          <ButtonWithVideo videoFileName='header-button-home' asChild>
            <Link href='#contact'>Get in touch</Link>
          </ButtonWithVideo>

          <ThemeToggle />
        </motion.nav>
      </MotionConfig>
    </AppHeader>
  );
};

HomeHeader.displayName = 'HomeHeader';

/* -----------------------------------------------------------------------------------------------*/

export { HomeHeader };
