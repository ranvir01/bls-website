import type { Config } from 'tailwindcss';

/**
 * Phase 1 design system.
 *
 * Every colour, size, radius and shadow the site uses is declared here and
 * surfaced as a CSS variable in app/globals.css. Components consume tokens
 * only — an ad-hoc hex value in a component is a bug.
 *
 * Palette intent: premium PNW stone-and-moss, not generic "landscaping green".
 * Cool stone neutrals carry the page; a warm clay accent carries every CTA,
 * which is what gives the buttons the strongest pull on a cool page.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        stone: {
          950: 'hsl(var(--stone-950) / <alpha-value>)',
          800: 'hsl(var(--stone-800) / <alpha-value>)',
          500: 'hsl(var(--stone-500) / <alpha-value>)',
          200: 'hsl(var(--stone-200) / <alpha-value>)',
          50: 'hsl(var(--stone-50) / <alpha-value>)',
        },
        moss: {
          700: 'hsl(var(--moss-700) / <alpha-value>)',
          500: 'hsl(var(--moss-500) / <alpha-value>)',
          100: 'hsl(var(--moss-100) / <alpha-value>)',
        },
        clay: {
          600: 'hsl(var(--clay-600) / <alpha-value>)',
          400: 'hsl(var(--clay-400) / <alpha-value>)',
        },
        success: 'hsl(var(--success) / <alpha-value>)',
        warn: 'hsl(var(--warn) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',

        // Semantic aliases consumed by the Radix-based ui/ primitives.
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },

      fontFamily: {
        // Display serif — differentiates from every geometric-sans competitor.
        display: ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Fluid scale. Clamp means no breakpoint jumps and no layout shift.
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['1.5rem', { lineHeight: '1.25' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.65' }],
        caption: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },

      maxWidth: {
        // Prose measure. Anything wider is unreadable at body size.
        prose: '68ch',
        container: '1280px',
      },

      // Sharp edges read as "contractor / craft". Pills read as SaaS template.
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
        md: '3px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        full: '9999px', // reserved for avatars, pips and the scroll-to-top control
      },

      boxShadow: {
        // No heavy drop shadows. Depth comes from 1px borders plus a soft lift.
        subtle: '0 1px 2px rgba(16,18,15,.04)',
        card: '0 1px 2px rgba(16,18,15,.04), 0 8px 24px rgba(16,18,15,.06)',
        lifted: '0 2px 4px rgba(16,18,15,.05), 0 16px 40px rgba(16,18,15,.10)',
        header: '0 1px 0 rgba(16,18,15,.08)',
      },

      spacing: {
        // 8px base scale extensions for section rhythm.
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s cubic-bezier(0.16,1,0.3,1)',
        'accordion-up': 'accordion-up 0.2s cubic-bezier(0.16,1,0.3,1)',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
