import { ComponentProps } from 'react';

import { Button } from '~ui/atoms/button';
import { asHoverableButton } from '~ui/atoms/button/decorators';
import { Icon, IconName } from '~ui/atoms/icon';
import { VisuallyHidden } from '~ui/atoms/visually-hidden';

import { cn, tw } from '~utils/style';

const [HoverableButton, hoverableProps] = asHoverableButton(Button);

export interface CarouselNavigationButton
  extends ComponentProps<typeof HoverableButton> {
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
    <HoverableButton
      className={cn(
        'flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm',
        className
      )}
      title={title}
      variant='ghost'
      size='icon'
      whileTap={{ scale: 0.8 }}
      {...hoverableProps}
      {...rest}
    >
      <Icon color={tw.theme.colors.white} name={icon} />

      <VisuallyHidden>{accessibleText}</VisuallyHidden>
    </HoverableButton>
  );
};
