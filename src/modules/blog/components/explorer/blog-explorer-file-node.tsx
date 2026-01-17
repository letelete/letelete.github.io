'use client';

import { ElementRef, forwardRef } from 'react';
import Link from 'next/link';
import { FadeOverlay } from '~/components/ui/atoms/fade-overlay';
import { Typography } from '~/components/ui/atoms/typography';
import { useHasMultipleLines } from '~/hooks/use-has-multiple-lines';
import { ContentFile } from '~/lib/content/content-tree';
import { BlogLikeButton } from '~/modules/blog/components/buttons/blog-like-button';
import { BlogShareButton } from '~/modules/blog/components/buttons/blog-share-button';
import { shortDate } from '~/utils/string';
import { cn } from '~/utils/style';

const BlogExplorerFileNode = forwardRef<
  ElementRef<'li'>,
  {
    className?: string;
    file: ContentFile;
  }
>(({ className, file }) => {
  const { ref, hasMultipleLines } = useHasMultipleLines<HTMLParagraphElement>();

  return (
    <li className={cn('', className)}>
      <Typography variant='body' className='font-bold'>
        <Link href={file.path}>
          <h3>{file.title}</h3>
        </Link>
      </Typography>

      <Typography className='flex gap-x-4' variant='body-sm' color='hint'>
        <span>{shortDate(file.date)}</span>
      </Typography>

      <FadeOverlay
        className='mt-4'
        overflow
        overlayProps={{
          className: cn('bg-gradient-to-t', !hasMultipleLines && 'opacity-0'),
        }}
      >
        <Typography ref={ref} className='line-clamp-3' variant='body-sm'>
          {file.description}
        </Typography>
      </FadeOverlay>

      <div className='mt-6 flex w-full gap-x-1 border-b border-ctx-primary-fg-decorative pb-2'>
        <BlogLikeButton />
        <BlogShareButton />
      </div>

      <div className='inline-flex flex-wrap gap-x-1'>
        <Typography className='flex gap-x-4' variant='sm' color='hint'>
          {file.tags.map((tag) => (
            <span key={`${file.slug},${tag}`}>#{tag}</span>
          ))}
        </Typography>
      </div>
    </li>
  );
});
BlogExplorerFileNode.displayName = 'BlogExplorerFileNode';

export { BlogExplorerFileNode };
