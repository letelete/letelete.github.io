import { Metadata, ResolvingMetadata } from 'next';
import { getAllContent } from 'src/lib/content/provider';

import { BASE_URL, BLOG_PATH } from '~constants/index';

interface MetadataProps {
  params: { slug: string };
}

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
) {
  const slug = params.slug;
  const data = await getAllContent();
  const content = data.find((content) => content.slug === slug);

  const parentMetadata = (await parent) as Metadata;

  if (!content) {
    return parentMetadata;
  }

  const openGraph = parentMetadata.openGraph!;
  const twitter = parentMetadata.twitter!;

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      ...openGraph,
      url: `${BASE_URL}${BLOG_PATH}/${slug}`,
      title: content.title,
      description: content.description,
      images: [content.thumbnail],
    },
    twitter: {
      ...twitter,
      title: content.title,
      description: content.description,
      images: [content.thumbnail],
    },
  } satisfies Metadata;
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
