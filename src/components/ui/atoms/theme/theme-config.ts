export const THEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = 'light';
