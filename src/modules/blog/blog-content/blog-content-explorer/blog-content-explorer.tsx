import Image from 'next/image';
import { useMemo } from 'react';

import {
  ContentDirectory,
  ContentTreeAdapter,
  isContentFileNode,
} from '~lib/content/content-tree';

const BlogContentExplorer = ({
  path,
  root,
}: {
  className?: string;
  path: string;
  root: ContentDirectory;
}) => {
  const node = useMemo(
    () => ContentTreeAdapter.findNodeByPath(root, path),
    [path]
  );

  if (node === null) {
    console.warn(`Node not found for path: ${path}`);
    return null;
  }

  if (isContentFileNode(node)) {
    return (
      <div>
        <h1>This is a page</h1>
        <h2>{node.title}</h2>
        <p>{node.description}</p>
        <Image width={300} height={300} src={node.thumbnail} alt='' />
      </div>
    );
  }

  return (
    <ul>
      {node.children.map((child) => (
        <li key={child.path}>
          <h3>{child.title}</h3>
          <p>{child.path}</p>
          <p>Modified at {child.date.toString()}</p>
          <p>{child.description}</p>
        </li>
      ))}
    </ul>
  );
};
BlogContentExplorer.displayName = 'BlogContentExplorer';

export { BlogContentExplorer };
