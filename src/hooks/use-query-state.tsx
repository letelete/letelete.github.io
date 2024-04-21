import { parseAsStringLiteral, useQueryState } from 'nuqs';

import { ContentType, contentTypes } from '~lib/content/provider';

export const useContentTypeQueryState = () => {
  return useQueryState<ContentType>(
    'c',
    parseAsStringLiteral(contentTypes)
      .withDefault('article')
      .withOptions({ history: 'replace' })
  );
};
