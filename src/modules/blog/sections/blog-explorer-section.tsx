'use client';

import * as React from 'react';
import { produce } from 'immer';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';
import {
  ContentFile,
  ContentNode,
  isContentFileNode,
} from '~/lib/content/content-tree';
import { useBlogContext } from '~/modules/blog/blog-context';
import { BlogExplorer } from '~/modules/blog/components/explorer';
import { cn } from '~/utils/style';

const BlogExplorerSection = ({ className }: { className?: string }) => {
  const context = useBlogContext();
  const root = React.useMemo(() => {
    return produce(context.payload.root, (draft) => {
      return draft;
    });
  }, [context.payload.root]);
  const files = React.useMemo((): ContentFile[] => {
    const toFlatten = (node: ContentNode): ContentFile[] => {
      if (isContentFileNode(node)) {
        return [node];
      }
      return node.children.map(toFlatten).flat();
    };
    return toFlatten(root);
  }, [root]);

  return (
    <SectionContainer className={cn('', className)}>
      <BlogExplorer files={files} />
    </SectionContainer>
  );
};
BlogExplorerSection.displayName = 'BlogExplorerSection';

export { BlogExplorerSection };
