import { ContentType, contentTypes } from '~lib/content/provider';

import { SelectableSegment } from '~ui/organisms/knowledge-sharing-navigation';

export const getKnowledgeSharingSelectableSections = (
  initiallySelected?: ContentType
) => {
  return contentTypes.map((type, index) => ({
    type,
    selected: initiallySelected ? initiallySelected === type : index === 0,
  })) satisfies SelectableSegment[];
};

export const updateSegmentsWithSelected = (
  segments: SelectableSegment[],
  selected: ContentType
) => {
  return segments.map((segment) => ({
    ...segment,
    selected: segment.type === selected,
  }));
};

export const getSelectedSegment = (segments: SelectableSegment[]) => {
  return segments.find((segment) => segment.selected);
};
