import { useQuery } from '@tanstack/react-query';
import {
  GetContentStatisticsProps,
  getContentStatistics,
} from 'src/app/api/shared/repository';
import { contentKeys } from 'src/services/content/_query-key-factory';

import { ContentStatistics } from '~api/contents/shared/controllers';

export const useGetContentStatistics = (props: GetContentStatisticsProps) => {
  const query = useQuery<ContentStatistics, Error>({
    queryKey: contentKeys.statistic(props.slug),
    queryFn: () => getContentStatistics(props),
  });

  return query;
};
