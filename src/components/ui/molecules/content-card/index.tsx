import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react';

import { ContentType } from '~lib/content/provider';

import { Card, CardProps } from '~ui/atoms/card';
import { TextSkeleton } from '~ui/atoms/skeleton';
import { Typography } from '~ui/atoms/typography';
import { ContentIcon } from '~ui/molecules/content-icon';

import { cn, tw } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * ContentCard
 * -----------------------------------------------------------------------------------------------*/

const MotionLink = motion(Link);

interface ContentCardProps extends CardProps {
  label: string;
  href: string;
  title?: string;
  display?: ReactNode;
  displayPlaceholder?: ReactNode;
  contentType?: ContentType;
}

const ContentCard = ({
  label,
  href,
  title,
  display,
  displayPlaceholder,
  contentType,
  className,
  ...rest
}: ContentCardProps) => {
  const renderTitle = useCallback(() => {
    if (!title) {
      return (
        <div className='mt-1 flex w-full flex-col gap-y-1.5'>
          <TextSkeleton className='w-[75%]' />
          <TextSkeleton className='w-[60%]' />
        </div>
      );
    }

    return (
      <Typography
        title={title}
        className='mt-1 line-clamp-3 h-[calc(3em*1.25)] w-full text-left leading-5 sm:line-clamp-2 sm:h-[calc(2em*1.5)] sm:leading-6'
        prose={false}
        balance
      >
        {title}
      </Typography>
    );
  }, [title]);

  const renderDisplay = useCallback(
    () => (
      <div className='relative mt-8 flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-ctx-secondary'>
        {display ?? displayPlaceholder ?? (
          <Typography
            className='uppercase'
            variant='sm'
            color='secondary'
            weight='bold'
          >
            Soon
          </Typography>
        )}
      </div>
    ),
    [display, displayPlaceholder]
  );

  return (
    <Card asChild className={cn('flex flex-col', className)} {...rest}>
      <MotionLink
        className='relative'
        href={href}
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.9, opacity: 0.5 }}
        transition={{ type: 'spring', duration: 0.2 }}
      >
        <Typography
          className='line-clamp-2 w-full text-left uppercase sm:line-clamp-1'
          variant='sm'
          color='secondary'
          weight='bold'
          prose={false}
          balance
        >
          {label}
        </Typography>

        {renderTitle()}

        {renderDisplay()}

        {contentType ? (
          <div className='absolute bottom-2 left-2 aspect-square h-8 w-8 rounded-full bg-ctx-button p-2 md:bottom-3 md:left-3 md:h-12 md:w-12 md:p-3'>
            <ContentIcon
              size={'100%'}
              color={tw.theme.colors.ctx.button.fg.solid}
              contentType={contentType}
            />
          </div>
        ) : null}
      </MotionLink>
    </Card>
  );
};

ContentCard.displayName = 'ContentCard';

/* -------------------------------------------------------------------------------------------------
 * ContentCardContainer
 * -----------------------------------------------------------------------------------------------*/

interface ContentCardContainerProps extends ComponentPropsWithoutRef<'div'> {}

const ContentCardContainer = ({
  className,
  children,
  ...rest
}: ContentCardContainerProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6',
        className
      )}
      {...rest}
    >
      {Children.map(children, (child) => {
        if (isValidElement<{ className: string }>(child)) {
          return cloneElement(child, {
            className: cn(
              'relative h-fit max-sm:nth-[2n-1]:-mt-12 sm:nth-[3n-1]:-mt-12 sm:nth-[3n-2]:-mt-24'
            ),
          });
        }
        return null;
      })}
    </div>
  );
};

ContentCardContainer.displayName = 'ContentCardContainer';

/* -----------------------------------------------------------------------------------------------*/

export { ContentCard, ContentCardContainer };
export type { ContentCardProps, ContentCardContainerProps };
