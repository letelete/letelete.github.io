import { Dirent } from 'fs';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';
import {
  ContentDirectory,
  ContentFile,
  ContentTreeAdapter,
  isContentDirectoryNode,
} from '~lib/content/content-tree';

const CONTENT_BASE_PATH = 'src/lib/content/nodes';
const CONTENT_NODE_EXT_ALLOWLIST = ['.mdx'];

const MDXContentFileMetaSchema = z.object({
  title: z.string(),
  date: z.string().transform((e) => new Date(e)),
  description: z.string(),
  tags: z.array(z.string()),
  published: z.boolean(),
  thumbnail: z.string(),
});

export interface BlogPayload {
  root: ContentDirectory;
  highlight: ContentFile[];
  contentSize: number;
}

const getEntitySlug = (ent: Dirent) => {
  return ent.name.toLowerCase();
};

const getEntityLabel = (ent: Dirent) => {
  const slug = getEntitySlug(ent);
  if (ent.isDirectory()) {
    return slug;
  }
  return slug;
};

const getContentTree = async () => {
  const getFileNode = async (ent: Dirent, _path: string) => {
    if (!CONTENT_NODE_EXT_ALLOWLIST.some((ext) => ent.name.includes(ext))) {
      throw new Error(
        `Invalid State. Unsupported ContentFileNode extension: ${ent.name}`
      );
    }
    const entContent = await fs.readFile(
      path.resolve(process.cwd(), `${CONTENT_BASE_PATH}/${_path}`),
      'utf8'
    );
    const { data, content } = matter(entContent);
    const meta = MDXContentFileMetaSchema.parse(data);
    return {
      type: 'file',
      path: _path,
      title: meta.title,
      label: getEntityLabel(ent),
      description: meta.description,
      thumbnail: meta.thumbnail,
      slug: getEntitySlug(ent),
      date: meta.date,
      tags: meta.tags,
      body: content.trim(),
      published: meta.published,
    } satisfies ContentFile;
  };

  const getDirectoryNode = (ent: Dirent, _path: string) => {
    const root = {
      type: 'dir',
      path: _path,
      title: ent.name,
      label: getEntityLabel(ent),
      description: 'Software Engineering and some more.',
      thumbnail: '/content/talks/sfi-2023/thumbnail.webp',
      slug: getEntitySlug(ent),
      date: new Date(),
      children: [],
    } satisfies ContentDirectory;
    return root;
  };

  const buildContentTree = async (_head: ContentDirectory, _path: string) => {
    const dirPath = path.resolve(
      process.cwd(),
      `${CONTENT_BASE_PATH}/${_path}`
    );
    const dirEnts = await fs.readdir(dirPath, { withFileTypes: true });

    for await (const ent of dirEnts) {
      if (CONTENT_NODE_EXT_ALLOWLIST.length <= 0) {
        throw new Error('Invalid State: CONTENT_NODE_EXT_ALLOWLIST is empty.');
      }
      const entPath = `${_path}/${ent.name}`;
      if (ent.isFile()) {
        const fileNode = await getFileNode(ent, entPath);
        _head.children.push(fileNode);
      } else if (ent.isDirectory()) {
        const dirNode = getDirectoryNode(ent, entPath);
        await buildContentTree(dirNode, entPath);
        _head.children.push(dirNode);
      }
    }
  };

  const updateDirectoriesMetadata = (_root: ContentDirectory) => {
    const findLatestTime = (_head: ContentDirectory) => {
      let headLatestTime = 0;
      _head.children.forEach((node) => {
        let candidate: number;
        if (isContentDirectoryNode(node)) {
          const latestTime = findLatestTime(node);
          node.date = new Date(latestTime);
          candidate = latestTime;
        } else {
          candidate = node.date.getTime();
        }
        headLatestTime = Math.max(headLatestTime, candidate);
      });
      return headLatestTime;
    };
    _root.date = new Date(findLatestTime(_root));
  };

  const _path = '/blog';
  const root = {
    type: 'dir',
    path: _path,
    title: 'root',
    label: '~',
    description: 'Software Engineering and some more.',
    // TODO(letelete): Provide relevant thumbnail
    thumbnail: '/content/talks/sfi-2023/thumbnail.webp',
    slug: 'blog',
    date: new Date(),
    children: [],
  } satisfies ContentDirectory;
  await buildContentTree(root, _path);
  updateDirectoriesMetadata(root);
  return root;
};

export const getBlogPayload = async (): Promise<BlogPayload> => {
  const root = await getContentTree();
  const contentSize = ContentTreeAdapter.getAllSlugs(root).length;
  return {
    root: ContentTreeAdapter.toSortedTree(root, 'desc'),
    contentSize,
    highlight: [],
  };
};
