import { useContext } from 'react';

import { HomeContext } from '~features/home';

import { ParallaxGallery } from '~ui/organisms/parallax-gallery';

export const BrunoParallaxGallery = () => {
  const { brunoImages } = useContext(HomeContext);

  return <ParallaxGallery className='object-cover' items={brunoImages} />;
};
