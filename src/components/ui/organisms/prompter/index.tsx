import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

/* -------------------------------------------------------------------------------------------------
 * Prompter
 * -----------------------------------------------------------------------------------------------*/

const DEFAULT_PART_DURATION = 0.015;

type PrompterRenderer = (
  part: PrompterPart,
  index: number,
  params: {
    parts: PrompterPart[];
  }
) => ReactNode;

type PrompterState = 'idle' | 'playing' | 'paused' | 'completed';
type PrompterStateInternal = PrompterState | 'initial';

type PrompterPlayEvent = (
  playing: boolean,
  params: { at: number; length: number; state: PrompterState }
) => void;

type PrompterJumpKey = 'start' | 'end';

interface PrompterPart {
  key: string;
  value: string;
  renderer?: PrompterRenderer;
  duration?: number;
}

interface PrompterProps {
  parts: PrompterPart[];
  fullSentence?: string;
  autoplay?: boolean;
  duration?: number;
  className?: string;
  renderer?: PrompterRenderer;
  onPlay?: PrompterPlayEvent;
}

interface PrompterHandle {
  play(): void;
  next(): boolean;
  stop(): void;
  pause(): void;
  jumpTo(index: number | PrompterJumpKey): void;
}

/* -----------------------------------------------------------------------------------------------*/

const Prompter = forwardRef<PrompterHandle, PrompterProps>(
  (
    {
      parts,
      fullSentence = parts.map((part) => part.value).join(' '),
      autoplay = false,
      duration = DEFAULT_PART_DURATION,
      className,
      renderer,
      onPlay,
    },
    ref
  ) => {
    if (duration > 1 || duration < 0) {
      throw new Error(
        `Duration must be a decimal in range [0, 1]. Got "${duration}" instead.`
      );
    }

    const playerTimeoutRef = useRef<NodeJS.Timeout>();

    const [promptingState, setPromptingState] =
      useState<PrompterStateInternal>('initial');

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPart = useMemo(
      () => parts[currentIndex],
      [currentIndex, parts]
    );

    const play = useCallback(() => {
      const index = 0;

      setCurrentIndex(index);
      setPromptingState('playing');

      onPlay?.(true, { at: index, length: parts.length, state: 'playing' });
    }, [onPlay, parts.length]);

    const stop = useCallback(() => {
      const index = 0;

      setCurrentIndex(index);
      setPromptingState('idle');

      onPlay?.(false, { at: index, length: parts.length, state: 'idle' });
    }, [onPlay, parts.length]);

    const pause = useCallback(() => {
      setPromptingState('paused');

      onPlay?.(false, {
        at: currentIndex,
        length: parts.length,
        state: 'paused',
      });
    }, [currentIndex, onPlay, parts.length]);

    const next = useCallback(() => {
      let done = false;

      setCurrentIndex((currentIndex) => {
        const nextIndex = Math.min(currentIndex + 1, parts.length - 1);

        if (currentIndex === nextIndex) {
          done = true;
          setPromptingState('completed');
          clearTimeout(playerTimeoutRef.current);

          onPlay?.(false, {
            at: nextIndex,
            length: parts.length,
            state: 'completed',
          });
        }

        return nextIndex;
      });

      return done;
    }, [onPlay, parts.length]);

    const jumpTo = useCallback(
      (value: number | PrompterJumpKey) => {
        const getJumpIndex = (value: number | PrompterJumpKey) => {
          if (value === 'start') {
            return 0;
          }
          if (value === 'end') {
            return parts.length - 1;
          }
          return value;
        };

        const jumpIndex = getJumpIndex(value);
        setCurrentIndex(jumpIndex);

        onPlay?.(false, {
          at: jumpIndex,
          length: parts.length,
          state: promptingState === 'initial' ? 'idle' : promptingState,
        });
      },
      [onPlay, parts.length, promptingState]
    );

    useImperativeHandle(ref, () => ({
      play,
      next,
      stop,
      pause,
      jumpTo,
    }));

    useEffect(() => {
      if (autoplay && promptingState === 'initial') {
        play();
      }
    }, [autoplay, play, promptingState]);

    useEffect(() => {
      if (promptingState !== 'playing') {
        return;
      }

      playerTimeoutRef.current = setTimeout(
        next,
        (currentPart?.duration ?? duration) * 1000
      );

      return () => clearTimeout(playerTimeoutRef.current);
    }, [currentPart, onPlay, next, parts.length, promptingState, duration]);

    const renderPart = useCallback(
      (part: PrompterPart, index: number) => {
        if (renderer) {
          return renderer(part, index, { parts });
        }
        if (part.renderer) {
          return part.renderer(part, index, { parts });
        }
        return part.value;
      },
      [parts, renderer]
    );

    return (
      <div className={className}>
        <div className='aria-hidden'>
          {currentPart ? renderPart(currentPart, currentIndex) : null}
        </div>

        <VisuallyHidden>{fullSentence}</VisuallyHidden>
      </div>
    );
  }
);

Prompter.displayName = 'Prompter';

/* -----------------------------------------------------------------------------------------------*/

type Split<T extends string> = T extends `${infer First} ${infer Rest}`
  ? First | Split<Rest>
  : T;

const createPrompterParts = <
  TValue extends string,
  TValueToken = Split<TValue>,
>(
  text: TValue,
  options: Partial<Omit<PrompterPart, 'value'>> | null,
  ...tokenConfig: (Omit<Partial<PrompterPart>, 'value'> & {
    value: TValueToken;
    atIndex?: number;
  })[]
): PrompterPart[] => {
  const tokens = text.split(' ') as TValueToken[];

  return tokens.map((token, index) => {
    const tokenConfigWithIndex = tokenConfig.find(
      (config) => config.value === token && config.atIndex === index
    );
    const tokenConfigAny = tokenConfig.find((config) => config.value === token);
    const thisTokenConfig = tokenConfigWithIndex ?? tokenConfigAny;

    const key = crypto.randomUUID();

    return {
      key,
      value: token as string,
      duration: thisTokenConfig?.duration ?? options?.duration,
    };
  });
};

/* -----------------------------------------------------------------------------------------------*/

export { Prompter, createPrompterParts };
export type {
  PrompterProps,
  PrompterRenderer,
  PrompterPlayEvent,
  PrompterPart,
  PrompterHandle,
};
