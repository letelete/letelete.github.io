'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '~/utils/style';

const Player = dynamic(
  async () => (await import('@lottiefiles/react-lottie-player')).Player,
  { ssr: false }
);

const LottiePlayer = ({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Player>) => {
  return <Player className={cn(className)} {...rest} />;
};
LottiePlayer.displayName = 'LottiePlayer';

export { LottiePlayer };
