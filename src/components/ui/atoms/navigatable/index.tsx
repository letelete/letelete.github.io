'use client';

import {
  HTMLMotionProps,
  UseInViewOptions,
  motion,
  useInView,
} from 'framer-motion';
import {
  Children,
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface NavigatableProps extends ComponentPropsWithoutRef<'div'> {
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

const NavigatablePrimitive = forwardRef<NavigatableHandler, NavigatableProps>(
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
    const sectionRefs = useRef<NavigatableSectionHandler[]>([]);
    const sectionIdsOrder = useRef<string[]>([]);

    useImperativeHandle(handler, () => ({
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

    const handleSectionInView = useCallback(
      (sectionId: string) => {
        onSectionInView(sectionId);
      },
      [onSectionInView]
    );

    return (
      <div {...rest}>
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) {
            return null;
          }

          return cloneElement(child as ReactElement, {
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

const NavigatableSection = forwardRef<
  NavigatableSectionHandler,
  NavigatableSection
>(({ sectionId, children, inViewOptions, onInView, ...rest }, handler) => {
  const internalRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(internalRef, inViewOptions);

  useEffect(() => {
    if (isInView) {
      onInView?.(sectionId);
    }
  }, [isInView, onInView, sectionId]);

  useImperativeHandle(handler, () => ({
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
