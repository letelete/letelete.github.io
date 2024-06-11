'use client';

import {
  AnimatePresence,
  MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useSound from 'use-sound';

import { Button } from '~ui/atoms/button';
import { Icon, IconProps } from '~ui/atoms/icon';

import { cn, tw } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Listenable
 * -----------------------------------------------------------------------------------------------*/

type ListenableState = 'playing' | 'paused' | 'idle';

interface ListenableContextProps {
  timestamp: MotionValue<number>;
  state: ListenableState;
}

const ListenableContext = createContext<ListenableContextProps | null>(null);

ListenableContext.displayName = 'ListenableContext';

const useListenableContext = () => {
  const context = useContext(ListenableContext);

  return context;
};

useListenableContext.displayName = 'useListenableContext';

/* -----------------------------------------------------------------------------------------------*/

interface ListenableHandle {
  play(timestamp?: number): void;
  pause(): void;
  stop(): void;
}

const ListenableContextProvider = forwardRef<
  ListenableHandle,
  PropsWithChildren
>(({ children }, ref) => {
  const timestamp = useMotionValue(0);
  const [state, setState] = useState<ListenableState>('idle');

  useImperativeHandle(ref, () => ({
    play(userTimestamp = 0) {
      setState('playing');
      timestamp.set(userTimestamp);
    },
    pause() {
      setState('paused');
    },
    stop() {
      timestamp.set(0);
      setState('idle');
    },
  }));

  useAnimationFrame((_, delta) => {
    const newTimestamp = timestamp.get() + delta;
    if (state === 'playing') {
      timestamp.set(newTimestamp);
    }
  });

  return (
    <ListenableContext.Provider value={{ timestamp, state }}>
      {children}
    </ListenableContext.Provider>
  );
});

ListenableContextProvider.displayName = 'ListenableContextProviders';

/* -----------------------------------------------------------------------------------------------*/

interface ListenableProps extends ComponentPropsWithoutRef<'div'> {
  src: string;
  iconProps?: Partial<IconProps>;
  playTitle?: string;
  stopTitle?: string;
  playAriaLabel?: string;
  stopAriaLabel?: string;
}

const Listenable = ({
  src,
  className,
  children,
  iconProps,
  playTitle = 'Listen',
  stopTitle = 'Stop',
  playAriaLabel = 'Listen to source text',
  stopAriaLabel = 'Stop listening',
  ...rest
}: PropsWithChildren<ListenableProps>) => {
  const listenableHandle = useRef<ListenableHandle>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [play, { stop }] = useSound(src, {
    onend: () => {
      setIsAudioPlaying(false);
      listenableHandle.current?.stop();
    },
  });

  const handlePlayAudio = useCallback(() => {
    setIsAudioPlaying(true);
    play();
    listenableHandle.current?.play();
  }, [play]);

  const handleStopAudio = useCallback(() => {
    stop();
    setIsAudioPlaying(false);
    listenableHandle.current?.stop();
  }, [stop]);

  const handleToggleAudio = useCallback(() => {
    if (isAudioPlaying) {
      handleStopAudio();
    } else {
      handlePlayAudio();
    }
  }, [handlePlayAudio, handleStopAudio, isAudioPlaying]);

  return (
    <div className={cn('flex items-center gap-x-1', className)} {...rest}>
      <ListenableContextProvider ref={listenableHandle}>
        {children}
      </ListenableContextProvider>

      <Button
        aria-label={isAudioPlaying ? stopAriaLabel : playAriaLabel}
        title={isAudioPlaying ? stopTitle : playTitle}
        onClick={handleToggleAudio}
        variant='ghost'
        size='icon'
        asChild
      >
        <motion.button>
          <AnimatePresence initial={false} mode='popLayout'>
            <motion.div
              transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              key={`playing:${isAudioPlaying}`}
            >
              {isAudioPlaying ? (
                <Icon
                  name='square'
                  color={tw.theme.colors.ctx.primary.fg.secondary}
                  {...iconProps}
                />
              ) : (
                <Icon
                  name='volume-2'
                  color={tw.theme.colors.ctx.primary.fg.secondary}
                  {...iconProps}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </Button>
    </div>
  );
};

Listenable.displayName = 'Listenable';

/* -------------------------------------------------------------------------------------------------
 * ListenableHighlight
 * -----------------------------------------------------------------------------------------------*/

type ListenableHighlightSegment =
  | [start: number, end: number]
  | [start: number];

interface ListenableHighlightProps {
  segments: ListenableHighlightSegment[];
  text: string;
  isolate?: boolean;
}

const ListenableHighlight = ({
  segments,
  text,
  isolate,
}: ListenableHighlightProps) => {
  const id = useId();

  const listenableContext = useListenableContext();

  const internalTimestamp = useTransform(
    () => listenableContext?.timestamp.get() ?? 0
  );

  const [matchesTimestamp, setMatchesTimestamp] = useState(false);
  const highlighted =
    matchesTimestamp && listenableContext && listenableContext.state !== 'idle';

  useMotionValueEvent(internalTimestamp, 'change', (timestamp) => {
    const checkMatchesTimestamp = () => {
      if (!listenableContext) {
        return false;
      }

      const someSegmentMatchTimestamp = segments.some(([start, end]) => {
        if (end === undefined) {
          return timestamp >= start;
        }
        return timestamp >= start && timestamp < end;
      });

      return someSegmentMatchTimestamp;
    };

    setMatchesTimestamp(checkMatchesTimestamp());
  });

  return (
    <motion.span
      className='relative'
      style={{
        color: highlighted
          ? tw.theme.colors.ctx['accent-primary'].fg.primary
          : '',
      }}
    >
      <AnimatePresence>
        {highlighted && (
          <motion.span
            layoutId={`listenable-highlight:background:${isolate ? id : 'shared'}`}
            className='absolute inset-0 z-0 block bg-ctx-accent-primary'
          />
        )}
      </AnimatePresence>

      <span className='relative z-10'>{text}</span>
    </motion.span>
  );
};

ListenableHighlight.displayName = 'ListenableHighlight';

/* -----------------------------------------------------------------------------------------------*/

export { Listenable, useListenableContext, ListenableHighlight };
export type {
  ListenableProps,
  ListenableContextProps,
  ListenableHandle,
  ListenableHighlightProps,
  ListenableHighlightSegment,
};
