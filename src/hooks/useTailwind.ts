import { useMemo } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

export default function useTailwind() {
  const tailwind = useMemo(() => resolveConfig(tailwindConfig), []);

  return tailwind;
}
