import { useMemo } from 'react';

import { pipe } from '~utils/functional';
import { tw } from '~utils/style';

export type ColorCode = keyof typeof colorsMap;

export type FileBitmap = ColorCode[][];

export const colorsMap = tw.theme.colors.heart;

const finalBitmap = [
  [0, 0, 1, 1, 0, 1, 1, 0, 0],
  [0, 1, 2, 4, 1, 4, 6, 1, 0],
  [1, 2, 3, 2, 4, 4, 5, 6, 1],
  [1, 3, 2, 4, 4, 4, 5, 6, 1],
  [1, 4, 4, 4, 4, 4, 5, 6, 1],
  [0, 1, 4, 4, 4, 5, 6, 1, 0],
  [0, 0, 1, 4, 5, 6, 1, 0, 0],
  [0, 0, 0, 1, 6, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
] as const satisfies FileBitmap;

const replaceFinalColor = (
  matchInFinal: ColorCode | ColorCode[],
  color: ColorCode,
  currentBitmap: FileBitmap,
  finalBitmap: FileBitmap
) => {
  return currentBitmap.map((row, colIndex) =>
    row.map((currentColor, rowIndex) => {
      const finalColor = finalBitmap[colIndex]?.[rowIndex];
      if (!finalColor) {
        return currentColor;
      }
      if (Array.isArray(matchInFinal)) {
        return matchInFinal.includes(finalColor) ? color : currentColor;
      }
      return matchInFinal === finalColor ? color : currentColor;
    })
  );
};

const phases: ((currentBitmap: FileBitmap) => FileBitmap)[] = [
  (currentBitmap) => {
    const transparent = replaceFinalColor(
      [1, 2, 3, 4, 5, 6],
      0,
      currentBitmap,
      finalBitmap
    );
    const accentOutline = replaceFinalColor(1, 4, transparent, finalBitmap);
    return accentOutline;
  },
  (currentBitmap) => {
    const finalOutline = replaceFinalColor(1, 1, currentBitmap, finalBitmap);
    const fullShape = replaceFinalColor(
      [2, 3, 4, 5, 6],
      4,
      finalOutline,
      finalBitmap
    );
    return fullShape;
  },
  (currentBitmap) => {
    const shadowBridge = replaceFinalColor(5, 5, currentBitmap, finalBitmap);
    const shadow = replaceFinalColor(6, 6, shadowBridge, finalBitmap);
    return shadow;
  },
  (currentBitmap) => {
    const lightBridge = replaceFinalColor(3, 3, currentBitmap, finalBitmap);
    const light = replaceFinalColor(2, 2, lightBridge, finalBitmap);
    return light;
  },
];

export const phasesLength = phases.length;

export const useIncrementalHeart = (phase: number) => {
  assertValidPhase(phase);

  const phaseBitmap = useMemo(() => {
    const pipeBody = phases.filter((_fn, i) => i <= phase);

    return pipe(...pipeBody)(finalBitmap);
  }, [phase]);

  return [phaseBitmap, colorsMap] as const;
};

const assertValidPhase = (phase: number) => {
  if (phase < 0 || phase >= phases.length) {
    throw new Error(
      `Phase "${phase}" out of bounds: expected value in range of [0, ${phases.length - 1}]`
    );
  }
  return true;
};
