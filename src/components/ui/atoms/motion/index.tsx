import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactElement, forwardRef, useCallback, useId, useMemo } from 'react';

import {
  fadeInMotionVariants,
  heartBeatMotionVariants,
  popInMotionVariants,
  revealInUpMotionVariants,
} from '~ui/atoms/motion/lib';

/* -------------------------------------------------------------------------------------------------
 * HeartBeatMotion
 * -----------------------------------------------------------------------------------------------*/

interface HeartBeatMotionProps extends HTMLMotionProps<'div'> {}

const HeartBeatMotion = forwardRef<HTMLDivElement, HeartBeatMotionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={heartBeatMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

HeartBeatMotion.displayName = 'HeartBeatMotion';

/* -------------------------------------------------------------------------------------------------
 * FadeInMotion
 * -----------------------------------------------------------------------------------------------*/

interface FadeInMotionProps extends HTMLMotionProps<'div'> {}

const FadeInMotion = forwardRef<HTMLDivElement, FadeInMotionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={fadeInMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

FadeInMotion.displayName = 'FadeInMotion';

/* -------------------------------------------------------------------------------------------------
 * RevealInUpMotion
 * -----------------------------------------------------------------------------------------------*/

interface RevealInUpMotionProps extends HTMLMotionProps<'div'> {}

const RevealInUpMotion = forwardRef<HTMLDivElement, RevealInUpMotionProps>(
  ({ children, transition, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        transition={{ type: 'spring', duration: 1, ...transition }}
        variants={revealInUpMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

RevealInUpMotion.displayName = 'RevealInUpMotion';

/* -------------------------------------------------------------------------------------------------
 * PopInMotion
 * -----------------------------------------------------------------------------------------------*/

interface PopInMotionProps extends HTMLMotionProps<'div'> {}

const PopInMotion = forwardRef<HTMLDivElement, PopInMotionProps>(
  ({ children, transition, ...rest }, ref) => {
    return (
      <motion.div
        ref={ref}
        transition={{ type: 'spring', ...transition }}
        variants={popInMotionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

PopInMotion.displayName = 'PopInMotion';

/* -------------------------------------------------------------------------------------------------
 * AnimationScopeAnchor
 * -----------------------------------------------------------------------------------------------*/

class HTMLAttributeSelector<TValue extends string | number | symbol> {
  key: string;
  value: TValue;

  constructor(key: string, value: TValue) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[${this.key}="${this.value.toString()}"]`;
  }
}

const ANCHOR_HTML_ATTRIBUTE = `data-animation-anchor` as const;

const useAnimationAnchor = <TAnchorName extends string>(
  names: TAnchorName[]
) => {
  const id = useId();

  const getHTMLSelector = useCallback(
    (name: TAnchorName) => {
      const selector = new HTMLAttributeSelector(
        ANCHOR_HTML_ATTRIBUTE,
        `${id}${name}`
      );
      return selector;
    },
    [id]
  );

  const anchorsMap = useMemo(
    () =>
      Object.fromEntries(
        names.map((name) => {
          const selector = getHTMLSelector(name);

          return [
            name,
            {
              selector: selector.toString(),
              props: { [ANCHOR_HTML_ATTRIBUTE]: selector.value },
            },
          ] as const;
        })
      ) as Record<
        TAnchorName,
        {
          selector: string;
          props: ReactElement['props'];
        }
      >,
    [getHTMLSelector, names]
  );

  return anchorsMap;
};

/* -----------------------------------------------------------------------------------------------*/

export {
  HeartBeatMotion,
  FadeInMotion,
  RevealInUpMotion,
  PopInMotion,
  useAnimationAnchor,
};

export type {
  HeartBeatMotionProps,
  FadeInMotionProps,
  RevealInUpMotionProps,
  PopInMotionProps,
};
