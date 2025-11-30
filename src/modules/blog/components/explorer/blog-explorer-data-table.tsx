'use client';

import * as React from 'react';
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { ContentNode, isContentDirectoryNode } from '~lib/content/content-tree';
import { cn } from '~utils/style';
import {
  ExpanderTableRow,
  InteractiveTableRow,
  Table,
  TableBody,
  TableCell,
  TableCellEmptyPlaceholder,
  TableHead,
  TableHeader,
  TableRow,
} from '~/modules/blog/components/explorer/blog-explorer-components';
import {
  ExplorerEntity,
  parseFromRow,
} from '~/modules/blog/components/explorer/blog-explorer-entities';
import { useBlogExplorer } from '~/modules/blog/components/explorer/blog-explorer-store';

type ExplorerData = ExplorerEntity;
type ExplorerValue = unknown;

interface BlogExplorerDataTableProps<ExplorerData, ExplorerValue> {
  columns: ColumnDef<ExplorerData, ExplorerValue>[];
  data: ExplorerData[];
}

function BlogExplorerDataTable({
  className,
  columns,
  data,
  ...rest
}: BlogExplorerDataTableProps<ExplorerData, ExplorerValue> &
  React.ComponentPropsWithoutRef<typeof Table>) {
  const router = useRouter();

  const expanded = useBlogExplorer((s) => s.expanded);
  const setExpanded = useBlogExplorer((s) => s.actions.setExpanded);
  const autoFocusId = useBlogExplorer((s) => s.autoFocusId);
  const setAutoFocusId = useBlogExplorer((s) => s.actions.setAutoFocusId);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => isContentDirectoryNode(parseFromRow(row)),
    getSubRows: (row) => (isContentDirectoryNode(row) ? row.children : []),
    state: {
      expanded: expanded,
    },
  });

  const handleInteractiveRowClick = React.useCallback(
    (row: Row<ContentNode>) => {
      setAutoFocusId(row.id);
      row.getToggleExpandedHandler()();
      const entity = parseFromRow(row);
      if (entity.type === 'file') {
        router.push(entity.path);
      }
    },
    [router, setAutoFocusId]
  );

  return (
    <Table className={cn(className)} {...rest}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          <>
            {table.getRowModel().rows.map((row) => (
              <InteractiveTableRow
                onClick={() => handleInteractiveRowClick(row)}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                autoFocus={autoFocusId === row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </InteractiveTableRow>
            ))}

            <ExpanderTableRow />
          </>
        ) : (
          <TableRow>
            <TableCellEmptyPlaceholder colSpan={columns.length}>
              No results.
            </TableCellEmptyPlaceholder>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
BlogExplorerDataTable.displayName = 'BlogExplorerDataTable';

function collectExpandedState<TExplorerData>(
  rows: readonly TExplorerData[],
  getRowId: (row: TExplorerData, index: number) => string,
  isDirectory: (row: TExplorerData) => boolean,
  getChildren: (row: TExplorerData) => readonly TExplorerData[] | null,
  parentId?: string
): Record<string, boolean> {
  return rows.reduce<Record<string, boolean>>((acc, row, index) => {
    const currentId = getRowId(row, index);
    const rowId = parentId ? `${parentId}.${currentId}` : currentId;

    if (!isDirectory(row)) {
      return acc;
    }

    const children = getChildren(row) ?? [];

    return {
      ...acc,
      [rowId]: true,
      ...collectExpandedState<TExplorerData>(
        children,
        getRowId,
        isDirectory,
        getChildren,
        rowId
      ),
    };
  }, {});
}

export { BlogExplorerDataTable, collectExpandedState };
