import { Suspense } from 'react';

import { getAllContent } from '~lib/content/provider';
import { getAuthorPortraitImages } from '~lib/images/provider';

import { Home } from '~modules/home';

import { Intro } from '~ui/widgets/intro';

import { cn } from '~utils/style';

export default async function HomePage() {
  const content = await getAllContent();
  const authorPortraits = await getAuthorPortraitImages();

  return (
    <div className={cn('relative flex flex-col')}>
      <Suspense
        fallback={
          <div className='relative z-0 flex h-full w-full items-center justify-center'>
            Loading...
          </div>
        }
      >
        <Home
          className='relative z-0'
          blogContent={content}
          authorPortraits={authorPortraits}
        />
      </Suspense>

      <Intro className='z-10' />
    </div>
  );
}
