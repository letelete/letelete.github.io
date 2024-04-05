'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import { AnimationItem } from 'lottie-web';
import Link from 'next/link';
import {
  ComponentProps,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

import { BLOG_PATH } from '~constants/index';

import { useIsMobile } from '~hooks/use-responsive';

import { Button } from '~ui/atoms/button';
import { Navbar, NavbarItem } from '~ui/atoms/navbar';
import { Navigatable, NavigatableHandler } from '~ui/atoms/navigatable';
import { Typography } from '~ui/atoms/typography';
import { AppHeader } from '~ui/molecules/app-header';
import { Footer } from '~ui/molecules/footer';

const navigationItems = [
  { id: 'hello', label: 'hello' },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
] as const satisfies NavbarItem[];

type NavigationKey = (typeof navigationItems)[number]['id'];

const headerModeForSection: Record<
  NavigationKey,
  ComponentProps<typeof AppHeader>['mode']
> = {
  hello: 'dynamic',
  about: 'dynamic',
  experience: 'compact',
  contact: 'compact',
};

export interface HomeProps {
  hero: ReactNode;
  about: ReactNode;
  experience: ReactNode;
  contact: ReactNode;
  testimonial: ReactNode;
}

export const Home = ({
  hero,
  about,
  experience,
  contact,
  testimonial,
}: HomeProps) => {
  const isMobile = useIsMobile();

  const navigatableHandler = useRef<NavigatableHandler>(null);
  const [currentNavigationSectionId, setCurrentNavigationSectionId] =
    useState<NavigationKey>('hello');

  const handleSectionInView = useCallback((sectionId: string) => {
    setCurrentNavigationSectionId(sectionId as NavigationKey);
  }, []);

  const handleSelectSection = useCallback((sectionId: string) => {
    navigatableHandler.current?.scrollTo?.(sectionId);
  }, []);

  const blogIconPlayerRef = useRef<Player>(null);
  const blogIconLottieRef = useRef<AnimationItem>();

  const handleBlogHover = useCallback(() => {
    blogIconPlayerRef.current?.setPlayerDirection(1);
    blogIconPlayerRef.current?.setPlayerSpeed(1.5);
    blogIconPlayerRef.current?.play();
  }, []);

  const handleBlogBlur = useCallback(() => {
    blogIconPlayerRef.current?.setPlayerDirection(-1);
    blogIconPlayerRef.current?.setPlayerSpeed(2);
    blogIconPlayerRef.current?.play();
  }, []);

  return (
    <main className='flex min-h-screen flex-col'>
      <AppHeader
        className='fixed'
        innerClassName='flex gap-x-2'
        mode={headerModeForSection[currentNavigationSectionId]}
      >
        <div className='flex-1 shrink-0' />

        <Navbar
          className='w-fit'
          scopeId='home-main-navigation'
          items={navigationItems}
          selectedItemId={currentNavigationSectionId}
          onSelect={handleSelectSection}
        />

        <div className='flex flex-1 justify-end'>
          <Button
            variant='ghost'
            size='inline'
            className='px-1 hover:bg-transparent'
            asChild
            onFocus={handleBlogHover}
            onMouseEnter={handleBlogHover}
            onMouseLeave={handleBlogBlur}
            onBlur={handleBlogBlur}
          >
            <Link className='relative' href={BLOG_PATH}>
              <motion.span
                variants={{
                  compact: { scale: 0.7, opacity: 0.9 },
                  normal: { scale: 1, opacity: 1 },
                }}
                transition={{ type: 'spring' }}
                className='absolute -top-5 right-3 opacity-80 sm:-top-[0.5em] sm:right-full sm:blur-none'
              >
                <Player
                  lottieRef={(ref) => (blogIconLottieRef.current = ref)}
                  ref={blogIconPlayerRef}
                  keepLastFrame
                  autoplay={isMobile}
                  src='https://lottie.host/362ebfdf-672f-4f56-998c-53254b7df086/nelFXWU6JU.json'
                  style={{ height: '2.75em', width: '2.75em' }}
                />
              </motion.span>
              <Typography color='highlight'>blog</Typography>
            </Link>
          </Button>
        </div>
      </AppHeader>

      <Navigatable
        className='z-10'
        onSectionInView={handleSectionInView}
        ref={navigatableHandler}
      >
        <Navigatable.Section sectionId={'hello' satisfies NavigationKey}>
          {hero}
        </Navigatable.Section>

        <Navigatable.Section sectionId={'about' satisfies NavigationKey}>
          {about}
        </Navigatable.Section>

        <Navigatable.Section sectionId={'experience' satisfies NavigationKey}>
          {experience}
        </Navigatable.Section>

        <Navigatable.Section sectionId={'contact' satisfies NavigationKey}>
          {contact}

          {testimonial}
        </Navigatable.Section>
      </Navigatable>

      <Footer className='mt-14' />
    </main>
  );
};
