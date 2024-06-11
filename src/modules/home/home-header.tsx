'use client';

import { MotionConfig, motion } from 'framer-motion';
import Link from 'next/link';

import { BLOG_PATH } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { AppHeader } from '~ui/molecules/app-header';
import { Logo } from '~ui/widgets/logo';

/* -------------------------------------------------------------------------------------------------
 * HomeHeader
 * -----------------------------------------------------------------------------------------------*/

const MotionLink = motion(Link);

const HomeHeader = () => {
  return (
    <AppHeader innerClassName='flex gap-x-2 justify-between'>
      <Link title='Home' href={'/'}>
        <Logo />
      </Link>

      <MotionConfig transition={{ type: 'spring', duration: 0.5, bounce: 0 }}>
        <motion.nav layout='position' className='flex items-center gap-x-2'>
          <Button variant='outline' asChild>
            <MotionLink href={BLOG_PATH}>Blog</MotionLink>
          </Button>

          <Button asChild>
            <MotionLink href='#contact'>Get in touch</MotionLink>
          </Button>
        </motion.nav>
      </MotionConfig>
    </AppHeader>
  );
};

HomeHeader.displayName = 'HomeHeader';

/* -----------------------------------------------------------------------------------------------*/

export { HomeHeader };
