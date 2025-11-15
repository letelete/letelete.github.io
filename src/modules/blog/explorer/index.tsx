'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  ContentNode,
  isContentDirectoryNode,
} from '~/lib/content/content-tree';
import {
  BlogExplorerDataTable,
  collectExpandedState,
} from '~/modules/blog/explorer/blog-explorer-data-table';
import { ExplorerEntity } from '~/modules/blog/explorer/blog-explorer-entities';
import { BlogExplorerProvider } from '~/modules/blog/explorer/blog-explorer-store';

interface BlogExplorerProps {
  className?: string;
  data: ContentNode[];
  columns: ColumnDef<ExplorerEntity>[];
}

const BlogExplorer = ({ className, data, columns }: BlogExplorerProps) => {
  const initialExpandedState = useMemo(
    () =>
      collectExpandedState(
        data,
        (_, index) => index.toString(),
        (row) => isContentDirectoryNode(row),
        (row) => (isContentDirectoryNode(row) ? row.children : null)
      ),
    [data]
  );

  return (
    <BlogExplorerProvider expanded={initialExpandedState}>
      <BlogExplorerDataTable
        className={className}
        columns={columns}
        data={data}
      />
    </BlogExplorerProvider>
  );
};
BlogExplorer.displayName = 'BlogExplorer';

export { BlogExplorer };
