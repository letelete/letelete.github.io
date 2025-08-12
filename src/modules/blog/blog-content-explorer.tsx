import { cn } from '~utils/style';

interface BlogContentExplorerProps {
  className?: string;
}

const BlogContentExplorer = ({ className }: BlogContentExplorerProps) => {
  return (
    <div className={cn('', className)}>Content explorer will be there</div>
    // <ContentExplorer
    //   className={cn('', className)}
    //   router={null}
    // ></ContentExplorer>
  );
};
BlogContentExplorer.displayName = 'BlogContentExplorer';

export { BlogContentExplorer };
export type { BlogContentExplorerProps };
