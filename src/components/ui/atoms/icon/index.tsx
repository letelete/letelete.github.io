import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import useTailwind from 'src/hooks/use-tailwind';

import { cn } from '~utils/style';

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  const tw = useTailwind();

  return (
    <LucideIcon
      className={cn('aspect-square h-4 min-h-4 w-4 min-w-4', className)}
      color={tw.theme.colors.primary.DEFAULT}
      strokeWidth={1.5}
      size={16}
      absoluteStrokeWidth
      {...props}
    />
  );
};
