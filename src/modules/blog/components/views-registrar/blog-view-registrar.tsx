'use client';

import * as React from 'react';
import { useBlogRegisterView } from '~/modules/blog/components/views-registrar/use-blog-register-view';

/**
 * Updates unique view counts for the given `slug`.
 *
 * @remarks A client-side renderer when the `useBlogRegisterView` hook cannot be used directly.
 */
const BlogViewRegistrar = React.memo(({ slug }: { slug: string }) => {
  useBlogRegisterView({ slug });

  return null;
});

BlogViewRegistrar.displayName = 'BlogContentReportView';

export { BlogViewRegistrar };
