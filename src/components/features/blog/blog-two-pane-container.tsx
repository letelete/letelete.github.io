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
      className={cn('layout-padding layout-width-limiter gap-x-12', className)}
      leadingClassName={cn('flex flex-col justify-center', leadingClassName)}
      trailing={
        <FadeOverlay
          className='h-full w-full overflow-auto pr-2'
          overlayClassName='fixed bg-gradient-to-t h-[20vh] bottom-0 top-[unset]'
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
