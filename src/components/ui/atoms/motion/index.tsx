import * as React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import {
  fadeInMotionVariants,
  heartBeatMotionVariants,
  popInMotionVariants,
  revealInUpMotionVariants,
} from '~ui/atoms/motion/lib';

export const LAYOUT_ID_HOME_LOGO = 'home:logo';

interface HeartBeatMotionProps extends HTMLMotionProps<'div'> {}

const HeartBeatMotion = React.forwardRef<HTMLDivElement, HeartBeatMotionProps>(
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

interface FadeInMotionProps extends HTMLMotionProps<'div'> {}

const FadeInMotion = React.forwardRef<HTMLDivElement, FadeInMotionProps>(
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

interface RevealInUpMotionProps extends HTMLMotionProps<'div'> {}

const RevealInUpMotion = React.forwardRef<
  HTMLDivElement,
  RevealInUpMotionProps
>(({ children, transition, ...rest }, ref) => {
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
});

RevealInUpMotion.displayName = 'RevealInUpMotion';

interface PopInMotionProps extends HTMLMotionProps<'div'> {}

const PopInMotion = React.forwardRef<HTMLDivElement, PopInMotionProps>(
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

const ANCHOR_HTML_ATTRIBUTE = `data-animation-anchor`;

const useAnimationAnchor = <TAnchorName extends string>(
  names: TAnchorName[]
) => {
  const id = React.useId();

  const getHTMLSelector = React.useCallback(
    (name: TAnchorName) => {
      const selector = new HTMLAttributeSelector(
        ANCHOR_HTML_ATTRIBUTE,
        `${id}${name}`
      );
      return selector;
    },
    [id]
  );

  const anchorsMap = React.useMemo(
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
          props: React.ReactElement['props'];
        }
      >,
    [getHTMLSelector, names]
  );

  return anchorsMap;
};

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
