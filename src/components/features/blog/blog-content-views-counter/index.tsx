import { useGetContentStatistics } from '~services/content/use-get-content-statistics';

import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface ContentViewsCounter {
  contentSlug: string;
  className?: string;
}

export const BlogContentViewsCounter = ({
  contentSlug,
  className,
}: ContentViewsCounter) => {
  const { data, isLoading, isError } = useGetContentStatistics({
    slug: contentSlug,
  });

  if (isLoading || isError) {
    return null;
  }

  const views = data.views;
  const label = views === 1 ? 'view' : 'views';

  return (
    <Typography className={cn(className)}>
      {data.views} {label}
    </Typography>
  );
};
