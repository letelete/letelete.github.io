'use client';

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { useLockScroll } from '~hooks/use-lock-document-scroll';

import { Button } from '~ui/atoms/button';
import { LAYOUT_ID_HOME_LOGO } from '~ui/atoms/motion';
import { Typography } from '~ui/atoms/typography';
import { AppHeader } from '~ui/molecules/app-header';
import {
  PrompterHandle,
  PrompterRenderer,
  createPrompterParts,
} from '~ui/organisms/prompter';
import { HighlightPrompter } from '~ui/organisms/prompter/implementations';
import { Logo } from '~ui/widgets/logo';

import { cn } from '~utils/style';
import { timeInMs } from '~utils/time';

/* -------------------------------------------------------------------------------------------------
 * Intro
 * -----------------------------------------------------------------------------------------------*/

const PREFERENCE_DO_NOT_SHOW_INTRO_KEY = 'intro:do-not-show:timestamp';
const PREFERENCE_DO_NOT_SHOW_INTRO_TIME_IN_MS = timeInMs.hour * 2;

const PROMPTER_DURATION_PER_PART = 0.075;
const PROMPTER_PART_TRANSITION_DURATION = PROMPTER_DURATION_PER_PART * 5;

const PROMPTER_TEXT =
  'Taste is maybe the biggest deciding factor in whether a product ends up *feeling* good or not, regardless of how much skill is involved.' as const;

const prompterParts = createPrompterParts(
  PROMPTER_TEXT,
  { duration: PROMPTER_DURATION_PER_PART },
  { value: 'Taste', duration: 0.75 },
  { value: 'not,', duration: 0.4 }
);

const PROMPTER_TEXT_ANIMATION_DURATION = prompterParts
  .map(
    (part) =>
      (part.duration ?? PROMPTER_DURATION_PER_PART) +
      PROMPTER_PART_TRANSITION_DURATION
  )
  .reduce((sum, duration) => sum + duration, 0);

const QUOTE_TRANSITION_DURATION = PROMPTER_TEXT_ANIMATION_DURATION * 0.25;

/* -----------------------------------------------------------------------------------------------*/

interface IntroProps extends HTMLMotionProps<'div'> {}

const Intro = ({ className, ...rest }: IntroProps) => {
  const { unlockScroll } = useLockScroll({
    immediate: true,
    forceScrollPosition: 0,
  });

  const [isCreditsVisible, setIsCreditsVisible] = useState(false);
  const prompterHandle = useRef<PrompterHandle>(null);

  const [displayIntro, setDisplayIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [userRequestedToSkipIntro, setUserRequestedToSkipIntro] =
    useState(false);

  const saveUserPreferenceToSkipIntro = useCallback(() => {
    const nowTimestamp = new Date().getTime();

    localStorage.setItem(
      PREFERENCE_DO_NOT_SHOW_INTRO_KEY,
      nowTimestamp.toString()
    );
  }, []);

  const checkUserPreferenceToSkipIntro = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      return false;
    }

    const nowTimestamp = new Date().getTime();

    const restoredTimestampValue = localStorage.getItem(
      PREFERENCE_DO_NOT_SHOW_INTRO_KEY
    );
    const restoredTimestamp = restoredTimestampValue
      ? parseInt(restoredTimestampValue, 10)
      : null;

    if (
      restoredTimestamp === null ||
      Number.isNaN(restoredTimestamp) ||
      restoredTimestamp > nowTimestamp
    ) {
      localStorage.removeItem(PREFERENCE_DO_NOT_SHOW_INTRO_KEY);
      return false;
    }

    return (
      nowTimestamp - restoredTimestamp <=
      PREFERENCE_DO_NOT_SHOW_INTRO_TIME_IN_MS
    );
  }, []);

  const cleanup = useCallback(() => {
    unlockScroll();
  }, [unlockScroll]);

  const handleIntroComplete = useCallback(() => {
    setIntroCompleted(true);
    saveUserPreferenceToSkipIntro();
    cleanup();
  }, [cleanup, saveUserPreferenceToSkipIntro]);

  const skipIntro = useCallback(() => {
    setUserRequestedToSkipIntro(true);
    saveUserPreferenceToSkipIntro();
    cleanup();
  }, [cleanup, saveUserPreferenceToSkipIntro]);

  const partRenderer: PrompterRenderer = useCallback(
    (part) => (
      <Typography variant='heading' italic>
        {part.value}
      </Typography>
    ),
    []
  );

  useLayoutEffect(() => {
    const userPrefersToSkipIntro = checkUserPreferenceToSkipIntro();
    setDisplayIntro(!userPrefersToSkipIntro);
    if (userPrefersToSkipIntro) {
      cleanup();
    }
  }, [checkUserPreferenceToSkipIntro, cleanup, skipIntro, unlockScroll]);

  if (!displayIntro) {
    return null;
  }

  return (
    <AnimatePresence mode='popLayout'>
      {introCompleted || userRequestedToSkipIntro ? null : (
        <motion.div
          exit={{
            filter: 'blur(16px)',
            opacity: 0,
            scale: 1.1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.75,
            },
          }}
          className={cn(
            'fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen flex-col overflow-hidden bg-ctx-primary',
            className
          )}
          {...rest}
        >
          <AppHeader
            className='relative'
            innerClassName='flex gap-x-2 justify-between'
          >
            <div className='relative'>
              <Logo className='opacity-30' />
              <Logo
                className='absolute inset-0'
                initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{
                  type: 'spring',
                  duration: PROMPTER_TEXT_ANIMATION_DURATION,
                }}
                layoutId={LAYOUT_ID_HOME_LOGO}
              />
            </div>
          </AppHeader>

          <div className='layout-width-limiter layout-padding relative flex w-full flex-1 flex-col items-center justify-center'>
            <motion.div
              className='flex flex-col items-center justify-center'
              initial={{ clipPath: 'inset(0% 100% 0% 0%)', scale: 0.75 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
              transition={{
                type: 'spring',
                duration: QUOTE_TRANSITION_DURATION,
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
                transitionDuration={PROMPTER_PART_TRANSITION_DURATION}
                autoplay
              />

              <motion.div
                className='mt-8 flex w-full justify-end md:mt-2'
                initial={{ opacity: 0, filter: 'blur(8px)', y: 0 }}
                animate={
                  isCreditsVisible
                    ? { opacity: 1, filter: 'blur(0px)', y: 1 }
                    : undefined
                }
                transition={{
                  ease: 'easeIn',
                  duration: 0.75,
                  bounce: 0,
                  y: {
                    // Animate not relevant property to delay the animation completion.
                    duration: 2,
                  },
                }}
                onAnimationComplete={handleIntroComplete}
              >
                <Typography color='secondary'>~@benjitaylor</Typography>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {userRequestedToSkipIntro || isCreditsVisible ? null : (
                <Button
                  className='absolute bottom-[5%] z-20 mx-auto'
                  onClick={skipIntro}
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
                </Button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Intro.displayName = 'Intro';

/* -----------------------------------------------------------------------------------------------*/

export { Intro };
export type { IntroProps };
