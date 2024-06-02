'use client';

import { useContext } from 'react';

import { HomeContext } from '~modules/home';

import { Card } from '~ui/atoms/card';
import { AuthorPortraitsGallery } from '~ui/widgets/author-portraits-gallery';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * AuthorPortraitsGallery
 * -----------------------------------------------------------------------------------------------*/

interface AboutAuthorPortraitsGalleryCardProps {
  className?: string;
}

const AboutAuthorPortraitsGalleryCard = ({
  className,
}: AboutAuthorPortraitsGalleryCardProps) => {
  const { authorPortraits } = useContext(HomeContext);

  return (
    <Card className={cn('aspect-square w-full flex-1', className)}>
      <AuthorPortraitsGallery images={authorPortraits} />
    </Card>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { AboutAuthorPortraitsGalleryCard };
export type { AboutAuthorPortraitsGalleryCardProps };
