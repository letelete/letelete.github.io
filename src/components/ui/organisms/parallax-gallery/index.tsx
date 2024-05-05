'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { AnimatePresence, Variants, motion, wrap } from 'framer-motion';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { ComponentType, ElementRef, useMemo, useRef, useState } from 'react';

import { useElementGeometry } from '~hooks/use-element-geometry';

import { Icon } from '~ui/atoms/icon';
import { VisuallyHidden } from '~ui/atoms/visually-hidden';
import { CarouselNavigationButton } from '~ui/molecules/buttons/carousel-navigation-button';

import { cn } from '~utils/style';

export interface GalleryItem {
  src: string | StaticImport;
  alt: string;
}

export const clearClipPath = 'inset(0% 0% 0% 0% round 10px)';

export const clipPathToBottom = 'inset(90% 0% 10% 0% round 10px)';

export interface ParallaxGalleryProps {
  items: GalleryItem[];
  className?: string;
}

const MotionImage = motion(
  Image as ComponentType<Omit<ImageProps, 'onDragEnd'>>
);

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const ParallaxGallery = ({ items, className }: ParallaxGalleryProps) => {
  const [showSwipeHint, setSwipeHint] = useState(true);

  const [[pageId, direction], setPage] = useState([0, 0]);
  const currentItemIndex = wrap(0, items.length, pageId);
  const currentItem = items[currentItemIndex];

  const containerRef = useRef<ElementRef<typeof Image>>(null);
  const containerGeometry = useElementGeometry(containerRef);
  const imageSizes = containerGeometry
    ? `${containerGeometry.width}px`
    : undefined;

  const swipeOffset = containerGeometry?.height ?? 100;
  const swipeConfidenceThreshold = swipeOffset / 4;
  const variants = useMemo(
    () =>
      ({
        'scroll-hint': {
          y: [0, -swipeOffset / 8],
          transition: {
            type: 'spring',
            mass: 5,
            delay: 1,
            repeat: Infinity,
            repeatType: 'mirror',
          },
        },
        enter: (direction: number) => ({
          y: direction > 0 ? swipeOffset : -swipeOffset,
          scale: 0.8,
          opacity: 0.6,
        }),
        center: { y: 0, scale: 1, opacity: 1 },
        exit: (direction: number) => ({
          y: direction < 0 ? swipeOffset : -swipeOffset,
          opacity: 0.6,
          scale: 0.8,
        }),
      }) satisfies Variants,
    [swipeOffset]
  );

  const paginate = (newDirection: number) => {
    setPage(([pageId]) => [pageId + newDirection, newDirection]);
  };

  const paginateManually = (newDirection: number) => {
    paginate(newDirection);
    setSwipeHint(false);
  };

  if (!currentItem) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Icon name='image' />
        <VisuallyHidden>Could not load image</VisuallyHidden>
      </div>
    );
  }

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      ref={containerRef}
    >
      <AnimatePresence mode='popLayout' initial={false} custom={direction}>
        <MotionImage
          key={pageId}
          className='h-full w-full overflow-hidden rounded-sm object-cover'
          src={currentItem.src}
          alt={currentItem.alt}
          sizes={imageSizes}
          priority
          fill
          variants={variants}
          whileInView={showSwipeHint ? 'scroll-hint' : undefined}
          initial='enter'
          animate='center'
          exit='exit'
          custom={direction}
          whileDrag={{ scale: 0.8, opacity: 0.8 }}
          drag='y'
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.5}
          onDragEnd={(event, { offset }) => {
            event.preventDefault();

            const swipe = swipePower(offset.x, offset.y);
            if (swipe < -swipeConfidenceThreshold) {
              paginateManually(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginateManually(-1);
            }
          }}
        />
      </AnimatePresence>

      <div className='absolute bottom-1 left-1 z-20 flex flex-col gap-y-1'>
        <CarouselNavigationButton
          title='Show previous image'
          icon='chevron-up'
          accessibleText='Show previous image'
          onClick={() => paginateManually(1)}
        />
        <CarouselNavigationButton
          title='Show next image'
          icon='chevron-down'
          accessibleText='Show next image'
          onClick={() => paginateManually(-1)}
        />
      </div>

      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scale: 0, opacity: 0.6 }}
            transition={{ type: 'spring', delay: 1 }}
            className='absolute right-1 top-1 z-30 flex rounded-full p-1 backdrop-blur-sm sm:hidden'
          >
            <Player
              autoplay
              loop
              speed={0.5}
              src='https://lottie.host/d00133fc-11a5-4c97-ba5c-d743b4b7fb2e/QGI72RpiPy.json'
              style={{ height: '3rem', width: '3rem' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
