import { Row } from '@tanstack/react-table';

import { ContentNode } from '~lib/content/content-tree';

type ExplorerEntity = ContentNode;

type ExplorerEntityType = ContentNode['type'];

function parseFromRow(row: Row<ExplorerEntity>) {
  return row.original;
}

export type { ExplorerEntityType, ExplorerEntity };
export { parseFromRow };
