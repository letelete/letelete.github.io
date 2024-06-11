'use client';

import { ImageItem } from '~lib/images/provider';

import {
  ParallaxGallery,
  ParallaxGalleryProps,
} from '~ui/organisms/parallax-gallery';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * AuthorPortraitsGallery
 * -----------------------------------------------------------------------------------------------*/

interface AuthorPortraitsGalleryProps
  extends Omit<Partial<ParallaxGalleryProps>, 'items'> {
  images: ImageItem[];
}

const AuthorPortraitsGallery = ({
  images,
  className,
  ...rest
}: AuthorPortraitsGalleryProps) => {
  return (
    <ParallaxGallery
      className={cn('overflow-hidden rounded-xl object-cover', className)}
      items={images}
      {...rest}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { AuthorPortraitsGallery };
export type { AuthorPortraitsGalleryProps };
