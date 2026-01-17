import { ContentFile } from '~/lib/content/content-tree';
import { BlogExplorerFileNode } from '~/modules/blog/components/explorer/blog-explorer-file-node';
import { BlogExplorerList } from '~/modules/blog/components/explorer/blog-explorer-list';
import { cn } from '~/utils/style';

interface BlogExplorerProps {
  className?: string;
  files: ContentFile[];
}

const BlogExplorer = ({ className, files }: BlogExplorerProps) => {
  return (
    <BlogExplorerList className={cn('', className)}>
      {files.map((f) => (
        <BlogExplorerFileNode key={f.slug} file={f} />
      ))}
    </BlogExplorerList>
  );
};
BlogExplorer.displayName = 'BlogExplorer';

export { BlogExplorer };
