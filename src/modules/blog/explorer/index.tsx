import { produce } from 'immer';
import { useMemo } from 'react';
import z from 'zod';

import { ContentTreeAdapter } from '~lib/content/content-tree';

import { useBlogContext } from '~modules/blog';
import { ExplorerEntity, columns } from '~modules/blog/explorer/columns';
import { BlogExplorerDataTable } from '~modules/blog/explorer/data-table';

import { SectionContainer } from '~ui/molecules/section/section-container';

import { dayMonthNameAndYearDate } from '~utils/string';
import { cn } from '~utils/style';

const BlogExplorer = ({ className }: { className?: string }) => {
  const context = useBlogContext();
  const root = useMemo(() => {
    return produce(context.payload.root, (draft) => {
      return draft;
    });
  }, [context.payload.root]);

  const data = useMemo(() => {
    return ContentTreeAdapter.toFlatten(root).map<
      z.infer<typeof ExplorerEntity>
    >((node) => ({
      modifiedAt: dayMonthNameAndYearDate(node.date),
      id: node.slug,
      path: node.path,
      title: node.title,
      type: node.type,
      depth: node.depth,
    }));
  }, []);
  return (
    <SectionContainer className={cn(className)}>
      <BlogExplorerDataTable columns={columns} data={data} />
    </SectionContainer>
  );
};
BlogExplorer.displayName = 'BlogExplorer';

export { BlogExplorer };
