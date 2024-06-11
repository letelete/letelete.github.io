import Link, { LinkProps } from 'next/link';
import { ElementRef, forwardRef } from 'react';

import { Icon, IconProps } from '~ui/atoms/icon';
import { VisuallyHidden } from '~ui/atoms/visually-hidden';

/* -------------------------------------------------------------------------------------------------
 * IconLink
 * -----------------------------------------------------------------------------------------------*/

interface IconLinkProps extends LinkProps {
  iconProps: IconProps;
  accessibleLabel: string;
}

const IconLink = forwardRef<ElementRef<typeof Link>, IconLinkProps>(
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

/* -----------------------------------------------------------------------------------------------*/

export { IconLink };
export type { IconLinkProps };
