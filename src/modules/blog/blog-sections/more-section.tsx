'use client';

import {
  InlinePlatformRedirectGitHub,
  InlinePlatformRedirectStackOverflow,
  InlinePlatformRedirectTwitter,
} from '~ui/molecules/inline-platform-redirect-with-icon';
import { SectionContainer } from '~ui/molecules/section/section-container';
import { SectionHeader } from '~ui/molecules/section/section-header';
import { SectionHeadline } from '~ui/molecules/section/section-headline';

/* -------------------------------------------------------------------------------------------------
 * MoreSection
 * -----------------------------------------------------------------------------------------------*/

const MoreSection = () => {
  return (
    <SectionContainer>
      <SectionHeader title='More' />

      <SectionHeadline>
        You can see more of my work on <InlinePlatformRedirectTwitter />, more
        of my code on <InlinePlatformRedirectGitHub />, and the rest of my
        contributions on <InlinePlatformRedirectStackOverflow />
      </SectionHeadline>
    </SectionContainer>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { MoreSection };
