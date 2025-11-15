'use client';

import { Row } from '@tanstack/react-table';

import { ContentNode } from '~lib/content/content-tree';

import { shortDate } from '~utils/string';

type ExplorerEntity = ContentNode;

type ExplorerEntityType = ContentNode['type'];

function parseFromRow(row: Row<ExplorerEntity>) {
  return row.original;
}

function formatEntityDate(date: Date) {
  return shortDate(date);
}

export type { ExplorerEntityType, ExplorerEntity };
export { parseFromRow, formatEntityDate };
