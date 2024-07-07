import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { HTMLMotionProps, motion } from 'framer-motion';
import { PropsWithChildren, useId } from 'react';

/* -------------------------------------------------------------------------------------------------
 * DynamicWeightOnHoverText
 * -----------------------------------------------------------------------------------------------*/

interface DynamicWeightOnHoverTextProps
  extends Omit<HTMLMotionProps<'span'>, 'children'> {
  text: string;
}

const DynamicWeightOnHoverText = ({
  text,
  ...rest
}: PropsWithChildren<DynamicWeightOnHoverTextProps>) => {
  const id = useId();

  return (
    <>
      {text.split('').map((char) => (
        <motion.span
          aria-hidden
          key={`${id}:${char}`}
          whileHover={{
            fontWeight: 700,
            transition: { type: 'spring', duration: 0.2, bounce: 0 },
          }}
          transition={{ type: 'spring', duration: 1, bounce: 0 }}
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

/* -----------------------------------------------------------------------------------------------*/

export { DynamicWeightOnHoverText };
export type { DynamicWeightOnHoverTextProps };
