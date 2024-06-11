import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import {
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { StaggeredGrid } from '~ui/atoms/staggered-grid';
import {
  phasesLength,
  useIncrementalHeart,
} from '~ui/molecules/buttons/heart-button/incremental-heart/use-incremental-heart';

import { cn } from '~utils/style';

export type HeartSize = 'base' | 'sm' | 'xs';

export interface HeartButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'onClick'> {
  phase: number | 'first' | 'last';
  onClick?: (phase: number, phasesLength: number) => void;
  className?: string;
  disabled?: boolean;
  size?: HeartSize;
}

const getTileSize = (size: HeartSize) => {
  const sizeMap: Record<HeartSize, number> = {
    base: 6,
    sm: 4,
    xs: 2,
  };

  return sizeMap[size];
};

const getDelayPerPixel = (size: HeartSize) => {
  const delayMap: Record<HeartSize, number> = {
    base: 0.01,
    sm: 0.025,
    xs: 0.05,
  };

  return delayMap[size];
};

export const HeartButton = ({
  phase,
  onClick,
  className,
  disabled,
  size = 'base',
  ...rest
}: HeartButtonProps) => {
  const phaseIndex = useMemo(() => {
    if (phase === 'first') {
      return 0;
    }
    if (phase === 'last') {
      return phasesLength - 1;
    }
    return phase;
  }, [phase]);

  const [heartBitmap, colorsMap] = useIncrementalHeart(phaseIndex);
  const heartBitmapFlat = useMemo(() => heartBitmap.flat(), [heartBitmap]);

  const cols = heartBitmap.length;
  const [id, setId] = useState(0);

  const tileSize = getTileSize(size);

  const containerRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick: MouseEventHandler = useCallback(
    (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(phaseIndex, phasesLength);
      setId((id) => id + 1);
    },
    [disabled, onClick, phaseIndex]
  );

  return (
    <motion.button
      ref={containerRef}
      className={cn('relative touch-manipulation', className)}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileFocus={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={handleButtonClick}
      {...rest}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <StaggeredGrid
          className='relative z-50'
          key={`phase=${phaseIndex}:id=${id}`}
          delayPerPixel={getDelayPerPixel(size)}
          cols={cols}
          items={heartBitmapFlat.map((color, idx) => (
            <Tile
              key={`tile:color=${color}:idx=${idx}`}
              color={colorsMap[color]}
              size={tileSize}
              data-idx={idx}
            />
          ))}
        />
      </AnimatePresence>
    </motion.button>
  );
};

interface TileProps extends HTMLMotionProps<'div'> {
  color: string;
  size: number;
}

const Tile = ({ color, size, className, ...rest }: TileProps) => {
  return (
    <motion.div
      className={cn('tile', 'aspect-square', className)}
      style={{ background: color, width: size }}
      {...rest}
    />
  );
};
