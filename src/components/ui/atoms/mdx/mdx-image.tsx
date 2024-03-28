import ImagePrimitive, { ImageProps as ImagePrimitiveProps } from 'next/image';

import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface MdxImageProps extends ImagePrimitiveProps {
  caption?: string;
}

export const MdxImage = ({
  caption,
  className,
  src,
  alt,
  height,
  width,
  ...rest
}: MdxImageProps) => {
  return (
    <figure className={cn('my-10 flex flex-col justify-center', className)}>
      <ImagePrimitive
        className='transition'
        src={src}
        alt={alt}
        height={height}
        width={width}
        layout='responsive'
        quality={100}
        loading='lazy'
        {...rest}
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
