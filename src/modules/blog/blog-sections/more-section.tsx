'use client';

import {
  InlinePlatformRedirectGitHub,
  InlinePlatformRedirectReddit,
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
      <SectionHeader
        title='More'
        subtitle="I'm chronically online (• ◡•) You can find me around."
      />

      <SectionHeadline>
        <span>
          You can see more of my work on <InlinePlatformRedirectTwitter />, more
          of my code on <InlinePlatformRedirectGitHub />.
        </span>
        <span className='mt-4 block sm:mt-0 sm:inline'>
          I also help humans on <InlinePlatformRedirectStackOverflow />, and
          participate in discussions on <InlinePlatformRedirectReddit />
        </span>
      </SectionHeadline>
    </SectionContainer>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { MoreSection };
