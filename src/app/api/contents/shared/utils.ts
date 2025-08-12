import { getBlogPayload } from '~lib/content/provider';

export const getContentSlugs = async () => {
  const content = await getBlogPayload();
  return content.map((content) => content.slug);
};

export const isSlugMatchingContent = async (slug: string) => {
  const slugs = await getContentSlugs();
  return slugs.includes(slug);
};
