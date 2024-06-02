import { ComponentPropsWithoutRef } from 'react';

import { BLOG_PATH } from '~constants/index';

import { GoBackButton } from '~ui/molecules/buttons/go-back-button';

export const BlogContentGoBackButton = (
  props: Partial<ComponentPropsWithoutRef<typeof GoBackButton>>
) => {
  return <GoBackButton href={BLOG_PATH} {...props} />;
};
