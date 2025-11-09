import { Icon, IconProps } from '~ui/atoms/icon';

const ContentIcon = ({ name = 'file-text', ...rest }: IconProps) => (
  <Icon name={name} {...rest} />
);

ContentIcon.displayName = 'ContentIcon';

export { ContentIcon };
