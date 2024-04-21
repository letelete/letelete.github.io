'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';

import { useContentLike } from '~features/blog/blog-content/blog-content-like-button/use-content-like';

import { useGetContentStatistics } from '~services/content/use-get-content-statistics';

import { Typography } from '~ui/atoms/typography';
import { HeartButton, HeartSize } from '~ui/molecules/buttons/heart-button';

import { compactNumber } from '~utils/string';
import { cn } from '~utils/style';

export interface BlogContentLikeButtonProps {
  contentSlug: string;
  className?: string;
  size?: HeartSize;
}

export const BlogContentLikeButton = ({
  contentSlug,
  className,
  size,
}: BlogContentLikeButtonProps) => {
  const { data, isLoading, isError } = useGetContentStatistics({
    slug: contentSlug,
  });
  const { likes: contentTotalLikes, userTotalLikes } = data;

  const [heartPhase, setHeartPhase] = useState(0);

  const {
    likesDraft,
    likesTotal,
    incrementLikes,
    likeFeedback,
    reachedLikesLimit,
  } = useContentLike({
    slug: contentSlug,
    userTotalLikes,
  });

  const isProcessingLikes = likesDraft > 0;

  const handleLikeClick = useCallback(
    (phase: number, phasesLength: number) => {
      if (!reachedLikesLimit) {
        setHeartPhase(Math.min(phase + 1, phasesLength - 1));
        incrementLikes();
      }
    },
    [incrementLikes, reachedLikesLimit]
  );

  if (isLoading || isError) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-y-4',
        className
      )}
    >
      {isProcessingLikes && likeFeedback && (
        <AnimatePresence>
          <motion.div
            className='absolute bottom-full mb-4 w-full text-center'
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, y: 30, scale: 0.5 }}
            transition={{ type: 'spring', delay: 4 }}
            key={likeFeedback}
          >
            <Typography asChild>
              <span>{likeFeedback}</span>
            </Typography>
          </motion.div>
        </AnimatePresence>
      )}

      <HeartButton
        aria-label='Like'
        aria-describedby='heart-button-description'
        disabled={reachedLikesLimit}
        phase={reachedLikesLimit ? 'last' : heartPhase}
        size={size}
        onClick={handleLikeClick}
      />

      <VisuallyHidden id='heart-button-description' aria-live='polite'>
        Your total likes: {likesTotal}.
        {reachedLikesLimit && ' You reached likes limit.'}
      </VisuallyHidden>

      <Typography
        className='relative transition-colors'
        color={reachedLikesLimit ? 'accent' : 'highlight'}
        asChild
      >
        <div>
          <p aria-label='Likes counter' role='status'>
            {contentTotalLikes === 0 && !isProcessingLikes
              ? 'Be the first person to like this!'
              : `${compactNumber(contentTotalLikes)} likes`}
          </p>

          <AnimatePresence mode='popLayout'>
            {isProcessingLikes && likesTotal > 0 && (
              <Typography
                variant='body-sm'
                className='transition-colors'
                color={reachedLikesLimit ? 'accent' : 'default'}
                role='status'
                asChild
              >
                <motion.p
                  className='absolute -top-2 left-full ml-1'
                  initial={{ scale: 0.5, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, y: -30, scale: 0.5 }}
                  transition={{ type: 'spring' }}
                  key={likesTotal}
                >
                  <span aria-hidden>{`+${likesTotal}`}</span>
                </motion.p>
              </Typography>
            )}
          </AnimatePresence>
        </div>
      </Typography>
    </div>
  );
};
