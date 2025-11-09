'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AnimatePresence } from 'framer-motion';
import {
  ElementRef,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { LIKES_PER_USER_LIMIT } from '~api/contents/shared/controllers';

import { useGetContentStatistics } from '~services/content/use-get-content-statistics';
import { useUpdateContentLikes } from '~services/content/use-update-content-likes';

import { Button } from '~ui/atoms/button';
import { Icon } from '~ui/atoms/icon';
import { FadeInMotion, PopInMotion } from '~ui/atoms/motion';
import { popInMotionVariants } from '~ui/atoms/motion/lib';
import { TextSkeleton } from '~ui/atoms/skeleton';
import { Typography, TypographyProps } from '~ui/atoms/typography';
import { HeartSize } from '~ui/molecules/buttons/heart-button';

import { pickRandom } from '~utils/array';
import { cn } from '~utils/style';

const checkLikesLimit = (userTotalLikes: number) => {
  return userTotalLikes >= LIKES_PER_USER_LIMIT;
};

const thankYouEmojis = [
  '❤️',
  '✨',
  '🏆',
  '🚀',
  '😱',
  '🙌',
  '👀',
  '🌝',
  '🌞',
  '🌟',
  '💫',
  '🌈',
  '🤸‍♀️',
  '🎈',
];

const halfTheLikeLimit = Math.ceil(LIKES_PER_USER_LIMIT / 2);
const feedbackMessages: [
  predicate: (likes: number) => boolean,
  msg: string | null,
][] = [
  [(likes) => likes === 0, null],
  [(likes) => likes === 1, 'Thank you for the like, ✨ kind stranger ✨'],
  [(likes) => likes === halfTheLikeLimit, "we're halfway there 🗣️🗣️🗣️"],
  [
    (likes) => likes === LIKES_PER_USER_LIMIT,
    pickRandom([
      'Testing the limit 🙃?',
      'Are you bored yet? 🙄',
      "You're the best 🏆",
      "That's enough, go take some rest.",
    ]),
  ],
];
const getFeedbackMessageForLikes = (likes: number) => {
  const [, msg] =
    feedbackMessages.find(([predicate]) => predicate(likes)) ?? [];

  return msg ?? `Thank you! ${pickRandom(thankYouEmojis)}`;
};

const useLikeModel = ({
  slug,
  userTotalLikes,
  delayBeforeSubmit = 3000,
}: {
  slug: string;
  userTotalLikes: number;
  delayBeforeSubmit?: number;
}) => {
  const { mutateAsync: likeContent } = useUpdateContentLikes();
  const submitLikesTimeout = useRef<NodeJS.Timeout>();

  const [likesDraft, setLikesDraft] = useState(0);
  const likesTotal = userTotalLikes + likesDraft;
  const reachedLikesLimit = checkLikesLimit(likesTotal);

  const submitLikes = useCallback(
    async (likesAmount: number) => {
      try {
        await likeContent({ likesAmount, slug });
      } finally {
        setLikesDraft(0);
      }
    },
    [likeContent, slug]
  );

  const incrementLikes = useCallback(() => {
    clearTimeout(submitLikesTimeout.current);

    const newLikesDraft = checkLikesLimit(likesTotal)
      ? likesDraft
      : likesDraft + 1;

    submitLikesTimeout.current = setTimeout(() => {
      const likesAmount = userTotalLikes + newLikesDraft;
      void submitLikes(likesAmount);
    }, delayBeforeSubmit);

    setLikesDraft(newLikesDraft);
  }, [delayBeforeSubmit, likesDraft, likesTotal, submitLikes, userTotalLikes]);

  const likeFeedback = useMemo(
    () => getFeedbackMessageForLikes(likesTotal),
    [likesTotal]
  );

  return {
    likesDraft,
    likesTotal,
    likesLimit: LIKES_PER_USER_LIMIT,
    reachedLikesLimit,
    likeFeedback,
    incrementLikes,
  };
};

const ContentLikeButton = ({
  contentSlug,
  className,
}: {
  contentSlug: string;
  className?: string;
  size?: HeartSize;
}) => {
  const buttonId = useId();

  const { data, isLoading } = useGetContentStatistics({
    slug: contentSlug,
  });

  const contentTotalLikes = data?.likes ?? 0;
  const userLike = useLikeModel({
    slug: contentSlug,
    userTotalLikes: data?.userTotalLikes ?? 0,
  });
  const displayType =
    userLike.likesDraft > 0 ? ('draft' as const) : ('total' as const);

  const handleLikeClick = useCallback(() => {
    if (!userLike.reachedLikesLimit) {
      userLike.incrementLikes();
    }
  }, [userLike]);

  return (
    <figure
      className={cn(
        'flex w-full flex-col items-center justify-center gap-y-4',
        className
      )}
    >
      <Button
        className='gap-x-2'
        aria-label='Add heart reaction'
        disabled={userLike.reachedLikesLimit}
        onClick={handleLikeClick}
        aria-labelledby={`${buttonId}:label`}
        variant='outline'
      >
        <Icon name='heart' className='h-3 w-3' />

        {isLoading || !data ? (
          <LikesCounterSkeleton />
        ) : (
          <label id={`${buttonId}:label`} className='relative'>
            <AnimatePresence mode='wait' initial={false}>
              <FadeInMotion key={displayType}>
                <LikesCounter
                  userTotalLikes={userLike.likesTotal}
                  likesPerUser={userLike.likesLimit}
                  value={
                    displayType === 'draft'
                      ? userLike.likesTotal
                      : contentTotalLikes
                  }
                />

                <VisuallyHidden>
                  {displayType === 'draft'
                    ? `You liked ${userLike.likesTotal} time${userLike.likesTotal === 1 ? '' : 's'}.`
                    : `${contentTotalLikes} likes${contentTotalLikes === 1 ? '' : 's'}.`}
                </VisuallyHidden>
              </FadeInMotion>
            </AnimatePresence>
          </label>
        )}
      </Button>
    </figure>
  );
};
ContentLikeButton.displayName = 'ContentLikeButton';

const LikesCounter = forwardRef<
  ElementRef<typeof Typography>,
  TypographyProps & {
    value: number;
    userTotalLikes: number;
    likesPerUser: number;
  }
>(({ value, userTotalLikes, likesPerUser, className, ...rest }, ref) => {
  const reachedLikesLimit = userTotalLikes >= likesPerUser;
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
        key={value}
      >
        +{value}
      </PopInMotion>
    </Typography>
  );
});
LikesCounter.displayName = 'LikesCounter';

const LikesCounterSkeleton = () => {
  return <TextSkeleton className='max-w-20' />;
};
LikesCounterSkeleton.displayName = 'LikesCounterSkeleton';

export { ContentLikeButton };
