import { HTMLMotionProps, motion } from 'framer-motion';

import { DynamicWeightOnHoverText } from '~ui/atoms/dynamic-weight-on-hover-text';
import { Typography } from '~ui/atoms/typography';
import { Logo } from '~ui/widgets/logo';

import { cn } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * BlogLogo
 * -----------------------------------------------------------------------------------------------*/

interface BlogLogoProps extends HTMLMotionProps<'div'> {
  trailing?: string;
}

const BlogLogo = ({ trailing, className, ...rest }: BlogLogoProps) => {
  return (
    <motion.div className={cn('flex items-center', className)} {...rest}>
      <Logo />

      <Typography className='ml-1 text-xl tracking-widest sm:text-2xl'>
        <DynamicWeightOnHoverText text=':blog' />
        {trailing ? <DynamicWeightOnHoverText text={`:${trailing}`} /> : null}
      </Typography>
    </motion.div>
  );
};

BlogLogo.displayName = 'BlogLogo';

/* -----------------------------------------------------------------------------------------------*/

export { BlogLogo };
export type { BlogLogoProps };
