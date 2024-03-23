import { notFound } from 'next/navigation';
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

  return <BlogContent content={content} />;
}
