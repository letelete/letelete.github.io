import { ElementRef, forwardRef, useCallback, useMemo } from 'react';
import { Button } from '~/components/ui/atoms/button';
import { Icon } from '~/components/ui/atoms/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/atoms/tooltip';
import { Typography } from '~/components/ui/atoms/typography';
import { cn } from '~/utils/style';

interface BlogLikeButtonProps {
  className?: string;
}

const BlogLikeButton = forwardRef<ElementRef<'div'>, BlogLikeButtonProps>(
  ({ className }: BlogLikeButtonProps) => {
    const value = useMemo(() => Math.floor(Math.random() * 1000), []);
    const applied = true;

    const handleLikeClick = useCallback(() => {
      // todo: store in db
      // todo: show modal
    }, []);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>Like</TooltipContent>
          <TooltipTrigger>
            <Button
              variant='ghost'
              size='inline'
              className={cn(
                'gap-x-1 px-2 py-1 text-ctx-primary-fg-secondary',
                applied && 'text-ctx-destructive',
                className
              )}
              onClick={handleLikeClick}
            >
              {applied ? (
                <Icon name='heart' color='currentColor' fill='currentColor' />
              ) : (
                <Icon name='heart' color='currentColor' />
              )}
              <Typography variant='sm' color='currentColor'>
                {value}
              </Typography>
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
BlogLikeButton.displayName = 'BlogLikeButton';

export { BlogLikeButton };
export type { BlogLikeButtonProps };
