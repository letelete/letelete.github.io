import { MDXComponents } from 'mdx/types';

export const Markdown: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      <a
        {...props}
        className='hover:text-blue-600 underline duration-100'
        target='_blank'
      >
        {children}
      </a>
    );
  },
};
