import { ColumnDef, Row } from '@tanstack/react-table';
import { ComponentPropsWithoutRef, useMemo } from 'react';
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
});

function parseFromRow(row: Row<z.infer<typeof ExplorerEntity>>) {
  return ExplorerEntity.parse({
    id: row.getValue('id'),
    title: row.getValue('title'),
    path: row.getValue('path'),
    type: row.getValue('type'),
  } as z.infer<typeof ExplorerEntity>) as z.infer<typeof ExplorerEntity>;
}

export const columns: ColumnDef<z.infer<typeof ExplorerEntity>>[] = [
  {
    accessorKey: 'name',
    header: 'name',
    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return (
        <EntityNameCell entityType={entity.type}>{entity.title}</EntityNameCell>
      );
    },
  },
  {
    accessorKey: 'date_modified',
    header: 'modified at',
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
  ...rest
}: ComponentPropsWithoutRef<typeof Typography> & {
  entityType: z.infer<typeof ExplorerEntity>['type'];
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
    <Typography className={cn('flex-1', className)} {...rest}>
      <Icon {...iconProps} />
      &nbsp;
      {children}
    </Typography>
  );
}
EntityNameCell.displayName = 'EntityNameCell';

function EntityDateCell({
  className,
  date,
  ...rest
}: Omit<ComponentPropsWithoutRef<typeof Typography>, 'children'> & {
  date: string;
}) {
  return (
    <Typography className={cn('', className)} {...rest}>
      {date}
    </Typography>
  );
}
EntityDateCell.displayName = 'EntityDateCell';
