import * as React from 'react';
import { BlogPayload } from '~/lib/content/provider';

interface BlogContextState {
  payload: BlogPayload;
}

const BlogContext = React.createContext<null | BlogContextState>(null);

const useBlogContext = () => {
  const context = React.useContext(BlogContext);

  if (!context) {
    throw new Error(`\`BlogContext\` must be used within \`useBlogContext\``);
  }

  return context;
};
useBlogContext.displayName = 'useBlogContext';

const BlogContextProvider = ({
  children,
  ...props
}: React.PropsWithChildren<BlogContextState>) => {
  const contextValue = React.useMemo(() => ({ ...props }), [props]);

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};
BlogContextProvider.displayName = 'BlogContextProvider';

export type { BlogContextState };
export { useBlogContext, BlogContextProvider };
