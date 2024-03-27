import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Image,
  Lightbulb,
  Linkedin,
  LucideProps,
  Mail,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';
import useTailwind from 'src/hooks/use-tailwind';

import { cn } from '~utils/style';

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const tw = useTailwind();
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    throw new Error(`Icon with name "${name}" not found.`);
  }

  return (
    <LucideIcon
      className={cn('aspect-square h-4 min-h-4 w-4 min-w-4', className)}
      color={tw.theme.colors.primary.DEFAULT}
      strokeWidth={1.5}
      size={16}
      absoluteStrokeWidth
      {...props}
    />
  );
};

const icons = {
  'arrow-left': ArrowLeft,
  'arrow-up-right': ArrowUpRight,
  github: Github,
  image: Image,
  lightbulb: Lightbulb,
  linkedin: Linkedin,
  mail: Mail,
  send: Send,
  twitter: Twitter,
  youtube: Youtube,
} as const;
