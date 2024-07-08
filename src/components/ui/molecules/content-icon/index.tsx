import { useMemo } from 'react';

import { ContentType } from '~lib/content/provider';

import { Icon, IconName, IconProps } from '~ui/atoms/icon';

/* -------------------------------------------------------------------------------------------------
 * ContentIcon
 * -----------------------------------------------------------------------------------------------*/

const contentTypeToIconName: Record<ContentType, IconName> = {
  article: 'message-circle',
  'youtube-video': 'youtube',
  talk: 'mic-vocal',
};

interface ContentIconProps extends Omit<IconProps, 'name'> {
  contentType: ContentType;
}

const ContentIcon = ({ contentType, ...rest }: ContentIconProps) => {
  const name = useMemo(() => {
    return contentTypeToIconName[contentType];
  }, [contentType]);

  return <Icon name={name} {...rest} />;
};

ContentIcon.displayName = 'ContentIcon';

/* -----------------------------------------------------------------------------------------------*/

export { ContentIcon };
export type { ContentIconProps };
