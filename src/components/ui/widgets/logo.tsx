import { SVGMotionProps, motion } from 'framer-motion';

import { tw } from '~utils/style';

/* -------------------------------------------------------------------------------------------------
 * Logo
 * -----------------------------------------------------------------------------------------------*/

const VIEWBOX_PADDING_Y = 16;

interface LogoProps extends Partial<SVGMotionProps<SVGElement>> {
  width?: number;
  height?: number;
  variant?: 'dark' | 'light';
}

const Logo = ({ width = 85, height, variant = 'dark', ...rest }: LogoProps) => {
  const color =
    variant === 'dark'
      ? tw.theme.colors.ctx.primary.fg.solid
      : tw.theme.colors.ctx.primary.inverse.fg.solid;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 191 ${53 + VIEWBOX_PADDING_Y}`}
      className='flex items-center justify-center'
      preserveAspectRatio='xMidYMax'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <FunPath
        d='M32 26.5C32 40.8594 24.8366 52.5 16 52.5C7.16344 52.5 0 40.8594 0 26.5C0 12.1406 7.16344 0.5 16 0.5C24.8366 0.5 32 12.1406 32 26.5Z'
        fill={color}
      />
      <FunPath
        d='M71 26.5C71 35.8888 63.3888 43.5 54 43.5C44.6112 43.5 37 35.8888 37 26.5C37 17.1112 44.6112 9.5 54 9.5C63.3888 9.5 71 17.1112 71 26.5Z'
        fill={color}
      />
      <FunPath
        d='M115 26.5C115 35.8888 106.27 43.5 95.5 43.5C84.7304 43.5 76 35.8888 76 26.5C76 17.1112 84.7304 9.5 95.5 9.5C106.27 9.5 115 17.1112 115 26.5Z'
        fill={color}
      />
      <FunPath
        d='M152 26.5C152 40.8594 144.837 52.5 136 52.5C127.163 52.5 120 40.8594 120 26.5C120 12.1406 127.163 0.5 136 0.5C144.837 0.5 152 12.1406 152 26.5Z'
        fill={color}
      />
      <FunPath
        d='M191 26.5C191 35.8888 183.389 43.5 174 43.5C164.611 43.5 157 35.8888 157 26.5C157 17.1112 164.611 9.5 174 9.5C183.389 9.5 191 17.1112 191 26.5Z'
        fill={color}
      />
    </motion.svg>
  );
};

Logo.displayName = 'Logo';

/* -----------------------------------------------------------------------------------------------*/

const FunPath = ({ ...rest }: SVGMotionProps<SVGPathElement>) => {
  return (
    <motion.path
      style={{ y: VIEWBOX_PADDING_Y / 2 }}
      whileHover={{ y: 0 }}
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring', duration: 0.2 }}
      {...rest}
    />
  );
};

FunPath.displayPath = 'FunPath';

/* -----------------------------------------------------------------------------------------------*/

export { Logo };
export type { LogoProps };
