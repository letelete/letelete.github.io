'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '~ui/atoms/theme/theme-provider';
import { SSRQueryClientProvider } from '~/app/api/shared/query-client/provider';
import '~/styles/global.css';

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SSRQueryClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SSRQueryClientProvider>
  );
}
AppProviders.displayName = 'AppProviders';

export { AppProviders };
