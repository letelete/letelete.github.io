import { ComponentPropsWithoutRef, useCallback } from 'react';

import { PixelArtHeartEmoji } from '~ui/atoms/emojis';
import { FadeOverlay } from '~ui/atoms/fade-overlay';
import { HeartBeatMotion } from '~ui/atoms/motion';
import { ParallaxMarquee } from '~ui/atoms/parallax-marquee';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface InterestsSectionProps
  extends ComponentPropsWithoutRef<'div'> {}

export const InterestsSection = ({
  className,
  ...rest
}: InterestsSectionProps) => {
  const renderOuterItem = useCallback(
    (label: string) => (
      <Typography color='highlight' key={label}>
        {label}
      </Typography>
    ),
    []
  );

  const renderInnerItem = useCallback(
    (label: string) => <Typography key={label}>{label}</Typography>,
    []
  );

  return (
    <section className={cn('flex flex-col', className)} {...rest}>
      <HeartBeatMotion className='mx-auto mb-4'>
        <PixelArtHeartEmoji />
      </HeartBeatMotion>

      <div className='relative'>
        <FadeOverlay overlayClassName='bg-gradient-to-r left-0 w-[40vw]'>
          <FadeOverlay overlayClassName='bg-gradient-to-l w-[40vw] left-[unset] right-0'>
            <ParallaxMarquee baseVelocity={1}>
              {professional.map(renderOuterItem)}
            </ParallaxMarquee>

            <ParallaxMarquee baseVelocity={-2}>
              {professional.map(renderInnerItem)}
            </ParallaxMarquee>

            <ParallaxMarquee baseVelocity={-2}>
              {personal.map(renderInnerItem)}
            </ParallaxMarquee>

            <ParallaxMarquee baseVelocity={1}>
              {personal.map(renderOuterItem)}
            </ParallaxMarquee>
          </FadeOverlay>
        </FadeOverlay>
      </div>

      <HeartBeatMotion className='mx-auto mt-4'>
        <PixelArtHeartEmoji />
      </HeartBeatMotion>
    </section>
  );
};

const professional = [
  'React',
  'Next.js',
  'Shadcn',
  'Atomic Design',
  'Typescript',
  'Tailwind',
  'React native',
  'Material Design',
  'Human Interface Guidelines',
  'Framer-motion',
  'UI Engineering',
  'Performance',
  'Accessibility',
  'Animations',
  'Public speaking',
  'Knowledge sharing',
  'Technical recruiting',
  'UI/UX',
];

const personal = [
  'Tennis',
  'Minimalism',
  'Coffee',
  'Arthouse film',
  'Urban planning',
  'Video games',
  'Content creation',
  'Self-development',
  'Life optimization',
  'House music',
  'Indie bands',
  'Spotify wrapped',
  'Filmweb',
];
