'use client';

import Image, { ImageProps } from 'next/image';

import { cn } from '~utils/style';
import microphone from '/public/emojis/microphone.png';
import pencil from '/public/emojis/pencil.png';
import roundPushpin from '/public/emojis/round-pushpin.png';
import trophy from '/public/emojis/trophy.png';

export type BaseEmojiProps = ImageProps;

export type EmojiProps = Partial<BaseEmojiProps>;

const BaseEmoji = ({ className, ...rest }: BaseEmojiProps) => {
  return (
    <Image
      className={cn('inline aspect-square h-[1rem] w-[1em]', className)}
      {...rest}
    />
  );
};

export const TrophyEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='trophy' src={trophy} {...rest} />;
};

export const MicrophoneEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='microphone' src={microphone} {...rest} />;
};

export const PencilEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='pencil' src={pencil} {...rest} />;
};

export const RoundPushpinEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='round-pushpin' src={roundPushpin} {...rest} />;
};
