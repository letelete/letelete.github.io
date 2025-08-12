import { toSortedTree } from '~lib/content/content-tree-sort';

interface ContentDirectory {
  type: 'dir';
  path: string;
  title: string;
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
  if (path.startsWith('/')) {
    throw new Error('Illegal argument formatting. Do not include prefix "/".');
  }
  const traverse = (head: ContentNode): ContentNode | null => {
    if (isContentFileNode(head)) {
      return head.path === path ? head : null;
    }
    if (head.path === path) {
      return head;
    }
    for (const child of head.children) {
      const res = traverse(child);
      if (res !== null) {
        return res;
      }
    }
    return null;
  };
  return traverse(root);
};

const findNodeBySlug = (
  root: ContentNode,
  slug: string[]
): ContentNode | null => {
  const traverse = (head: ContentNode, slug: string[]): ContentNode | null => {
    const slugHead = slug.pop();
    if (isContentFileNode(head)) {
      return head.slug === slugHead ? head : null;
    }
    if (head.slug === slugHead) {
      return head;
    }
    for (const child of head.children) {
      const res = traverse(child, [...slug]);
      if (res !== null) {
        return res;
      }
    }
    return null;
  };
  return traverse(root, slug.toReversed());
};

const getAllSlugs = (root: ContentNode): { slug: string[] }[] => {
  const traverse = (head: ContentNode, slugs: string[]): string[][] => {
    slugs.push(head.slug);
    if (isContentFileNode(head)) {
      return [slugs];
    }
    return head.children.map((child) => {
      return traverse(child, [...slugs]).flat();
    });
  };
  if (isContentFileNode(root)) {
    return [{ slug: [root.slug] }];
  }
  return root.children
    .map((child) => {
      return traverse(child, [root.slug]).map((slug) => ({ slug }));
    })
    .flat();
};

const ContentTreeAdapter = {
  toSortedTree,
  findNodeByPath,
  findNodeBySlug,
  getAllSlugs,
};

export { ContentTreeAdapter, isContentDirectoryNode, isContentFileNode };
export type { ContentDirectory, ContentFile, ContentNode };
