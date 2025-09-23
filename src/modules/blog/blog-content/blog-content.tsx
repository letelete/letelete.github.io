'use client';

import { useIsomorphicLayoutEffect } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useBlogStore } from 'src/store/blog-store';

import {
  ContentDirectory,
  ContentTreeAdapter,
} from '~lib/content/content-tree';

import { BlogContentExplorer } from '~modules/blog/blog-content/blog-content-explorer/blog-content-explorer';

export interface BlogContentProps {
  root: ContentDirectory;
}

export function BlogContent({ root }: BlogContentProps) {
  const slugs = useMemo(
    () =>
      ContentTreeAdapter.getAllSlugs(root).map(({ slug }) => slug.join('/')),
    [root]
  );

  const setPaths = useBlogStore((state) => state.setPaths);
  const expandAll = useBlogStore((state) => state.expandAll);

  useEffect(() => {
    setPaths(slugs);
    expandAll();
  }, [slugs, setPaths, expandAll]);

  return <BlogContentExplorer root={root} />;
}
