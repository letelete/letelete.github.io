'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  Fragment,
  forwardRef,
  useMemo,
} from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/atoms/breadcrumb';
import { BLOG_PATH } from '~/constants';
import { truncateMiddle } from '~/utils/string';
import { cn } from '~/utils/style';

interface BlogBreadcrumbsProps {
  className?: string;
}

const BlogBreadcrumbs = forwardRef<
  ElementRef<'nav'>,
  ComponentPropsWithoutRef<'nav'> & {
    path: string[];
    truncate?: number;
  }
>(({ className, path, truncate }, ref) => {
  const items = useMemo(() => {
    const data = path
      .map((entry) => entry.replace(/\.(.+)$/, ''))
      .map((label, index) => ({
        label: truncate ? truncateMiddle(label, truncate) : label,
        href: `/${path.slice(0, index + 1).join('/')}`,
      }));
    if (data.length <= 2) {
      return data;
    }
    const first = data.at(0);
    if (!first) {
      throw new Error('Invalid State: First breadcrumb item is missing.');
    }
    const last = data.at(-1);
    if (!last) {
      throw new Error('Invalid State: Last breadcrumb item is missing.');
    }
    return [
      first,
      { label: <BreadcrumbEllipsis className='size-4' />, href: BLOG_PATH },
      last,
    ];
  }, [path, truncate]);

  return (
    <motion.nav
      ref={ref}
      className={cn(
        'rounded-full bg-ctx-button px-4 py-2 text-ctx-button-fg-primary',
        className
      )}
    >
      <Breadcrumb>
        <BreadcrumbList className='max-w-full flex-nowrap overflow-hidden whitespace-nowrap rounded-full'>
          {items.map((item, index) => (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index < items.length - 1 ? <BreadcrumbSeparator /> : null}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.nav>
  );
});
BlogBreadcrumbs.displayName = 'BlogBreadcrumbs';

export { BlogBreadcrumbs };
export type { BlogBreadcrumbsProps };
