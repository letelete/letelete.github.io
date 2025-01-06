'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

import { STORAGE_KEY_THEME } from '~constants/storage-keys';

import { DEFAULT_THEME } from '~ui/atoms/theme/theme-config';

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
      storageKey={STORAGE_KEY_THEME}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

export { ThemeProvider };
