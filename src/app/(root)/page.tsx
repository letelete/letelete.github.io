import { getBlogPayload } from '~lib/content/provider';
import { getAuthorPortraitImages } from '~lib/images/provider';
import { Home } from '~modules/home';
import { Intro } from '~ui/widgets/intro';
import { cn } from '~utils/style';

export default async function HomePage() {
  const content = await getBlogPayload();
  const authorPortraits = await getAuthorPortraitImages();

  return (
    <div className={cn('relative flex flex-col')}>
      <Home
        className='relative z-0'
        blogContent={content}
        authorPortraits={authorPortraits}
      />

      <Intro className='z-10' />
    </div>
  );
}
