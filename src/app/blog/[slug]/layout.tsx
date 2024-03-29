import { ResolvingMetadata } from 'next';
import { getAllContent } from 'src/lib/content/provider';

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

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images ?? [];
  const previousTwitter = parentMetadata.twitter;
  const previousTwitterImages = previousTwitter?.images ?? [];

  return {
    title: content?.title,
    description: content?.description,
    openGraph: {
      images: [content?.thumbnail, ...previousImages],
    },
    twitter: {
      ...(previousTwitter ?? {}),
      images: [content?.thumbnail, ...previousTwitterImages],
    },
  };
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
