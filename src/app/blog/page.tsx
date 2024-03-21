import { BlogTwoPaneContainer } from '~features/blog/blog-two-pane-container';

import { Typography } from '~ui/atoms/typography';

export default function Blog() {
  const content = <div>content</div>;

  return (
    <BlogTwoPaneContainer
      leading={
        <Typography variant='hero'>
          I believe knowledge sharing is a fundamental method to pursue
          expertise in a given field. I write, record, and speak about
          programming.
        </Typography>
      }
      trailing={content}
    />
  );
}
