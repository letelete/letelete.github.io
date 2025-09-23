import { getBlogPayload } from '~lib/content/provider';

import { Blog } from '~modules/blog';

export function generateStaticParams() {

}

export default async function BlogPage() {
  const payload = await getBlogPayload();

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

  return <Blog payload={payload} />;
}
