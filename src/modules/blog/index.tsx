'use client';

import { createContext, useContext, useMemo } from 'react';

import { BlogPayload } from '~lib/content/provider';

import { BlogContentExplorer } from '~modules/blog/blog-content-explorer';
import { BlogFooter } from '~modules/blog/blog-footer';
import { BlogHeader } from '~modules/blog/blog-header';
import { HeroSection } from '~modules/blog/blog-sections/hero-section';
import { MoreSection } from '~modules/blog/blog-sections/more-section';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Blog
 * -----------------------------------------------------------------------------------------------*/

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

/* -----------------------------------------------------------------------------------------------*/

interface BlogProps {
  payload: BlogPayload;
  className?: string;
}

const Blog = ({ payload, className }: BlogProps) => {
  const contextValue = useMemo(() => ({ payload }), [payload]);
  console.log('debug:blogPayload', payload);
  return (
    <BlogContext.Provider value={contextValue}>
      <main className={cn('min-h-screen space-y-6', className)}>
        <BlogHeader />

        <div className='w-full space-y-section-sm sm:space-y-section'>
          <HeroSection />

          <BlogContentExplorer />

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
