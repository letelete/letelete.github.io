'use client';

import { useBlogContext } from '~modules/blog';
import { BlogContentExplorer } from '~modules/blog/blog-content/blog-content-explorer/blog-content-explorer';

import { SectionContainer } from '~ui/molecules/section/section-container';

const ContentExplorerSection = () => {
  const ctx = useBlogContext();
  return (
    <SectionContainer>
      <BlogContentExplorer root={ctx.payload.root} path='/blog' />
    </SectionContainer>
  );
};
ContentExplorerSection.displayName = 'BlogContentExplorerSection';

export { ContentExplorerSection };
