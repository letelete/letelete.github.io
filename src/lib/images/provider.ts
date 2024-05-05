import fs from 'fs/promises';
import path from 'path';

const getImages = async (dirPath: string, extNames?: string[]) => {
  const contentPath = path.join(process.cwd(), '/public', dirPath);
  const content = await fs.readdir(contentPath);

  return content
    .filter((file) => !extNames || extNames.includes(path.extname(file)))
    .map((file) => `${dirPath}/${file}`);
};

export const getAboutMeImages = async () => {
  return await getImages(`/galleries/about-me`, ['.webp']);
};
