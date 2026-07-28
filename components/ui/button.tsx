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
  'inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] motion-reduce:active:scale-100',
  {
    variants: {
      variant: {
        /** Warm accent on a cool page — the strongest pull available. */
        primary: 'bg-clay-600 text-white hover:bg-clay-600/90',
        brand: 'bg-moss-700 text-white hover:bg-moss-700/90',
        outline: 'border border-stone-200 bg-white text-stone-950 hover:border-moss-700',
        /** For dark sections, where a light border is the only workable option. */
        onDark: 'border border-moss-100/30 text-white hover:border-moss-100/70',
        /** Over a photographic hero, where the backdrop is unpredictable. */
        onHero:
          'border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/60',
        ghost: 'text-stone-950 hover:bg-stone-200/60',
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
