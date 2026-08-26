import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * The one button.
 *
 * Every call-to-action on the site renders through this, so the CTA treatment
 * can only be changed in one place. Sizes are floored at 44px (48px for the
 * default) to satisfy the mobile touch-target requirement without every caller
 * having to remember it.
 *
 * `asChild` puts the styles onto a child element — used for `<Link>` and `<a>`,
 * so a navigation CTA stays a real anchor rather than a button that calls
 * router.push, which would break middle-click and open-in-new-tab.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] motion-reduce:active:scale-100',
  {
    variants: {
      variant: {
        /** Green on a blue page — the strongest pull available inside the
            original palette, and the 'landscaping' half of the name. */
        primary: 'bg-leaf-600 text-white hover:bg-leaf-700',
        brand: 'bg-brand-600 text-white hover:bg-brand-700',
        outline: 'border border-ink-200 bg-white text-brand-900 hover:border-brand-600',
        /** For dark sections, where a light border is the only workable option. */
        onDark: 'border border-brand-50/30 text-white hover:border-brand-50/70',
        /** Over a photographic hero, where the backdrop is unpredictable. */
        /* A photo has bright and dark halves, so a 5%-white fill vanishes over
           half of them. A dark scrim guarantees contrast wherever it lands. */
        onHero:
          'border border-white/40 bg-black/40 text-white backdrop-blur-sm hover:bg-black/55 hover:border-white/70',
        ghost: 'text-brand-900 hover:bg-ink-200/60',
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
