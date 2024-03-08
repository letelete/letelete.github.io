import { ComponentPropsWithoutRef } from 'react';
import { cn } from '~utils/style';

export interface FadeOverlayProps extends ComponentPropsWithoutRef<'div'> {
  overlayClassName: string;
}

export const FadeOverlay = ({
  className,
  overlayClassName,
  children,
  ...rest
}: FadeOverlayProps) => {
  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      {...rest}
    >
      {children}

      <div
        className={cn(
          'absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-background to-background/10',
          overlayClassName
        )}
      />
    </div>
  );
};
