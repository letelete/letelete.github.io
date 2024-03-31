import { GalleryItem, ParallaxGallery } from '~ui/organisms/parallax-gallery';

import img0 from '/public/galleries/about-me/img-0.webp';
import img10 from '/public/galleries/about-me/img-10.webp';
import img20 from '/public/galleries/about-me/img-20.webp';
import img30 from '/public/galleries/about-me/img-30.webp';
import img40 from '/public/galleries/about-me/img-40.webp';
import img50 from '/public/galleries/about-me/img-50.webp';
import img60 from '/public/galleries/about-me/img-60.webp';

// TODO: research better ways of preloading images https://github.com/vercel/next.js/discussions/34644
const items = [img0, img20, img30, img40, img50, img60, img10].map<GalleryItem>(
  (src) => ({
    alt: 'Bruno Kawka',
    src,
  })
);

export const BrunoParallaxGallery = () => {
  return <ParallaxGallery className='object-cover' items={items} />;
};
