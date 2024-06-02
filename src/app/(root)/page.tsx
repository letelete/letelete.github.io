import { Suspense } from 'react';

import { getAllContent } from '~lib/content/provider';
import { getBrunoImages } from '~lib/images/provider';

import { Home } from '~modules/home';

export default async function HomePage() {
  const content = await getAllContent();
  const brunoImages = await getBrunoImages();

  return (
    <Suspense
      fallback={
        <div className='flex h-full w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <Home blogContent={content} authorPortraits={brunoImages} />
    </Suspense>
  );
}
