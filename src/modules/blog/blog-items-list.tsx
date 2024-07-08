'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';

import { Content } from '~lib/content/provider';

import { BlogItem } from '~modules/blog/blog-item';

import { FadeInMotion } from '~ui/atoms/motion';
import { fadeInMotionVariants } from '~ui/atoms/motion/lib';
import { Typography } from '~ui/atoms/typography';
import { TagItem, TagsList } from '~ui/organisms/tags-list';

/* -------------------------------------------------------------------------------------------------
 * BlogItemsList
 * -----------------------------------------------------------------------------------------------*/

interface BlogItemsListProps {
  items: Content[];
}

const BlogItemsList = ({ items }: BlogItemsListProps) => {
  if (!items.length) {
    return <Typography className='text-center'>Coming soon!</Typography>;
  }

  return (
    <ul className='flex w-full flex-col gap-y-8'>
      <AnimatePresence mode='popLayout'>
        {items.map((content) => (
          <motion.div
            className='w-full'
            key={content.slug}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layout
          >
            <BlogItem content={content} />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
};

BlogItemsList.displayName = 'BlogItemsList';

/* -------------------------------------------------------------------------------------------------
 * FilterableBlogItemsList
 * -----------------------------------------------------------------------------------------------*/

const itemToPairWithSelectedTagsPredicate = (
  itemTags: Content['tags'],
  tagsSelected: string[]
) => {
  return tagsSelected.every((tagSelected) => itemTags.includes(tagSelected));
};

const getTagsToPairWithSelected = (
  items: Content[],
  tagsSelected: string[]
) => {
  const itemsToPairWithSelected = items.filter((content) =>
    itemToPairWithSelectedTagsPredicate(content.tags, tagsSelected)
  );

  const tagsToPairWithSelected = [
    ...new Set(itemsToPairWithSelected.flatMap((content) => content.tags)),
  ].sort();

  const tagsCounter = itemsToPairWithSelected.reduce((counter, item) => {
    item.tags.forEach((tag) => {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    });

    return counter;
  }, new Map<string, number>());

  return tagsToPairWithSelected.map((tag) => ({
    value: tag,
    matchingContentCount: tagsCounter.get(tag) ?? 0,
  })) satisfies TagItem[];
};

interface FilterableBlogItemsListProps {
  items: Content[];
}

const FilterableBlogItemsList = ({ items }: FilterableBlogItemsListProps) => {
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  const tagsToPairWithSelected = useMemo(
    () => getTagsToPairWithSelected(items, tagsSelected),
    [items, tagsSelected]
  );

  const itemsFiltered = useMemo(() => {
    return items.filter((content) =>
      tagsSelected.every((tagsSelected) => content.tags.includes(tagsSelected))
    );
  }, [items, tagsSelected]);

  const handleTagsSelectedChange = useCallback((tags: string[]) => {
    setTagsSelected(tags);
  }, []);

  const itemsHiddenCount = items.length - itemsFiltered.length;

  return (
    <div className='flex flex-col gap-y-8'>
      <TagsList
        tagProps={{ className: 'text-base leading-6' }}
        tags={tagsToPairWithSelected}
        selected={tagsSelected}
        onChange={handleTagsSelectedChange}
        selectable
      />

      <BlogItemsList items={itemsFiltered} />

      <AnimatePresence mode='popLayout'>
        {itemsHiddenCount > 0 ? (
          <FadeInMotion
            className='mx-auto flex flex-col items-center gap-y-2'
            layout
            variants={{
              ...fadeInMotionVariants,
              animate: {
                ...fadeInMotionVariants.animate,
                transition: { delay: 0.25 },
              },
            }}
          >
            <Typography variant='body-sm' color='hint'>
              {itemsHiddenCount} hidden
            </Typography>
          </FadeInMotion>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

FilterableBlogItemsList.displayName = 'FilterableBlogItemsList';

/* -----------------------------------------------------------------------------------------------*/

export { BlogItemsList, FilterableBlogItemsList };
export type { BlogItemsListProps, FilterableBlogItemsListProps };
