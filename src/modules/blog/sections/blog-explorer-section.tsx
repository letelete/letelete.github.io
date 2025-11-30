'use client';

import * as React from 'react';
import { produce } from 'immer';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';
import { useBlogContext } from '~/modules/blog/blog-context';
import { BlogExplorer } from '~/modules/blog/components/explorer';
import { columns } from '~/modules/blog/components/explorer/blog-explorer-columns';
import { cn } from '~/utils/style';

const BlogExplorerSection = ({ className }: { className?: string }) => {
  const context = useBlogContext();
  const root = React.useMemo(() => {
    return produce(context.payload.root, (draft) => {
      return draft;
    });
  }, [context.payload.root]);

  return (
    <SectionContainer
      className={cn('border-t border-ctx-primary-fg-decorative', className)}
    >
      <BlogExplorer columns={columns} data={root.children} />
    </SectionContainer>
  );
};
BlogExplorerSection.displayName = 'BlogExplorerSection';

export { BlogExplorerSection };
