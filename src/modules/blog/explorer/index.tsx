import { produce } from 'immer';
import { useMemo } from 'react';

import { useBlogContext } from '~modules/blog';
import { columns } from '~modules/blog/explorer/columns';
import { BlogExplorerDataTable } from '~modules/blog/explorer/data-table';

import { SectionContainer } from '~ui/molecules/section/section-container';

import { cn } from '~utils/style';

const BlogExplorer = ({ className }: { className?: string }) => {
  const context = useBlogContext();
  const root = useMemo(() => {
    return produce(context.payload.root, (draft) => {
      return draft;
    });
  }, [context.payload.root]);

  return (
    <SectionContainer className={cn(className)}>
      <BlogExplorerDataTable columns={columns} data={root.children} />
    </SectionContainer>
  );
};
BlogExplorer.displayName = 'BlogExplorer';

export { BlogExplorer };
