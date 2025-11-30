import { notFound } from 'next/navigation';
import { getBlogPayload } from '~lib/content/provider';
import { BlogViewRegistrar } from '~/modules/blog/components/views-registrar/blog-view-registrar';
import { BlogHomePage } from '~/modules/blog/pages/home';

export default async function BlogPage() {
  const payload = await getBlogPayload();

  if (!payload.root) {
    return notFound();
  }

  return (
    <>
      <BlogViewRegistrar slug={payload.root.slug} />
      <BlogHomePage payload={payload} />
    </>
  );
}
