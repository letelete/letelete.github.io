'use client';

import { memo, useEffect } from 'react';

import { useUpdateContentViews } from '~services/content/use-update-content-views';

export interface BlogContentReportViewProps {
  contentSlug: string;
}

const BlogContentReportView = memo(
  ({ contentSlug }: BlogContentReportViewProps) => {
    const { mutate: markContentSeen } = useUpdateContentViews();

    useEffect(() => {
      markContentSeen({ slug: contentSlug });
    }, [contentSlug, markContentSeen]);

    return null;
  }
);

BlogContentReportView.displayName = 'BlogContentReportView';

export { BlogContentReportView };
