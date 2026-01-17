import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '~/utils/style';

const BlogExplorerList = forwardRef<
  ElementRef<'ol'>,
  ComponentPropsWithoutRef<'ol'>
>(({ className, children, ...rest }) => {
  return (
    <ol className={cn('space-y-8', className)} {...rest}>
      {children}
    </ol>
  );
});
BlogExplorerList.displayName = 'BlogExplorerList';

export { BlogExplorerList };
