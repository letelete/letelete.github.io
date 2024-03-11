import { AboutMeBentoBox } from '~features/about/about-me-bento-box';

import { Typography } from '~ui/atoms/typography';

export const AboutSection = () => {
  return (
    <div className='layout-width-limiter layout-padding flex min-h-screen w-full justify-center'>
      <figure className='flex flex-col'>
        <Typography className='ml-4' asChild>
          <h2>Get to know me</h2>
        </Typography>

        <AboutMeBentoBox className='mt-4' />
      </figure>
    </div>
  );
};
