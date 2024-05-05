import Image from 'next/image';
import { memo } from 'react';

import { ImageItem } from '~lib/images/provider';

export interface ImagesPreloaderProps {
  items: ImageItem[];
  width?: number;
  height?: number;
}

const ImagesPreloader = memo(
  ({ items, width = 1, height = 1 }: ImagesPreloaderProps) => (
    <div className='hidden' aria-hidden>
      {items.map((item) => (
        <Image
          aria-hidden
          key={`preloaded-${JSON.stringify(item.src)}`}
          className='hidden'
          src={item.src}
          alt=''
          width={width}
          height={height}
          priority
        />
      ))}
    </div>
  )
);

ImagesPreloader.displayName = 'ImagesPreloader';

export { ImagesPreloader };
