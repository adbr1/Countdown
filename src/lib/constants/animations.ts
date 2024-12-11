export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500
} as const;

export const ANIMATION_EASINGS = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
} as const;