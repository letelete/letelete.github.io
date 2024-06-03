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

import { Card, CardProps } from '~ui/atoms/card';
import { TextSkeleton } from '~ui/atoms/skeleton';
import { Typography } from '~ui/atoms/typography';
import { Logo } from '~ui/widgets/logo';

import { cn } from '~utils/style';

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
}

const ContentCard = ({
  label,
  href,
  title,
  display,
  displayPlaceholder,
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
        className='mt-1 line-clamp-2 h-[calc(2em*1.5)] w-full text-left leading-[1.5]'
        prose={false}
        balance
      >
        {title}
      </Typography>
    );
  }, [title]);

  const renderDisplay = useCallback(
    () => (
      <div className='relative mt-8 flex aspect-[1.5] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-ctx-secondary'>
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

        <Logo className='absolute bottom-2.5 right-3.5 z-10 w-[max(10%,2.5rem)]' />
      </div>
    ),
    [display, displayPlaceholder]
  );

  return (
    <Card asChild className={cn('flex flex-col', className)} {...rest}>
      <MotionLink
        href={href}
        whileTap={{ scale: 0.9, opacity: 0.5 }}
        transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
      >
        <Typography
          className='line-clamp-1 w-full text-left uppercase'
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
              'sm:nth-[3n-2]:-mt-24 sm:nth-[3n-1]:-mt-12 max-sm:nth-[2n-1]:-mt-12 relative h-fit'
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
