'use client';

import { MainContainer } from '~/components/ui/molecules/section/main-container';
import { SectionsGroupContainer } from '~/components/ui/molecules/section/sections-group-container';
import { BlogContextProvider } from '~/modules/blog/blog-context';
import { BlogHeader } from '~/modules/blog/components/blog-header';
import { BlogExplorerSection } from '~/modules/blog/sections/blog-explorer-section';
import { BlogExternalLinksSection } from '~/modules/blog/sections/blog-external-links-section';
import { BlogHeroSection } from '~/modules/blog/sections/blog-hero-section';
import { HomeFooter } from '~/modules/home/home-footer';
import { ContactSection } from '~/modules/home/home-sections/contact-section';

import { BlogPayload } from '~lib/content/provider';

const BlogHomePage = ({
  payload,
  className,
}: {
  payload: BlogPayload;
  className?: string;
}) => {
  return (
    <BlogContextProvider payload={payload}>
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
    </BlogContextProvider>
  );
};
BlogHomePage.displayName = 'BlogHomePage';

export { BlogHomePage };
