import * as React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { HTMLMotionProps, motion } from 'framer-motion';

interface DynamicWeightOnHoverTextProps
  extends Omit<HTMLMotionProps<'span'>, 'children'> {
  text: string;
}

const DynamicWeightOnHoverText = ({
  text,
  ...rest
}: React.PropsWithChildren<DynamicWeightOnHoverTextProps>) => {
  const id = React.useId();

  return (
    <>
      {text.split('').map((char, idx) => (
        <motion.span
          key={`${id}:${char}:${idx}`}
          whileHover={{
            fontWeight: 700,
            transition: { type: 'spring', duration: 0.2, bounce: 0 },
          }}
          transition={{ type: 'spring', duration: 1, bounce: 0 }}
          aria-hidden
          {...rest}
        >
          {char}
        </motion.span>
      ))}
      <VisuallyHidden>{text}</VisuallyHidden>
    </>
  );
};

DynamicWeightOnHoverText.displayName = 'DynamicWeightOnHoverText';

export { DynamicWeightOnHoverText };
export type { DynamicWeightOnHoverTextProps };
