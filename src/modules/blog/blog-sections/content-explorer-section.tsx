'use client';

import { BlogContentExplorer } from '~modules/blog/blog-content-explorer';

import { SectionContainer } from '~ui/molecules/section/section-container';

const ContentExplorerSection = () => {
  return (
    <SectionContainer>
      <BlogContentExplorer />
    </SectionContainer>
  );
};
ContentExplorerSection.displayName = 'BlogContentExplorerSection';

export { ContentExplorerSection };
