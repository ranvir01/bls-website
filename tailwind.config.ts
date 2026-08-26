import type { Config } from 'tailwindcss';

/**
 * Design system.
 *
 * Every colour, size, radius and shadow the site uses is declared here and
 * surfaced as a CSS variable in app/globals.css. Components consume tokens
 * only — an ad-hoc hex value in a component is a bug.
 *
 * PALETTE: the original Blue Landscaping identity. The company is called Blue
 * Landscaping, so blue leads and everything else supports it:
 *
 *   brand  — the blues. Headers, links, dark sections, the whole identity.
 *   sky    — the teals. Secondary accents and gradient partners for brand.
 *   leaf   — the greens. Calls to action, and the "landscaping" half of the
 *            name. Green on blue is the strongest pull available here without
 *            leaving the original palette.
 *   ink    — neutrals from near-white through slate to the darkest text.
 *
 * THE ACTION COLOUR IS GREEN, IN TWO STEPS
 * ----------------------------------------
 * WCAG 1.4.11 wants 3:1 between a control's fill and what is behind it, or the
 * button's SHAPE is invisible even when its label reads perfectly. leaf-600
 * #257f52 on a white page is 4.74:1 and fine. The same green on the brand-900
 * #002566 band is 2.91:1 and is not, which is why the CTA on every dark
 * section used to look like floating text. Same for a dark blue fill on a dark
 * photo scrim: 1.5:1, legible label, no button.
 *
 * So the action colour moves along its own scale by surface, the way Material 3
 * swaps primary/onPrimary between light and dark schemes:
 *
 *   light surfaces  →  leaf-600 #257f52 with WHITE text     (4.96:1 label)
 *   dark surfaces   →  leaf-400 #58b88e with BRAND-900 text (5.95:1 both)
 *
 * It is the green button everywhere. Only the step changes.
 *
 * TWO THINGS ALREADY TRIED THAT WERE WRONG
 * ----------------------------------------
 * 1. Replacing this palette with stone-and-moss plus a warm clay accent. It
 *    looked fine in isolation and had nothing to do with a company called Blue
 *    Landscaping.
 * 2. Keeping the blues but adding an amber/gold "ember" accent for the CTAs,
 *    because no single fill clears 3:1 on both white and navy. The premise is
 *    true; the conclusion did not follow. leaf-400 clears it at 5.95:1, so the
 *    answer was inside the palette all along, and the change put an orange
 *    into a blue-and-green identity for nothing.
 *
 * The rule: fix contrast by moving along a scale that is already here, never by
 * adding a hue that is not.
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
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b3d5ff',
          300: '#80b7ff',
          400: '#4d94ff',
          500: '#1a6dff',
          600: '#0052e6',
          700: '#0042b8',
          800: '#00348f',
          900: '#002566',
          /* Darker than 900 and used for exactly one thing: the heavy edge on
             a CTA sitting over a photograph, where the ring has to hold its own
             against a blown-out sky. */
          950: '#001b4d',
        },
        sky: {
          50: '#eefbff',
          100: '#d9f5ff',
          200: '#b3ebff',
          300: '#80dcff',
          400: '#4dcdff',
          500: '#1abeff',
          600: '#0099e6',
          700: '#007ab8',
          800: '#005c8f',
          900: '#003d66',
        },
        leaf: {
          50: '#f3faf7',
          100: '#e7f5ef',
          200: '#c5e7d8',
          300: '#94d3b8',
          400: '#58b88e',
          500: '#339d6b',
          600: '#257f52',
          700: '#1f6642',
          800: '#1b5237',
          900: '#153f2b',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },

        success: '#257f52',
        warn: '#b45309',
        error: '#b91c1c',

        // Semantic aliases consumed by the ui/ primitives.
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
        // The original pairing. Montserrat carries the headings, Quicksand's
        // rounded terminals keep the body approachable rather than corporate.
        //
        // A previous revision swapped Quicksand for Figtree, arguing that
        // Quicksand ships no italic so every <em> renders as a synthesised
        // oblique. True of the typeface and irrelevant here: this site contains
        // no <em> at all. A real defect in general, absent in this codebase,
        // and it cost a distinctive brand face to fix.
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Fluid scale. Clamp means no breakpoint jumps and no layout shift.
        //
        // Tracking tightens as the size grows: letterforms set at 64px need
        // less air between them than the same forms at 16px, and leaving
        // headline tracking at zero is one of the reliable tells of type that
        // was never looked at. h3 was a hard 1.375rem, which made it the one
        // step in the scale that did not respond to the viewport.
        display: ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h1: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.625rem, 2.6vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        h4: ['1.0625rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        overline: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },

      maxWidth: {
        prose: '68ch',
        container: '1280px',
      },

      // Soft, rounded corners — the original feel. The sharp 2px "contractor"
      // edges of the previous revision read as a different company entirely.
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        full: '9999px',
      },

      /*
       * Shadows tinted to brand-900 rather than neutral slate.
       *
       * A grey shadow under a saturated blue brand reads as haze: the shadow
       * desaturates everything it touches and the whole page goes flat. Tinting
       * the ramp to the darkest brand colour is the difference between a page
       * that looks lit and one that looks dusty. Three layers, not one, because
       * real light falls off gradually.
       */
      boxShadow: {
        subtle: '0 1px 2px rgba(0,37,102,.07)',
        card: '0 1px 2px rgba(0,37,102,.06), 0 4px 12px rgba(0,37,102,.05), 0 12px 32px rgba(0,37,102,.05)',
        lifted:
          '0 1px 2px rgba(0,37,102,.08), 0 8px 20px rgba(0,37,102,.09), 0 24px 56px rgba(0,37,102,.10)',
        header: '0 1px 0 rgba(0,37,102,.08)',
        /* The focus ring. White inside, navy outside — see the note in
           app/globals.css for why it has to be two colours. */
        focus: '0 0 0 2px #ffffff, 0 0 0 4px #002566',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },

      backgroundImage: {
        // The brand gradient. Used on dark bands and hero scrims.
        'brand-gradient': 'linear-gradient(135deg, #002566 0%, #0042b8 55%, #007ab8 100%)',
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
        shimmer: { '100%': { transform: 'translateX(100%)' } },
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
