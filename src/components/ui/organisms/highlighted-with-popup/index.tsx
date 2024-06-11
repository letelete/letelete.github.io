import {
  AnimatePresence,
  HTMLMotionProps,
  MotionConfig,
  SpringOptions,
  motion,
  useSpring,
} from 'framer-motion';
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useRef,
  useState,
} from 'react';

import { cn, tw } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Highlighted
 * -----------------------------------------------------------------------------------------------*/

const getRelativeCoordinates = <
  T extends HTMLElement = HTMLElement,
  E = MouseEvent,
>(
  event: ReactMouseEvent<T, E>,
  referenceElement: T
) => {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY:
      (position.y - offset.top - offset.height / 2) / (offset.height / 2),
  };
};

/* -----------------------------------------------------------------------------------------------*/

const popupPositionSpringConfig = {
  bounce: 0,
  stiffness: 100,
  mass: 0.1,
} as const satisfies SpringOptions;

interface HighlightedWithPopupProps extends HTMLMotionProps<'div'> {
  renderPopupContent: () => ReactNode;
  popupContainerClassName?: string;
}

const HighlightedWithPopup = ({
  children,
  className,
  popupContainerClassName,
  renderPopupContent,
  ...rest
}: PropsWithChildren<HighlightedWithPopupProps>) => {
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLSpanElement>(null);

  const x = useSpring(0, popupPositionSpringConfig);
  const y = useSpring(0, popupPositionSpringConfig);

  return (
    <MotionConfig transition={{ type: 'spring', duration: 0.3, bounce: 0 }}>
      <motion.span
        ref={containerRef}
        onMouseMove={(e) => {
          if (containerRef.current && popupRef.current) {
            const mousePosition = getRelativeCoordinates(
              e,
              containerRef.current
            );
            x.set(mousePosition.x);
            y.set(mousePosition.y);
          }
        }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        className={cn('relative z-0 inline-block', className)}
        style={{
          color: hovering
            ? ''
            : tw.theme.colors.ctx['accent-primary'].fg.primary,
          cursor: hovering ? 'nw-resize' : 'auto',
        }}
        {...rest}
      >
        <motion.span
          animate={{
            scale: 1,
            height: hovering ? 2 : '100%',
          }}
          className='inset absolute bottom-0 left-0 z-0 block w-full bg-ctx-accent-primary'
        />

        <span className='relative z-10'>{children}</span>

        <AnimatePresence>
          {hovering && (
            <motion.span
              ref={popupRef}
              aria-hidden
              initial={{ opacity: 0, scale: 0.2, borderRadius: 0 }}
              animate={{ opacity: 1, scale: 1, borderRadius: 13 }}
              exit={{ opacity: 0, scale: 0.2, borderRadius: 0 }}
              className={cn(
                'pointer-events-none absolute bottom-full right-full z-10 m-2 block aspect-square w-24 origin-bottom-right overflow-hidden bg-ctx-secondary',
                popupContainerClassName
              )}
              style={{ x, y }}
            >
              {renderPopupContent()}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </MotionConfig>
  );
};

HighlightedWithPopup.displayName = 'HighlightedWithPopup';

/* -------------------------------------------------------------------------------------------------
 * PopupVideoContent
 * -----------------------------------------------------------------------------------------------*/

interface PopupVideoContentProps
  extends Omit<ComponentPropsWithoutRef<'video'>, 'src'> {
  fileName: string;
}

const PopupVideoContent = ({
  fileName,
  className,
  width = '426',
  height = '240',
  controls = false,
  preload = 'auto',
  playsInline = true,
  autoPlay = true,
  loop = true,
  muted = true,
  ...rest
}: PopupVideoContentProps) => (
  <video
    className={cn(
      'absolute left-0 top-0 h-full w-full object-cover',
      className
    )}
    width={width}
    height={height}
    controls={controls}
    preload={preload}
    playsInline={playsInline}
    autoPlay={autoPlay}
    loop={loop}
    muted={muted}
    {...rest}
  >
    <source src={`/videos/${fileName}.webm`} type='video/webm' />
    <source src={`/videos/${fileName}.mp4`} type='video/mp4' />
    <p>
      Your browser doesn&apos;t support HTML video. Here is a
      <a href={`/videos/${fileName}.mp4`} download={`${fileName}.mp4`}>
        link to the video
      </a>{' '}
      instead.
    </p>
  </video>
);

PopupVideoContent.displayName = 'PopupVideoContent';

/* -----------------------------------------------------------------------------------------------*/

export { HighlightedWithPopup, PopupVideoContent };
export type { HighlightedWithPopupProps, PopupVideoContentProps };
