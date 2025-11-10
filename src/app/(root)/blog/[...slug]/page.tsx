import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { SectionContainer } from '~/components/ui/molecules/section/section-container';
import { BlogExplorer } from '~/modules/blog/explorer';
import { BlogHeader } from '~/modules/blog/header/blog-header';
import { cn } from '~/utils/style';

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

      <main className={cn('min-h-screen space-y-6')}>
        <BlogHeader />
        <SectionContainer>
          <Typography>Title: {content.title}</Typography>
          <Typography>Slug: {JSON.stringify(slug)}</Typography>
        </SectionContainer>
      </main>
    </Suspense>
  );
}
