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

interface FlatContentNode {
  date: Date;
  slug: string;
  path: string;
  title: string;
  type: ContentNode['type'];
  depth: number;
}

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
    if (!slug.length) {
      return null;
    }
    const slugHead = slug[0];
    if (isContentFileNode(head)) {
      return head.slug === slugHead ? head : null;
    }
    if (head.slug === slugHead) {
      return head;
    }
    let res: ContentNode | null = null;
    for (const child of head.children) {
      res = traverse(child, slug.slice(1));
      if (res !== null) {
        break;
      }
    }
    return res;
  };
  return traverse(root, slug);
};

const getAllSlugs = (
  root: ContentNode,
  includeRoot = false
): { slug: string[] }[] => {
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
    if (includeRoot) {
      return [];
    }
    return [{ slug: [root.slug] }];
  }
  const slugs = root.children
    .map((child) => {
      return traverse(child, includeRoot ? [root.slug] : []).map((slug) => ({
        slug,
      }));
    })
    .flat();
  return slugs.reduce(
    (internal, { slug }) => {
      if (internal.markUniqueSlug(slug, internal._collisionSet)) {
        internal.chunks.push({ slug });
      }
      for (let i = 1; i < slug.length; ++i) {
        const chunk = slug.slice(0, -i);
        if (internal.markUniqueSlug(chunk, internal._collisionSet)) {
          internal.chunks.push({ slug: chunk });
        }
      }
      return internal;
    },
    {
      chunks: [] as { slug: string[] }[],
      _collisionSet: new Set<string>(),
      markUniqueSlug: (slug: string[], _collisionSet: Set<string>) => {
        const hash = slug.join('/');
        if (_collisionSet.has(hash)) {
          return false;
        }
        _collisionSet.add(hash);
        return true;
      },
    }
  ).chunks;
};

const toFlatten = (root: ContentNode): FlatContentNode[] => {
  const toFlatContentNode = (node: ContentNode, depth: number) => ({
    date: node.date,
    slug: node.slug,
    path: node.path,
    title: node.title,
    type: node.type,
    depth,
  });
  const traverse = (
    node: ContentNode,
    list: FlatContentNode[],
    depth = 0
  ): FlatContentNode[] => {
    list.push(toFlatContentNode(node, depth));
    if (isContentFileNode(node)) {
      return list;
    }
    node.children.forEach((child) => {
      traverse(child, list, depth + 1);
    });
    return list;
  };
  return traverse(root, []);
};

const ContentTreeAdapter = {
  toSortedTree,
  toFlatten,
  findNodeByPath,
  findNodeBySlug,
  getAllSlugs,
};

export { ContentTreeAdapter, isContentDirectoryNode, isContentFileNode };
export type { ContentDirectory, ContentFile, ContentNode, FlatContentNode };
