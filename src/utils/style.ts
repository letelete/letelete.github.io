import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function vhToPx(vh: number) {
  return document.documentElement.clientHeight * (vh / 100);
}

export const tw = resolveConfig(tailwindConfig);
