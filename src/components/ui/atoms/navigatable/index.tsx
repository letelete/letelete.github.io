'use client';

import * as React from 'react';
import {
  HTMLMotionProps,
  UseInViewOptions,
  motion,
  useInView,
} from 'framer-motion';

export interface NavigatableProps
  extends React.ComponentPropsWithoutRef<'div'> {
  onSectionInView: (sectionId: string) => void;
  scrollIntoViewOptions?: ScrollIntoViewOptions;
  inViewOptions?: UseInViewOptions;
}

export interface NavigatableHandler {
  scrollTo: (sectionId: string) => void;
}

export interface NavigatableSection extends HTMLMotionProps<'section'> {
  sectionId: string;
  inViewOptions?: UseInViewOptions;
  onInView?: (sectionId: string) => void;
}
export interface NavigatableSectionHandler {
  getSectionId: () => string;
  scrollIntoView: (arg: ScrollIntoViewOptions | boolean) => void;
}

const NavigatablePrimitive = React.forwardRef<
  NavigatableHandler,
  NavigatableProps
>(
  (
    {
      onSectionInView,
      scrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'start',
      },
      inViewOptions = {
        margin: '-60% 0px -40% 0px',
      },
      children,
      ...rest
    },
    handler
  ) => {
    const sectionRefs = React.useRef<NavigatableSectionHandler[]>([]);
    const sectionIdsOrder = React.useRef<string[]>([]);

    React.useImperativeHandle(handler, () => ({
      scrollTo: (sectionId) => {
        const index = sectionIdsOrder.current.findIndex(
          (value) => value === sectionId
        );

        if (index === -1) {
          throw new Error(`Missing section with id: ${sectionId}`);
        }

        sectionRefs.current[index]?.scrollIntoView?.(scrollIntoViewOptions);
      },
    }));

    const handleSectionInView = React.useCallback(
      (sectionId: string) => {
        onSectionInView(sectionId);
      },
      [onSectionInView]
    );

    return (
      <div {...rest}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child as React.ReactElement, {
            ref: (ref: NavigatableSectionHandler) => {
              if (!ref) {
                return null;
              }
              sectionRefs.current[index] = ref;
              sectionIdsOrder.current[index] = ref.getSectionId();
            },
            inViewOptions,
            onInView: handleSectionInView,
          });
        })}
      </div>
    );
  }
);

NavigatablePrimitive.displayName = 'Navigatable';

const NavigatableSection = React.forwardRef<
  NavigatableSectionHandler,
  NavigatableSection
>(({ sectionId, children, inViewOptions, onInView, ...rest }, handler) => {
  const internalRef = React.useRef<HTMLDivElement>(null);

  const isInView = useInView(internalRef, inViewOptions);

  React.useEffect(() => {
    if (isInView) {
      onInView?.(sectionId);
    }
  }, [isInView, onInView, sectionId]);

  React.useImperativeHandle(handler, () => ({
    getSectionId: () => sectionId,
    scrollIntoView: (arg) => internalRef?.current?.scrollIntoView(arg),
  }));

  return (
    <motion.section ref={internalRef} id={sectionId} {...rest}>
      {children}
    </motion.section>
  );
});

NavigatableSection.displayName = 'NavigatableSection';

export const Navigatable = Object.assign(NavigatablePrimitive, {
  Section: NavigatableSection,
});
