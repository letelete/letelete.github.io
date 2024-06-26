import Image, { ImageProps } from 'next/image';

import { cn } from '~utils/style';

import coffee from '/public/emojis/coffee.webp';
import laptop from '/public/emojis/laptop.webp';
import manClimbing from '/public/emojis/man-climbing.webp';
import microphone from '/public/emojis/microphone.webp';
import pencil from '/public/emojis/pencil.webp';
import pixelArtHeart from '/public/emojis/pixel-art-heart.svg';
import roundPushpin from '/public/emojis/round-pushpin.webp';
import thinkingFace from '/public/emojis/thinking-face.webp';
import trophy from '/public/emojis/trophy.webp';
import unicorn from '/public/emojis/unicorn.webp';
import videoCamera from '/public/emojis/video-camera.webp';

export type BaseEmojiProps = ImageProps;

export type EmojiProps = Partial<BaseEmojiProps>;

const BaseEmoji = ({ className, ...rest }: BaseEmojiProps) => {
  return (
    <Image className={cn('inline aspect-square w-4', className)} {...rest} />
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

export const PixelArtHeartEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Pixel art heart' src={pixelArtHeart} {...rest} />;
};

export const UnicornEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Unicorn' src={unicorn} {...rest} />;
};

export const ThinkingFaceEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Thinking face' src={thinkingFace} {...rest} />;
};

export const ManClimbingEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Man climbing' src={manClimbing} {...rest} />;
};

export const CoffeeEmoji = ({ ...rest }: EmojiProps) => {
  return <BaseEmoji alt='Coffee' src={coffee} {...rest} />;
};
