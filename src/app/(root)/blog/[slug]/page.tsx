import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { BlogContent } from '~features/blog/blog-content';

import { getAllContent, getContentEntry } from '~lib/content/provider';

// eslint-disable-next-line react-refresh/only-export-components
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
