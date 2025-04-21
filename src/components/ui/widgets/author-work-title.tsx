import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * AuthorWorkTitle
 * -----------------------------------------------------------------------------------------------*/

interface AuthorWorkTitleProps {
  className?: string;
}

const AuthorWorkTitle = ({ className }: AuthorWorkTitleProps) => {
  return (
    <Typography className={cn(className)} color='secondary'>
      Software Engineer @ <span className='italic'>Google</span>
    </Typography>
  );
};

AuthorWorkTitle.displayName = 'AuthorWorkTitle';

/* -----------------------------------------------------------------------------------------------*/

export { AuthorWorkTitle };
export type { AuthorWorkTitleProps };
