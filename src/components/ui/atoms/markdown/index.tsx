import { MDXComponents } from 'mdx/types';

import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const Markdown: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      <a
        {...props}
        className='text-ctx-primary-fg-secondary underline duration-100 hover:text-ctx-primary-fg-hint'
        target='_blank'
      >
        {children}
      </a>
    );
  },
  h1: ({ children, className, ...props }) => {
    return (
      <Typography
        className={cn('pb-6', className)}
        variant='heading'
        weight='bold'
        asChild
      >
        <h2 {...props}>{children}</h2>
      </Typography>
    );
  },
  h2: ({ children, className, ...props }) => {
    return (
      <Typography
        className={cn('pb-2 pt-8', className)}
        variant='heading'
        asChild
      >
        <h2 {...props}>{children}</h2>
      </Typography>
    );
  },
  h3: ({ children, className, ...props }) => {
    return (
      <Typography
        variant='subheading'
        className={cn('pb-1 pt-6', className)}
        asChild
      >
        <h3 {...props}>{children}</h3>
      </Typography>
    );
  },
  p: ({ children, className, ...props }) => {
    return (
      <Typography
        color='secondary'
        weight='normal'
        className={cn('py-4', className)}
        asChild
      >
        <p {...props}>{children}</p>
      </Typography>
    );
  },
  blockquote: ({ children, className, ...props }) => {
    return (
      <blockquote
        className={cn(
          'relative mb-6 py-2 italic *:py-0 *:pl-6 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-2 before:rounded-full before:bg-ctx-accent-secondary',
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  ul: ({ children, className, ...props }) => {
    return (
      <ul
        className={cn(
          'my-8 list-disc space-y-4 text-ctx-primary-fg-secondary marker:text-ctx-primary-fg-secondary',
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  },
  li: ({ children, className, ...props }) => {
    return (
      <Typography color='secondary' weight='normal' asChild>
        <li className={cn('ml-12', className)} {...props}>
          {children}
        </li>
      </Typography>
    );
  },
};
