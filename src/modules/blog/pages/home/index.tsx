'use client';

import { SectionsGroupContainer } from '~/components/ui/molecules/section/sections-group-container';
import { BlogContextProvider } from '~/modules/blog/blog-context';
import { BlogHeader } from '~/modules/blog/pages/home/blog-header';
import { BlogExplorerSection } from '~/modules/blog/sections/blog-explorer-section';
import { BlogExternalLinksSection } from '~/modules/blog/sections/blog-external-links-section';
import { BlogHeroSection } from '~/modules/blog/sections/blog-hero-section';
import { HomeFooter } from '~/modules/home/home-footer';
import { ContactSection } from '~/modules/home/home-sections/contact-section';

import { BlogPayload } from '~lib/content/provider';

const BlogHomePage = ({ payload }: { payload: BlogPayload }) => {
  return (
    <BlogContextProvider payload={payload}>
      <BlogHeader />

      <SectionsGroupContainer>
        <BlogHeroSection />

        <BlogExplorerSection />

        <BlogExternalLinksSection />

        <ContactSection />

        <HomeFooter />
      </SectionsGroupContainer>
    </BlogContextProvider>
  );
};
BlogHomePage.displayName = 'BlogHomePage';

export { BlogHomePage };
