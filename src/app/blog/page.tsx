import { getAllContent } from 'src/lib/content/provider';

import { Blog } from '~features/blog';

export const NAVBAR_SCOPE_ID = 'blog-navigation';

export default async function BlogPage() {
  const content = await getAllContent();

  return <Blog content={content} />;
}
