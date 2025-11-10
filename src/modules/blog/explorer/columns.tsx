'use client';

import { Column, ColumnDef } from '@tanstack/react-table';
import { CSSProperties, ComponentPropsWithoutRef, useMemo } from 'react';

import {
  ExplorerEntity,
  ExplorerEntityType,
  formatEntityDate,
  parseFromRow,
} from '~modules/blog/explorer/entities';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const columns: ColumnDef<ExplorerEntity>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortHeaderButton column={column}>name</SortHeaderButton>
    ),

    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return (
        <EntityNameCell depth={row.depth} entityType={entity.type}>
          {entity.label}
        </EntityNameCell>
      );
    },
  },
  {
    accessorKey: 'date_modified',
    header: ({ column }) => (
      <SortHeaderButton className='w-fit text-right' column={column}>
        modified at
      </SortHeaderButton>
    ),
    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return <EntityDateCell date={formatEntityDate(entity.date)} />;
    },
  },
];

function SortHeaderButton({
  children,
  className,
  column,
  ...rest
}: ComponentPropsWithoutRef<typeof Button> & {
  column: Column<ExplorerEntity>;
}) {
  return (
    <Button
      className={cn('relative -ml-2 px-2 py-1', className)}
      size='inline'
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      {...rest}
    >
      <Typography className='text-nowrap' variant='body-sm'>
        {children}
      </Typography>
      <Icon name='arrow-up-down' className='ml-2' size={12} />
    </Button>
  );
}
SortHeaderButton.displayName = 'SortHeaderButton';

function EntityNameCell({
  children,
  entityType,
  className,
  depth = 0,
  variant = 'body-sm',
  ...rest
}: ComponentPropsWithoutRef<typeof Typography> & {
  entityType: ExplorerEntityType;
  depth?: number;
}) {
  const iconProps = useMemo<ComponentPropsWithoutRef<typeof Icon>>(() => {
    switch (entityType) {
      case 'dir':
        return { name: 'folder' };
      case 'file':
      default:
        return { name: 'file-text' };
    }
  }, [entityType]);
  return (
    <Typography
      style={
        {
          '--row-depth-pl': `${depth * 1.25}rem`,
        } as CSSProperties & { '--row-depth-pl': string }
      }
      className={cn(
        'flex max-w-full flex-1 flex-nowrap items-center gap-x-1 text-nowrap pl-[--row-depth-pl]',
        className
      )}
      variant={variant}
      {...rest}
    >
      <Icon {...iconProps} className='text-[1em]' />
      &nbsp;
      {children}
    </Typography>
  );
}
EntityNameCell.displayName = 'EntityNameCell';

function EntityDateCell({
  className,
  date,
  variant = 'body-sm',
  ...rest
}: Omit<ComponentPropsWithoutRef<typeof Typography>, 'children'> & {
  date: string;
}) {
  return (
    <Typography
      className={cn('flex-nowrap text-nowrap text-right opacity-60', className)}
      variant={variant}
      {...rest}
    >
      {date}
    </Typography>
  );
}
EntityDateCell.displayName = 'EntityDateCell';
