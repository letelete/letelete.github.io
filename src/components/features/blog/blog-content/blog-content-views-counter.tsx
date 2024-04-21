import { useGetContentStatistics } from '~services/content/use-get-content-statistics';

import { TextSkeleton } from '~ui/atoms/skeleton';
import { Typography } from '~ui/atoms/typography';

import { pluralize } from '~utils/intl';
import { cn } from '~utils/style';

export interface ContentViewsCounter {
  contentSlug: string;
  className?: string;
}

export const BlogContentViewsCounter = ({
  contentSlug,
  className,
}: ContentViewsCounter) => {
  const { data, isLoading } = useGetContentStatistics({
    slug: contentSlug,
  });

  const views = data?.views ?? 0;
  const label = pluralize(views, 'view', 'views');

  if (isLoading || !data) {
    return <TextSkeleton />;
  }

  return (
    <Typography className={cn(className)}>
      {data.views} {label}
    </Typography>
  );
};
