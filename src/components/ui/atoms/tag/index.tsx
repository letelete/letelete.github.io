import { Button, ButtonProps } from '~ui/atoms/button';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface TagProps extends ButtonProps {
  label: string;
  selectable?: boolean;
  selected?: boolean;
}

export const Tag = ({
  label,
  selectable,
  selected,
  className,
  ...rest
}: TagProps) => {
  if (!selectable) {
    return (
      <Typography variant='body-sm' weight='normal' color='hint'>
        #{label}
      </Typography>
    );
  }

  return (
    <Button
      className={cn(
        'text-foreground-secondary font-normal transition-colors',
        selected && 'text-accent',
        className
      )}
      variant='link'
      size='inline'
      {...rest}
    >
      #{label}
    </Button>
  );
};
