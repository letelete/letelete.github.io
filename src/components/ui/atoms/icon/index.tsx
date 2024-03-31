import {
  AlertOctagon,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
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
import { FC } from 'react';

import { cn, tw } from '~utils/style';

export interface IconProps extends LucideProps {
  name: IconName;
}

export type IconName = Parameters<(typeof icons)['get']>[0];

export const Icon = ({ name, className, ...props }: IconProps) => {
  const IconElement = icons.has(name) ? icons.get(name) : undefined;

  if (!IconElement) {
    throw new Error(`No icon with name "${name}" found`);
  }

  return (
    <IconElement
      className={cn('aspect-square h-4 min-h-4 w-4 min-w-4', className)}
      color={tw.theme.colors.primary.DEFAULT}
      strokeWidth={1.5}
      size={16}
      absoluteStrokeWidth
      {...props}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const icons = new Map([
  ['alert-octagon', AlertOctagon],
  ['arrow-left', ArrowLeft],
  ['arrow-up-right', ArrowUpRight],
  ['chevron-down', ChevronDown],
  ['chevron-up', ChevronUp],
  ['github', Github],
  ['image', Image],
  ['lightbulb', Lightbulb],
  ['linkedin', Linkedin],
  ['mail', Mail],
  ['send', Send],
  ['twitter', Twitter],
  ['youtube', Youtube],
] as const satisfies readonly (readonly [string, FC<LucideProps>])[]);
