'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  EntityDateCell,
  EntityHeader,
  EntityNameCell,
} from '~/modules/blog/components/explorer/blog-explorer-components';
import {
  ExplorerEntity,
  formatEntityDate,
  parseFromRow,
} from '~/modules/blog/components/explorer/blog-explorer-entities';

type Column = ColumnDef<ExplorerEntity>;

const columns: Column[] = [
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
    header: () => <EntityHeader>modified at</EntityHeader>,
    cell: ({ row }) => {
      const entity = parseFromRow(row);
      return <EntityDateCell date={formatEntityDate(entity.date)} />;
    },
  },
];

const nameOnlyColumns: Column[] = [
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
];

export { columns, nameOnlyColumns };
