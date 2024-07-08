import {
  AlertOctagon,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Github,
  Image,
  Lightbulb,
  Linkedin,
  LucideProps,
  Mail,
  MessageCircle,
  MicVocal,
  Rocket,
  Send,
  Square,
  Twitter,
  Volume2,
  Youtube,
} from 'lucide-react';
import { FC } from 'react';

import { RedditIcon, StackOverflowIcon } from '~ui/atoms/icon/custom';

import { cn, tw } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Icon
 * -----------------------------------------------------------------------------------------------*/

interface IconProps extends LucideProps {
  name: IconName;
}

type IconName = Parameters<(typeof icons)['get']>[0];

const Icon = ({ size = 16, name, className, ...props }: IconProps) => {
  const IconElement = icons.has(name) ? icons.get(name) : undefined;

  if (!IconElement) {
    throw new Error(`No icon with name "${name}" found`);
  }

  return (
    <IconElement
      className={cn('aspect-square', className)}
      style={{
        minWidth: size,
        maxWidth: size,
        minHeight: size,
        maxHeight: size,
      }}
      color={tw.theme.colors.ctx.primary.fg.solid}
      strokeWidth={1}
      size={size}
      absoluteStrokeWidth
      {...props}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

const icons = new Map([
  ['alert-octagon', AlertOctagon],
  ['arrow-left', ArrowLeft],
  ['arrow-up-right', ArrowUpRight],
  ['arrow-up', ArrowUp],
  ['chevron-down', ChevronDown],
  ['chevron-up', ChevronUp],
  ['github', Github],
  ['image', Image],
  ['lightbulb', Lightbulb],
  ['linkedin', Linkedin],
  ['mail', Mail],
  ['message-circle', MessageCircle],
  ['mic-vocal', MicVocal],
  ['reddit', RedditIcon],
  ['rocket', Rocket],
  ['send', Send],
  ['square', Square],
  ['stackoverflow', StackOverflowIcon],
  ['twitter', Twitter],
  ['volume-2', Volume2],
  ['youtube', Youtube],
] as const satisfies readonly (readonly [string, FC<LucideProps>])[]);

/* -----------------------------------------------------------------------------------------------*/

export { Icon, icons };
export type { IconProps, IconName };
