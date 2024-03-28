import { useScroll, useTransform } from 'framer-motion';
import { ReactElement } from 'react';

import { FadeOverlay } from '~ui/atoms/fade-overlay';
import {
  TwoPaneContainer,
  TwoPaneContainerProps,
} from '~ui/atoms/two-pane-container';

import { cn } from '~utils/style';

export interface BlogTwoPaneContainer extends TwoPaneContainerProps {
  trailing: ReactElement<HTMLDivElement>;
}

export const BlogTwoPaneContainer = ({
  className,
  leadingClassName,
  trailing,
  ...rest
}: BlogTwoPaneContainer) => {
  const { scrollYProgress } = useScroll();
  const fadeOverlayOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <TwoPaneContainer
      {...rest}
      className={cn(
        'layout-padding layout-width-limiter relative h-[unset] min-h-screen gap-x-12',
        className
      )}
      leadingClassName={cn(
        'flex flex-none flex-col justify-center pt-28 sm:sticky sm:top-1/2 sm:h-fit sm:flex-1 sm:-translate-y-1/2 sm:pt-[unset]',
        leadingClassName
      )}
      trailingClassName='pt-12 sm:pt-[30vh]'
      trailing={
        <FadeOverlay
          className='overflow-[unset] h-[unset] w-full sm:pr-2'
          overlayProps={{
            className:
              'fixed bg-gradient-to-t h-[10vh] bottom-0 top-[unset] to-transparent',
            style: {
              opacity: fadeOverlayOpacity,
            },
          }}
          overflow
        >
          {trailing}
        </FadeOverlay>
      }
    />
  );
};
