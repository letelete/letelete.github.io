'use client';

import { createContext, useContext, useMemo } from 'react';

import { BlogPayload } from '~lib/content/provider';
import { ImageItem } from '~lib/images/provider';

import { HomeFooter } from '~modules/home/home-footer';
import { HomeHeader } from '~modules/home/home-header';
import { AboutSection } from '~modules/home/home-sections/about-section/about-section';
import { ContactSection } from '~modules/home/home-sections/contact-section';
import { DigitalContributionsKnowledgeSharing } from '~modules/home/home-sections/digital-contributions-knowledge-sharing-section';
import { ExperienceSection } from '~modules/home/home-sections/experience-section';
import { HeroSection } from '~modules/home/home-sections/hero-section';

import { cn } from '~utils/style';

interface HomeContextProps {
  blogContent: BlogPayload;
  authorPortraits: ImageItem[];
}

const HomeContext = createContext<HomeContextProps | null>(null);

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === null) {
    throw new Error(
      'Invalid State. Tried to use HomeContext outside of the HomeContent.Provider.'
    );
  }
  return context;
};

interface HomeProps {
  blogContent: BlogPayload;
  authorPortraits: ImageItem[];
  className?: string;
}

const Home = ({ blogContent, authorPortraits, className }: HomeProps) => {
  const contextValue = useMemo(
    () => ({ blogContent, authorPortraits }),
    [authorPortraits, blogContent]
  );

  return (
    <HomeContext.Provider value={contextValue}>
      <main className={cn('min-h-screen space-y-6', className)}>
        <HomeHeader />

        <div className='w-full space-y-section-sm sm:space-y-section'>
          <HeroSection />

          <DigitalContributionsKnowledgeSharing />

          {/* <DigitalContributionsProjects /> */}

          <ExperienceSection />

          <AboutSection />

          <ContactSection />

          <HomeFooter />
        </div>
      </main>
    </HomeContext.Provider>
  );
};

export { Home, useHomeContext };
export type { HomeProps };
