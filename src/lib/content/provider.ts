import { Dirent } from 'fs';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';

import {
  ContentDirectory,
  ContentFile,
  ContentTreeAdapter,
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
  const nameSegments = ent.name.split('.');
  if (nameSegments.length > 2) {
    throw new Error(
      "Invalid State. Name segment length cannot exceed 2. Check if your files don't contain additional dots in the filename (e.g. a.b.c.txt), as this is currently not supported."
    );
  }
  const [nameWithoutExt] = ent.name.split('.');
  if (!nameWithoutExt) {
    throw new Error('Entity name is empty.');
  }
  return nameWithoutExt;
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
      description: meta.description,
      thumbnail: meta.thumbnail,
      slug: getEntitySlug(ent),
      date: meta.date,
      tags: meta.tags,
      body: content.trim(),
      published: meta.published,
    } satisfies ContentFile;
  };

  const getDirectoryNode = async (ent: Dirent, _path: string) => {
    // TODO(letelete): Replace generic data with relevant information about the directory.
    const root = {
      type: 'dir',
      path: _path,
      title: "Bruno Kawka's Blog",
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
      const entPath = `${_path}/${ent.name}`;
      if (ent.isFile()) {
        const fileNode = await getFileNode(ent, entPath);
        _head.children.push(fileNode);
      } else if (ent.isDirectory()) {
        const dirNode = await getDirectoryNode(ent, entPath);
        await buildContentTree(dirNode, entPath);
        _head.children.push(dirNode);
      }
    }
  };

  const _path = '/blog';
  const root = {
    type: 'dir',
    path: _path,
    title: "Bruno Kawka's Blog",
    description: 'Software Engineering and some more.',
    // TODO(letelete): Provide relevant thumbnail
    thumbnail: '/content/talks/sfi-2023/thumbnail.webp',
    slug: 'blog',
    date: new Date(),
    children: [],
  } satisfies ContentDirectory;
  await buildContentTree(root, _path);
  return root;
};

export const getBlogPayload = async (): Promise<BlogPayload> => {
  const root = await getContentTree();
  const contentSize = ContentTreeAdapter.getAllSlugs(root).length;
  return {
    root,
    contentSize,
    highlight: [],
  };
};
