import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { Skeleton } from '~ui/atoms/skeleton';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface MdxVideoPlayerProps {
  src: string;
  title: string;
  className?: string;
  caption?: string;
}

export const MdxVideoPlayer = ({
  caption,
  className,
  src,
  title,
}: MdxVideoPlayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <figure
      ref={ref}
      className={cn(
        'my-10 flex w-full flex-col items-center justify-center',
        className
      )}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        {isInView ? (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            preload='none'
            className='m-0 block aspect-video h-full w-full rounded-md border-none p-0'
            src={src}
            aria-label={title}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        ) : (
          <Skeleton className='bg-background-secondary flex aspect-video h-full w-full items-center justify-center rounded-md p-8'>
            <Typography weight='normal'>Loading video</Typography>
          </Skeleton>
        )}
      </AnimatePresence>

      {caption && (
        <Typography
          className='mt-2 text-center'
          variant='body-sm'
          color='hint'
          weight='normal'
          asChild
        >
          <figcaption>{caption}</figcaption>
        </Typography>
      )}
    </figure>
  );
};
