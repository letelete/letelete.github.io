import { type RefObject, useCallback, useState } from 'react';

import { useWindowSize } from '~hooks/use-window-size';

export const useElementGeometry = (ref: RefObject<Element>) => {
  const [geometry, setGeometry] = useState<DOMRect | null>(null);

  const updateGeometry = useCallback(() => {
    const newGeometry = ref.current?.getBoundingClientRect();

    if (newGeometry) {
      setGeometry(newGeometry);
    }
  }, [ref]);

  useWindowSize(updateGeometry);

  return geometry;
};
