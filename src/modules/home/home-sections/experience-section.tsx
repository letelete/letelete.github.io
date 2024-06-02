'use client';

import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';
import { SectionHeadline } from '~ui/molecules/section/section-headline';
import { ExperienceHistory } from '~ui/widgets/experience-history';

export const ExperienceSection = () => {
  return (
    <SectionContainer>
      <SectionHeader title='Experience' />

      <SectionHeadline>
        I was working on some awesome projects, collaborating with amazing
        people, and creating my own things. I gathered the most valuable
        experiences and listed them chronologically.
      </SectionHeadline>

      <ExperienceHistory />
    </SectionContainer>
  );
};
