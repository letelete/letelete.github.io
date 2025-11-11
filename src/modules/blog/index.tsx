'use client';

import { createContext, useContext, useMemo } from 'react';
import { MainContainer } from '~/components/ui/molecules/section/main-container';
import { SectionsGroupContainer } from '~/components/ui/molecules/section/sections-group-container';
import { BlogExplorerSection } from '~/modules/blog/sections/blog-explorer-section';
import { BlogExternalLinksSection } from '~/modules/blog/sections/blog-external-links-section';
import { BlogHeroSection } from '~/modules/blog/sections/blog-hero-section';
import { BlogHeader } from '~/modules/blog/header/blog-header';
import { HomeFooter } from '~/modules/home/home-footer';
import { ContactSection } from '~/modules/home/home-sections/contact-section';

import { BlogPayload } from '~lib/content/provider';

interface BlogContextProps {
  payload: BlogPayload;
}

const BlogContext = createContext<BlogContextProps | null>(null);

const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === null) {
    throw new Error(
      'Invalid State. Tried to use BlogContent outside BlogContent.Provider.'
    );
  }
  return context;
};

const Blog = ({
  payload,
  className,
}: {
  payload: BlogPayload;
  className?: string;
}) => {
  const contextValue = useMemo(() => ({ payload }), [payload]);

  return (
    <BlogContext.Provider value={contextValue}>
      <MainContainer className={className}>
        <BlogHeader />

        <SectionsGroupContainer>
          <BlogHeroSection />

          <BlogExplorerSection />

          <BlogExternalLinksSection />

          <ContactSection />

          <HomeFooter />
        </SectionsGroupContainer>
      </MainContainer>
    </BlogContext.Provider>
  );
};

Blog.displayName = 'Blog';

export { Blog, useBlogContext };
