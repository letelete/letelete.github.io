import { Player } from '@lottiefiles/react-lottie-player';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

import { StaggeredGrid } from '~ui/atoms/staggered-grid';
import {
  phasesLength,
  useIncrementalHeart,
} from '~ui/molecules/buttons/heart-button/incremental-heart/use-incremental-heart';

import { cn } from '~utils/style';

export interface HeartButtonProps {
  phase: number | 'first' | 'last';
  onClick?: (phase: number, phasesLength: number) => void;
  className?: string;
  disabled?: boolean;
}

export const HeartButton = ({
  phase,
  onClick,
  className,
  disabled,
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
  const [startFrom, setStartFrom] = useState<number>(0);
  const [id, setId] = useState<number>(0);

  const containerRef = useRef<HTMLButtonElement>(null);
  const playerRef = useRef<Player>(null);

  return (
    <motion.button
      ref={containerRef}
      className={cn('relative', className)}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileFocus={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      transition={{ type: 'spring' }}
      disabled={disabled}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        const target = event.target as HTMLDivElement;
        const tile = target.hasAttribute('data-idx')
          ? target
          : target.querySelector('[data-idx]');
        const idx = tile?.getAttribute('data-idx');
        const newStartFrom = typeof idx === 'string' ? parseInt(idx) : null;
        setStartFrom(newStartFrom ?? 0);
        onClick?.(phaseIndex, phasesLength);
        setId((id) => id + 1);

        playerRef.current?.play?.();
      }}
    >
      <Player
        className='absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2'
        ref={playerRef}
        src='https://lottie.host/5178775a-a4b7-49ce-90c3-0ca4587cabe1/cRpTOWZqP7.json'
        style={{ height: '8rem', width: '8rem' }}
      />
      <AnimatePresence mode='wait' initial={false}>
        <StaggeredGrid
          className='relative z-10'
          key={`phase=${phaseIndex}:startFrom=${startFrom}:id=${id}`}
          delayPerPixel={0.0025}
          startFrom={startFrom}
          cols={cols}
          items={heartBitmapFlat.map((color, idx) => (
            <Tile
              key={`tile:color=${color}:idx=${idx}`}
              color={colorsMap[color]}
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
}

const Tile = ({ color, className, ...rest }: TileProps) => {
  return (
    <motion.div
      className={cn('tile', 'h-2 w-2', className)}
      style={{ background: color }}
      {...rest}
    />
  );
};
