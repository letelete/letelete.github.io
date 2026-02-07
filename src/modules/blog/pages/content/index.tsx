'use client';

import { BlogPayload } from '~lib/content/provider';
import { MainContainer } from '~/components/ui/molecules/section/main-container';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';
import { SectionsGroupContainer } from '~/components/ui/molecules/section/sections-group-container';
import { ContentFile } from '~/lib/content/content-tree';
import { BlogContextProvider } from '~/modules/blog/blog-context';
import { BlogContentArticle } from '~/modules/blog/pages/content/blog-content-article';
import { BlogExternalLinksSection } from '~/modules/blog/sections/blog-external-links-section';

const BlogContentPage = ({
  payload,
  file,
}: {
  payload: BlogPayload;
  file: ContentFile;
}) => {
  return (
    <MainContainer>
      <BlogContextProvider payload={payload}>
        <SectionsGroupContainer>
          <SectionContainer>
            <BlogContentArticle body={file.body} title={file.title} />
          </SectionContainer>
          <BlogExternalLinksSection />
        </SectionsGroupContainer>
      </BlogContextProvider>
    </MainContainer>
  );
};
BlogContentPage.displayName = 'BlogContentPage';

export { BlogContentPage };
