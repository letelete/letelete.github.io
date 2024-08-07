import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, useCallback } from 'react';

import { Button } from '~ui/atoms/button';
import { FadeInMotion } from '~ui/atoms/motion';
import { Tag, TagProps } from '~ui/atoms/tag';

import { cn } from '~utils/style';

export interface TagItem {
  value: string;
  matchingContentCount?: number;
}

type TagItemOrTagValue = TagItem | TagItem['value'];

const isTagItem = (tag: TagItemOrTagValue): tag is TagItem => {
  return typeof tag === 'object' && 'value' in tag;
};

export interface TagsListProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, 'onChange'> {
  tags: TagItemOrTagValue[];
  selected?: TagItem['value'][];
  selectable?: boolean;
  className?: string;
  tagProps?: Partial<TagProps>;
  onChange?: (selectedTags: string[]) => void;
}

export const TagsList = ({
  tags,
  selectable,
  selected = [],
  className,
  tagProps,
  onChange,
  ...rest
}: TagsListProps) => {
  const handleClearAll = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  const toggleSelected = useCallback(
    (tag: string) => {
      const newSelectedTags = new Set(selected);

      if (newSelectedTags.has(tag)) {
        newSelectedTags.delete(tag);
      } else {
        newSelectedTags.add(tag);
      }

      onChange?.([...newSelectedTags]);
    },
    [onChange, selected]
  );

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode='popLayout'>
        {selected.length && (
          <FadeInMotion
            layout
            className='absolute bottom-[calc(100%+0.5rem)] left-0'
          >
            <Button
              className='text-xs text-ctx-accent-secondary'
              size='inline'
              variant='link'
              onClick={handleClearAll}
            >
              clear selection ({selected.length})
            </Button>
          </FadeInMotion>
        )}
      </AnimatePresence>

      <ul className='flex flex-wrap gap-2' {...rest}>
        <AnimatePresence mode='popLayout' initial={false}>
          {tags.map((tag: TagItem | TagItem['value']) => {
            const value = isTagItem(tag) ? tag.value : tag;
            const count = isTagItem(tag) ? tag.matchingContentCount : undefined;

            return (
              <motion.li
                layout={selectable}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                key={value}
              >
                <Tag
                  selectable={selectable}
                  label={value}
                  count={count}
                  onClick={() => toggleSelected(value)}
                  selected={selectable && selected.includes(value)}
                  {...tagProps}
                />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
};
