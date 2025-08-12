import { getBlogPayload } from '~lib/content/provider';

import { Blog } from '~modules/blog';

export default async function BlogPage() {
  const payload = await getBlogPayload();

  return <Blog payload={payload} />;
}
