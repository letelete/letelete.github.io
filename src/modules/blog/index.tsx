'use client';

import { createContext, useContext, useMemo } from 'react';

import { Content } from '~lib/content/provider';

import { BlogFooter } from '~modules/blog/blog-footer';
import { BlogHeader } from '~modules/blog/blog-header';
import { AllContributionsSection } from '~modules/blog/blog-sections/all-contributions-section';
import { HeroSection } from '~modules/blog/blog-sections/hero-section';
import { HighlightedContributionsSection } from '~modules/blog/blog-sections/highlighted-contributions-section';
import { MoreSection } from '~modules/blog/blog-sections/more-section';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Blog
 * -----------------------------------------------------------------------------------------------*/

interface BlogContextProps {
  contents: Content[];
  highlightedContents: Content[];
}

const BlogContext = createContext<BlogContextProps>({
  contents: [],
  highlightedContents: [],
});

const useBlogContext = () => {
  const context = useContext(BlogContext);

  return context;
};

/* -----------------------------------------------------------------------------------------------*/

interface BlogProps {
  contents: Content[];
  highlightedContents: Content[];
  className?: string;
}

const Blog = ({ contents, highlightedContents, className }: BlogProps) => {
  const contextValue = useMemo(
    () => ({ contents, highlightedContents }),
    [contents, highlightedContents]
  );

  return (
    <BlogContext.Provider value={contextValue}>
      <main className={cn('min-h-screen space-y-6', className)}>
        <BlogHeader />

        <div className='w-full space-y-section-sm sm:space-y-section'>
          <HeroSection />

          <HighlightedContributionsSection />

          <AllContributionsSection />

          <MoreSection />
        </div>

        <BlogFooter />
      </main>
    </BlogContext.Provider>
  );
};

Blog.displayName = 'Blog';

/* -----------------------------------------------------------------------------------------------*/

export { Blog, useBlogContext };
export type { BlogProps };
