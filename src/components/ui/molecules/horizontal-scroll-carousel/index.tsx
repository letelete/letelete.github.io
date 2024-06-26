import {
  HTMLMotionProps,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ComponentPropsWithoutRef,
  RefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import { useElementGeometry } from '~hooks/use-element-geometry';

import { cn } from '~utils/style';

export interface HorizontalScrollCarouselProps
  extends ComponentPropsWithoutRef<'div'> {
  reversed?: boolean;
  childrenContainerClass?: string;
  /**
   * The factor influencing the scroll speed based on the height of the content area.
   * A higher value leads to a slower scroll effect.
   */
  scrollHeightFactor?: number;
}

const HorizontalScrollCarousel = forwardRef<
  HTMLDivElement,
  HorizontalScrollCarouselProps
>(
  (
    {
      children,
      className,
      reversed,
      childrenContainerClass,
      scrollHeightFactor = 2.25,
      ...rest
    },
    handleRef
  ) => {
    const targetRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(handleRef, () => targetRef.current!);

    const [childrenContainerRef, childrenContainerGeometry] =
      useElementGeometry<HTMLDivElement>();
    const childrenContainerWidth = childrenContainerGeometry?.width ?? 0;

    const [targetGeometryRef, targetGeometry] = useElementGeometry(targetRef);
    const targetHeight = childrenContainerWidth * scrollHeightFactor;
    const targetWidth = targetGeometry?.width ?? 0;

    /**
     * Width provided by the `layout-width-limitter`.
     */
    const layoutWidth = Math.min(targetWidth, 1024);
    const layoutStartPositionX = (targetWidth - layoutWidth) / 2;

    const { scrollYProgress } = useScroll({
      target: targetRef,
    });

    const outputRange = reversed
      ? [
          `${layoutStartPositionX + layoutWidth * 0.33}px`,
          `${layoutStartPositionX - childrenContainerWidth + layoutWidth - 16}px`,
        ]
      : [
          `${layoutStartPositionX - childrenContainerWidth + layoutWidth * 0.66}px`,
          `${layoutStartPositionX + 16}px`,
        ];
    const x = useTransform(scrollYProgress, [0, 1], outputRange);

    return (
      <section
        ref={targetGeometryRef}
        className={cn('relative w-full', className)}
        style={{
          height: `${targetHeight}px`,
        }}
        {...rest}
      >
        <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
          <motion.div
            ref={childrenContainerRef}
            style={{ x }}
            className={cn('mt-20 flex gap-x-8', childrenContainerClass)}
          >
            {children}
          </motion.div>
        </div>
      </section>
    );
  }
);

HorizontalScrollCarousel.displayName = 'HorizontalScrollingCarousel';

export interface HorizontalScrollContentContainerProps
  extends ComponentPropsWithoutRef<'div'> {}

const HorizontalScrollContentContainer = ({
  children,
  ...rest
}: HorizontalScrollContentContainerProps) => {
  return (
    <div className='relative z-10' {...rest}>
      {children}
    </div>
  );
};

export interface HorizontalScrollButtonContainerProps
  extends HTMLMotionProps<'div'> {
  reversed?: boolean;
}

const HorizontalScrollButtonContainer = forwardRef<
  HTMLDivElement,
  HorizontalScrollButtonContainerProps
>(({ reversed, children, ...rest }, horizontalScrollCarouselRef) => {
  if (!horizontalScrollCarouselRef) {
    throw new Error(
      'Required forwarded ref of "horizontalScrollCarouselRef" is missing.'
    );
  }

  return (
    <motion.div
      className='relative z-0 my-auto p-8'
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: reversed ? -16 : 16 }}
      transition={{ type: 'spring', bounce: 0 }}
      viewport={{
        root: horizontalScrollCarouselRef as RefObject<HTMLDivElement>,
        amount: 0.8,
        once: true,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

HorizontalScrollButtonContainer.displayName = 'HorizontalScrollButtonContainer';

export {
  HorizontalScrollCarousel,
  HorizontalScrollContentContainer,
  HorizontalScrollButtonContainer,
};
