'use client';

import { useEffect } from 'react';

import { useUpdateContentViews } from '~services/content/use-update-content-views';

/**
 * Updates unique view counts for the given `slug`.
 */
const useBlogRegisterView = ({ slug }: { slug: string }) => {
  const { mutate: markContentSeen } = useUpdateContentViews();

  useEffect(() => {
    markContentSeen({ slug });
  }, [slug, markContentSeen]);

  return null;
};

useBlogRegisterView.displayName = 'useBlogRegisterView';

export { useBlogRegisterView };
