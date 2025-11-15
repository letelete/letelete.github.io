import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { BlogViewRegistrar } from '~/modules/blog/components/views-registrar/blog-view-registrar';
import { BlogContentPage } from '~/modules/blog/pages/content';

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

  if (content.type === 'dir') {
    // TODO: once URL is state, open /blog?q=... accordingly :)
    redirect('/blog');
  }

  return (
    <Suspense
      fallback={
        <div className='flex h-full w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <BlogViewRegistrar slug={content.slug} />

      <BlogContentPage payload={blogPayload} file={content} />
    </Suspense>
  );
}
