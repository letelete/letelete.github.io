'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AnimatePresence } from 'framer-motion';
import { ElementRef, forwardRef, useCallback, useId, useState } from 'react';

import { useContentLike } from '~modules/blog/blog-content/blog-content-like-button/use-content-like';

import { useGetContentStatistics } from '~services/content/use-get-content-statistics';

import { PopInMotion } from '~ui/atoms/motion';
import { popInMotionVariants } from '~ui/atoms/motion/lib';
import { TextSkeleton } from '~ui/atoms/skeleton';
import { Typography, TypographyProps } from '~ui/atoms/typography';
import { HeartButton, HeartSize } from '~ui/molecules/buttons/heart-button';

import { pluralize } from '~utils/intl';
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
  const buttonId = useId();

  const { data, isLoading } = useGetContentStatistics({
    slug: contentSlug,
  });
  const contentTotalLikes = data?.likes ?? 0;
  const userTotalLikes = data?.userTotalLikes ?? 0;

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

  return (
    <figure
      className={cn(
        'flex w-full flex-col items-center justify-center gap-y-4',
        className
      )}
    >
      <HeartButton
        aria-label='Like'
        aria-describedby={`${buttonId}:label`}
        disabled={reachedLikesLimit}
        phase={reachedLikesLimit ? 'last' : heartPhase}
        size={size}
        onClick={handleLikeClick}
      />
      {isLoading || !data ? (
        <LikesCounterSkeleton />
      ) : (
        <label id={`${buttonId}:label`} className='relative'>
          <LikesCounter
            contentTotalLikes={contentTotalLikes}
            allowPlaceholder={!isProcessingLikes}
            highlight={reachedLikesLimit}
          />

          <AnimatePresence mode='popLayout'>
            {isProcessingLikes && (
              <DraftLikesCounterProps
                className='absolute left-full top-0 -mt-2 ml-1'
                userTotalLikes={likesTotal}
                reachedLikesLimit={reachedLikesLimit}
              />
            )}
          </AnimatePresence>

          <VisuallyHidden>
            {reachedLikesLimit && 'You reached likes limit. '}
            Your total likes: {isProcessingLikes ? likesTotal : userTotalLikes}.
          </VisuallyHidden>
        </label>
      )}

      <AnimatePresence>
        {isProcessingLikes && (
          <DraftLikesFeedback
            className='absolute left-0 top-full'
            message={likeFeedback ?? undefined}
          />
        )}
      </AnimatePresence>
    </figure>
  );
};

interface LikesCounterProps extends TypographyProps {
  contentTotalLikes: number;
  highlight: boolean;
  allowPlaceholder: boolean;
}
const LikesCounter = forwardRef<
  ElementRef<typeof Typography>,
  LikesCounterProps
>(
  (
    { contentTotalLikes, highlight, allowPlaceholder, className, ...rest },
    ref
  ) => {
    const formattedLikes = `${compactNumber(contentTotalLikes)} ${pluralize(
      contentTotalLikes,
      'like',
      'likes'
    )}`;

    return (
      <Typography
        className={cn('text-center', className)}
        color={highlight ? 'primary' : 'secondary'}
        aria-label='Likes counter'
        role='status'
        ref={ref}
        {...rest}
      >
        {contentTotalLikes === 0 && allowPlaceholder
          ? 'Be the first person to like this!'
          : formattedLikes}
      </Typography>
    );
  }
);
LikesCounter.displayName = 'LikesCounter';

const LikesCounterSkeleton = () => {
  return <TextSkeleton className='max-w-20' />;
};

interface DraftLikesCounterProps extends TypographyProps {
  userTotalLikes: number;
  reachedLikesLimit: boolean;
}
const DraftLikesCounterProps = forwardRef<
  ElementRef<typeof Typography>,
  DraftLikesCounterProps
>(({ userTotalLikes, reachedLikesLimit, className, ...rest }, ref) => {
  return (
    <Typography
      ref={ref}
      className={cn('relative transition-colors', className)}
      variant='body-sm'
      color={reachedLikesLimit ? 'accent' : 'primary'}
      role='status'
      asChild
      {...rest}
    >
      <PopInMotion
        variants={{
          ...popInMotionVariants,
          initial: { ...popInMotionVariants.initial, y: 10 },
          animate: { ...popInMotionVariants.animate, y: 0 },
          exit: { ...popInMotionVariants.exit, x: -30, scale: 0.25 },
        }}
        key={userTotalLikes}
      >
        +{userTotalLikes}
      </PopInMotion>
    </Typography>
  );
});
DraftLikesCounterProps.displayName = 'DraftLikesCounterProps';

interface DraftLikesFeedbackProps extends TypographyProps {
  message?: string;
}
const DraftLikesFeedback = forwardRef<
  ElementRef<typeof Typography>,
  DraftLikesFeedbackProps
>(({ message, className, ...rest }, ref) => {
  return (
    <Typography
      key={message}
      className={cn('w-full whitespace-nowrap text-center', className)}
      asChild
      variant='body-sm'
      ref={ref}
      {...rest}
    >
      <PopInMotion>{message}</PopInMotion>
    </Typography>
  );
});
DraftLikesFeedback.displayName = 'DraftLikesFeedback';
