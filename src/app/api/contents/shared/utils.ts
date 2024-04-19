import { getAllContent } from '~lib/content/provider';

export const getContentSlugs = async () => {
  const content = await getAllContent();
  return content.map((content) => content.slug);
};

export const isSlugMatchingContent = async (slug: string) => {
  const slugs = await getContentSlugs();
  return slugs.includes(slug);
};
