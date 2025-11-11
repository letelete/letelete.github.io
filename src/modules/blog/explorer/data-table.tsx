'use client';

import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  KeyboardEvent,
  TdHTMLAttributes,
  ThHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';

import { ContentNode, isContentDirectoryNode } from '~lib/content/content-tree';

import { useBlogExplorerState } from '~modules/blog/explorer/data-table-model';
import { ExplorerEntity, parseFromRow } from '~modules/blog/explorer/entities';

import { cn } from '~utils/style';

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
  ComponentPropsWithoutRef<typeof Table>) {
  const router = useRouter();

  const store = useBlogExplorerState();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: store.setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => isContentDirectoryNode(parseFromRow(row)),
    getSubRows: (row) => (isContentDirectoryNode(row) ? row.children : []),
    state: {
      sorting,
      expanded: store.expanded,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  });

  const handleInteractiveRowClick = useCallback(
    (row: Row<ContentNode>) => {
      store.setAutoFocusId(row.id);
      row.getToggleExpandedHandler()();
      const entity = parseFromRow(row);
      if (entity.type === 'file') {
        router.push(entity.path);
      }
    },
    [router, store]
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
          table.getRowModel().rows.map((row) => (
            <InteractiveTableRow
              onClick={() => handleInteractiveRowClick(row)}
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              autoFocus={store.autoFocusId === row.id}
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
  );
}

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div
      data-slot='table-container'
      className='relative w-full overflow-x-auto'
    >
      <table
        ref={ref}
        className={cn(
          'relative w-full caption-bottom border-separate ',
          className
        )}
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
  <thead
    ref={ref}
    data-slot='table-header'
    className={cn(className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot='table-body'
    className={cn('divide-border divide-y', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot='table-footer'
    className={cn('bg-muted/50 font-medium', className)}
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
    data-slot='table-row'
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
  HTMLAttributes<HTMLTableRowElement> & { onClick?: VoidFunction }
>(({ className, onClick, autoFocus, ...props }, ref) => {
  const localRef = useRef<ElementRef<typeof TableRow>>(null);
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTableRowElement>) => {
      const key = e.key;
      const current = e.currentTarget;

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        const next =
          key === 'ArrowDown'
            ? current.nextElementSibling
            : current.previousElementSibling;
        if (next instanceof HTMLElement) {
          next.focus();
        }
        return;
      }

      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  useEffect(() => {
    if (autoFocus) {
      localRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <TableRow
      className={cn(
        'focus:ring-inset-0 focus:ring-offset-ctx-primary-invert active:duration-[0.05 rounded-none bg-ctx-primary transition-colors duration-[0.01s] hover:bg-ctx-secondary focus:outline-none focus:ring-1 focus:ring-ctx-primary-inverse active:bg-ctx-secondary/50',
        className
      )}
      role='button'
      aria-label='File'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      {...props}
      ref={mergeRefs([localRef, ref])}
    />
  );
});
InteractiveTableRow.displayName = 'InteractiveTableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot='table-head'
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
    data-slot='table-cell'
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
    ref={ref}
    data-slot='table-cell'
    className={cn('h-24 text-center', className)}
    {...props}
  />
));
TableCellEmptyPlaceholder.displayName = 'TableCellEmptyPlaceholder';

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot='table-caption'
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export { BlogExplorerDataTable };
