import { SocialButtons } from '~features/social-buttons';
import { Typography } from '~ui/atoms/typography';

export const HeroSection = () => {
  return (
    <div className='layout-width-limiter layout-padding flex h-[95vh] w-full items-center'>
      <figure className='flex flex-col'>
        <Typography color='highlight' asChild>
          <h1>Bruno Kawka</h1>
        </Typography>

        <Typography asChild>
          <h2>Frontend Engineer</h2>
        </Typography>

        <Typography
          className='mt-6'
          color='default'
          variant='body-sm'
          asChild
          balance
        >
          <p>
            I specialize in creating amazing UI experiences with{' '}
            <span className='text-gray-100'>
              attention to details, performance, and accessibility.
            </span>
          </p>
        </Typography>

        <SocialButtons />
      </figure>
    </div>
  );
};
