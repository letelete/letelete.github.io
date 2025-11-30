import * as React from 'react';
import { Variant, motion } from 'framer-motion';
import {
  Prompter,
  PrompterHandle,
  PrompterPart,
  PrompterProps,
  PrompterRenderer,
} from '~ui/organisms/prompter';

type HighlightPrompterPlayEvent = (
  part: PrompterPart,
  at: number,
  length: number
) => void;

interface HighlightPrompterProps extends Omit<PrompterProps, 'renderer'> {
  inactiveStyle?: Variant;
  activeStyle?: Variant;
  transitionDuration?: number;
  partRenderer?: PrompterRenderer;
  onPlayStart?: HighlightPrompterPlayEvent;
  onPlayComplete?: HighlightPrompterPlayEvent;
}

const HighlightPrompter = React.forwardRef<
  PrompterHandle,
  HighlightPrompterProps
>(
  (
    {
      inactiveStyle = { opacity: 0.34, filter: 'blur(8px)' },
      activeStyle = { opacity: 1, filter: 'blur(0px)' },
      transitionDuration = 0.075,
      partRenderer,
      onPlayStart,
      onPlayComplete,
      ...rest
    },
    ref
  ) => {
    const partContentRenderer: PrompterRenderer = React.useCallback(
      (part, index, params) => {
        if (partRenderer) {
          return partRenderer(part, index, params);
        }
        if (part.renderer) {
          return part.renderer(part, index, params);
        }
        return part.value;
      },
      [partRenderer]
    );

    const renderer: PrompterRenderer = React.useCallback(
      (_part, index, params) => {
        return (
          <div className='flex flex-wrap gap-0.5'>
            {params.parts.map((localPart, localIndex) => (
              <motion.div
                key={localPart.key}
                variants={{
                  inactive: inactiveStyle,
                  active: activeStyle,
                }}
                initial='inactive'
                animate={localIndex <= index ? 'active' : undefined}
                transition={{
                  ease: 'easeIn',
                  duration: transitionDuration,
                }}
                onAnimationStart={() => {
                  onPlayStart?.(localPart, localIndex, params.parts.length);
                }}
                onAnimationComplete={() => {
                  onPlayComplete?.(localPart, localIndex, params.parts.length);
                }}
              >
                {partContentRenderer(localPart, localIndex, params)}
              </motion.div>
            ))}
          </div>
        );
      },
      [
        activeStyle,
        inactiveStyle,
        onPlayComplete,
        onPlayStart,
        partContentRenderer,
        transitionDuration,
      ]
    );

    return <Prompter ref={ref} renderer={renderer} {...rest} />;
  }
);

HighlightPrompter.displayName = 'HighlightPrompter';

export { HighlightPrompter };
export type { HighlightPrompterProps };
