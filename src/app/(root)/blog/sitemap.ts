import { MetadataRoute } from 'next';

import { BASE_URL, BLOG_PATH } from '~constants/index';

import { getAllContent } from '~lib/content/provider';

const GOOGLE_SITEMAP_LIMIT = 50_000;

export async function generateSitemaps() {
  const data = await getAllContent();
  const sitemapCount = Math.ceil(data.length / GOOGLE_SITEMAP_LIMIT);
  const sitemapIds = Array.from({ length: sitemapCount }, (_, id) => ({
    id,
  }));

  return sitemapIds;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const data = await getAllContent();

  const start = id * GOOGLE_SITEMAP_LIMIT;
  const end = start + GOOGLE_SITEMAP_LIMIT;
  const content = data.slice(start, end);

  const contentUrls = content.map(
    (content) =>
      ({
        url: `${BASE_URL}${BLOG_PATH}/${content.slug}`,
        lastModified: content.date,
        changeFrequency: 'daily',
      }) as const
  );

  return contentUrls;
}
