'use client';

import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { BLOG_PATH } from '~constants/index';

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
        {articles.map(({ id, href, title, createdAt }, index) => (
          <ArticleSegment
            key={id}
            style={{ opacity: 1 - index / articles.length }}
            href={href}
            title={title}
            createdAt={createdAt}
          />
        ))}
      </div>

      <Button variant='link' asChild>
        <Link href={BLOG_PATH}>
          <PencilEmoji className='mr-2' />
          Read my blog
        </Link>
      </Button>
    </div>
  );
};

const articles = [
  {
    id: 'soon-10',
    title: 'Soon...',
    href: ``,
    createdAt: new Date(Date.now()),
  },
  {
    id: 'soon-20',
    title: 'Soon...',
    href: ``,
    createdAt: new Date(Date.now()),
  },
  {
    id: 'soon-30',
    title: 'Soon...',
    href: ``,
    createdAt: new Date(Date.now()),
  },
] as const;
