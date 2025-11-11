import { produce } from 'immer';
import { useMemo } from 'react';

import { useBlogContext } from '~modules/blog';
import { columns } from '~modules/blog/explorer/columns';
import { BlogExplorerDataTable } from '~modules/blog/explorer/data-table';

const BlogExplorer = ({ className }: { className?: string }) => {
  const context = useBlogContext();
  const root = useMemo(() => {
    return produce(context.payload.root, (draft) => {
      return draft;
    });
  }, [context.payload.root]);

  return (
    <BlogExplorerDataTable
      className={className}
      columns={columns}
      data={root.children}
    />
  );
};
BlogExplorer.displayName = 'BlogExplorer';

export { BlogExplorer };
