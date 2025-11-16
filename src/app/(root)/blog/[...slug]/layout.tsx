import { Metadata, ResolvingMetadata } from 'next';
import { SidebarProvider } from '~/components/ui/atoms/sidebar';
import { MainContainer } from '~/components/ui/molecules/section/main-container';
import { BASE_URL, BLOG_PATH } from '~/constants';
import { BlogContentExplorerSidebar } from '~/modules/blog/pages/content/blog-content-explorer-sidebar';

import { ContentTreeAdapter } from '~lib/content/content-tree';
import { getBlogPayload } from '~lib/content/provider';

interface MetadataProps {
  params: { slug: string[] };
}

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
) {
  const slug = params.slug;
  const data = await getBlogPayload();
  const content = ContentTreeAdapter.findNodeBySlug(data.root, slug);

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
      url: `${BASE_URL}${BLOG_PATH}/${slug.join('/')}`,
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
  return (
    <SidebarProvider
      defaultOpen
      style={{
        '--sidebar-width': '20rem',
        '--sidebar-width-mobile': '20rem',
      }}
    >
      <BlogContentExplorerSidebar />

      <MainContainer>{children}</MainContainer>
    </SidebarProvider>
  );
}
