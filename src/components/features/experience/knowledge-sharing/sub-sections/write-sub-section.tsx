'use client';

import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { BLOG_BASE_URL } from '~constants/index';

import { Button } from '~ui/atoms/button';
import { PencilEmoji } from '~ui/atoms/emojis';
import { ArticleSegment } from '~ui/molecules/article-segment';

import { cn } from '~utils/style';

export interface WriteSubSectionProps extends ComponentPropsWithoutRef<'div'> {}

export const WriteSubSection = ({
  className,
  ...rest
}: WriteSubSectionProps) => {
  return (
    <div
      className={cn(
        'flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-12',
        className
      )}
      {...rest}
    >
      <div className='flex w-full flex-col items-center justify-center gap-y-4'>
        {articles.map(({ href, title, createdAt }, index) => (
          <ArticleSegment
            key={href}
            style={{ opacity: 1 - index / articles.length }}
            href={href}
            title={title}
            createdAt={createdAt}
          />
        ))}
      </div>

      <Button variant='link' asChild>
        <Link href={BLOG_BASE_URL}>
          <PencilEmoji className='mr-2' />
          Read my blog
        </Link>
      </Button>
    </div>
  );
};

const articles = [
  {
    title:
      'Optimizing your React application for the upcoming “Interaction to Next Paint"',
    href: `${BLOG_BASE_URL}/articles/optimizing-your-react-application-for-the-upcoming-inp`,
    createdAt: new Date(Date.parse('2024-02-20')),
  },
  {
    title: 'Why your animation fails to run in 60 fps',
    href: `${BLOG_BASE_URL}/articles/why-your-animation-fails-to-run-in-60-fps`,
    createdAt: new Date(Date.parse('2024-01-16')),
  },
  {
    title: 'How zero-days killed my procrastination',
    href: `${BLOG_BASE_URL}/articles/how-zero-days-killed-my-procrastination`,
    createdAt: new Date(Date.parse('2023-08-12')),
  },
] as const;
