import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Video
 * -----------------------------------------------------------------------------------------------*/

interface VideoProps extends Omit<HTMLMotionProps<'video'>, 'src'> {
  fileName: string;
  disableLinkFallback?: boolean;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      fileName,
      className,
      width = '426',
      height = '240',
      controls = false,
      preload = 'auto',
      playsInline = true,
      autoPlay = true,
      loop = true,
      muted = true,
      disableLinkFallback,
      ...rest
    },
    ref
  ) => (
    <motion.video
      ref={ref}
      className={cn(
        'absolute left-0 top-0 h-full w-full object-cover',
        className
      )}
      width={width}
      height={height}
      controls={controls}
      preload={preload}
      playsInline={playsInline}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      {...rest}
    >
      <source src={`/videos/${fileName}.webm`} type='video/webm' />
      <source src={`/videos/${fileName}.mp4`} type='video/mp4' />
      <p>
        Your browser doesn&apos;t support HTML video.
        {disableLinkFallback ? null : (
          <>
            Here is a
            <a href={`/videos/${fileName}.mp4`} download={`${fileName}.mp4`}>
              link to the video
            </a>{' '}
            instead.
          </>
        )}
      </p>
    </motion.video>
  )
);

Video.displayName = 'Video';

/* -----------------------------------------------------------------------------------------------*/

export { Video };
export type { VideoProps };
