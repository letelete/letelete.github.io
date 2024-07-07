'use client';

import {
  AnimationDefinition,
  SVGMotionProps,
  clamp,
  motion,
  transform,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useTime,
  useTransform,
} from 'framer-motion';
import { forwardRef, useCallback, useState } from 'react';

import { useHomeContext } from '~modules/home';

import { Card } from '~ui/atoms/card';
import { useAnimationAnchor } from '~ui/atoms/motion';
import { AuthorPortraitsGallery } from '~ui/widgets/author-portraits-gallery';

import { cn } from '~utils/style';
import { checkFps60 } from '~utils/time';

/* -------------------------------------------------------------------------------------------------
 * AuthorPortraitsGallery
 * -----------------------------------------------------------------------------------------------*/

interface AboutAuthorPortraitsGalleryCardProps {
  className?: string;
}

const AboutAuthorPortraitsGalleryCard = ({
  className,
}: AboutAuthorPortraitsGalleryCardProps) => {
  const [scope, animate] = useAnimate();
  const animationAnchors = useAnimationAnchor([
    'gallery',
    'illustration-background',
    'illustration',
  ] as const);
  const [isTransitioningToGallery, setIsTransitioningToGallery] =
    useState(false);

  const { authorPortraits } = useHomeContext();
  const [galleryEnabled, setGalleryEnabled] = useState(false);

  const transitionToGallery = useCallback(() => {
    const animateAndEnableGallery = async () => {
      setIsTransitioningToGallery(true);

      await animate([
        [
          animationAnchors.illustration.selector,
          { scale: 1.1, rotateZ: '15deg' },
          { type: 'spring', duration: 0.5 },
        ],
        [
          animationAnchors['illustration-background'].selector,
          { scale: 1 },
          { type: 'spring', duration: 0.5, at: '<' },
        ],
        'show-gallery',
        [
          animationAnchors.illustration.selector,
          {
            scale: 0.4,
            opacity: 0,
            filter: ['blur(0)', 'blur(5px)'],
            x: 15,
            y: 10,
          },
          { type: 'spring', duration: 0.5, at: 'show-gallery' },
        ],
        [
          animationAnchors['illustration-background'].selector,
          { opacity: 0 },
          { type: 'spring', duration: 2, bounce: 0, at: 'show-gallery' },
        ],
        [
          animationAnchors.gallery.selector,
          {
            opacity: [0, 1],
            scale: [1.1, 1],
            clipPath: ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)'],
            filter: ['blur(5px)', 'blur(0)'],
          },
          { type: 'spring', duration: 0.7, at: 'show-gallery' },
        ],
      ]);

      setGalleryEnabled(true);
      setIsTransitioningToGallery(false);
    };

    if (!isTransitioningToGallery) {
      void animateAndEnableGallery();
    }
  }, [animate, animationAnchors, isTransitioningToGallery]);

  return (
    <Card
      ref={scope}
      className={cn('relative aspect-square w-full flex-1', className)}
    >
      <div
        className='h-full w-full opacity-0'
        {...animationAnchors.gallery.props}
      >
        <AuthorPortraitsGallery
          images={authorPortraits}
          visualHint={galleryEnabled}
        />
      </div>

      {galleryEnabled ? null : (
        <motion.button
          title='Enable gallery'
          initial='idle'
          whileHover='hovering'
          whileTap='tapping'
          onClick={transitionToGallery}
          className={cn(
            'absolute inset-0 z-20 m-4 border-none bg-transparent sm:m-6',
            isTransitioningToGallery && 'pointer-events-none'
          )}
        >
          <motion.div
            className='absolute inset-0 rounded-xl bg-ctx-secondary'
            variants={{
              idle: { scale: 1.5, opacity: 0 },
              hovering: { scale: 0.9, opacity: 1 },
              tapping: { scale: 1, opacity: 1 },
            }}
            transition={{ type: 'spring', duration: 0.3 }}
            {...animationAnchors['illustration-background'].props}
          />

          <div {...animationAnchors.illustration.props}>
            <PortraitIllustration className='object-contain' />
          </div>
        </motion.button>
      )}
    </Card>
  );
};

/* -------------------------------------------------------------------------------------------------
 * PortraitIllustration
 * -----------------------------------------------------------------------------------------------*/

const isHoveringDefinition = (d: AnimationDefinition): d is 'hovering' => {
  return typeof d === 'string' && d === 'hovering';
};

enum Velocity {
  IDLE = 1,
  HOVERING = 1.5,
}

const PortraitIllustration = forwardRef<
  SVGSVGElement,
  SVGMotionProps<SVGSVGElement>
>(({ ...rest }, ref) => {
  const time = useTime();

  const rotateTime = useMotionValue(0);
  const rotateVelocity = useMotionValue(Velocity.IDLE);
  useMotionValueEvent(time, 'change', (t) => {
    if (checkFps60(t)) {
      rotateVelocity.set(
        clamp(Velocity.IDLE, Velocity.HOVERING * 4, rotateVelocity.get() - 0.1)
      );
    }
    rotateTime.set(rotateTime.get() + 10 * rotateVelocity.get());
  });

  const rotate = useTransform(() =>
    transform(rotateTime.get(), [0, 2000], [0, 360], {
      clamp: false,
    })
  );

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1800 1800'
      fill='none'
      ref={ref}
      variants={{
        hovering: { scale: 1.1 },
        tapping: { scale: 0.9 },
      }}
      transition={{ type: 'spring', duration: 0.3 }}
      {...rest}
    >
      <path
        stroke='#000'
        strokeWidth='28.858'
        d='M569.333 1103.89c9.393 20.46 27.707 78.05 22.219 122.61-6.859 55.7-32.711 155.43-70.431 175.21-37.719 19.78 230.793 153.5 321.11 226.36 81.031 65.38 111.858 37.53 170.369-15.2 45.14-40.67 141.91-50.38 130.53-64.45-11.39-14.06-28.31-27.23-29.37-40.7-.84-10.78 2.91-82.35 4.88-116.79'
      />
      <path
        fill='#000'
        d='M1165.33 398.289c1.02-9.713 3.98-37.694-4.38-69.04l4.35 69.316.03-.276Z'
      />
      <path
        stroke='#000'
        strokeWidth='36.072'
        d='m616.92 1060.9 7.784 20.83M1327.41 898.7c12.95 46.107-32.23 221.3-52.85 304.26-10.31 41.47 7.84 118.12-23.44 142.54-92.32 72.08-176.94 44.7-271.724 28.28-73.198-12.68-214.862-27.59-271.942-105.87-57.08-78.27-63.858-125.12-82.75-186.18m526.236-687.646c64.25 38.446 188.78 242.923 166.49 280.663 10.73 7.731 22.45 7.003 39.22 12.236 16.94 5.285 29.59-111.706 26.58-144.194-3.02-32.488-9.34-113.332-93.37-189.498-67.23-60.933-114.86-55.988-130.28-45.899l5.72 91.173c1.34-12.727 6.48-59.498-17.85-102.845-30.42-54.183-114.28-80.342-202.618-92.126-88.34-11.785-220.533 7.445-288.498 23.049-54.371 12.484-119.738 74.819-145.625 104.426-31.521 39.242-106.377 122.44-123.141 158.763-21.483 46.552-37.657 145.995-40.185 179.384-2.529 33.388 15.226 212.444 21.534 251.218 6.307 38.774 82.29 191.296 117.194 231.106 27.923 31.85 78.631 56.96 100.494 65.53m38.099-135.34c-3.98 17.16-26.079 42.87-82.63 8.4-70.688-43.08-109.278-137.193-112.381-187.543-3.47-56.293-11.139-124.411 41.855-134.17 75.717-13.942 103.791 71.815 116.693 123.162C598.562 932.657 625.5 870.5 609.5 771'
      />
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='36.072'
        d='M608 742.5c-8.397-76.004 58.871-298.663 142.591-304.095 104.65-6.789 231.613-9.246 292.539-19.158 60.94-9.911 117.67-31.652 107.49-24.308'
      />
      <path
        fill='#000'
        d='M871.735 1647.26c44.011-57.98 132.875-192.53 136.225-266.94l108.09 8.9-1.16 120.43 22.53 28.54 7.84 17.34-28.74 12.55-71.51 22.36-48.234 37.91-20.628 18.39-24.212 13.96-31.945 1.61-27.518-1.96-20.738-13.09Z'
      />
      <path
        stroke='#000'
        strokeWidth='28.858'
        d='M468.423 770.077c4.662 1.422 307.033-48.816 307.033-48.816 21.739-3.426 25.497-4.14 38.791-6.303 16.618-2.703 113.927-19.67 157.646-16.547 43.717 3.122 95.267 9.116 114.827 27.936 8.09 7.782 61.99 3.563 66.63-2.877 2.93-4.073 26.49-25.915 32.79-29.208 24.87-12.993 84.43-15.841 124.39-11.144 30.42 3.574 30.4 4.209 52.58 8.511 22.29 4.326 30.22 4.172 34.29 8.068 11.59 11.127 7.89 33.691 4.81 43.568-2.24 7.185-5.73-7.049-6.9 13.62-1.17 20.663-.74 44.464-9.39 89.09-6.7 34.584-16.44 52.709-78.85 67.418-62.41 14.708-74.39 10.973-99.42-9.983-25.03-20.955-43.47-71.399-47.06-93.551-3.13-19.349-7.66-26.052-17.23-29.037-12.9-4.025-35.78-3.276-38.77 6.308-2.99 9.583-26.46 86.391-43.07 112.759-16.6 26.368-51.65 39.097-95.212 43.91-43.566 4.812-91.297-2.188-117.975-26.287-26.678-24.099-40.946-134.306-40.946-146.854 0-9.717-17.407-11.34-31.146-9.717-14.099 1.666-152.243 20.333-227.945 32.647-19.839-32.117-84.535-24.933-79.873-23.511Z'
      />
      <path
        stroke='#000'
        strokeWidth='18.036'
        d='M878.357 892.784c-21.643-27.054-34.268-84.77-32.465-138.878 1.202-2.405 6.224-10.76 14.429-12.625 39.679-9.018 97.538-11.888 126.253-9.017 43.286 4.329 36.756 4.56 64.926 10.822 12.63 2.806 21.65 19.116 16.24 39.679-9.02 34.27-19.84 81.163-43.29 104.608-24.501 24.498-125.045 31.722-146.093 5.411ZM1228.26 872.949c-19.66-23.593-41.08-78.39-39.68-129.86 0-3.607 7.21-15.876 16.71-19.262 31.98-11.399 71.55-11.796 97.76-8.577 26.21 3.219 28.46 4.337 50.27 10.294 12.57 3.432 13.85 17.545 12.57 37.744-2.36 37.516-4.17 75.392-22.2 97.035-18.04 21.643-97.4 34.269-115.43 12.626Z'
      />
      <motion.path
        onAnimationStart={(definition) => {
          if (isHoveringDefinition(definition)) {
            rotateVelocity.set(rotateVelocity.get() + Velocity.HOVERING);
          }
        }}
        variants={{
          hovering: {},
        }}
        style={{ rotateZ: rotate }}
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='28.858'
        d='M497.249 914.434c21.923 13.596 40.521 31.942 58.455 51.1m-23.183-60.325c-6.147 19.704-11.613 39.668-18.453 59.152-.418 1.19-2.409 4.61-4.074 4.605'
      />
    </motion.svg>
  );
});

PortraitIllustration.displayName = 'PortraitIllustration';

/* -----------------------------------------------------------------------------------------------*/

export { AboutAuthorPortraitsGalleryCard };
export type { AboutAuthorPortraitsGalleryCardProps };
