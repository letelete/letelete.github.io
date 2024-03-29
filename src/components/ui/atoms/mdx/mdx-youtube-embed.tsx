import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface MdxYoutubeEmbedProps {
  src: string;
  title: string;
  className?: string;
  caption?: string;
}

export const MdxYoutubeEmbed = ({
  caption,
  className,
  src,
  title,
}: MdxYoutubeEmbedProps) => {
  return (
    <figure
      className={cn(
        'my-10 flex w-full flex-col items-center justify-center',
        className
      )}
    >
      <iframe
        loading='lazy'
        className='m-0 block aspect-video w-full grow border-none p-0'
        src={src}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
        frameBorder={0}
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
