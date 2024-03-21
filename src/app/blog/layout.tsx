import { BlogHeader } from '~features/blog/blog-header';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeader />
      <main className='h-full w-full'>{children}</main>
    </>
  );
}
