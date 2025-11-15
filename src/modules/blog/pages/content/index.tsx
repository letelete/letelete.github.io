'use client';

import { MainContainer } from '~/components/ui/molecules/section/main-container';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';
import { SectionsGroupContainer } from '~/components/ui/molecules/section/sections-group-container';
import { ContentFile } from '~/lib/content/content-tree';
import { BlogContextProvider } from '~/modules/blog/blog-context';
import { BlogHeader } from '~/modules/blog/components/blog-header';
import { BlogContentArticle } from '~/modules/blog/pages/content/blog-content-article';
import { BlogExternalLinksSection } from '~/modules/blog/sections/blog-external-links-section';

import { BlogPayload } from '~lib/content/provider';

const BlogContentPage = ({
  payload,
  file,
  className,
}: {
  payload: BlogPayload;
  file: ContentFile;
  className?: string;
}) => {
  return (
    <BlogContextProvider payload={payload}>
      <MainContainer className={className}>
        <BlogHeader />

        <SectionsGroupContainer>
          <SectionContainer>
            <BlogContentArticle body={file.body} />
          </SectionContainer>
          <BlogExternalLinksSection />
        </SectionsGroupContainer>
      </MainContainer>
    </BlogContextProvider>
  );
};
BlogContentPage.displayName = 'BlogContentPage';

export { BlogContentPage };
