'use client';

import { Testimonial } from '~ui/widgets/testimonial';

/* -------------------------------------------------------------------------------------------------
 * HomeFooter
 * -----------------------------------------------------------------------------------------------*/

const HomeFooter = () => {
  return (
    <footer className='layout-width-limiter layout-padding bg-ctx-accent-secondary flex min-h-screen w-full items-center justify-center'>
      <Testimonial />
    </footer>
  );
};

HomeFooter.displayName = 'HomeFooter';

/* -----------------------------------------------------------------------------------------------*/

export { HomeFooter };
