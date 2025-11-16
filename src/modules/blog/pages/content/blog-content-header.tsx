'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button, ButtonWithVideo } from '~/components/ui/atoms/button';
import { SidebarTrigger } from '~/components/ui/atoms/sidebar';
import { Typography } from '~/components/ui/atoms/typography';
import { BLOG_PATH } from '~/constants';

import { ThemeToggle } from '~ui/atoms/theme/theme-toggle';
import { AppHeader } from '~ui/molecules/app-header';
import { Logo } from '~ui/widgets/logo';

const BlogContentHeader = () => {
  return (
    <>
      <AppHeader innerClassName='flex justify-between gap-x-2'>
        <div className='flex items-center'>
          <SidebarTrigger />

          <Button className='ml-2' size='inline' variant='link' asChild>
            <Link title='Home' href={'/'}>
              <Logo />
            </Link>
          </Button>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Link href={BLOG_PATH}>
              <Typography variant='body-sm'>
                <span className='font-mono leading-none'>{'::blog'}</span>
              </Typography>
            </Link>
          </motion.div>
        </div>

        <div className='flex items-center gap-x-2'>
          <ButtonWithVideo videoFileName='header-button-home' asChild>
            <Link href={'/'}>About</Link>
          </ButtonWithVideo>

          <ThemeToggle />
        </div>
      </AppHeader>
    </>
  );
};
BlogContentHeader.displayName = 'BlogContentHeader';

export { BlogContentHeader };
