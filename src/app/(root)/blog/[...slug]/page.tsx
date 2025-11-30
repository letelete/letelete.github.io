import { notFound, redirect } from 'next/navigation';
import { ContentTreeAdapter } from '~lib/content/content-tree';
import { getBlogPayload } from '~lib/content/provider';
import { BlogContentPage } from '~/modules/blog/pages/content';

export async function generateStaticParams() {
  const content = await getBlogPayload();

  return ContentTreeAdapter.getAllSlugs(content.root);
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const blogPayload = await getBlogPayload();
  const { slug } = await params;

  const content = ContentTreeAdapter.findNodeBySlug(blogPayload.root, [
    'blog',
    ...slug,
  ]);

  if (!content) {
    return notFound();
  }

  if (content.type === 'dir') {
    redirect('/blog');
  }

  return <BlogContentPage payload={blogPayload} file={content} />;
}
