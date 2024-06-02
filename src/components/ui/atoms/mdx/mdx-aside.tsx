import { ComponentPropsWithoutRef } from 'react';

import { Icon, IconProps } from '~ui/atoms/icon';

import { cn } from '~utils/style';

type AsideType = 'idea' | 'error';

export interface MdxAsideProps extends ComponentPropsWithoutRef<'aside'> {
  type?: AsideType;
}

const typeToIcon = {
  error: {
    name: 'alert-octagon',
    color: '#ff5151',
  },
  idea: {
    name: 'lightbulb',
    color: '#eddd5d',
  },
} satisfies Record<AsideType, IconProps>;

export const MdxAside = ({
  children,
  className,
  type = 'idea',
  ...rest
}: MdxAsideProps) => {
  return (
    <aside className={cn('flex w-full py-6', className)} {...rest}>
      <div
        className={cn(
          'bg-background-secondary flex  w-full gap-x-4 rounded-md p-8 *:p-0'
        )}
      >
        <Icon className='translate-y-[0.125rem]' {...typeToIcon[type]} />

        {children}
      </div>
    </aside>
  );
};
