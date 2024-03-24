'use client';

import { createContext } from 'react';

export interface BlogContentState {
  headerHeight?: number;
}

export const BlogContext = createContext<BlogContentState>({});
