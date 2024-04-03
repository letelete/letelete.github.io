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
  return (
    <figure
      className={cn(
        'my-10 flex w-full flex-col items-center justify-center',
        className
      )}
    >
      <video
        className='mx-auto block w-full grow rounded-md border-none object-cover p-0'
        src={src}
        aria-label={title}
        autoPlay
        muted
        loop
        playsInline
        controls
      />

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
