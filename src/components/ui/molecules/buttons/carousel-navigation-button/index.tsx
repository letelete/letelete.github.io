import { ComponentProps } from 'react';

import { Button } from '~ui/atoms/button';
import { Icon, IconName } from '~ui/atoms/icon';
import { VisuallyHidden } from '~ui/atoms/visually-hidden';

import { cn, tw } from '~utils/style';

export interface CarouselNavigationButton
  extends ComponentProps<typeof Button> {
  title: string;
  icon: IconName;
  accessibleText: string;
}

export const CarouselNavigationButton = ({
  className,
  title,
  icon,
  accessibleText,
  ...rest
}: CarouselNavigationButton) => {
  return (
    <Button
      className={cn(
        'flex items-center justify-center rounded-full bg-ctx-button/50 backdrop-blur-sm',
        className
      )}
      title={title}
      variant='ghost'
      size='icon'
      whileTap={{ scale: 0.8 }}
      initial='idle'
      whileHover='hovered'
      whileFocus='hovered'
      {...rest}
    >
      <Icon color={tw.theme.colors.ctx.button.fg.solid} name={icon} />

      <VisuallyHidden>{accessibleText}</VisuallyHidden>
    </Button>
  );
};
