import { ComponentPropsWithoutRef, useCallback } from 'react';

import { FadeOverlay } from '~ui/atoms/fade-overlay';
import { Typography } from '~ui/atoms/typography';
import { ParallaxMarquee } from '~ui/organisms/parallax-marquee';

import { cn } from '~utils/style';

export interface InterestsSectionProps
  extends ComponentPropsWithoutRef<'div'> {}

export const InterestsSection = ({
  className,
  ...rest
}: InterestsSectionProps) => {
  const renderOuterItem = useCallback(
    (label: string) => <Typography key={label}>{label}</Typography>,
    []
  );

  const renderInnerItem = useCallback(
    (label: string) => (
      <Typography color='secondary' key={label}>
        {label}
      </Typography>
    ),
    []
  );

  return (
    <section className={cn('flex flex-col', className)} {...rest}>
      <div className='relative'>
        <FadeOverlay
          overlayProps={{ className: 'bg-gradient-to-r left-0 w-[40vw]' }}
        >
          <FadeOverlay
            overlayProps={{
              className: 'bg-gradient-to-l w-[40vw] left-[unset] right-0',
            }}
          >
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
    </section>
  );
};

const professional = [
  'React',
  'Next.js',
  'shadcn/ui',
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
