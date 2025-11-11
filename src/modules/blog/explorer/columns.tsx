'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CSSProperties, ComponentPropsWithoutRef, useMemo } from 'react';

import {
  ExplorerEntity,
  ExplorerEntityType,
  formatEntityDate,
  parseFromRow,
} from '~modules/blog/explorer/entities';

import { Icon } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const columns: ColumnDef<ExplorerEntity>[] = [
  {
    accessorKey: 'name',
    header: () => <EntityHeader>name</EntityHeader>,
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
    header: () => <EntityHeader className='inline'>modified at</EntityHeader>,
    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return <EntityDateCell date={formatEntityDate(entity.date)} />;
    },
  },
];

function EntityHeader({
  children,
  className,
  color = 'hint',
  variant = 'body-sm',
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) {
  return (
    <Typography
      className={cn('line-clamp-1 max-w-full truncate', className)}
      color={color}
      variant={variant}
      {...rest}
    >
      {children}
    </Typography>
  );
}
EntityHeader.displayName = 'EntityHeader';

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
        'flex w-full flex-nowrap items-center gap-x-1 pl-[--row-depth-pl]',
        className
      )}
      variant={variant}
      {...rest}
    >
      <Icon {...iconProps} className='text-[1em]' />
      &nbsp;
      <span className='line-clamp-1 max-w-full truncate'>{children}</span>
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
      className={cn('whitespace-nowrap', className)}
      color='secondary'
      variant={variant}
      {...rest}
      asChild
    >
      <span>{date}</span>
    </Typography>
  );
}
EntityDateCell.displayName = 'EntityDateCell';
