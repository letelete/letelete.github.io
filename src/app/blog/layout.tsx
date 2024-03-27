'use client';

import { useMemo, useRef } from 'react';
import { BlogContext } from 'src/app/blog/blog-context';

import { BlogHeader } from '~features/blog/blog-header';

import { useElementGeometry } from '~hooks/use-element-geometry';

import { Footer } from '~ui/molecules/footer';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogHeaderRef = useRef<HTMLDivElement>(null);
  const blogHeaderGeometry = useElementGeometry(blogHeaderRef);
  const blogHeaderHeight = blogHeaderGeometry?.height;

  const context = useMemo(
    () => ({
      headerHeight: blogHeaderHeight,
    }),
    [blogHeaderHeight]
  );

  return (
    <>
      <BlogHeader />

      <BlogContext.Provider value={context}>
        <main className='flex h-full  w-full flex-col'>{children}</main>
      </BlogContext.Provider>
    </>
  );
}
