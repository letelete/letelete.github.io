import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getBlogPayload } from '~lib/content/provider';

import { Blog } from '~modules/blog';
import { BlogViewRegistrar } from '~modules/blog/views-registrar/blog-view-registrar';

export default async function BlogPage() {
  const payload = await getBlogPayload();

  if (!payload.root) {
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
      <BlogViewRegistrar slug={payload.root.slug} />
      <Blog payload={payload} />
    </Suspense>
  );
}
