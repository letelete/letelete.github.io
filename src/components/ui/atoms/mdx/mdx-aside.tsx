import { ComponentPropsWithoutRef } from 'react';

import useTailwind from '~hooks/use-tailwind';

import { Icon } from '~ui/atoms/icon';

import { cn } from '~utils/style';

export interface MdxAsideProps extends ComponentPropsWithoutRef<'aside'> {}

export const MdxAside = ({ children, className, ...rest }: MdxAsideProps) => {
  const tw = useTailwind();

  return (
    <aside className={cn('flex w-full py-6', className)} {...rest}>
      <div
        className={cn(
          'flex w-full  gap-x-4 rounded-md bg-background-contrast p-8 *:p-0',
          className
        )}
      >
        <Icon
          className='translate-y-[0.125rem]'
          name='lightbulb'
          color={tw.theme.colors.accent.DEFAULT}
        />

        {children}
      </div>
    </aside>
  );
};
