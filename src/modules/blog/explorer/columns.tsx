'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { CSSProperties, ComponentPropsWithoutRef, useMemo } from 'react';
import z from 'zod';

import { Icon } from '~ui/atoms/icon';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

const ExplorerEntityType = z.enum(['file', 'dir']);

export const ExplorerEntity = z.object({
  modifiedAt: z.string(),
  id: z.string(),
  path: z.string(),
  title: z.string(),
  type: ExplorerEntityType,
  depth: z.number(),
});

function parseFromRow(row: Row<z.infer<typeof ExplorerEntity>>) {
  console.log({ row });
  return ExplorerEntity.parse({
    id: row.original['id'],
    title: row.original['title'],
    path: row.original['path'],
    type: row.original['type'],
    depth: row.original['depth'],
    modifiedAt: row.original['modifiedAt'],
  } as z.infer<typeof ExplorerEntity>) as z.infer<typeof ExplorerEntity>;
}

export const columns: ColumnDef<z.infer<typeof ExplorerEntity>>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <Typography className='text-nowrap' variant='body-sm'>
        name
      </Typography>
    ),
    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return (
        <EntityNameCell depth={entity.depth} entityType={entity.type}>
          {entity.title}
        </EntityNameCell>
      );
    },
  },
  {
    accessorKey: 'date_modified',
    header: () => (
      <Typography className='text-nowrap' variant='body-sm'>
        modified at
      </Typography>
    ),
    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return <EntityDateCell date={entity.modifiedAt} />;
    },
  },
];

function EntityNameCell({
  children,
  entityType,
  className,
  depth = 0,
  variant = 'body-sm',
  ...rest
}: ComponentPropsWithoutRef<typeof Typography> & {
  entityType: z.infer<typeof ExplorerEntity>['type'];
  depth?: number;
}) {
  const iconProps = useMemo<ComponentPropsWithoutRef<typeof Icon>>(() => {
    switch (entityType) {
      case 'dir':
        return { name: 'folder' };
      case 'file':
      default:
        return { name: 'file' };
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
      className={cn('flex-0 w-fit flex-nowrap text-nowrap', className)}
      variant={variant}
      {...rest}
    >
      {date}
    </Typography>
  );
}
EntityDateCell.displayName = 'EntityDateCell';
