import * as React from 'react';
import { Button } from '~ui/atoms/button';
import { Typography } from '~ui/atoms/typography';
import { cn } from '~utils/style';

const hashSource = (id: string) => `fig-src-${id}`;

export interface MdxFigProps extends React.ComponentPropsWithoutRef<'figure'> {
  id: string;
  caption?: string;
}

export const MdxFig = ({
  id,
  caption,
  children,
  className,
  ...rest
}: MdxFigProps) => {
  return (
    <figure
      className={cn('flex w-full flex-col py-6', className)}
      id={hashSource(id)}
      {...rest}
    >
      {children}

      <Typography
        className='mt-2 text-center'
        variant='body-sm'
        color='hint'
        weight='normal'
        asChild
      >
        <figcaption>
          {`Fig. ${id}.`}
          {caption && ` ${caption}`}
        </figcaption>
      </Typography>
    </figure>
  );
};

export interface MdxFigLinkProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const MdxFigLink = React.memo(
  ({ id, children, className }: MdxFigLinkProps) => {
    return (
      <Button className={cn(className)} variant='link' size='inline' asChild>
        <a href={`#${hashSource(id)}`} className='mt-2 text-center'>
          {children ?? `Fig. ${id}.`}
        </a>
      </Button>
    );
  }
);

MdxFigLink.displayName = ' MdxFigLink';

export { MdxFigLink };
