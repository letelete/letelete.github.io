import { ContentType, getAllContent } from '~lib/content/provider';

import { Blog } from '~modules/blog';

const HIGHLIGHTED_CONTENT_PRIORITY = [
  'article',
  'youtube-video',
  'talk',
] as ContentType[];

export default async function BlogPage() {
  const contents = await getAllContent();
  const publishedContent = contents.filter((content) => content.published);
  const highlightedContents = publishedContent
    .sort((a, b) => {
      const aPriority = HIGHLIGHTED_CONTENT_PRIORITY.indexOf(a.type);
      const bPriority = HIGHLIGHTED_CONTENT_PRIORITY.indexOf(b.type);
      return aPriority - bPriority;
    })
    .slice(0, 3);

  return (
    <Blog
      contents={publishedContent}
      highlightedContents={highlightedContents}
    />
  );
}
