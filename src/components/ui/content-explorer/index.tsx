import { useMemo } from 'react';

import { IconName } from '~ui/atoms/icon';

import { cn } from '~utils/style';

interface ExplorerNode {
  id: string;
  icon: IconName;
  label: string;
  modifiedAt: string;
  slug: string;
  children: ExplorerNode[] | null;
}

interface ContentExplorerProps {
  className?: string;
  node: ExplorerNode;
  urlPath: string[];
}

// urlPath: articles blog dupa test 1
// 1. Read URL path
// 2. Split the path by local slugs
// 3. Traverse "node" until path exhausted
// 4. Render node content:
//    a) If children.length > 0 -> directory
//    b) Else -> file

const ContentExplorer = ({ node, urlPath, ...rest }: ContentExplorerProps) => {
  const nextUrlPath = useMemo(() => urlPath.slice(1), []);
  if (nextUrlPath.length > 1) {
    if (node.children === null) {
      throw new Error('Illegal State. URL Path length mismatch.');
    }
    const rootNode = node.children.find((c) => c.slug === nextUrlPath.at(0));
    if (rootNode === undefined) {
      throw new Error(
        `Illegal State. No children found for path: ${nextUrlPath.join('/')}`
      );
    }
    return <ContentExplorer {...rest} node={rootNode} />;
  }

  if (node.children !== null) {
    // return list
  }

  // return content viewer
  return <div />;
};
ContentExplorer.displayName = 'ContentExplorer';

interface ContentExplorerNodesListProps {
  className?: string;
}

const ContentExplorerNodesList = ({
  className,
}: ContentExplorerNodesListProps) => {
  return <div className={cn('', className)}></div>;
};
ContentExplorerNodesList.displayName = 'ContentExplorerNodesList';

export { ContentExplorer };
