# Quote Modal API

This document explains how to use the Quote Modal API in the Blue Landscaping Services website.

## Components Structure

The Quote feature consists of several components that work together:

1. **ModalContext** - Provides global state for the quote modal
2. **QuoteModal** - The actual modal component with form
3. **QuoteButton** - Button component that can open the modal
4. **StickyQuoteButton** - Fixed position button that appears while scrolling

## Usage

### 1. Using the Modal Context

The modal context provides a global way to control the quote modal from anywhere in the application:

```jsx
import { useModal } from '@/components/modal-context';

function YourComponent() {
  const { isModalOpen, openModal, closeModal } = useModal();
  
  return (
    <button onClick={openModal}>
      Open Quote Form
    </button>
  );
}
```

### 2. Using the QuoteButton Component

For a simpler implementation, you can use the QuoteButton component directly:

```jsx
import { QuoteButton } from '@/components/quote-button';

function YourComponent() {
  return (
    <QuoteButton className="your-custom-classes">
      Request a Quote
    </QuoteButton>
  );
}
```

### 3. Styling Options

The modal and buttons use Tailwind CSS for styling with built-in:

- Responsive design (adapts to mobile and desktop)
- Animations and transitions
- Focus states for form fields
- Hover effects for buttons

## Customization

To customize the styling:

1. Modify the appropriate component directly
2. Override Tailwind classes when using components
3. Add new utility classes in `globals.css`

## Verification Checklist

- [x] Both navigation bar button and sticky button open the same modal
- [x] Modal covers entire viewport with highest z-index
- [x] Background scroll is properly locked when modal is open
- [x] Sticky button is centered on all breakpoints
- [x] Animations work smoothly on modern browsers
- [x] Form validation works correctly
- [x] Mobile experience is optimized

## Deployment Notes

### Image Loading
Images are configured to use the `unoptimized: true` option in Next.js to ensure proper loading on Netlify. This setting is applied in:

1. `next.config.mjs` globally
2. Individual Image components where needed 

For mobile-optimized images, we use responsive sizes and appropriate quality settings.

### Viewport Configuration
The viewport metadata has been updated to comply with Next.js 14+ requirements:

1. Viewport settings have been moved from `metadata` to a separate `viewport` export in the root layout
2. A common `viewport.ts` file is available for reuse across pages
3. This fixes the "Unsupported metadata viewport" warnings during build

This is a test change to demonstrate Git workflow.