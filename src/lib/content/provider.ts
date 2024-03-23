import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { findRepeatingElements } from '~utils/array';

export type ContentType = 'article' | 'youtube-video' | 'talk';

export interface Content {
  type: ContentType;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  body: string;
}

const getContent = async <T extends Content>(
  dirPath: string,
  type: ContentType
): Promise<T[]> => {
  const contentPath = path.join(process.cwd(), dirPath);
  const content = await fs.readdir(contentPath);

  return Promise.all(
    content
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const filePath = `${contentPath}/${file}`;
        const [fileName] = file.split('.');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return { ...data, body: content, slug: fileName, type } as T;
      })
  );
};

const contentPaths: Record<ContentType, string> = {
  article: 'src/lib/content/articles',
  'youtube-video': 'src/lib/content/youtube-videos',
  talk: 'src/lib/content/talks',
};

export class NonUniqueSlugsError extends Error {
  constructor(nonUniqueSlugs: string[]) {
    super(
      `All content slugs must be unique. Found ${nonUniqueSlugs.length} non-unique slugs: ${nonUniqueSlugs.toString()}`
    );
    this.name = 'NonUniqueSlugsError';
  }
}
export const getAllContent = async () => {
  const content = (
    await Promise.all(
      Object.entries(contentPaths).map(([contentType, contentPath]) =>
        getContent(contentPath, contentType as ContentType)
      )
    )
  ).flat();

  const nonUniqueSlugs = findRepeatingElements(content, (entry) => entry.slug);
  if (nonUniqueSlugs.length) {
    throw new NonUniqueSlugsError(nonUniqueSlugs);
  }

  return content.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getContentEntry = async (slug: string) => {
  const content = await getAllContent();

  return content.find((content) => content.slug === slug);
};
