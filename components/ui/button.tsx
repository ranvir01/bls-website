import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * The one button.
 *
 * Every call to action on the site renders through this, so the CTA treatment
 * can only be changed in one place. Sizes are floored at 44px (48px for the
 * default) to satisfy the mobile touch-target requirement without every caller
 * having to remember it.
 *
 * `asChild` puts the styles onto a child element — used for `<Link>` and `<a>`,
 * so a navigation CTA stays a real anchor rather than a button that calls
 * router.push, which would break middle-click and open-in-new-tab.
 *
 * PICKING A VARIANT
 * -----------------
 * The action colour flips by surface, because no single fill clears WCAG
 * 1.4.11's 3:1 shape requirement against both a white page and the navy band
 * (see the palette note in tailwind.config.ts). So the variant name says which
 * surface it is for, and getting it wrong is visible immediately rather than
 * silently inaccessible:
 *
 *   primary   — the main action on white / ink-50.  leaf-600, white text.
 *   onDark    — the main action on a navy band.      leaf-400, navy text.
 *   onPhoto   — the main action over a photograph.   leaf-400 plus a navy edge.
 *   outline   — secondary on white / ink-50.
 *   onHero    — secondary over photography, where the backdrop is unknown.
 *   ghost     — tertiary, inside cards and toolbars.
 *
 * The focus ring is two stacked box-shadows, white inside navy outside, rather
 * than a ring with an offset colour. Those two contrast 14.4:1 with each other,
 * so whichever surface the button lands on, one of the rings is always visible
 * — a single-colour ring cannot manage that across white, navy, gold and a
 * photograph.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
    'transition-[background-color,border-color,color,box-shadow] duration-150',
    'disabled:pointer-events-none disabled:opacity-60',
    'active:scale-[0.98] motion-reduce:active:scale-100',
    'focus-visible:outline-none focus-visible:shadow-focus',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Main action on a light surface. Label 5.01:1, shape 5.01:1. */
        primary: 'bg-leaf-600 text-white shadow-subtle hover:bg-leaf-700 active:bg-leaf-800',
        /**
         * Main action on a navy band. The same green at the step that survives
         * a dark surface: leaf-600 there is 2.91:1 and its shape vanishes,
         * leaf-400 is 5.95:1 on both label and fill. Hover and active go
         * LIGHTER, which on a dark ground is what reads as coming forward.
         */
        onDark: 'bg-leaf-400 text-brand-900 hover:bg-leaf-300 active:bg-leaf-200',
        /**
         * Main action over a photograph. The dark-surface green plus a heavy
         * navy edge, because a photo covers the whole luminance range and
         * either cue alone fails at one end of it. Measured across sky,
         * concrete, mid-grey, foliage, shadow and black, the worst case is
         * 4.21:1, carried by the ring on mid-grey.
         *
         * The hero previously used `brand` — a dark blue fill on a dark scrim,
         * 1.5:1. Legible label, invisible button, same bug in a different hue.
         */
        onPhoto:
          'border-[3px] border-brand-950 bg-leaf-400 text-brand-900 hover:bg-leaf-300 active:bg-leaf-200',
        /** Secondary on a light surface. The old ink-200 border was 1.23:1. */
        outline:
          'border-[1.5px] border-ink-500 bg-white text-brand-900 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700',
        /** Brand-blue fill, for the rare case that needs identity over action. */
        brand: 'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900',
        /**
         * Secondary over photography. A photo spans the whole luminance range,
         * so this carries its own dark surface rather than trusting the image:
         * a navy scrim at 72% holds a white label at 6.84:1 even against a
         * blown-out white sky, and the bright border keeps the shape.
         */
        onHero:
          'border-[1.5px] border-white/70 bg-brand-950/75 text-white backdrop-blur-sm hover:bg-brand-950/90 hover:border-white',
        /** Secondary on a navy band. Two cues — a fill AND a border. */
        ghostDark:
          'border-[1.5px] border-white/70 bg-white/[0.12] text-white hover:bg-white/20 hover:border-white',
        /** Tertiary. No fill, no border — only ever inside another container. */
        ghost: 'text-brand-800 hover:bg-brand-50 hover:text-brand-700',
      },
      size: {
        sm: 'min-h-[44px] px-4 text-caption',
        md: 'min-h-[48px] px-6 text-body',
        lg: 'min-h-[52px] px-7 text-body',
        icon: 'h-11 w-11',
      },
      full: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', full: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, full }), className)} {...props} />
    );
  },
);

Button.displayName = 'Button';

export { buttonVariants };
