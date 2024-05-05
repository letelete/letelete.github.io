'use client';

import { useContext } from 'react';

import { ConferencesHeadline } from '~features/experience/conferences-headline';
import { HistorySection } from '~features/experience/history-section';
import { InterestsSection } from '~features/experience/interests-section';
import { KnowledgeSharingSection } from '~features/experience/knowledge-sharing/knowledge-sharing-section';
import { HomeContext } from '~features/home';

export const ExperienceSection = () => {
  const { content } = useContext(HomeContext);

  return (
    <div className='relative flex min-h-screen w-full flex-col'>
      <KnowledgeSharingSection data={content} />

      <HistorySection />

      <div className='mt-96'>
        <ConferencesHeadline className='layout-width-limiter layout-padding' />
      </div>

      <div className='mt-96'>
        <InterestsSection />
      </div>
    </div>
  );
};
