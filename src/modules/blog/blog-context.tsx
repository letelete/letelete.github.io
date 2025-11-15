import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { BlogPayload } from '~/lib/content/provider';

interface BlogContextState {
  payload: BlogPayload;
}

const BlogContext = createContext<null | BlogContextState>(null);

const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error(`\`BlogContext\` must be used within \`useBlogContext\``);
  }

  return context;
};
useBlogContext.displayName = 'useBlogContext';

const BlogContextProvider = ({
  children,
  ...props
}: PropsWithChildren<BlogContextState>) => {
  const contextValue = useMemo(() => ({ ...props }), [props]);

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};
BlogContextProvider.displayName = 'BlogContextProvider';

export type { BlogContextState };
export { useBlogContext, BlogContextProvider };
