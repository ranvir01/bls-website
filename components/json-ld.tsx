/**
 * Renders a JSON-LD @graph document.
 *
 * Server component by design — structured data must be in the initial HTML,
 * because AI crawlers and most rich-result parsers do not execute JavaScript.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built entirely from typed data files in this repo, never
      // from user input. JSON.stringify plus the `<` escape below is sufficient.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
