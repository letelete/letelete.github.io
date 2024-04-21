const storage = localStorage;

export enum Key {
  blogCategory = 'blog:category',
  blogTags = 'blog:tags',
}

export interface TypedStorage extends Storage {
  getItem(key: Key): string | null;
  setItem(key: Key, value: string): void;
  removeItem(key: Key): void;
  key(index: number): Key | null;
}

/**
 * A simple wrapper for localStorage that provides types.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 */
export const typedLocalStorage: TypedStorage = {
  ...storage,
  getItem(key: Key) {
    return storage.getItem(key);
  },
  setItem(key: Key, value: string) {
    return storage.setItem(key, value);
  },
  removeItem(key: Key) {
    return storage.removeItem(key);
  },
  key(index: number) {
    const key = storage.key(index);
    if (key === null) {
      return null;
    }
    return key as Key;
  },
};
