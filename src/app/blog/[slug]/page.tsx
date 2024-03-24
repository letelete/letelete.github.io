import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getAllContent, getContentEntry } from 'src/lib/content/provider';

import { BlogContent } from '~features/blog/blog-content';

export const generateStaticParams = async () => {
  const content = await getAllContent();

  return content.map((post) => ({ slug: post.slug }));
};

export default async function ContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const content = await getContentEntry(params.slug);

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
      <BlogContent content={content} />
    </Suspense>
  );
}
