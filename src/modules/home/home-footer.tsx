'use client';

import { Testimonial } from '~ui/widgets/testimonial';

/* -------------------------------------------------------------------------------------------------
 * HomeFooter
 * -----------------------------------------------------------------------------------------------*/

const HomeFooter = () => {
  return (
    <footer className='layout-width-limiter layout-padding flex min-h-screen w-full items-center justify-center bg-ctx-accent-secondary'>
      <Testimonial />
    </footer>
  );
};

HomeFooter.displayName = 'HomeFooter';

/* -----------------------------------------------------------------------------------------------*/

export { HomeFooter };
