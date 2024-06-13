'use client';

import {
  AnimatePresence,
  HTMLMotionProps,
  MotionConfig,
  motion,
} from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

import { useLockScroll } from '~hooks/use-lock-document-scroll';

import { Button, buttonMotionProps } from '~ui/atoms/button';
import { Typography } from '~ui/atoms/typography';
import {
  PrompterHandle,
  PrompterRenderer,
  createPrompterParts,
} from '~ui/organisms/prompter';
import { HighlightPrompter } from '~ui/organisms/prompter/implementations';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Intro
 * -----------------------------------------------------------------------------------------------*/

const PROMPTER_DURATION_PER_PART = 150;

const PROMPTER_TEXT =
  'Taste is maybe the biggest deciding factor in whether a product ends up *feeling* good or not, regardless of how much skill is involved.' as const;

const prompterParts = createPrompterParts(
  PROMPTER_TEXT,
  { duration: PROMPTER_DURATION_PER_PART },
  { value: 'Taste', duration: 750 },
  { value: 'not,', duration: 750 }
);

const PROMPTER_TEXT_ANIMATION_DURATION =
  prompterParts
    .map((part) => part.duration ?? PROMPTER_DURATION_PER_PART)
    .reduce((sum, duration) => sum + duration, 0) / 1000;

const QUOTE_TRANSITION_DURATION = PROMPTER_TEXT_ANIMATION_DURATION * 0.95;

/* -----------------------------------------------------------------------------------------------*/

interface IntroProps extends HTMLMotionProps<'div'> {}

const Intro = ({ className, ...rest }: IntroProps) => {
  const { unlockScroll } = useLockScroll({
    immediate: true,
    forceScrollPosition: 0,
  });

  const [isCreditsVisible, setIsCreditsVisible] = useState(false);
  const prompterHandle = useRef<PrompterHandle>(null);

  const [introCompleted, setIntroCompleted] = useState(false);
  const [userRequestedToSkipIntro, setUserRequestedToSkipIntro] =
    useState(false);

  const skipIntro = useCallback(() => {
    prompterHandle.current?.jumpTo('end');
    setUserRequestedToSkipIntro(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    unlockScroll();
    setIntroCompleted(true);
  }, [unlockScroll]);

  const partRenderer: PrompterRenderer = useCallback(
    (part) => (
      <Typography variant='heading' italic>
        {part.value}
      </Typography>
    ),
    []
  );

  return (
    <AnimatePresence mode='popLayout'>
      {introCompleted ? null : (
        <motion.div
          exit={{
            filter: 'blur(16px)',
            opacity: 0,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.75,
              delay: userRequestedToSkipIntro ? 0.2 : 1,
            },
          }}
          className={cn(
            'fixed bottom-0 left-0 right-0 top-0 overflow-hidden bg-ctx-primary',
            className
          )}
          {...rest}
        >
          <MotionConfig
            reducedMotion={userRequestedToSkipIntro ? 'always' : 'user'}
          >
            <div className='layout-width-limiter layout-padding relative flex h-full w-full flex-col items-center justify-center'>
              <motion.div
                className='flex flex-col items-center justify-center'
                initial={{ clipPath: 'inset(0% 100% 0% 0%)', scale: 0.75 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                transition={{
                  type: 'spring',
                  duration: userRequestedToSkipIntro
                    ? 0
                    : QUOTE_TRANSITION_DURATION,
                  bounce: 0,
                }}
              >
                <HighlightPrompter
                  ref={prompterHandle}
                  parts={prompterParts}
                  partRenderer={partRenderer}
                  onPlayComplete={(_part, at, length) => {
                    const noPartsRemaining = at >= length - 1;
                    setIsCreditsVisible(noPartsRemaining);
                  }}
                  autoplay
                />
              </motion.div>

              <motion.div
                className='mt-8 flex w-full justify-end sm:mt-2 sm:justify-center'
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={
                  isCreditsVisible
                    ? { opacity: 1, filter: 'blur(0px)' }
                    : undefined
                }
                transition={{
                  ease: 'easeIn',
                  duration: 0.5,
                  delay: 0.5,
                  bounce: 0,
                }}
                onAnimationComplete={handleIntroComplete}
              >
                <Typography color='secondary'>~@benjitaylor</Typography>
              </motion.div>

              <AnimatePresence mode='popLayout'>
                {userRequestedToSkipIntro || isCreditsVisible ? null : (
                  <Button
                    className='absolute bottom-[5%] z-20 mx-auto'
                    onClick={skipIntro}
                    asChild
                    {...buttonMotionProps}
                  >
                    <motion.button
                      variants={{
                        hidden: {
                          y: '100%',
                          opacity: 0,
                          transition: { ease: 'easeOut', duration: 0.3 },
                        },
                        animate: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            ease: 'easeOut',
                            duration: 0.5,
                            delay: 1,
                          },
                        },
                      }}
                      initial='hidden'
                      animate='animate'
                      exit='hidden'
                    >
                      Skip intro
                    </motion.button>
                  </Button>
                )}
              </AnimatePresence>
            </div>
          </MotionConfig>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Intro.displayName = 'Intro';

/* -----------------------------------------------------------------------------------------------*/

export { Intro };
export type { IntroProps };
