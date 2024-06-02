import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  UpdateContentViewsProps,
  updateContentViews,
} from '~api/shared/repository';

import { contentKeys } from '~services/content/_query-key-factory';

export const useUpdateContentViews = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, UpdateContentViewsProps>({
    mutationFn: (props) => updateContentViews(props),
    onSuccess: async (_, props) => {
      const queryKey = contentKeys.statistic(props.slug);

      return await queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
};
