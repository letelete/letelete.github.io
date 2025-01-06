'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import {
  AnimatePresence,
  HTMLMotionProps,
  TargetAndTransition,
  VariantLabels,
  motion,
} from 'framer-motion';
import {
  Children,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useRelativeDayPart } from '~hooks/use-relative-day-part';

import { Video } from '~ui/atoms/video';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans text-sm font-normal leading-none tracking-tighter transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'bg-transparent outline outline-1',
        ghost: 'bg-transparent',
        link: 'hover:underline-ctx-accent-secondary-fg-solid bg-transparent tracking-normal underline underline-offset-4',
      },
      size: {
        default: 'px-4 py-3',
        icon: 'aspect-square p-2',
        inline: '',
      },
      inverse: {
        true: 'ring-offset-ctx-button-fg-primary',
        false: 'ring-offset-ctx-button-inverse-fg-primary',
      },
    },
    compoundVariants: [
      {
        inverse: false,
        variant: 'default',
        className:
          'border-ctx-button bg-ctx-button text-ctx-button-fg-solid hover:bg-ctx-button/50',
      },
      {
        inverse: true,
        variant: 'default',
        className:
          'border-ctx-button-inverse bg-ctx-button-inverse text-ctx-button-inverse-fg-solid hover:bg-ctx-button-inverse/50',
      },

      {
        inverse: false,
        variant: 'outline',
        className: 'text-ctx-button outline-ctx-button hover:bg-ctx-button/10',
      },
      {
        inverse: true,
        variant: 'outline',
        className:
          'text-ctx-button-inverse outline-ctx-button-inverse hover:bg-ctx-button-inverse/10',
      },

      {
        inverse: false,
        variant: 'ghost',
        className: 'text-ctx-button-inverse-fg-solid hover:bg-ctx-button/10',
      },
      {
        inverse: true,
        variant: 'ghost',
        className: 'text-ctx-button-fg-solid hover:bg-ctx-button-inverse/10',
      },

      {
        inverse: false,
        variant: 'link',
        className:
          'text-ctx-button-inverse-fg-solid hover:text-ctx-button-inverse-fg-solid/50',
      },
      {
        inverse: true,
        variant: 'link',
        className: 'text-ctx-button-fg-solid hover:text-ctx-button-fg-solid/50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      inverse: false,
    },
  }
);

interface PolymorphicButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  backgroundLayer?: ReactNode;
}

const PolymorphicButton = forwardRef<HTMLButtonElement, PolymorphicButtonProps>(
  ({ className, variant, size, asChild = false, inverse, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, inverse, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

PolymorphicButton.displayName = 'PolymorphicButton';

/* -----------------------------------------------------------------------------------------------*/

const MotionPolymorphicButton = motion(PolymorphicButton);

const buttonMotionProps = {
  whileTap: { scale: 0.9 },
} as const satisfies HTMLMotionProps<'button'>;

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof MotionPolymorphicButton> {
  disableDefaultAnimations?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disableDefaultAnimations, ...buttonProps }, ref) => {
    const whileTapMerged = useMemo<
      VariantLabels | TargetAndTransition | undefined
    >(() => {
      if (disableDefaultAnimations) {
        return buttonProps.whileTap;
      }
      if (
        buttonProps.whileTap === undefined ||
        typeof buttonProps.whileTap === 'object'
      ) {
        return { ...buttonMotionProps.whileTap, ...buttonProps.whileTap };
      }
      return buttonProps.whileTap;
    }, [buttonProps.whileTap, disableDefaultAnimations]);

    return (
      <MotionPolymorphicButton
        {...buttonMotionProps}
        {...buttonProps}
        ref={ref}
        whileTap={whileTapMerged}
      />
    );
  }
);

Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * ButtonWithVideo
 * -----------------------------------------------------------------------------------------------*/

interface ButtonWithVideoProps extends ButtonProps {
  whenVideo?: Partial<ButtonProps>;
  videoFileName?: string;
}

const ButtonWithVideo = forwardRef<HTMLButtonElement, ButtonWithVideoProps>(
  ({ videoFileName, className, whenVideo, children, ...rest }, ref) => {
    const [hovered, setHovered] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const child = Children.only(children) as ReactElement;

    const buttonProps = useMemo(
      () => (hovered && videoLoaded ? { ...rest, ...whenVideo } : { ...rest }),
      [hovered, rest, videoLoaded, whenVideo]
    );

    const renderChildrenWithVideoWrapper = useCallback(
      (children: ReactNode) => (
        <ChildrenWithVideoWrapper
          displayBackground={hovered}
          videoFileName={videoFileName}
          onVideoLoaded={() => setVideoLoaded(true)}
          onVideoDetached={() => setVideoLoaded(false)}
        >
          {children}
        </ChildrenWithVideoWrapper>
      ),
      [hovered, videoFileName]
    );

    const cloneWithNestedChildren = useCallback(() => {
      if (isValidElement(child)) {
        const nestedChildren = (child.props as { children?: ReactNode })
          ?.children;

        return nestedChildren
          ? cloneElement(child as ReactElement, {
              children: renderChildrenWithVideoWrapper(nestedChildren),
            })
          : null;
      }
      return null;
    }, [child, renderChildrenWithVideoWrapper]);

    return (
      <Button
        {...buttonProps}
        ref={ref}
        className={cn(
          'relative overflow-hidden hover:font-semibold hover:text-[#fff]',
          className
        )}
        onHoverStart={(event, info) => {
          setHovered(true);
          buttonProps.onHoverStart?.(event, info);
        }}
        onHoverEnd={(event, info) => {
          buttonProps.onHoverEnd?.(event, info);
          setHovered(false);
        }}
      >
        {buttonProps.asChild
          ? cloneWithNestedChildren()
          : renderChildrenWithVideoWrapper(children)}
      </Button>
    );
  }
);

ButtonWithVideo.displayName = 'ButtonWithVideo';

/* -----------------------------------------------------------------------------------------------*/

interface ChildrenWithVideoWrapperProps {
  displayBackground?: boolean;
  videoFileName?: string;
  onVideoLoaded?: () => void;
  onVideoDetached?: () => void;
}

const ChildrenWithVideoWrapper = ({
  displayBackground,
  videoFileName,
  children,
  onVideoLoaded,
  onVideoDetached,
}: PropsWithChildren<ChildrenWithVideoWrapperProps>) => {
  const relativeDayPart = useRelativeDayPart();

  return (
    <>
      <AnimatePresence mode='popLayout' onExitComplete={onVideoDetached}>
        {displayBackground ? (
          <Video
            className='absolute inset-0 z-0 overflow-hidden rounded-full'
            fileName={videoFileName ?? `nature-${relativeDayPart.part}`}
            onLoadedData={onVideoLoaded}
            initial={{ scale: 4, opacity: 0, filter: 'blur(32px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{
              scale: 2,
              opacity: 0,
              filter: 'blur(16px)',
              transition: { type: 'spring', duration: 1.5, bounce: 0 },
            }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            disableLinkFallback
          />
        ) : null}
      </AnimatePresence>

      <div className='relative z-10'>{children}</div>
    </>
  );
};

ChildrenWithVideoWrapper.displayName = 'ChildrenWithVideoWrapper';

/* -----------------------------------------------------------------------------------------------*/

export { Button, ButtonWithVideo };
export type { ButtonProps, ButtonWithVideoProps };
