import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, useCallback, useState } from 'react';

import { Button } from '~ui/atoms/button';
import { FadeInMotion } from '~ui/atoms/motion';
import { Tag, TagProps } from '~ui/atoms/tag';

import { cn } from '~utils/style';

export interface TagsListProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, 'onChange'> {
  tags: string[];
  selectable?: boolean;
  className?: string;
  tagProps?: Partial<TagProps>;
  onChange?: (selectedTags: string[]) => void;
}

export const TagsList = ({
  tags,
  selectable,
  className,
  tagProps,
  onChange,
  ...rest
}: TagsListProps) => {
  const [selectedTags, setSelectedTags] = useState(new Set<string>());

  const handleClearAll = useCallback(() => {
    const emptyTags = new Set<string>();
    setSelectedTags(emptyTags);
    onChange?.([...emptyTags]);
  }, [onChange]);

  const toggleSelected = useCallback(
    (tag: string) => {
      setSelectedTags((currentlySelectedTags) => {
        const newSelectedTags = new Set(currentlySelectedTags);

        if (newSelectedTags.has(tag)) {
          newSelectedTags.delete(tag);
        } else {
          newSelectedTags.add(tag);
        }

        onChange?.([...newSelectedTags]);

        return newSelectedTags;
      });
    },
    [onChange]
  );

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode='popLayout'>
        {selectedTags.size && (
          <FadeInMotion
            layout
            className='absolute bottom-[calc(100%+0.5rem)] left-0'
          >
            <Button
              className='text-xs text-accent'
              size='inline'
              variant='link'
              onClick={handleClearAll}
            >
              clear selection ({selectedTags.size})
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
                selected={selectable && selectedTags.has(tag)}
                {...tagProps}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
