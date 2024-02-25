import { useThrottle } from '@react-hook/throttle';
import {
  MotionValue,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { ElementRef, useMemo, useRef, useState } from 'react';

import { Icon } from '~ui/atoms/icon';

export interface GalleryItem {
  src: string | StaticImport;
  alt: string;
}

export interface ParallaxGalleryProps extends Partial<ImageProps> {
  items: GalleryItem[];
}

export const ParallaxGallery = ({ items, ...rest }: ParallaxGalleryProps) => {
  const [page, setPage] = useThrottle(0, 1, true);
  const ref = useRef<ElementRef<typeof Image>>(null);
  const isInView = useInView(ref, { once: false });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  }) as MotionValue<number>;
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const itemIndex = wrap(0, items.length, page);
  const paginate = (newDirection: number) => {
    setPage((page) => page + newDirection);
  };

  const directionFactor = useRef<number>(1);
  useMotionValueEvent(velocityFactor, 'change', (latest) => {
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else {
      directionFactor.current = 1;
    }

    console.log(latest);
    // if (isInView) {
    // console.log('Page scroll: ', latest);
    paginate(directionFactor.current);
    // }
  });

  // const baseX = useMotionValue(0);
  // useAnimationFrame((_t, delta) => {
  //   if (velocityFactor.get() < 0) {
  //     directionFactor.current = -1;
  //   } else {
  //     directionFactor.current = 1;
  //   }

  //   // const moveBy = Math.abs(100 * (delta / 1000) * velocityFactor.get());
  //   // const nextX = (baseX.get() + moveBy) % 100;
  //   // console.log(nextX);
  //   // if (nextX === 0) {
  //   //   paginate(directionFactor.current);
  //   // }
  //   // baseX.set(nextX);
  // });

  const currentItem = useMemo(() => items[itemIndex], [itemIndex, items]);

  if (!currentItem) {
    return <Icon name='image' />;
  }

  return (
    <Image
      key={page}
      ref={ref}
      src={currentItem.src}
      alt={currentItem.alt}
      priority
      fill
      {...rest}
    />
  );
};
