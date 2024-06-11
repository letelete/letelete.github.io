import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getAllContent, getContentEntry } from '~lib/content/provider';

import { BlogContent } from '~modules/blog/blog-content/blog-content';
import { BlogContentReportView } from '~modules/blog/blog-content/blog-content-report-view';

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
      <BlogContentReportView contentSlug={content.slug} />

      <BlogContent content={content} />
    </Suspense>
  );
}
