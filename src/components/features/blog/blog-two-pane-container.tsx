import {
  ComponentPropsWithRef,
  ReactElement,
  cloneElement,
  useRef,
} from 'react';

import { useElementGeometry } from '~hooks/use-element-geometry';

import {
  TwoPaneContainer,
  TwoPaneContainerProps,
} from '~ui/atoms/two-pane-container';

import { cn } from '~utils/style';

export interface BlogTwoPaneContainer extends TwoPaneContainerProps {
  trailing: ReactElement<ComponentPropsWithRef<'div'>>;
  leading: ReactElement<ComponentPropsWithRef<'div'>>;
}

export const BlogTwoPaneContainer = ({
  className,
  leadingClassName,
  trailingClassName,
  leading,
  trailing,
  ...rest
}: BlogTwoPaneContainer) => {
  const leadingRef = useRef<HTMLDivElement>(null);
  const leadingGeometry = useElementGeometry(leadingRef);

  return (
    <TwoPaneContainer
      {...rest}
      className={cn(
        'layout-padding layout-width-limiter flex gap-x-12',
        className
      )}
      leadingClassName={cn('flex flex-col justify-center', leadingClassName)}
      trailingClassName={cn(trailingClassName)}
      leading={cloneElement(leading, {
        ...leading.props,
        ref: leadingRef,
      })}
      trailing={cloneElement(trailing, {
        ...trailing.props,
        style: {
          ...trailing.props.style,
          paddingTop: `${leadingGeometry?.top}px`,
        },
      })}
    />
  );
};
