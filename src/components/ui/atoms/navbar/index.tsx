import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef, useCallback } from 'react';

import { Typography } from '~ui/atoms/typography';

import { cn } from '~utils/style';

export interface NavbarItem {
  id: string;
  label: string;
}

export interface NavbarProps extends Omit<HTMLMotionProps<'nav'>, 'onSelect'> {
  items: NavbarItem[];
  selectedItemId: NavbarItem['id'];
  scopeId: string;
  onSelect?: (itemId: NavbarItem['id']) => void;
}

const NavbarPrimitive = forwardRef<HTMLDivElement, NavbarProps>(
  ({ items, selectedItemId, scopeId, className, onSelect, ...rest }, ref) => {
    return (
      <motion.nav
        className={cn('nav-card flex items-center gap-x-2', className)}
        ref={ref}
        {...rest}
      >
        {items.map((item) => (
          <NavbarItem
            key={item.id}
            scopeId={scopeId}
            item={item}
            selected={selectedItemId === item.id}
            onClick={onSelect}
          />
        ))}
      </motion.nav>
    );
  }
);

NavbarPrimitive.displayName = 'Navbar';

export interface NavbarItemProps
  extends Omit<HTMLMotionProps<'button'>, 'onClick'> {
  item: NavbarItem;
  scopeId: string;
  selected?: boolean;
  onClick?: (itemId: NavbarItem['id']) => void;
}

const navbarItemMotionVariants = {
  idle: {},
  hovered: {},
};

const NavbarItem = forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ item, selected, scopeId, className, onClick, ...rest }, ref) => {
    const handleClick = useCallback(
      () => onClick?.(item.id),
      [item.id, onClick]
    );

    return (
      <motion.button
        variants={navbarItemMotionVariants}
        initial='idle'
        className={cn(
          'relative flex items-center justify-center rounded-full px-3 py-2',
          className
        )}
        whileHover='hovered'
        whileTap={{ scale: 0.8 }}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        {selected && (
          <motion.div
            layoutId={`navbar-item__highlight:${scopeId}`}
            className='absolute left-0 top-0 z-0 h-full w-full rounded-full bg-black'
          />
        )}

        <motion.div
          variants={{
            idle: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          className='absolute left-0 top-0 z-10 h-full w-full rounded-full bg-white/20'
        />

        <Typography
          className='relative z-20'
          variant='sm'
          color='highlight'
          asChild
        >
          <span>{item.label}</span>
        </Typography>
      </motion.button>
    );
  }
);

NavbarItem.displayName = 'NavbarItem';

const NavbarItemInline = forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ className, ...rest }, ref) => (
    <NavbarItem className={cn('px-2 py-1', className)} ref={ref} {...rest} />
  )
);

NavbarItemInline.displayName = 'NavbarItemInline';

export const Navbar = Object.assign(NavbarPrimitive, {
  Item: NavbarItem,
  ItemInline: NavbarItemInline,
});
