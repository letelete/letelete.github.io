'use client';

import { createContext, useContext, useMemo } from 'react';
import { BlogHeader } from '~/modules/blog/header/blog-header';

import { BlogPayload } from '~lib/content/provider';

import { BlogExplorer } from '~modules/blog/explorer';

import { cn } from '~utils/style';

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

const Blog = ({
  payload,
  className,
}: {
  payload: BlogPayload;
  className?: string;
}) => {
  const contextValue = useMemo(() => ({ payload }), [payload]);

  return (
    <BlogContext.Provider value={contextValue}>
      <main className={cn('min-h-screen space-y-6', className)}>
        <BlogHeader />
        <BlogExplorer />
      </main>
    </BlogContext.Provider>
  );
};

Blog.displayName = 'Blog';

export { Blog, useBlogContext };
