import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, useCallback } from 'react';

import { Button } from '~ui/atoms/button';
import { FadeInMotion } from '~ui/atoms/motion';
import { Tag, TagProps } from '~ui/atoms/tag';

import { cn } from '~utils/style';

export interface TagsListProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, 'onChange'> {
  tags: string[];
  selectedTags?: string[];
  selectable?: boolean;
  className?: string;
  tagProps?: Partial<TagProps>;
  onChange?: (selectedTags: string[]) => void;
}

export const TagsList = ({
  tags,
  selectable,
  selectedTags = [],
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
      const newSelectedTags = new Set(selectedTags);

      if (newSelectedTags.has(tag)) {
        newSelectedTags.delete(tag);
      } else {
        newSelectedTags.add(tag);
      }

      onChange?.([...newSelectedTags]);
    },
    [onChange, selectedTags]
  );

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode='popLayout'>
        {selectedTags.length && (
          <FadeInMotion
            layout
            className='absolute bottom-[calc(100%+0.5rem)] left-0'
          >
            <Button
              className='text-accent text-xs'
              size='inline'
              variant='link'
              onClick={handleClearAll}
            >
              clear selection ({selectedTags.length})
            </Button>
          </FadeInMotion>
        )}
      </AnimatePresence>

      <ul className='flex flex-wrap gap-2' {...rest}>
        <AnimatePresence mode='popLayout' initial={false}>
          {tags.map((tag) => (
            <motion.li
              layout={selectable}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={tag}
            >
              <Tag
                selectable={selectable}
                label={tag}
                onClick={() => toggleSelected(tag)}
                selected={selectable && selectedTags.includes(tag)}
                {...tagProps}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
