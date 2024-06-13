import { Variant, motion } from 'framer-motion';
import { forwardRef, useCallback } from 'react';

import {
  Prompter,
  PrompterHandle,
  PrompterPart,
  PrompterProps,
  PrompterRenderer,
} from '~ui/organisms/prompter';

/* -------------------------------------------------------------------------------------------------
 * HighlightPrompter
 * -----------------------------------------------------------------------------------------------*/

type HighlightPrompterPlayEvent = (
  part: PrompterPart,
  at: number,
  length: number
) => void;

interface HighlightPrompterProps extends Omit<PrompterProps, 'renderer'> {
  inactiveStyle?: Variant;
  activeStyle?: Variant;
  partRenderer?: PrompterRenderer;
  onPlayStart?: HighlightPrompterPlayEvent;
  onPlayComplete?: HighlightPrompterPlayEvent;
}

const HighlightPrompter = forwardRef<PrompterHandle, HighlightPrompterProps>(
  (
    {
      inactiveStyle = { opacity: 0.34, filter: 'blur(8px)' },
      activeStyle = { opacity: 1, filter: 'blur(0px)' },
      partRenderer,
      onPlayStart,
      onPlayComplete,
      ...rest
    },
    ref
  ) => {
    const partContentRenderer: PrompterRenderer = useCallback(
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

    const renderer: PrompterRenderer = useCallback(
      (_part, index, params) => {
        return (
          <div className='flex flex-wrap gap-0.5'>
            {params.parts.map((localPart, localIndex) => (
              <motion.div
                key={localPart.key}
                className='inline-block'
                variants={{
                  inactive: inactiveStyle,
                  active: activeStyle,
                }}
                initial='inactive'
                animate={localIndex <= index ? 'active' : undefined}
                transition={{ ease: 'easeIn', duration: 0.3 }}
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
      ]
    );

    return <Prompter ref={ref} renderer={renderer} {...rest} />;
  }
);

HighlightPrompter.displayName = 'HighlightPrompter';

/* -----------------------------------------------------------------------------------------------*/

export { HighlightPrompter };
export type { HighlightPrompterProps };
