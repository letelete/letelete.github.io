'use client';

import Image, { ImageProps } from 'next/image';

import trophy from '/public/emojis/trophy.png';

export type EmojiProps = Partial<ImageProps>;

export const TrophyEmoji = ({ ...rest }: EmojiProps) => {
  return <Image alt='trophy' src={trophy} {...rest} />;
};
