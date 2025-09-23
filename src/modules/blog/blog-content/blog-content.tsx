'use client';

import { usePathname } from 'next/navigation';

import { ContentDirectory } from '~lib/content/content-tree';

import { BlogContentExplorer } from '~modules/blog/blog-content/blog-content-explorer/blog-content-explorer';

export interface BlogContentProps {
  root: ContentDirectory;
}

export function BlogContent({ root }: BlogContentProps) {
  const pathname = usePathname();

  return <BlogContentExplorer path={pathname} root={root} />;
}
