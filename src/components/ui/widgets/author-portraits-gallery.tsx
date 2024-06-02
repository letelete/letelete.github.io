import { useContext } from 'react';
import { HomeContext } from 'src/modules/home';

import { ParallaxGallery } from '~ui/organisms/parallax-gallery';

export const AuthorPortraitsGallery = () => {
  const { authorPortraits } = useContext(HomeContext);

  return <ParallaxGallery className='object-cover' items={authorPortraits} />;
};
