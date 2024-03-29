import { Blog } from '~features/blog';

import { getAllContent } from '~lib/content/provider';

export default async function BlogPage() {
  const content = await getAllContent();

  return <Blog content={content} />;
}
