import { Icon, IconProps } from '~ui/atoms/icon';
import Link, { LinkProps } from 'next/link';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export interface IconLinkProps extends LinkProps {
  iconProps: IconProps;
  accessibleLabel: string;
}

export const IconLink = ({
  iconProps,
  accessibleLabel,
  ...rest
}: IconLinkProps) => {
  return (
    <Link {...rest}>
      <Icon {...iconProps} aria-hidden focusable={false} />
      <VisuallyHidden>{accessibleLabel}</VisuallyHidden>
    </Link>
  );
};
