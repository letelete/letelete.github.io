'use client';

import {
  MotionValue,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
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

export const clearClipPath = 'inset(0% 0% 0% 0% round 10px)';

export const clipPathToBottom = 'inset(90% 0% 10% 0% round 10px)';

export interface ParallaxGalleryProps extends Partial<ImageProps> {
  items: GalleryItem[];
}

export const ParallaxGallery = ({ items, ...rest }: ParallaxGalleryProps) => {
  const [page, setPage] = useState(0);
  const containerRef = useRef<ElementRef<typeof Image>>(null);
  const isInView = useInView(containerRef);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  }) as MotionValue<number>;
  const velocityFactor = useTransform(smoothVelocity, [-1000, 1000], [-5, 5], {
    clamp: false,
  });

  const itemIndex = wrap(0, items.length, page);
  const paginate = (newDirection: number) => {
    setPage((page) => page + newDirection);
  };

  const baseTime = useMotionValue(0);
  const progress = useTransform(baseTime, [0, 1], [100, 0]);

  const clipPath = useTransform(
    progress,
    (v) => `inset(0% 0% ${wrap(0, 100, v)}% 0% round 10px)`
  );

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    if (!isInView) {
      return;
    }

    directionFactor.current = velocityFactor.get() < 0 ? -1 : 1;
    baseTime.set(
      baseTime.get() +
        (delta / 1000) * velocityFactor.get() * directionFactor.current
    );

    if (baseTime.get() > 1) {
      paginate(directionFactor.current);
      baseTime.set(0);
    }
  });

  const currentItem = useMemo(() => items[itemIndex], [itemIndex, items]);
  const nextItem = useMemo(
    () => items[(itemIndex + 1) % items.length],
    [itemIndex, items]
  );

  if (!currentItem || !nextItem) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Icon name='image' />{' '}
      </div>
    );
  }

  return (
    <div className='relative h-full w-full overflow-hidden' ref={containerRef}>
      <Image
        key={page}
        src={currentItem.src}
        alt={currentItem.alt}
        priority
        fill
        {...rest}
      />

      <motion.div
        className='absolute left-0 top-0 z-10 h-full w-full overflow-hidden'
        style={{
          clipPath: clipPath,
        }}
      >
        <Image
          key={page}
          src={nextItem.src}
          alt={nextItem.alt}
          priority
          fill
          {...rest}
        />
      </motion.div>
    </div>
  );
};
