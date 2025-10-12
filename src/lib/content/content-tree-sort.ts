import { produce } from 'immer';

import {
  ContentDirectory,
  ContentNode,
  isContentDirectoryNode,
  isContentFileNode,
} from '~lib/content/content-tree';

type ContentCmp = (a: ContentNode, b: ContentNode) => number;

const sortCmpAsc: ContentCmp = (a, b) => {
  if (a.type === b.type) {
    const dateRank = a.date.getTime() - b.date.getTime();
    if (dateRank === 0) {
      return a.title.localeCompare(b.title);
    }
    return dateRank;
  }
  if (isContentDirectoryNode(a)) {
    return 1;
  }
  return -1;
};

const sortCmpDesc: ContentCmp = (a, b) => {
  if (a.type === b.type) {
    const dateRank = b.date.getTime() - a.date.getTime();
    if (dateRank === 0) {
      return b.title.localeCompare(a.title);
    }
    return dateRank;
  }
  if (isContentDirectoryNode(a)) {
    return 1;
  }
  return -1;
};

const contentComparators = {
  asc: (a, b) => sortCmpAsc(a, b),
  desc: (a, b) => sortCmpDesc(a, b),
} as const satisfies Record<string, ContentCmp>;

function toSortedTree(dir: ContentDirectory, type: 'asc' | 'desc' = 'asc') {
  const cmp = type === 'asc' ? contentComparators.asc : contentComparators.desc;
  const traverse = (root: ContentNode) => {
    if (isContentFileNode(root)) {
      return;
    }
    root.children.forEach((child) => traverse(child));
    root.children.sort(cmp);
  };
  return produce(dir, (draft) => {
    traverse(draft);
    return draft;
  });
}

export { toSortedTree };
export type { ContentCmp };
