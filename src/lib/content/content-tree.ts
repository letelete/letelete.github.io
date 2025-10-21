import { headers } from 'next/headers';

import { toSortedTree } from '~lib/content/content-tree-sort';

interface ContentDirectory {
  type: 'dir';
  path: string;
  title: string;
  label: string;
  description: string;
  thumbnail: string;
  slug: string;
  date: Date;
  children: (ContentDirectory | ContentFile)[];
}

interface ContentFile {
  type: 'file';
  path: string;
  title: string;
  label: string;
  description: string;
  thumbnail: string;
  slug: string;
  date: Date;
  tags: string[];
  body: string;
  published: boolean;
}

type ContentNode = ContentDirectory | ContentFile;

const isContentDirectoryNode = (
  node: ContentNode
): node is ContentDirectory => {
  return node.type === 'dir';
};

const isContentFileNode = (node: ContentNode): node is ContentFile => {
  return node.type === 'file';
};

const findNodeByPath = (
  root: ContentNode,
  path: string
): ContentNode | null => {
  if (isContentFileNode(root)) {
    return root.path === path ? root : null;
  }
  let res: ContentNode | null = null;
  for (const child of root.children) {
    res = findNodeByPath(child, path);
    if (res !== null) {
      break;
    }
  }
  return res;
};

const findNodeBySlug = (
  root: ContentNode,
  slug: string[]
): ContentNode | null => {
  if (slug.length <= 1) {
    return root.slug === slug[0] ? root : null;
  }
  if (isContentFileNode(root)) {
    return null;
  }
  let res: ContentNode | null = null;
  for (const child of root.children) {
    res = findNodeBySlug(child, slug.slice(1));
    if (res !== null) {
      break;
    }
  }
  return res;
};

const getAllSlugs = (
  root: ContentNode,
  includeRoot = false
): { slug: string[] }[] => {
  if (isContentFileNode(root)) {
    return includeRoot ? [] : [{ slug: [root.slug] }];
  }

  const HASH_DELIMITER = '/';
  const encode = (slug: string[]) => slug.join(HASH_DELIMITER);
  const decode = (hash: string) => hash.split(HASH_DELIMITER);
  const uniqueSlugs = new Set<string>();

  const t = (root: ContentNode, slug: string[]) => {
    if (slug.length > 0) {
      uniqueSlugs.add(encode(slug));
    }
    if (isContentDirectoryNode(root)) {
      root.children.forEach((child) => t(child, [...slug, child.slug]));
    }
  };

  t(root, includeRoot ? [root.slug] : []);
  return [...uniqueSlugs].map((hash) => ({ slug: decode(hash) }));
};

const ContentTreeAdapter = {
  toSortedTree,
  findNodeByPath,
  findNodeBySlug,
  getAllSlugs,
};

export { ContentTreeAdapter, isContentDirectoryNode, isContentFileNode };
export type { ContentDirectory, ContentFile, ContentNode };
