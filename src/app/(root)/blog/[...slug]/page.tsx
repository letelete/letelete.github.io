import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ContentTreeAdapter } from '~lib/content/content-tree';
import { getBlogPayload } from '~lib/content/provider';


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

  return (
    <Suspense
      fallback={
        <div className='flex h-full w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <BlogContentReportView contentSlug={content.slug} />
      <BlogContent root={blogPayload.root} />
    </Suspense>
  );
}
