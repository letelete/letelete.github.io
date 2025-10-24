'use client';

import { ExpandedState } from '@tanstack/react-table';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  expanded: ExpandedState;
  autoFocusId: string;
  setAutoFocusId: (id: string) => void;
  setExpanded: (
    updater: ExpandedState | ((prev: ExpandedState) => ExpandedState)
  ) => void;
}

const useBlogExplorerState = create<State>()(
  persist<State>(
    (set) => ({
      expanded: { '0': true },
      autoFocusId: '0',
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
              typeof updater === 'function' ? updater(state.expanded) : updater;
          })
        ),
    }),
    {
      name: 'blog-explorer-state-storage',
      storage: createJSONStorage(() => sessionStorage),
      merge: (_persistedState, currentState) => {
        const persistedState = _persistedState as Partial<State>;
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

export { useBlogExplorerState };
