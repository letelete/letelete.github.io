import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BlogViewRegistrar } from '~/modules/blog/components/views-registrar/blog-view-registrar';
import { BlogHomePage } from '~/modules/blog/pages/home';

import { getBlogPayload } from '~lib/content/provider';

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
      <BlogHomePage payload={payload} />
    </Suspense>
  );
}
