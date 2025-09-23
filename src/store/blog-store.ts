import { produce } from 'immer';
import { create } from 'zustand';

interface BlogState {
  paths: Set<string>;
  expanded: Set<string>;
  setPaths: (ids: string[]) => void;
  expand: (id: string[]) => void;
  expandAll: () => void;
  collapse: (id: string[]) => void;
  collapseAll: () => void;
}

const useBlogStore = create<BlogState>((set) => ({
  paths: new Set<string>(),
  expanded: new Set<string>(),
  setPaths: (ids) =>
    set((state) =>
      produce(state, (draft) => {
        draft.paths = new Set(ids);
        draft.expanded = new Set(
          [...state.expanded].filter((id) => draft.paths.has(id))
        );
      })
    ),
  expand: (ids) =>
    set((state) =>
      produce(state, (draft) => {
        ids.forEach((i) => draft.expanded.add(i));
      })
    ),
  expandAll: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.paths.forEach((i) => draft.expanded.add(i));
      })
    ),
  collapse: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.paths.forEach((i) => draft.expanded.delete(i));
      })
    ),
  collapseAll: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.paths.forEach((i) => draft.expanded.delete(i));
      })
    ),
}));

export { useBlogStore };
