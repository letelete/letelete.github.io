import { useBlogStore } from 'src/store/blog-store';

import { ContentDirectory } from '~lib/content/content-tree';

const BlogContentExplorer = ({
  root,
}: {
  className?: string;
  root: ContentDirectory;
}) => {
  return null;
  // const expand = useBlogStore((state) => state.expand);
  // const expandAll = useBlogStore((state) => state.expandAll);
  // const collapse = useBlogStore((state) => state.collapse);
  // const collapseAll = useBlogStore((state) => state.collapseAll);

  // if (root === null) {
  //   console.warn(`Node not found for path: ${path}`);
  //   return null;
  // }

  // return (
  //   <ul>
  //     {node.children.map((child) => (
  //       <li key={child.path}>
  //         <h3>{child.title}</h3>
  //         <p>{child.path}</p>
  //         <p>Modified at {child.date.toString()}</p>
  //         <p>{child.description}</p>
  //       </li>
  //     ))}
  //   </ul>
  // );
};
BlogContentExplorer.displayName = 'BlogContentExplorer';

export { BlogContentExplorer };
