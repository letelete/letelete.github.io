'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { LIKES_PER_USER_LIMIT } from '~api/contents/shared/controllers';

import { useUpdateContentLikes } from '~services/content/use-update-content-likes';

import { pickRandom } from '~utils/array';

export interface UseContentLikeProps {
  slug: string;
  userTotalLikes: number;
  delayBeforeSubmit?: number;
}

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

export const useContentLike = ({
  slug,
  userTotalLikes,
  delayBeforeSubmit = 3000,
}: UseContentLikeProps) => {
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

  const likeFeedback = useMemo(() => {
    if (likesTotal <= 0) {
      return null;
    }
    if (!reachedLikesLimit) {
      const emoji = pickRandom(thankYouEmojis);
      if (likesTotal === 1) {
        return `Thank you for the like, kind stranger ${emoji}`;
      }
      return `Thank you for ${likesTotal} likes ${emoji}`;
    }
    return pickRandom([
      'Testing the limit 🙃?',
      'Are you bored yet? 🙄',
      "That's very generous of you...",
      "You're the best 🏆",
    ]);
  }, [likesTotal, reachedLikesLimit]);

  return {
    likesDraft,
    likesTotal,
    reachedLikesLimit,
    likeFeedback,
    incrementLikes,
  };
};
