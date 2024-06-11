import { getAllContent } from '~lib/content/provider';

import { Blog } from '~modules/blog';

export default async function BlogPage() {
  const contents = await getAllContent();

  return <Blog contents={contents} />;
}
