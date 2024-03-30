import {
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { ContentType } from '~lib/content/provider';

import { Button } from '~ui/atoms/button';
import { asHoverableButton } from '~ui/atoms/button/decorators';
import { TextUnderline } from '~ui/atoms/text-underline';
import { Typography } from '~ui/atoms/typography';
import {
  getKnowledgeSharingSelectableSections,
  getSelectedSegment,
  updateSegmentsWithSelected,
} from '~ui/organisms/knowledge-sharing-navigation/utils';

import { cn } from '~utils/style';

export interface SelectableSegment {
  type: ContentType;
  selected: boolean;
}

export interface NavItem {
  type: ContentType;
  selected: boolean;
  content: string;
}

export interface KnowledgeSharingNavigationProps
  extends Omit<ComponentPropsWithoutRef<'nav'>, 'onChange'> {
  scopeId: string;
  segments?: SelectableSegment[];
  initiallySelected?: ContentType;
  renderNavItemContent?: (item: NavItem) => ReactNode;
  onChange?: (segments: SelectableSegment[]) => void;
}

const [HoverableButton, hoverableProps] = asHoverableButton(Button);

/**
 * This component is uncontrolled by default. Provides state changes with `onChange` callback.
 *
 * If `segments` is provided, this component changes its behavior to controlled.
 * In controlled mode, `initiallySelected` is disabled.
 */
export const KnowledgeSharingNavigation = ({
  scopeId,
  /**
   * Ignored in controlled mode.
   */
  initiallySelected,
  segments,
  className,
  renderNavItemContent,
  onChange,
  ...rest
}: KnowledgeSharingNavigationProps) => {
  const [uncontrolledSegments, setUncontrolledSegments] = useState(
    segments ? [] : getKnowledgeSharingSelectableSections(initiallySelected)
  );

  const currentSegment = useMemo(
    () => getSelectedSegment(segments ?? uncontrolledSegments),
    [segments, uncontrolledSegments]
  );

  const handleSelectSegment = useCallback(
    (type: ContentType) => {
      {
        const handleControlledSelect = (segments: SelectableSegment[]) => {
          if (!segments) {
            throw new Error(
              'Tried to use controlled onSelect, but `segments` was not provided.'
            );
          }
          const newSegments = updateSegmentsWithSelected(segments, type);
          onChange?.(newSegments);
        };

        const handleUncontrolledSelect = () => {
          setUncontrolledSegments((segments) => {
            const newSegments = updateSegmentsWithSelected(segments, type);
            onChange?.(newSegments);
            return newSegments;
          });
        };

        if (segments) {
          handleControlledSelect(segments);
        } else {
          handleUncontrolledSelect();
        }
      }
    },
    [onChange, segments]
  );

  return (
    <nav
      className={cn('flex flex-wrap text-primary-highlighted', className)}
      {...rest}
    >
      {KNOWLEDGE_SHARING_HEADER.map(({ content, type, className }) => {
        if (!type) {
          return (
            <span key={content} className={className}>
              {content}
            </span>
          );
        }

        const selected = currentSegment?.type === type;

        return (
          <HoverableButton
            {...hoverableProps}
            key={content}
            size='inline'
            className={cn('rounded-md', className)}
            variant='ghost'
            onClick={() => handleSelectSegment(type)}
          >
            <TextUnderline scopeId={scopeId} active={selected}>
              {renderNavItemContent?.({ type, selected, content }) ?? (
                <Typography
                  className='transition-colors'
                  color={selected ? 'accent' : 'hint'}
                >
                  {content}
                </Typography>
              )}
            </TextUnderline>
          </HoverableButton>
        );
      })}
    </nav>
  );
};

const KNOWLEDGE_SHARING_HEADER: {
  content: string;
  type?: ContentType;
  className?: string;
}[] = [
  { content: 'I' },
  { content: 'write', type: 'article', className: 'ml-1.5' },
  { content: ',' },
  { content: 'record', type: 'youtube-video', className: 'ml-1.5' },
  { content: ', and' },
  { content: 'speak', type: 'talk', className: 'mx-1.5' },
  { content: 'about programming.' },
];
