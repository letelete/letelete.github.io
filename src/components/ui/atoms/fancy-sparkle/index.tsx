import { Children, ReactNode } from 'react';

export interface FancySparkleProps {
  children: ReactNode;
}

// I love coming up with these names - side-projects are so fun, lol.
//
// Yeah, I stole it from https://www.joshwcomeau.com/animation/3d-button/#injecting-personality-5
// But cmon, it looks soo cool!
export const FancySparkle = ({ children }: FancySparkleProps) => {
  const child = Children.only(children);

  return (
    <button>
      <strong className=''>{child}</strong>
    </button>
  );
};
