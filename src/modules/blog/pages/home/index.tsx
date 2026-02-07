'use client';

import { BlogPayload } from '~lib/content/provider';
import { SectionsGroupContainer } from '~/components/ui/molecules/section/sections-group-container';
import { BlogContextProvider } from '~/modules/blog/blog-context';
import { BlogExplorerSection } from '~/modules/blog/sections/blog-explorer-section';
import { BlogExternalLinksSection } from '~/modules/blog/sections/blog-external-links-section';
import { HomeFooter } from '~/modules/home/home-footer';

const BlogHomePage = ({ payload }: { payload: BlogPayload }) => {
  return (
    <BlogContextProvider payload={payload}>
      <SectionsGroupContainer>
        <BlogExplorerSection />

        <BlogExternalLinksSection />

        <HomeFooter />
      </SectionsGroupContainer>
    </BlogContextProvider>
  );
};
BlogHomePage.displayName = 'BlogHomePage';

export { BlogHomePage };
