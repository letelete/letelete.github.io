import { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL, BLOG_PATH } from '~/constants';

export async function generateMetadata(_: never, parent: ResolvingMetadata) {
  const parentMetadata = (await parent) as Metadata;

  const openGraph = parentMetadata.openGraph!;
  const twitter = parentMetadata.twitter!;
  const url = `${BASE_URL}${BLOG_PATH}`;
  const title = 'Bruno Kawka | Blog';
  const description =
    "I'm a Software Engineer @ Google. I write, record, and talk about programming, UI and lifestyle.";

  return {
    ...parentMetadata,
    title,
    description,
    openGraph: {
      ...openGraph,
      url,
      title,
      description,
    },
    twitter: {
      ...twitter,
      title,
      description,
    },
  } satisfies Metadata;
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
