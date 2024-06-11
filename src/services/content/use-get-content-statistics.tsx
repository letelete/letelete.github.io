import { useQuery } from '@tanstack/react-query';

import { ContentStatistics } from '~api/contents/shared/controllers';
import {
  GetContentStatisticsProps,
  getContentStatistics,
} from '~api/shared/repository';

import { contentKeys } from '~services/content/_query-key-factory';

export const useGetContentStatistics = (props: GetContentStatisticsProps) => {
  const query = useQuery<ContentStatistics, Error>({
    queryKey: contentKeys.statistic(props.slug),
    queryFn: () => getContentStatistics(props),
  });

  return query;
};
