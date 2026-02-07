import tailwindConfig from '../../tailwind.config';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function vhToPx(vh: number) {
  return document.documentElement.clientHeight * (vh / 100);
}

export const tw = resolveConfig(tailwindConfig);
