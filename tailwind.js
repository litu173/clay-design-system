// Tailwind preset — `presets: [require('clay-ds/tailwind')]`. Colours stay live through Clay's CSS variables.
const ramp = Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => [n, `var(--clay-primary-${n})`]));
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'var(--clay-primary)', foreground: 'var(--clay-on-primary)', soft: 'var(--clay-primary-soft)', ...ramp },
        secondary: 'var(--clay-secondary)', success: 'var(--clay-success)', warning: 'var(--clay-warning)', danger: 'var(--clay-danger)', info: 'var(--clay-info)',
        background: 'var(--clay-bg)',
        surface: { DEFAULT: 'var(--clay-surface)', 2: 'var(--clay-surface-2)', 3: 'var(--clay-surface-3)', elevated: 'var(--clay-elevated)' },
        border: { DEFAULT: 'var(--clay-border)', strong: 'var(--clay-border-strong)' },
        foreground: { DEFAULT: 'var(--clay-text)', muted: 'var(--clay-text-2)', subtle: 'var(--clay-text-3)' },
      },
      borderRadius: { xs: 'var(--clay-radius-xs)', sm: 'var(--clay-radius-sm)', DEFAULT: 'var(--clay-radius)', lg: 'var(--clay-radius-lg)', xl: 'var(--clay-radius-xl)' },
      fontFamily: { sans: ['var(--clay-font)'], display: ['var(--clay-font-display)'], mono: ['var(--clay-font-mono)'] },
      boxShadow: { 1: 'var(--clay-shadow-1)', 2: 'var(--clay-shadow-2)', 3: 'var(--clay-shadow-3)', 4: 'var(--clay-shadow-4)' },
      transitionTimingFunction: { clay: 'var(--clay-ease)', spring: 'var(--clay-ease-spring)' },
      transitionDuration: { clay: 'var(--clay-dur)' },
      height: { control: 'var(--clay-control-h)' },
    },
  },
};
