import { ConferencesHeadline } from '~features/experience/conferences-headline';
import { HistorySection } from '~features/experience/history-section';
import { KnowledgeSharingSection } from '~features/experience/knowledge-sharing-section';

import { StickyHeaderSection } from '~ui/atoms/sticky-header-section';
import { Typography } from '~ui/atoms/typography';

export const ExperienceSection = () => {
  return (
    <div className='relative flex min-h-screen w-full flex-col'>
      <KnowledgeSharingSection />

      <StickyHeaderSection
        header={
          <Typography className='layout-width-limiter layout-padding' asChild>
            <h2>
              {
                'I was working on some awesome projects, collaborating with amazing people, and creating my own things. '
              }
              <span className='text-primary-highlighted'>
                I gathered the most valuable experiences and listed them
                chronologically.
              </span>
            </h2>
          </Typography>
        }
        body={
          <HistorySection className='layout-width-limiter layout-padding' />
        }
        bodyClassName='mt-28'
      />

      <div className='mt-96'>
        <ConferencesHeadline className='layout-width-limiter layout-padding' />
      </div>
    </div>
  );
};
