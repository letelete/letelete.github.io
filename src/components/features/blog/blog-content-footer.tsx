import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

import { BLOG_PATH } from '~constants/index';

import { useGetContentStatistics } from '~services/content/use-get-content-statistics';
import { useUpdateContentLikes } from '~services/content/use-update-content-likes';

import { Button } from '~ui/atoms/button';
import { PixelArtHeartEmoji } from '~ui/atoms/emojis';
import { FadeInMotion } from '~ui/atoms/motion';
import { Typography } from '~ui/atoms/typography';
import { GoBackButton } from '~ui/molecules/buttons/go-back-button';
import { Footer, FooterProps } from '~ui/molecules/footer';

export interface BlogContentFooterProps extends FooterProps {
  slug: string;
}

export const BlogContentFooter = ({
  slug,
  ...props
}: BlogContentFooterProps) => {
  const contentStatistics = useGetContentStatistics({ slug });
  const { mutate: lineContent } = useUpdateContentLikes();

  const { views, likes, userTotalLikes } = contentStatistics.data;

  const likeFeedback = useMemo(() => {
    if (userTotalLikes <= 0) {
      return null;
    }
    if (userTotalLikes === 1) {
      return `Thank you for the like ❤️`;
    }
    if (userTotalLikes < 15) {
      return `Thank you for ${userTotalLikes} likes!`;
    }
    return `You either found this very helpful or testing the limit 🙃 In both cases - thank you so much!`;
  }, [userTotalLikes]);

  return (
    <Footer {...props}>
      <div className='mt-4 sm:mt-8'>
        {contentStatistics.isLoading ? (
          <span>Loading...</span>
        ) : contentStatistics.isError ? (
          <span>Error: {contentStatistics.error.message}</span>
        ) : (
          <div className='flex flex-col items-center gap-y-2'>
            <Typography>
              {views > 1 && <span>{`${views} views`}</span>}
            </Typography>

            <div>
              <div className='flex gap-x-2'>
                <Button
                  onClick={
                    userTotalLikes < 15
                      ? () =>
                          lineContent({ slug, likesAmount: userTotalLikes + 1 })
                      : undefined
                  }
                  variant='ghost'
                  size='inline'
                  className='p-4'
                >
                  <PixelArtHeartEmoji className='h-12 w-12' />
                </Button>

                <Typography variant='subheading' color='accent'>
                  {likes}
                </Typography>
              </div>

              {likeFeedback && (
                <AnimatePresence>
                  <FadeInMotion
                    transition={{ type: 'spring' }}
                    key={likeFeedback}
                  >
                    <Typography color='accent'>{likeFeedback}</Typography>
                  </FadeInMotion>
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </div>

      <GoBackButton className='mt-8 py-4' href={BLOG_PATH} />
    </Footer>
  );
};
