import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { SOCIALS } from '~constants/index';

import { Button, ButtonProps } from '~ui/atoms/button';
import { Icon, IconName, IconProps } from '~ui/atoms/icon';

import { cn, tw } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * InlinePlatformRedirectWithIcon
 * -----------------------------------------------------------------------------------------------*/

interface InlinePlatformRedirectWithIconProps
  extends ComponentPropsWithoutRef<'span'> {
  label: string;
  link: string;
  icon: IconName;
  iconProps?: Partial<Omit<IconProps, 'name'>>;
  buttonProps?: Partial<ButtonProps>;
}

const InlinePlatformRedirectWithIcon = ({
  label,
  link,
  icon,
  iconProps,
  buttonProps,
  className,
  ...rest
}: InlinePlatformRedirectWithIconProps) => {
  return (
    <span className={cn('whitespace-nowrap', className)} {...rest}>
      <Button
        {...buttonProps}
        className={cn('peer inline text-[1em]', buttonProps?.className)}
        size='inline'
        variant='link'
        asChild
      >
        <Link href={link}>{label}</Link>
      </Button>{' '}
      <Icon
        {...iconProps}
        className={cn(
          'inline transition-transform peer-hover:scale-110',
          iconProps?.className
        )}
        name={icon}
      />
    </span>
  );
};

InlinePlatformRedirectWithIcon.displayName = 'InlinePlatformRedirectWithIcon';

/* -------------------------------------------------------------------------------------------------
 * PlatformRedirectTwitter
 * -----------------------------------------------------------------------------------------------*/

const InlinePlatformRedirectTwitter = () => {
  return (
    <InlinePlatformRedirectWithIcon
      label='X (Twitter)'
      link={SOCIALS.twitter.url}
      icon='twitter'
    />
  );
};

InlinePlatformRedirectTwitter.displayName = 'PlatformRedirectTwitter';

/* -------------------------------------------------------------------------------------------------
 * PlatformRedirectGitHub
 * -----------------------------------------------------------------------------------------------*/

const InlinePlatformRedirectGitHub = () => {
  return (
    <InlinePlatformRedirectWithIcon
      label='GitHub'
      link={SOCIALS.github.url}
      icon='github'
    />
  );
};

InlinePlatformRedirectGitHub.displayName = 'PlatformRedirectGitHub';

/* -------------------------------------------------------------------------------------------------
 * PlatformRedirectStackOverflow
 * -----------------------------------------------------------------------------------------------*/

const InlinePlatformRedirectStackOverflow = () => {
  return (
    <InlinePlatformRedirectWithIcon
      label='StackOverflow'
      link={SOCIALS.stackoverflow.url}
      icon='stackoverflow'
      buttonProps={{ className: 'hover:text-socials-stackoverflow' }}
      iconProps={{
        color: tw.theme.colors.socials.stackoverflow,
      }}
    />
  );
};

InlinePlatformRedirectStackOverflow.displayName =
  'PlatformRedirectStackOverflow';

/* -----------------------------------------------------------------------------------------------*/

const InlinePlatformRedirectReddit = () => {
  return (
    <InlinePlatformRedirectWithIcon
      label='Reddit'
      link={SOCIALS.reddit.url}
      icon='reddit'
      buttonProps={{ className: 'hover:text-socials-reddit' }}
      iconProps={{
        color: tw.theme.colors.socials.reddit,
      }}
    />
  );
};

InlinePlatformRedirectReddit.displayName = 'InlinePlatformRedirectReddit';

/* -----------------------------------------------------------------------------------------------*/

export {
  InlinePlatformRedirectWithIcon,
  InlinePlatformRedirectTwitter,
  InlinePlatformRedirectGitHub,
  InlinePlatformRedirectStackOverflow,
  InlinePlatformRedirectReddit,
};
export type { InlinePlatformRedirectWithIconProps };
