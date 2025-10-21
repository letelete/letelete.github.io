'use client';

import {
  ColumnDef,
  ExpandedState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  forwardRef,
  useState,
} from 'react';

import { isContentDirectoryNode } from '~lib/content/content-tree';

import { ExplorerEntity, parseFromRow } from '~modules/blog/explorer/entities';

import { cn } from '~utils/style';

type ExplorerData = ExplorerEntity;
type ExplorerValue = unknown;

interface BlogExplorerDataTableProps<ExplorerData, ExplorerValue> {
  columns: ColumnDef<ExplorerData, ExplorerValue>[];
  data: ExplorerData[];
}

function BlogExplorerDataTable({
  columns,
  data,
}: BlogExplorerDataTableProps<ExplorerData, ExplorerValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => isContentDirectoryNode(parseFromRow(row)),
    getSubRows: (row) => (isContentDirectoryNode(row) ? row.children : []),
    state: {
      sorting,
      expanded,
    },
  });

  return (
    <div className='overflow-hidden rounded-md'>
      <Table>
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
            table.getRowModel().rows.map((row) => (
              <InteractiveTableRow
                onClick={row.getToggleExpandedHandler()}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </InteractiveTableRow>
            ))
          ) : (
            <TableRow>
              <TableCellEmptyPlaceholder colSpan={columns.length}>
                No results.
              </TableCellEmptyPlaceholder>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
BlogExplorerDataTable.displayName = 'BlogExplorerDataTable';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className='relative w-full overflow-auto'>
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-muted/50  font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const InteractiveTableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <TableRow className={cn(className)} {...props} ref={ref} />
));
InteractiveTableRow.displayName = 'InteractiveTableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCellEmptyPlaceholder = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <TableCell
    className={cn('h-24 text-center', className)}
    {...props}
    ref={ref}
  />
));
TableCellEmptyPlaceholder.displayName = 'TableCellEmptyPlaceholder';

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export { BlogExplorerDataTable };
