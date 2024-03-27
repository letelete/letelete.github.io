import { ComponentPropsWithoutRef } from 'react';

import useTailwind from '~hooks/use-tailwind';

import { Icon } from '~ui/atoms/icon';

import { cn } from '~utils/style';

export interface MdxAsideProps extends ComponentPropsWithoutRef<'aside'> {}

export const MdxAside = ({ children, className, ...rest }: MdxAsideProps) => {
  const tw = useTailwind();

  return (
    <aside
      className={cn(
        'my-10 flex gap-x-4 rounded-md bg-background-contrast p-8 *:m-0',
        className
      )}
      {...rest}
    >
      <Icon name='lightbulb' color={tw.theme.colors.accent.DEFAULT} />

      {children}
    </aside>
  );
};
