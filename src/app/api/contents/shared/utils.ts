import { ContentTreeAdapter } from '~lib/content/content-tree';
import { getBlogPayload } from '~lib/content/provider';

export const combineSlugs = (slug: string[]) => {
  return slug.join('/');
};

export const getContentSlugs = async () => {
  const content = await getBlogPayload();
  return ContentTreeAdapter.getAllSlugs(content.root).map(({ slug }) =>
    combineSlugs(slug)
  );
};

export const isSlugMatchingContent = async (slug: string) => {
  const slugs = await getContentSlugs();
  return slugs.includes(slug);
};
