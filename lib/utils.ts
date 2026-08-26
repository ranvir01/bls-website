import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Class merging, taught about this project's custom scales.
 *
 * WHY THIS IS NOT THE ONE-LINE `twMerge(clsx(...))`
 * -------------------------------------------------
 * tailwind-merge has to guess which CSS property a utility controls, and for
 * `text-*` it guesses from the value: `text-lg` is a size, `text-white` is a
 * colour. Our type scale uses names it has never seen — `text-body`,
 * `text-caption`, `text-h1` — so it filed them under *colour* and then treated
 * them as conflicting with real colours.
 *
 * The button variants are `bg-leaf-600 text-white` + `min-h-[52px] px-7
 * text-body`. Last one wins, so `text-white` was silently deleted from every
 * button on the site and the label fell back to inheriting whatever the
 * surrounding section was using — ink-800 on a green button, about 2:1
 * contrast. It looked like a design choice rather than a bug, which is why it
 * survived a full visual pass.
 *
 * Declaring the custom scales below puts each utility in the right group, so
 * `text-white` and `text-body` stop fighting over the same slot. Any new
 * fontSize, boxShadow or backgroundImage key added to tailwind.config.ts has
 * to be added here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Mirrors theme.extend.fontSize in tailwind.config.ts.
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'body-lg', 'body', 'caption'] }],
      // Mirrors theme.extend.boxShadow.
      shadow: [{ shadow: ['subtle', 'card', 'lifted', 'header', 'ember', 'focus'] }],
      // Mirrors theme.extend.backgroundImage — a gradient, not a colour.
      'bg-image': [{ bg: ['brand-gradient'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
