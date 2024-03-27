import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { Content } from 'src/lib/content/provider';

import { Typography } from '~ui/atoms/typography';
import { ContentCard } from '~ui/molecules/content-card';
import { TagsList } from '~ui/organisms/tags-list';

export interface BlogContentListProps {
  content: Content[];
}

export const BlogContentList = ({ content }: BlogContentListProps) => {
  const allTags = useMemo(
    () => [...new Set(content.map((content) => content.tags).flat())].sort(),
    [content]
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagsMatchingSelected = useMemo(() => {
    if (!selectedTags.length) {
      return [...allTags];
    }

    return [
      ...new Set(
        content
          .map((content) => content.tags)
          .filter((group) => group.some((tag) => selectedTags.includes(tag)))
          .flat()
      ),
    ].sort();
  }, [allTags, content, selectedTags]);

  const filteredContent = useMemo(() => {
    if (selectedTags.length) {
      return content.filter((content) =>
        content.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    return [...content];
  }, [content, selectedTags]);

  const handleSelectedTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  if (!content.length) {
    return <Typography className='text-center'>Coming soon!</Typography>;
  }

  return (
    <div className='flex flex-col gap-y-8'>
      <TagsList
        tagProps={{ className: 'text-base leading-6' }}
        tags={tagsMatchingSelected}
        onChange={handleSelectedTagsChange}
        selectable
      />

      <ul className='flex w-full flex-col gap-y-8'>
        <AnimatePresence mode='popLayout'>
          {filteredContent.map((content) => (
            <motion.div
              key={content.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
            >
              <ContentCard content={content} />
            </motion.div>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
