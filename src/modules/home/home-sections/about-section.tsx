'use client';

import { Typography } from '~ui/atoms/typography';

export const AboutSection = () => {
  return (
    <section className='layout-width-limiter layout-padding flex w-full justify-center'>
      <figure className='flex flex-col'>
        <Typography className='ml-4' asChild>
          <h2>Get to know me</h2>
        </Typography>
      </figure>
    </section>
  );
};
