'use client';

import { useCallback, useRef, useState } from 'react';

import { AboutSection } from '~features/home/about-section';
import { ContactSection } from '~features/home/contact-section';
import { ExperienceSection } from '~features/home/experience-section';
import { HeroSection } from '~features/home/hero-section';
import { TestimonialSection } from '~features/home/testimonial-section';

import { Navbar, NavbarItem } from '~ui/atoms/navbar';
import { Navigatable, NavigatableHandler } from '~ui/atoms/navigatable';
import { Footer } from '~ui/molecules/footer';

const navigationItems = [
  { id: 'hello', label: 'Hello' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as NavbarItem[];

export default function Home() {
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
        <Navigatable.Section sectionId='hello'>
          <HeroSection />
        </Navigatable.Section>

        <Navigatable.Section sectionId='about'>
          <AboutSection />
        </Navigatable.Section>

        <Navigatable.Section sectionId='experience'>
          <ExperienceSection />
        </Navigatable.Section>

        <Navigatable.Section sectionId='contact'>
          <ContactSection />

          <TestimonialSection />
        </Navigatable.Section>
      </Navigatable>

      <Footer className='mt-14' />
    </main>
  );
}