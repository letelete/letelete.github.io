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
        className={cn('mb-2', className)}
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
      <Typography className={cn('mb-2', className)} color='highlight' asChild>
        <h3 {...props}>{children}</h3>
      </Typography>
    );
  },
  p: ({ children, className, ...props }) => {
    return (
      <Typography weight='normal' className={cn('mb-10', className)} asChild>
        <p {...props}>{children}</p>
      </Typography>
    );
  },
  ul: ({ children, className, ...props }) => {
    return (
      <ul
        className={cn(
          'marker-text-accent-foreground relative -mt-5 mb-10 list-disc',
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  },
};
