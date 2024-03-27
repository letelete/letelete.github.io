import { ReactElement, cloneElement } from 'react';

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
  return (
    <TwoPaneContainer
      {...rest}
      className={cn(
        'layout-padding layout-width-limiter relative h-[unset] min-h-screen gap-x-12',
        className
      )}
      leadingClassName={cn(
        'sticky top-1/2 flex h-fit -translate-y-1/2 flex-col justify-center',
        leadingClassName
      )}
      trailing={
        <FadeOverlay
          className='overflow-[unset] h-[unset] w-full pr-2'
          overlayClassName='fixed bg-gradient-to-t h-[10vh] bottom-0 top-[unset] to-transparent'
          overflow
        >
          {cloneElement(trailing, {
            ...trailing.props,
            style: {
              ...trailing.props.style,
              paddingTop: '30vh',
              paddingBottom: '20vh',
            },
          })}
        </FadeOverlay>
      }
    />
  );
};
