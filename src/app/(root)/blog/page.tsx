import { Blog } from 'src/modules/blog';

import { getAllContent } from '~lib/content/provider';

export default async function BlogPage() {
  const contents = await getAllContent();

  return <Blog contents={contents} />;
}
