'use client';

import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  KeyboardEvent,
  TdHTMLAttributes,
  ThHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Icon } from '~/components/ui/atoms/icon';
import { Typography } from '~/components/ui/atoms/typography';
import { ExplorerEntityType } from '~/modules/blog/explorer/blog-explorer-entities';
import { cn } from '~/utils/style';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div
      data-slot='table-container'
      className='relative w-full overflow-x-auto'
    >
      <table
        ref={ref}
        className={cn(
          'relative w-full caption-bottom border-separate ',
          className
        )}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    data-slot='table-header'
    className={cn(className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot='table-body'
    className={cn('divide-border divide-y', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot='table-footer'
    className={cn('bg-muted/50 font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    data-slot='table-row'
    className={cn(
      'hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    data-slot='table-head'
    className={cn(
      'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    data-slot='table-cell'
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCellEmptyPlaceholder = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <TableCell
    ref={ref}
    data-slot='table-cell'
    className={cn('h-24 text-center', className)}
    {...props}
  />
));
TableCellEmptyPlaceholder.displayName = 'TableCellEmptyPlaceholder';

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot='table-caption'
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

const InteractiveTableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement> & { onClick?: VoidFunction }
>(({ className, onClick, autoFocus, ...props }, ref) => {
  const localRef = useRef<ElementRef<typeof TableRow>>(null);
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTableRowElement>) => {
      const key = e.key;
      const current = e.currentTarget;

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        const next =
          key === 'ArrowDown'
            ? current.nextElementSibling
            : current.previousElementSibling;
        if (next instanceof HTMLElement) {
          next.focus();
        }
        return;
      }

      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  useEffect(() => {
    if (autoFocus) {
      localRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <TableRow
      className={cn(
        'focus:ring-inset-0 focus:ring-offset-ctx-primary-invert active:duration-[0.05 rounded-none bg-ctx-primary transition-colors duration-[0.01s] hover:bg-ctx-secondary focus:outline-none focus:ring-1 focus:ring-ctx-primary-inverse active:bg-ctx-secondary/50',
        className
      )}
      role='button'
      aria-label='File'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      {...props}
      ref={mergeRefs([localRef, ref])}
    />
  );
});
InteractiveTableRow.displayName = 'InteractiveTableRow';

const ExpanderTableRow = memo(() => (
  <TableRow className='pointer-events-none invisible' aria-disabled>
    <TableCell>
      <EntityNameCell entityType={'dir'}>
        {new Array(1000).fill('long text').join(' ')}
      </EntityNameCell>
    </TableCell>
    <TableCell>
      <EntityDateCell date='1970-01-01' />{' '}
    </TableCell>
  </TableRow>
));
ExpanderTableRow.displayName = 'ExpanderTableRow';

function EntityHeader({
  children,
  className,
  color = 'hint',
  variant = 'body-sm',
  ...rest
}: ComponentPropsWithoutRef<typeof Typography>) {
  return (
    <Typography
      className={cn('line-clamp-1 inline-block max-w-full truncate', className)}
      color={color}
      variant={variant}
      {...rest}
    >
      {children}
    </Typography>
  );
}
EntityHeader.displayName = 'EntityHeader';

function EntityNameCell({
  children,
  entityType,
  className,
  depth = 0,
  variant = 'body-sm',
  ...rest
}: ComponentPropsWithoutRef<typeof Typography> & {
  entityType: ExplorerEntityType;
  depth?: number;
}) {
  const iconProps = useMemo<ComponentPropsWithoutRef<typeof Icon>>(() => {
    switch (entityType) {
      case 'dir':
        return { name: 'folder' };
      case 'file':
      default:
        return { name: 'file-text' };
    }
  }, [entityType]);
  return (
    <Typography
      style={
        {
          '--row-depth-pl': `${depth * 1.25}rem`,
        } as CSSProperties & { '--row-depth-pl': string }
      }
      className={cn(
        'flex w-full flex-nowrap items-center gap-x-1 pl-[--row-depth-pl]',
        className
      )}
      variant={variant}
      {...rest}
    >
      <Icon {...iconProps} className='text-[1em]' />
      &nbsp;
      <span className='line-clamp-1 max-w-full truncate'>{children}</span>
    </Typography>
  );
}
EntityNameCell.displayName = 'EntityNameCell';

function EntityDateCell({
  className,
  date,
  variant = 'body-sm',
  ...rest
}: Omit<ComponentPropsWithoutRef<typeof Typography>, 'children'> & {
  date: string;
}) {
  return (
    <Typography
      className={cn('whitespace-nowrap', className)}
      color='secondary'
      variant={variant}
      {...rest}
      asChild
    >
      <span>{date}</span>
    </Typography>
  );
}
EntityDateCell.displayName = 'EntityDateCell';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCellEmptyPlaceholder,
  TableCaption,
  InteractiveTableRow,
  ExpanderTableRow,
  EntityHeader,
  EntityNameCell,
  EntityDateCell,
};
