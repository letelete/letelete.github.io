import fs from 'fs/promises';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import path from 'path';

export interface ImageItem {
  src: string | StaticImport;
  alt: string;
}

const getImages = async (
  dirPath: string,
  extNames?: string[],
  getAlt?: (fileName: string, index: number) => string
): Promise<ImageItem[]> => {
  const contentPath = path.join(process.cwd(), '/public', dirPath);
  const content = await fs.readdir(contentPath);

  return content
    .filter(
      (fileName) => !extNames || extNames.includes(path.extname(fileName))
    )
    .map((fileName, index) => ({
      src: `${dirPath}/${fileName}`,
      alt: getAlt?.(fileName, index) ?? '',
    }));
};

export const getBrunoImages = async () => {
  return await getImages(`/galleries/about-me`, ['.webp']);
};
