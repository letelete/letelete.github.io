import { MetadataRoute } from 'next';
import { BASE_URL, BLOG_PATH } from '~/constants';

import { ContentTreeAdapter } from '~lib/content/content-tree';
import { getBlogPayload } from '~lib/content/provider';

const GOOGLE_SITEMAP_LIMIT = 50_000;

export async function generateSitemaps() {
  const data = await getBlogPayload();
  const sitemapCount = Math.ceil(data.contentSize / GOOGLE_SITEMAP_LIMIT);
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
  const payload = await getBlogPayload();

  const start = id * GOOGLE_SITEMAP_LIMIT;
  const end = start + GOOGLE_SITEMAP_LIMIT;
  const slugs = ContentTreeAdapter.getAllSlugs(payload.root);
  const slugPage = slugs.slice(start, end);

  const contentUrls = slugPage.map(
    ({ slug }) =>
      ({
        url: `${BASE_URL}${BLOG_PATH}/${slug.join('/')}`,
        lastModified: ContentTreeAdapter.findNodeBySlug(payload.root, slug)
          ?.date,
        changeFrequency: 'daily',
      }) as const
  );

  return contentUrls;
}
