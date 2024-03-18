import Link from 'next/link';
import { ComponentPropsWithoutRef, ReactNode, useCallback } from 'react';

export interface LocationTag extends ComponentPropsWithoutRef<'span'> {
  name: string;
  place: string;
  href?: string;
}

export const LocationTag = ({ name, place, href, ...rest }: LocationTag) => {
  const renderAsLink = useCallback(
    (element: ReactNode, href: string) => (
      <Link className='underline' href={href}>
        {element}
      </Link>
    ),
    []
  );

  const element = (
    <span {...rest}>
      {name}

      <span className='text-accent'>@</span>

      {place}
    </span>
  );

  if (href) {
    return renderAsLink(element, href);
  }

  return element;
};
