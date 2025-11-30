import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { Icon, IconProps } from '~ui/atoms/icon';
import { VisuallyHidden } from '~ui/atoms/visually-hidden';

interface IconLinkProps extends LinkProps {
  iconProps: IconProps;
  accessibleLabel: string;
}

const IconLink = React.forwardRef<React.ElementRef<typeof Link>, IconLinkProps>(
  ({ iconProps, accessibleLabel, ...rest }, ref) => {
    return (
      <Link ref={ref} {...rest}>
        <Icon {...iconProps} aria-hidden focusable={false} />
        <VisuallyHidden>{accessibleLabel}</VisuallyHidden>
      </Link>
    );
  }
);

IconLink.displayName = 'IconLink';

export { IconLink };
export type { IconLinkProps };
