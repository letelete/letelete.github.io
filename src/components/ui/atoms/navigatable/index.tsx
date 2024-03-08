'use client';

import {
  Children,
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  HTMLMotionProps,
  UseInViewOptions,
  motion,
  useInView,
} from 'framer-motion';

export interface NavigatableProps extends ComponentPropsWithoutRef<'div'> {
  onSectionInView: (sectionId: string) => void;
  scrollIntoViewOptions?: ScrollIntoViewOptions;
  inViewOptions?: UseInViewOptions;
}

export interface NavigatableHandler {
  scrollTo: (sectionId: string) => void;
}

export interface NavigatableContext {
  onInView: (sectionId: string) => void;
}

export interface NavigatableSection extends HTMLMotionProps<'section'> {
  sectionId: string;
  inViewOptions?: UseInViewOptions;
}
export interface NavigatableSectionHandler {
  getSectionId: () => string;
  scrollIntoView: (arg: ScrollIntoViewOptions | boolean) => void;
}

const NavigatableContext = createContext<NavigatableContext | null>(null);

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

    const contextValue = useMemo(
      () => ({
        onInView: handleSectionInView,
      }),
      [handleSectionInView]
    );

    return (
      <NavigatableContext.Provider value={contextValue}>
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
            });
          })}
        </div>
      </NavigatableContext.Provider>
    );
  }
);

NavigatablePrimitive.displayName = 'Navigatable';

const NavigatableSection = forwardRef<
  NavigatableSectionHandler,
  NavigatableSection
>(({ sectionId, children, inViewOptions, ...rest }, handler) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const navigatableContext = useContext(NavigatableContext);

  const isInView = useInView(internalRef, inViewOptions);

  useEffect(() => {
    if (isInView) {
      navigatableContext?.onInView(sectionId);
    }
  }, [isInView, navigatableContext, sectionId]);

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
