import * as React from 'react';
import Link from 'next/link';

export interface LocationTag extends React.ComponentPropsWithoutRef<'span'> {
  name: string;
  place: string;
  href?: string;
}

export const LocationTag = ({ name, place, href, ...rest }: LocationTag) => {
  const renderAsLink = React.useCallback(
    (element: React.ReactNode, href: string) => (
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
