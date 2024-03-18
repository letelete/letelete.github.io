import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { GOOGLE_CODE_IN_ARTICLE } from '~constants/index';

import { BrunoParallaxGallery } from '~features/about/bruno-parallax-gallery';

import { Button } from '~ui/atoms/button';
import { Card } from '~ui/atoms/card';
import { RoundPushpinEmoji, TrophyEmoji } from '~ui/atoms/emojis';
import { FadeOverlay } from '~ui/atoms/fade-overlay';
import { FallingEntities } from '~ui/atoms/falling-entities';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface AboutMeBentoBoxProps extends ComponentPropsWithoutRef<'div'> {}

export const AboutMeBentoBox = ({
  className,
  ...rest
}: AboutMeBentoBoxProps) => {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 grid-rows-3 gap-2 sm:grid-cols-3 sm:grid-rows-2',
        className
      )}
      {...rest}
    >
      <Card className='relative col-span-3 flex min-h-60 flex-col items-center justify-center overflow-hidden sm:flex-row'>
        <FadeOverlay
          className='absolute left-[1px] top-[1px] z-0 h-1/2 w-[calc(100%-1px)] flex-1 p-1 sm:relative sm:h-[calc(100%-1px)]'
          overlayClassName='from-card-intense sm:to-card-intense/30 to-card-intense/70 bg-gradient-to-t sm:bg-gradient-to-l'
        >
          <FallingEntities>
            <TrophyEmoji className='h-6 w-6 -rotate-45' />
          </FallingEntities>
        </FadeOverlay>

        <div className='relative z-10 p-8 sm:flex-1'>
          <Typography variant='body-sm'>
            I started to program when I was 14. I found out I can use Lua, and
            C++ for an advantage in video games. At the age of 17{' '}
            <span className='text-primary-highlighted'>
              I won the international programming contest organized by Google.
            </span>
          </Typography>

          <Button className='mt-4' variant='link' size='inline' asChild>
            <Link href={GOOGLE_CODE_IN_ARTICLE}>Read my contest story</Link>
          </Button>
        </div>
      </Card>

      <Card className='order-last col-span-3 flex min-h-60 items-center justify-center p-8 sm:order-[unset] sm:col-span-1'>
        <Typography variant='body-sm'>
          I’m passionate about software engineering, and UI/UX design.{' '}
          <span className='text-primary-highlighted'>
            Frontend development allows me to experience the best of both
            worlds.
          </span>
        </Typography>
      </Card>

      <Card className='flex min-h-60 items-center justify-center p-2'>
        <div className='relative h-full w-full overflow-hidden rounded-lg'>
          <BrunoParallaxGallery />
        </div>
      </Card>

      <Card className='flex min-h-60 items-center justify-center p-8'>
        <Typography className='text-center' variant='body-sm'>
          <RoundPushpinEmoji className='mr-2' />
          {'Cracow, '}
          <span className='text-primary-highlighted'>{'Poland'}</span>
        </Typography>
      </Card>
    </div>
  );
};
