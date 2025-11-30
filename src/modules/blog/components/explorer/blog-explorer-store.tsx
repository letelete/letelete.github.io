'use client';

import * as React from 'react';
import { ExpandedState } from '@tanstack/react-table';
import { produce } from 'immer';
import { create, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BlogExplorerProps {
  expanded: ExpandedState;
  autoFocusId: string | null;
}

interface BlogExplorerState extends BlogExplorerProps {
  actions: {
    setAutoFocusId: (id: string) => void;
    setExpanded: (
      updater: ExpandedState | ((prev: ExpandedState) => ExpandedState)
    ) => void;
  };
}

type BlogExplorerStore = ReturnType<typeof createBlogExplorerStore>;

const createBlogExplorerStore = (initProps?: Partial<BlogExplorerProps>) => {
  const FIRST_ELEMENT_ID = '0';
  const DEFAULT_STATE: BlogExplorerProps = {
    expanded: {},
    autoFocusId: FIRST_ELEMENT_ID,
  };
  return create<BlogExplorerState>()(
    persist<BlogExplorerState>(
      (set) => ({
        ...DEFAULT_STATE,
        ...initProps,
        actions: {
          setAutoFocusId: (id) =>
            set((state) =>
              produce(state, (draft) => {
                draft.autoFocusId = id;
              })
            ),
          setExpanded: (updater) =>
            set((state) =>
              produce(state, (draft) => {
                draft.expanded =
                  typeof updater === 'function'
                    ? updater(state.expanded)
                    : updater;
              })
            ),
        },
      }),
      {
        name: 'blog-explorer-state-storage',
        storage: createJSONStorage(() => sessionStorage),
        merge: (_persistedState, currentState) => {
          const persistedState = _persistedState as Partial<BlogExplorerState>;
          return produce(currentState, (draft) => {
            draft.expanded = {
              ...(typeof persistedState.expanded === 'object'
                ? persistedState.expanded
                : {}),
              [persistedState.autoFocusId ?? '0']: true,
            };
          });
        },
      }
    )
  );
};

const BlogExplorerContext = React.createContext<BlogExplorerStore | null>(null);

type BlogExplorerProviderProps = React.PropsWithChildren<BlogExplorerProps>;

function BlogExplorerProvider({
  children,
  ...props
}: Partial<BlogExplorerProviderProps>) {
  const storeRef = React.useRef<BlogExplorerStore>(
    createBlogExplorerStore(props)
  );
  if (!storeRef.current) {
    storeRef.current = createBlogExplorerStore(props);
  }
  return (
    <BlogExplorerContext.Provider value={storeRef.current}>
      {children}
    </BlogExplorerContext.Provider>
  );
}

function useBlogExplorer<T>(selector: (state: BlogExplorerState) => T): T {
  const store = React.useContext(BlogExplorerContext);
  if (!store) {
    throw new Error('Missing BlogExplorerContext.Provider in the tree');
  }
  return useStore(store, selector);
}

export { createBlogExplorerStore, BlogExplorerProvider, useBlogExplorer };
