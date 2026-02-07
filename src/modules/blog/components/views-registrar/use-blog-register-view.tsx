'use client';

import * as React from 'react';
import { useUpdateContentViews } from '~services/content/use-update-content-views';

/**
 * Updates unique view counts for the given `slug`.
 */
const useBlogRegisterView = ({ slug }: { slug: string }) => {
  const { mutate: markContentSeen } = useUpdateContentViews();

  React.useEffect(() => {
    markContentSeen({ slug });
  }, [slug, markContentSeen]);

  return null;
};

useBlogRegisterView.displayName = 'useBlogRegisterView';

export { useBlogRegisterView };
