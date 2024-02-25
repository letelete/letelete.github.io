import { ComponentPropsWithoutRef } from 'react';

import { BrunoParallaxGallery } from '~features/home/bruno-parallax-gallery';
import { Card } from '~ui/atoms/card';
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
      <Card className='col-span-3 flex min-h-60 items-center justify-center p-4'>
        <Typography variant='body-sm'>
          I started to program when I was 14. I found out I can use Lua, and C++
          for an advantage in video games. At the age of 17{' '}
          <span className='text-primary-highlighted'>
            I won the international programming contest organized by Google.
          </span>
        </Typography>
      </Card>

      <Card className='order-last col-span-3 flex min-h-60 items-center justify-center p-4 sm:order-[unset] sm:col-span-1'>
        <Typography className='px-10' variant='body-sm'>
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

      <Card className='flex min-h-60 items-center justify-center p-4'>
        <Typography className='whitespace-nowrap' variant='body-sm'>
          📍 Cracow, <span className='text-primary-highlighted'>Poland</span>
        </Typography>
      </Card>
    </div>
  );
};
