import { type RefObject } from 'react';
import { mergeRefs } from 'react-merge-refs';
import useMeasure, { type RectReadOnly } from 'react-use-measure';

type HTMLOrSVGElement = HTMLElement | SVGElement;

export type ElementGeometry = RectReadOnly;

export const useElementGeometry = <TElement extends HTMLOrSVGElement>(
  userRef?: RefObject<TElement>
) => {
  const [measureRef, geometry] = useMeasure();

  const ref = userRef ? mergeRefs<TElement>([measureRef, userRef]) : measureRef;

  return [ref, geometry satisfies ElementGeometry] as const;
};
