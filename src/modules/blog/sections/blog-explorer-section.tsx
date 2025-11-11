'use client';

import { produce } from 'immer';
import { useMemo } from 'react';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';
import { useBlogContext } from '~/modules/blog';
import { columns } from '~/modules/blog/explorer/columns';
import { BlogExplorerDataTable } from '~/modules/blog/explorer/data-table';
import { cn } from '~/utils/style';

const BlogExplorerSection = ({ className }: { className?: string }) => {
  const context = useBlogContext();
  const root = useMemo(() => {
    return produce(context.payload.root, (draft) => {
      return draft;
    });
  }, [context.payload.root]);

  return (
    <SectionContainer
      className={cn('border-t border-ctx-primary-fg-decorative', className)}
    >
      <BlogExplorerDataTable columns={columns} data={root.children} />
    </SectionContainer>
  );
};
BlogExplorerSection.displayName = 'BlogExplorerSection';

export { BlogExplorerSection };
