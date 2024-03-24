import Image, { ImageProps } from 'next/image';

import { cn } from '~utils/style';

import laptop from '/public/emojis/laptop.webp';
import microphone from '/public/emojis/microphone.webp';
import pencil from '/public/emojis/pencil.webp';
import pixelArtHeart from '/public/emojis/pixel-art-heart.svg';
import roundPushpin from '/public/emojis/round-pushpin.webp';
import trophy from '/public/emojis/trophy.webp';
import unicorn from '/public/emojis/unicorn.webp';
import videoCamera from '/public/emojis/video-camera.webp';
import whiteQuestionMark from '/public/emojis/white-question-mark.webp';

export type BaseEmojiProps = ImageProps;

export type EmojiProps = Partial<BaseEmojiProps>;

const BaseEmoji = ({ className, ...rest }: BaseEmojiProps) => {
  return (
    <Image
      className={cn('inline aspect-square h-4 min-h-4 w-4 min-w-4', className)}
      {...rest}
      priority
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

export const PixelArtHeartEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Pixel art heart' src={pixelArtHeart} {...rest} />;
};

export const UnicornEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Unicorn' src={unicorn} {...rest} />;
};
