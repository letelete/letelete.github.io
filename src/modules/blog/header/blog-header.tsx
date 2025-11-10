'use client';

import { MotionConfig, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ForMobile, ForNonMobile } from '~/components/ui/atoms/responsive';
import { BlogBreadcrumbs } from '~/modules/blog/header/blog-breadcrumbs';

import { LAYOUT_ID_HOME_LOGO } from '~ui/atoms/motion';
import { ThemeToggle } from '~ui/atoms/theme/theme-toggle';
import { AppHeader } from '~ui/molecules/app-header';
import { Logo } from '~ui/widgets/logo';

const BlogHeader = () => {
  const pathname = usePathname();
  const path = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

  return (
    <>
      <AppHeader mode='compact' innerClassName='gap-x-4'>
        <Link title='Home' href={'/'}>
          <Logo width={48} layoutId={LAYOUT_ID_HOME_LOGO} />
        </Link>

        <MotionConfig transition={{ type: 'spring', duration: 0.5, bounce: 0 }}>
          <motion.div
            layout='position'
            className='flex w-full items-center justify-between gap-x-2'
          >
            <ForNonMobile>
              <BlogBreadcrumbs path={path} />
            </ForNonMobile>
            <ForMobile>
              <BlogBreadcrumbs path={path} truncate={13} />
            </ForMobile>

            <ThemeToggle />
          </motion.div>
        </MotionConfig>
      </AppHeader>
    </>
  );
};
BlogHeader.displayName = 'BlogHeader';

export { BlogHeader };
