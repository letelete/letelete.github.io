import { AnimatePresence } from 'framer-motion';
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
    setSelectedTags(new Set());
  }, []);

  const toggleSelected = useCallback(
    (tag: string) => {
      setSelectedTags((currentlySelectedTags) => {
        if (currentlySelectedTags.has(tag)) {
          currentlySelectedTags.delete(tag);
        } else {
          currentlySelectedTags.add(tag);
        }

        onChange?.([...currentlySelectedTags]);

        return new Set(currentlySelectedTags);
      });
    },
    [onChange]
  );

  return (
    <div className={cn('relative', selectable && 'pb-8')}>
      <ul className={cn('flex flex-wrap gap-2', className)} {...rest}>
        {tags.map((tag) => (
          <li key={tag}>
            <Tag
              selectable={selectable}
              label={tag}
              onClick={() => toggleSelected(tag)}
              selected={selectable && selectedTags.has(tag)}
              {...tagProps}
            />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedTags.size && (
          <FadeInMotion className='absolute bottom-0 left-0'>
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
    </div>
  );
};
