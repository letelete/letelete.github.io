import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface MdxSpeakerDeckEmbedProps {
  src: string;
  title: string;
  className?: string;
  caption?: string;
}

export const MdxSpeakerDeckEmbed = ({
  caption = 'Slides from the presentation',
  className,
  src,
  title,
}: MdxSpeakerDeckEmbedProps) => {
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
        allowFullScreen
        data-ratio='1.7777777777777777'
        referrerPolicy='strict-origin-when-cross-origin'
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
