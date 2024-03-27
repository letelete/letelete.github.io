import { MDXComponents } from 'mdx/types';

import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export const Markdown: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      <a
        {...props}
        className='underline duration-100 hover:text-primary-highlighted'
        target='_blank'
      >
        {children}
      </a>
    );
  },
  h2: ({ children, className, ...props }) => {
    return (
      <Typography
        className={cn('mb-6 mt-10', className)}
        variant='heading'
        color='highlight'
        asChild
      >
        <h2 {...props}>{children}</h2>
      </Typography>
    );
  },
  h3: ({ children, className, ...props }) => {
    return (
      <Typography className={cn('my-6', className)} color='highlight' asChild>
        <h3 {...props}>{children}</h3>
      </Typography>
    );
  },
  p: ({ children, className, ...props }) => {
    return (
      <Typography weight='normal' className={cn('mb-4', className)} asChild>
        <p {...props}>{children}</p>
      </Typography>
    );
  },
  blockquote: ({ children, className, ...props }) => {
    return (
      <blockquote
        className={cn(
          'relative mb-6 py-2 italic *:my-0 *:pl-6 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-2 before:rounded-full before:bg-accent',
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
          'mb-10 mt-10 list-disc space-y-4 text-primary marker:text-primary-hint',
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
      <li className={cn('ml-12', className)} {...props}>
        {children}
      </li>
    );
  },
};
