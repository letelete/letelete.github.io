import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { ContentTreeAdapter } from '~lib/content/content-tree';
import { getBlogPayload } from '~lib/content/provider';

import { BlogViewRegistrar } from '~modules/blog/views-registrar/blog-view-registrar';

import { Typography } from '~ui/atoms/typography';

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
      <div>
        <Typography>Title: {content.title}</Typography>
        <Typography>Slug: {JSON.stringify(slug)}</Typography>
        <hr />
        <code>
          <pre>{JSON.stringify(content, null, 4)}</pre>
        </code>
      </div>
    </Suspense>
  );
}
