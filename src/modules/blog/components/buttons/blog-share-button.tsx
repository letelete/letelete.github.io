import { ElementRef, forwardRef, useCallback, useMemo } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Button } from '~/components/ui/atoms/button';
import { Icon } from '~/components/ui/atoms/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/atoms/tooltip';
import { Typography } from '~/components/ui/atoms/typography';
import { cn } from '~/utils/style';

interface BlogShareButtonProps {
  className?: string;
}

const BlogShareButton = forwardRef<ElementRef<'div'>, BlogShareButtonProps>(
  ({ className }: BlogShareButtonProps) => {
    const value = useMemo(() => 123, []);
    const applied = true;

    const handleShareClick = useCallback(() => {
      // todo: store in db
      // todo: show modal
      // todo: copy to clipboard
    }, []);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>Share</TooltipContent>
          <TooltipTrigger>
            <Button
              variant='ghost'
              size='inline'
              className={cn(
                'gap-x-1 px-2 py-1 text-ctx-primary-fg-secondary',
                applied && 'text-ctx-accent-secondary',
                className
              )}
              onClick={handleShareClick}
            >
              <Icon name='repeat' color='currentColor' />
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
BlogShareButton.displayName = 'BlogShareButton';

export { BlogShareButton };
export type { BlogShareButtonProps };
