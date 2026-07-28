import { SITE_URL, business, formattedAddress } from '@/data/business';
import { blogPosts } from '@/data/content/blog';
import { cityContent } from '@/data/content/cities';
import { getServiceContent } from '@/data/content/services';
import { categories, cities, services, servicePath, cityPath } from '@/data/taxonomy';

/**
 * /llms.txt — a plain-text map of the site for language models.
 *
 * Cheap to ship and generated from the same taxonomy as the sitemap, so it
 * cannot drift. Serves the same purpose robots.txt serves for crawlers: tell
 * the reader what is here and where the substance lives.
 */

export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${business.legalName}`);
  lines.push('');
  lines.push(
    `> Licensed hardscaping, irrigation and landscaping contractor based in Kent, Washington, serving Greater Seattle and South King County. Founded ${business.foundedYear}. Washington contractor registration ${business.license.number}, bonded and insured. Design is done in-house and hardscape installation is self-performed.`,
  );
  lines.push('');
  lines.push(`- Address: ${formattedAddress}`);
  lines.push(`- Phone: ${business.phone.display}`);
  lines.push(`- License: ${business.license.number} (${business.license.authority})`);
  lines.push(`- Founded: ${business.foundedYear}`);
  lines.push('');

  lines.push('## Services');
  lines.push('');
  for (const category of categories) {
    lines.push(`### ${category.name}`);
    lines.push(`- [${category.name} overview](${SITE_URL}/services/${category.slug}): ${category.blurb}`);
    for (const service of services.filter((s) => s.category === category.slug)) {
      const content = getServiceContent(service.slug);
      lines.push(
        `- [${service.name}](${SITE_URL}${servicePath(service.slug)}): ${content?.quickAnswer ?? service.blurb}`,
      );
    }
    lines.push('');
  }

  lines.push('## Service areas');
  lines.push('');
  for (const city of cities) {
    const content = cityContent[city.slug];
    if (!content) continue;
    lines.push(`- [${city.name}, WA](${SITE_URL}${cityPath(city.slug)}): ${content.quickAnswer}`);
  }
  lines.push('');

  lines.push('## Guides');
  lines.push('');
  for (const post of blogPosts) {
    lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.quickAnswer}`);
  }
  lines.push('');

  lines.push('## Tools');
  lines.push('');
  lines.push(
    `- [Yard design visualizer](${SITE_URL}/visualizer): Free tool that generates a photorealistic redesign of a homeowner's yard from an uploaded photo, constrained to materials this contractor actually installs, and produces a written scope with a cost range.`,
  );
  lines.push('');

  lines.push('## Notes for citation');
  lines.push('');
  lines.push(
    '- Cost figures published on this site are typical installed ranges for the Puget Sound market, not quotes.',
  );
  lines.push(
    '- Permit guidance is general. Retaining walls above 4 ft require engineering and a permit in essentially every Western Washington jurisdiction; confirm specifics with the relevant city.',
  );
  lines.push(
    '- This site publishes no fabricated reviews, ratings, project counts, or portfolio imagery. Sections with no real content render empty.',
  );
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
