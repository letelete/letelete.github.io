'use client';

import { createContext, useContext, useMemo } from 'react';

import { Content } from '~lib/content/provider';

import { BlogFooter } from '~modules/blog/blog-footer';
import { BlogHeader } from '~modules/blog/blog-header';
import { AllContributionsSection } from '~modules/blog/blog-sections/all-contributions-section';
import { HeroSection } from '~modules/blog/blog-sections/hero-section';
import { MoreSection } from '~modules/blog/blog-sections/more-section';
import { TopWritingsSection } from '~modules/blog/blog-sections/top-writings-section';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Blog
 * -----------------------------------------------------------------------------------------------*/

interface BlogContextProps {
  contents: Content[];
}

const BlogContext = createContext<BlogContextProps>({
  contents: [],
});

const useBlogContext = () => {
  const context = useContext(BlogContext);

  return context;
};

/* -----------------------------------------------------------------------------------------------*/

interface BlogProps {
  contents: Content[];
  topWritings: Content[];
  className?: string;
}

const Blog = ({ contents, className }: BlogProps) => {
  const contextValue = useMemo(() => ({ contents }), [contents]);

  return (
    <BlogContext.Provider value={contextValue}>
      <main className={cn('min-h-screen space-y-6', className)}>
        <BlogHeader />

        <div className='w-full space-y-section-sm sm:space-y-section'>
          <HeroSection />

          <TopWritingsSection />

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
