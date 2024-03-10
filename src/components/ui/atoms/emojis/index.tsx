'use client';

import Image, { ImageProps } from 'next/image';

import { cn } from '~utils/style';

import laptop from '/public/emojis/laptop.png';
import microphone from '/public/emojis/microphone.png';
import pencil from '/public/emojis/pencil.png';
import roundPushpin from '/public/emojis/round-pushpin.png';
import trophy from '/public/emojis/trophy.png';
import videoCamera from '/public/emojis/video-camera.png';
import whiteQuestionMark from '/public/emojis/white-question-mark.png';

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
  return <BaseEmoji alt='Trophy' src={trophy} {...rest} />;
};

export const MicrophoneEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Microphone' src={microphone} {...rest} />;
};

export const PencilEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Pencil' src={pencil} {...rest} />;
};

export const RoundPushpinEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Round pushpin' src={roundPushpin} {...rest} />;
};

export const VideoCameraEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Video camera' src={videoCamera} {...rest} />;
};

export const LaptopEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Laptop' src={laptop} {...rest} />;
};

export const WhiteQuestionMarkEmoji = ({ ...rest }: EmojiProps) => {
  return (
    <BaseEmoji alt='White question mark' src={whiteQuestionMark} {...rest} />
  );
};
