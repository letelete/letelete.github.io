import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef, useCallback, useState } from 'react';

import { asHoverableButton } from '~ui/atoms/button/decorators';
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
        className={cn('nav-card flex items-center', className)}
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

const [, hoverableProps] = asHoverableButton('button');

const NavbarItem = forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ item, selected, scopeId, className, onClick, ...rest }, ref) => {
    const [hovered, setHovered] = useState(false);
    const handleClick = useCallback(
      () => onClick?.(item.id),
      [item.id, onClick]
    );

    return (
      <motion.button
        {...hoverableProps}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={cn(
          'relative flex items-center justify-center rounded-full px-3 py-2',
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        {selected && (
          <motion.div
            transition={{ type: 'spring', duration: 0.5 }}
            layoutId={`navbar-item__highlight:${scopeId}`}
            className='bg-black absolute left-0 top-0 z-0 h-full w-full rounded-full'
          />
        )}

        {hovered && (
          <motion.div
            transition={{ type: 'spring', duration: 0.4 }}
            layoutId={`navbar-item__hover:${scopeId}`}
            className='bg-white/20 absolute left-0 top-0 z-10 h-full w-full rounded-full'
          />
        )}

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
