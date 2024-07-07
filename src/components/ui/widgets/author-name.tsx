import { Typography } from '~ui/atoms/typography';
import { Listenable, ListenableHighlight } from '~ui/organisms/listenable';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * AuthorName
 * -----------------------------------------------------------------------------------------------*/

interface AuthorNameProps {
  className?: string;
}

const AuthorName = ({ className }: AuthorNameProps) => {
  return (
    <Listenable
      playAriaLabel='Listen to name pronunciation'
      src='/sfx/author-name-pronunciation.mp3'
      className={cn('mt-content-sm sm:mt-content', className)}
    >
      <Typography>
        <ListenableHighlight segments={[[0, 400]]} text='Bruno' />{' '}
        <ListenableHighlight segments={[[400]]} text='Kawka' />
      </Typography>
    </Listenable>
  );
};

AuthorName.displayName = 'AuthorName';

/* -----------------------------------------------------------------------------------------------*/

export { AuthorName };
export type { AuthorNameProps };
