'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Content } from '~lib/content/provider';

import { Typography } from '~ui/atoms/typography';
import { ContentCard } from '~ui/molecules/content-card';
import { TagsList } from '~ui/organisms/tags-list';

export interface BlogItemsListProps {
  items: Content[];
}

export const BlogItemsList = ({ items }: BlogItemsListProps) => {
  const allTags = useMemo(
    () => [...new Set(items.map((content) => content.tags).flat())].sort(),
    [items]
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => setSelectedTags([]), [allTags]);

  const tagsMatchingSelected = useMemo(() => {
    if (!selectedTags.length) {
      return [...allTags];
    }

    return [
      ...new Set(
        items
          .map((content) => content.tags)
          .filter((group) => group.some((tag) => selectedTags.includes(tag)))
          .flat()
      ),
    ].sort();
  }, [allTags, items, selectedTags]);

  const filteredContent = useMemo(() => {
    if (selectedTags.length) {
      return items.filter((content) =>
        content.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    return [...items];
  }, [items, selectedTags]);

  const handleSelectedTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

  if (!items.length) {
    return <Typography className='text-center'>Coming soon!</Typography>;
  }

  return (
    <div className='flex flex-col gap-y-8'>
      <TagsList
        tagProps={{ className: 'text-base leading-6' }}
        tags={tagsMatchingSelected}
        selectedTags={selectedTags}
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
