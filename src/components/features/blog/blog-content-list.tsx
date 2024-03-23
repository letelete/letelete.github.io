import { Content } from 'src/lib/content/provider';

import { Typography } from '~ui/atoms/typography';

export interface BlogContentListProps {
  content: Content[];
}

export const BlogContentList = ({ content }: BlogContentListProps) => {
  if (!content.length) {
    return <Typography className='text-center'>Coming soon!</Typography>;
  }

  return (
    <div>
      {content.map((content) => (
        <article key={content.slug}>
          <a href={`/blog/${content.slug}`}>
            <p>{content.date}</p>
            <h1>{content.title}</h1>
            <p>{content.tags}</p>
          </a>
        </article>
      ))}
    </div>
  );
};
