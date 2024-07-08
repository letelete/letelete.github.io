'use client';

import { useBlogContext } from '~modules/blog';
import { FilterableBlogItemsList } from '~modules/blog/blog-items-list';

import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';

export const AllContributionsSection = () => {
  const { contents } = useBlogContext();

  return (
    <SectionContainer>
      <SectionHeader title='All Contributions' />

      <FilterableBlogItemsList items={contents} />
    </SectionContainer>
  );
};
