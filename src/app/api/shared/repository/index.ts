import { ContentStatistics } from '~api/contents/shared/controllers';
import { apiFetch } from '~api/shared/repository/utils';

export interface GetContentStatisticsProps {
  slug: string;
}
export const getContentStatistics = async (
  props: GetContentStatisticsProps
) => {
  const data = await apiFetch<ContentStatistics>(`/contents/${props.slug}`);

  return data;
};

export interface UpdateContentViewsProps {
  slug: string;
}
export const updateContentViews = async (props: GetContentStatisticsProps) => {
  const data = await apiFetch<void>(`/contents/${props.slug}/views`, {
    method: 'POST',
  });

  return data;
};

export interface UpdateContentLikesProps {
  slug: string;
  likesAmount: number;
}
export const updateContentLikes = async (props: UpdateContentLikesProps) => {
  const data = await apiFetch<void>(`/contents/${props.slug}/likes`, {
    method: 'POST',
    body: JSON.stringify({ value: props.likesAmount }),
  });

  return data;
};
