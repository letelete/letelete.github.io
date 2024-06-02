import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '~ui/atoms/button';
import { asHoverableButton } from '~ui/atoms/button/decorators';
import { Icon } from '~ui/atoms/icon';

import { cn, tw } from '~utils/style';

export interface GoBackButtonProps {
  href: string;
  className?: string;
}

const [MotionButton, hoverableProps] = asHoverableButton(Button);

const motionVariants = {
  hide: { opacity: 0, x: 20 },
  idle: { opacity: 1, x: 0 },
  hovered: { x: -5 },
};

export const GoBackButton = ({ href, className }: GoBackButtonProps) => {
  return (
    <MotionButton
      {...hoverableProps}
      className={cn(className)}
      size='inline'
      variant='link'
      exit='hide'
      asChild
    >
      <Link href={href}>
        <motion.span variants={motionVariants}>
          <Icon
            name='arrow-left'
            color={tw.theme.colors.ctx.primary.fg.solid}
          />
        </motion.span>
        Go back
      </Link>
    </MotionButton>
  );
};
