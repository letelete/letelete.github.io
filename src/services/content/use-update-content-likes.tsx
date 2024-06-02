import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  UpdateContentLikesProps,
  updateContentLikes,
} from '~api/shared/repository';

import { contentKeys } from '~services/content/_query-key-factory';

export const useUpdateContentLikes = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, UpdateContentLikesProps>({
    mutationFn: (props) => updateContentLikes(props),
    onSuccess: async (_, props) => {
      const queryKey = contentKeys.statistic(props.slug);

      return await queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
};
