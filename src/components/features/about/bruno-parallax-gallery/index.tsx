import { GalleryItem, ParallaxGallery } from '~ui/organisms/parallax-gallery';

import img0050 from '/public/galleries/about-me/0050.webp';
import img0100 from '/public/galleries/about-me/0100.webp';
import img0200 from '/public/galleries/about-me/0200.webp';
import img0300 from '/public/galleries/about-me/0300.webp';
import img0400 from '/public/galleries/about-me/0400.webp';
import img0500 from '/public/galleries/about-me/0500.webp';
import img0600 from '/public/galleries/about-me/0600.webp';
import img0700 from '/public/galleries/about-me/0700.webp';

// TODO: research better ways of preloading images https://github.com/vercel/next.js/discussions/34644
const items = [
  img0050,
  img0100,
  img0200,
  img0300,
  img0400,
  img0500,
  img0600,
  img0700,
].map<GalleryItem>((src) => ({
  alt: 'Bruno Kawka',
  src,
}));

export const BrunoParallaxGallery = () => {
  return <ParallaxGallery className='object-cover' items={items} />;
};
