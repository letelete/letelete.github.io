import { Metadata } from 'next';

import { BlogHeader } from '~features/blog/blog-header';

import '~styles/highlight-js/style.css';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Blog',
  description:
    "I'm a Frontend Engineer sharing my experience with Web Development, and UI/UX design. I write, record, and talk about programming.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeader />

      <main className='flex h-full  w-full flex-col'>{children}</main>
    </>
  );
}
