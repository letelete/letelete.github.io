'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from '~ui/atoms/button';
import {
  DEFAULT_THEME,
  THEMES,
  type Theme,
} from '~ui/atoms/theme/theme-config';
import { cn } from '~utils/style';

const themeToIcon = {
  light: Sun,
  dark: Moon,
} as const;

const ThemeToggle = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof Button>) => {
  const { setTheme, theme } = useTheme();

  const currentTheme = (theme ?? DEFAULT_THEME) as Theme;
  const Icon = themeToIcon[currentTheme];

  return (
    <Button
      className={cn('relative flex items-center justify-center', className)}
      variant='ghost'
      size='icon'
      onClick={() =>
        setTheme(
          THEMES[
            (Math.max(0, THEMES.indexOf(currentTheme)) + 1) % THEMES.length
          ] ?? DEFAULT_THEME
        )
      }
      {...rest}
    >
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={currentTheme}
          initial={{
            rotate: 90,
            scale: 0,
          }}
          animate={{
            rotate: 0,
            scale: 1,
          }}
          exit={{
            rotate: -90,
            scale: 0,
            opacity: 0,
          }}
        >
          <Icon />
        </motion.div>
      </AnimatePresence>

      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle };
