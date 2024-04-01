'use client';

import { ReactNode, useCallback, useRef, useState } from 'react';

import { Navbar, NavbarItem } from '~ui/atoms/navbar';
import { Navigatable, NavigatableHandler } from '~ui/atoms/navigatable';
import { Footer } from '~ui/molecules/footer';

const navigationItems = [
  { id: 'hello', label: 'Hello' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as NavbarItem[];

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
  const navigatableHandler = useRef<NavigatableHandler>(null);
  const [currentNavigationSectionId, setCurrentNavigationSectionId] =
    useState<NavbarItem['id']>('home');

  const handleSectionInView = useCallback((sectionId: string) => {
    setCurrentNavigationSectionId(sectionId);
  }, []);

  const handleSelectSection = useCallback((sectionId: string) => {
    navigatableHandler.current?.scrollTo?.(sectionId);
  }, []);

  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar
        scopeId='home-main-navigation'
        className='fixed left-0 right-0 top-4 z-50 mx-auto w-fit'
        items={navigationItems}
        selectedItemId={currentNavigationSectionId}
        onSelect={handleSelectSection}
      />

      <Navigatable
        className='z-10'
        onSectionInView={handleSectionInView}
        ref={navigatableHandler}
      >
        <Navigatable.Section sectionId='hello'>{hero}</Navigatable.Section>

        <Navigatable.Section sectionId='about'>{about}</Navigatable.Section>

        <Navigatable.Section sectionId='experience'>
          {experience}
        </Navigatable.Section>

        <Navigatable.Section sectionId='contact'>
          {contact}

          {testimonial}
        </Navigatable.Section>
      </Navigatable>

      <Footer className='mt-14' />
    </main>
  );
};
