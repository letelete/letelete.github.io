import { Metadata } from 'next';

import '~styles/highlight-js/style.css';

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
      <main className='flex h-full  w-full flex-col'>{children}</main>
    </>
  );
}
