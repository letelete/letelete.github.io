'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ComponentPropsWithoutRef } from 'react';

import { Icon, IconName } from '~ui/atoms/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~ui/atoms/table';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

interface BlogExplorerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function BlogExplorerDataTable<TData, TValue>({
  columns,
  data,
}: BlogExplorerDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='overflow-hidden rounded-md border'>
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
              <TableRow
                className='border-none'
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
BlogExplorerDataTable.displayName = 'BlogExplorerDataTable';

const BlogExplorerFile = ({
  className,
  iconName = 'file',
  ...rest
}: ComponentPropsWithoutRef<typeof BlogExplorerItem>) => {
  return <BlogExplorerItem iconName={iconName} {...rest} />;
};
BlogExplorerFile.displayName = 'BlogExplorerFile';

const BlogExplorerFolder = ({
  className,
  iconName = 'folder',
  ...rest
}: ComponentPropsWithoutRef<typeof BlogExplorerItem>) => {
  return <BlogExplorerItem iconName={iconName} {...rest} />;
};
BlogExplorerFolder.displayName = 'BlogExplorerFolder';

const BlogExplorerItem = ({
  className,
  iconName,
  ...rest
}: ComponentPropsWithoutRef<'div'> & {
  iconName: IconName;
  disabled?: boolean;
}) => {
  return (
    <div
      className={cn(
        'text-ctx-secondary-fg-primary focus:bg-ctx-secondary',
        className
      )}
      {...rest}
    >
      <BlogExplorerLabel>
        <Icon name={iconName} className='text-body-sm' />
      </BlogExplorerLabel>
    </div>
  );
};
BlogExplorerItem.displayName = 'BlogExplorerItem';

const BlogExplorerLabel = ({
  className,
  children,
  disabled,
  ...rest
}: ComponentPropsWithoutRef<typeof Typography> & {
  disabled?: boolean;
}) => {
  return (
    <Typography
      variant='body-sm'
      className={cn('text-current', disabled && 'text-opacity-30', className)}
      {...rest}
    >
      {children}
    </Typography>
  );
};
BlogExplorerLabel.displayName = 'BlogExplorerLabel';

export { BlogExplorerDataTable };
