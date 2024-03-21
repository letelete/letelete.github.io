import {
  TwoPaneContainer,
  TwoPaneContainerProps,
} from '~ui/atoms/two-pane-container';

import { cn } from '~utils/style';

export interface BlogTwoPaneContainer extends TwoPaneContainerProps {}

export const BlogTwoPaneContainer = ({
  className,
  leadingClassName,
  trailingClassName,
  ...rest
}: BlogTwoPaneContainer) => {
  return (
    <TwoPaneContainer
      className={cn(
        'layout-padding layout-width-limiter flex gap-x-12',
        className
      )}
      leadingClassName={cn('flex flex-col justify-center', leadingClassName)}
      trailingClassName={cn(trailingClassName)}
      {...rest}
    />
  );
};
