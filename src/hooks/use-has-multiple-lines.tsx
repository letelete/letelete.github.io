import * as React from 'react';

const useHasMultipleLines = <TElement extends HTMLElement>() => {
  const ref = React.useRef<TElement>(null);
  const [hasMultipleLines, setHasMultipleLines] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    setHasMultipleLines(el.scrollHeight > lineHeight + 1);
  }, []);

  return { ref, hasMultipleLines };
};

export { useHasMultipleLines };
