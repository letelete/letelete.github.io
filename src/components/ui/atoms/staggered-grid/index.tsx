import { HTMLMotionProps, motion } from 'framer-motion';
import {
  Children,
  MutableRefObject,
  ReactElement,
  ReactNode,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { distanceEuclidean } from '~utils/math';
import { cn } from '~utils/style';

export type StartFromPosition = 'center';

export interface StaggeredGridProps {
  items: ReactNode[];
  startFrom?: StartFromPosition | number;
  delayPerPixel?: number;
  cols?: number;
  className?: string;
}

interface OriginOffset {
  top: number;
  left: number;
}

const startFromHandler: Record<
  StartFromPosition,
  (itemsLength: number) => number
> = {
  center: (itemsLength) => Math.floor(itemsLength / 2),
};

const getOriginIndex = (
  startFrom: StartFromPosition | number,
  itemsLength: number
) => {
  if (typeof startFrom === 'number') {
    if (startFrom < 0 || startFrom >= itemsLength) {
      throw new Error(
        `startFrom "${startFrom}" out of bounds: expected value in range [0, ${itemsLength}]`
      );
    }
    return startFrom;
  }

  return startFromHandler[startFrom]?.(itemsLength) ?? 0;
};

/**
 * Places items in the grid, and animates them in a staggered-fashion starting from the `startFrom` position.
 */
const StaggeredGrid = forwardRef<HTMLDivElement, StaggeredGridProps>(
  (
    {
      items,
      startFrom = 'center',
      delayPerPixel = 0.0008,
      cols = 1,
      className,
    },
    ref
  ) => {
    const originOffset = useRef<OriginOffset>({ top: 0, left: 0 });
    const originIndex = useMemo(
      () => getOriginIndex(startFrom, items.length),
      [items.length, startFrom]
    );

    return (
      <motion.div
        ref={ref}
        className={cn('grid h-fit w-fit', className)}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {items.map((item, i) => (
          <GridItem
            key={i}
            i={i}
            originIndex={originIndex}
            delayPerPixel={delayPerPixel}
            originOffset={originOffset}
          >
            {item}
          </GridItem>
        ))}
      </motion.div>
    );
  }
);

StaggeredGrid.displayName = 'StaggeredGrid';

export { StaggeredGrid };

export interface GridItem {
  delayPerPixel: number;
  i: number;
  originIndex: number;
  originOffset: MutableRefObject<OriginOffset>;
  children: ReactNode;
}

const GridItem = ({
  delayPerPixel,
  i,
  originIndex,
  originOffset,
  children,
}: GridItem) => {
  const delayRef = useRef(0);
  const offset = useRef<OriginOffset>({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const child = Children.only(children) as ReactElement;

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [delayPerPixel, i, originIndex, originOffset]);

  useEffect(() => {
    const elementPoint = { x: offset.current.left, y: offset.current.top };
    const originPoint = {
      x: originOffset.current.left,
      y: originOffset.current.top,
    };
    const distance = distanceEuclidean(elementPoint, originPoint);

    delayRef.current = Math.min(distance * delayPerPixel);
  }, [delayPerPixel, originOffset]);

  return (
    <Box ref={ref} variants={itemVariants} custom={delayRef}>
      {child}
    </Box>
  );
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: (delayRef: MutableRefObject<number>) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delayRef.current },
  }),
  exit: (delayRef: MutableRefObject<number>) => ({
    opacity: 0,
    scale: 0.25,
    transition: { delay: delayRef.current - 0.1 },
  }),
};

const Box = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ className, ...rest }, ref) => (
    <motion.div ref={ref} className={cn('inline-block', className)} {...rest} />
  )
);

Box.displayName = 'Box';

export { Box };
