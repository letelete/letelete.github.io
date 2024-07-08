import { Button, ButtonProps } from '~ui/atoms/button';
import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface TagProps extends ButtonProps {
  label: string;
  count?: number;
  selectable?: boolean;
  selected?: boolean;
}

export const Tag = ({
  label,
  count,
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
        'font-normal text-ctx-accent-secondary transition-opacity',
        selected && 'bg-ctx-accent-primary',
        className
      )}
      variant='link'
      size='inline'
      {...rest}
    >
      #{label}
      {count !== undefined ? ` (${count})` : null}
    </Button>
  );
};
