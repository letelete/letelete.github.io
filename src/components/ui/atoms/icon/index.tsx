import { LucideProps } from 'lucide-react';
import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import useTailwind from 'src/hooks/use-tailwind';

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  const tw = useTailwind();

  return (
    <LucideIcon
      color={tw.theme.colors.primary.DEFAULT}
      strokeWidth={1.5}
      size={18}
      absoluteStrokeWidth
      {...props}
    />
  );
};
