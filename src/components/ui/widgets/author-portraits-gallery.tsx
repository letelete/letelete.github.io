'use client';

import { ImageItem } from '~lib/images/provider';

import { ParallaxGallery } from '~ui/organisms/parallax-gallery';

/* -------------------------------------------------------------------------------------------------
 * AuthorPortraitsGallery
 * -----------------------------------------------------------------------------------------------*/

interface AuthorPortraitsGalleryProps {
  images: ImageItem[];
}

const AuthorPortraitsGallery = ({ images }: AuthorPortraitsGalleryProps) => {
  return (
    <ParallaxGallery
      className='overflow-hidden rounded-xl object-cover'
      items={images}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { AuthorPortraitsGallery };
export type { AuthorPortraitsGalleryProps };
