import { GalleryItem, ParallaxGallery } from '~ui/atoms/parallax-gallery';

import img10 from '/public/galleries/about-me/img-10.jpeg';
import img20 from '/public/galleries/about-me/img-20.jpeg';
import img30 from '/public/galleries/about-me/img-30.jpeg';
import img40 from '/public/galleries/about-me/img-40.jpeg';
import img50 from '/public/galleries/about-me/img-50.jpeg';
import img60 from '/public/galleries/about-me/img-60.jpeg';
import img70 from '/public/galleries/about-me/img-70.jpeg';

// TODO: research better ways of preloading images https://github.com/vercel/next.js/discussions/34644
const items = [
  img10,
  img20,
  img30,
  img40,
  img50,
  img60,
  img70,
].map<GalleryItem>((src) => ({
  alt: 'Bruno Kawka',
  src,
}));

export const BrunoParallaxGallery = () => {
  return <ParallaxGallery className='object-cover' items={items} />;
};
