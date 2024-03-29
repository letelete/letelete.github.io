import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';

import { cn, tw } from '~utils/style';

export interface GoBackButtonProps {
  href: string;
  className?: string;
}

const MotionButton = motion(Button);

const motionVariants = {
  open: { opacity: 1, x: 0 },
  hide: { opacity: 0, x: 20 },
  act: { x: -5 },
};

export const GoBackButton = ({ href, className }: GoBackButtonProps) => {
  return (
    <MotionButton
      className={cn(className)}
      size='inline'
      variant='link'
      initial='open'
      exit='hide'
      whileHover='act'
      whileFocus='act'
      asChild
    >
      <Link href={href}>
        <motion.span variants={motionVariants}>
          <Icon name='arrow-left' color={tw.theme.colors.primary.highlighted} />
        </motion.span>
        Go back
      </Link>
    </MotionButton>
  );
};
