import type { CategorySlug } from './types';

/**
 * The Blue Landscaping photo library.
 *
 * WHERE THESE CAME FROM
 * ---------------------
 * 130+ photographs of real Blue Landscaping jobs, hosted on Imgur. They were
 * never files in this repository — they lived as URLs inside the components of
 * the previous site, which is why a `git log` audit of public/images turned up
 * only two files and concluded, wrongly, that there was almost no photography.
 * There is a great deal of it, it is all real work, and it belongs on the site.
 *
 * WHY THEY STAY REMOTE
 * --------------------
 * Imgur serves size variants by appending a letter before the extension —
 * `t` 160px, `m` 320px, `l` 640px, `h` 1024px, no suffix for the original.
 * `lib/imgur.ts` turns that into a next/image loader, so every photo gets a
 * real responsive srcset off Imgur's CDN with no image-optimizer in the path.
 * Nothing to download, nothing to keep in sync, and no build step that can
 * fail because a third-party host had a bad minute.
 *
 * ADDING PHOTOS
 * -------------
 * Upload to the same Imgur account, paste the direct i.imgur.com link into the
 * right array below. Titled entries in `featuredProjects` show up on the
 * homepage and the portfolio filter; entries in `galleries` feed the service
 * category carousels. Nothing else needs editing.
 */

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  src: string;
  tags: string[];
  /** Service page this project links to. */
  serviceSlug: string;
  category: CategorySlug;
}

/**
 * Jose Oliva and the crew. The only photograph on the site with faces in it,
 * which is exactly why it goes high on the homepage — a contractor you can see
 * is a contractor you will call.
 */
export const OWNER_PHOTO = {
  src: 'https://i.imgur.com/KngV7VK.jpg',
  alt: 'The owners of Blue Landscaping Services',
} as const;

/**
 * Before-and-after pairs from real jobs. The single most persuasive asset a
 * landscaping company has: it is the only format that shows the problem the
 * customer currently has next to the thing they are buying.
 */
export const beforeAfterPairs: { before: string; after: string }[] = [
  { before: 'https://i.imgur.com/a4YfFsq.png', after: 'https://i.imgur.com/g7If2eg.png' },
  { before: 'https://i.imgur.com/rtFxUlr.png', after: 'https://i.imgur.com/w5zcAJ6.png' },
  { before: 'https://i.imgur.com/zHKeI3Q.png', after: 'https://i.imgur.com/kDH4cbo.png' },
  { before: 'https://i.imgur.com/znNyHFH.png', after: 'https://i.imgur.com/iXHwj38.png' },
  { before: 'https://i.imgur.com/2FpEyQb.png', after: 'https://i.imgur.com/qd4YfuQ.png' },
  { before: 'https://i.imgur.com/OADM5v9.png', after: 'https://i.imgur.com/jO1pDEK.png' },
  { before: 'https://i.imgur.com/i4ZrNmk.png', after: 'https://i.imgur.com/055OKmw.png' },
];

/** Titled projects, with the copy written for them on the previous site. */
export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Front Yard Renovation',
    description:
      'Complete front yard transformation featuring modern concrete walkways, custom planting design, and integrated lighting for curb appeal.',
    src: 'https://i.imgur.com/IaiBKca.jpg',
    tags: ['Front Yard', 'Walkways', 'Planting Design'],
    serviceSlug: 'walkways',
    category: 'hardscaping',
  },
  {
    title: 'Modern Patio Design',
    description:
      'Custom patio design featuring modern furniture placement, integrated landscaping, and thoughtful space planning for outdoor living.',
    src: 'https://i.imgur.com/HVYzhQi.jpg',
    tags: ['Patio Design', 'Outdoor Living', 'Space Planning'],
    serviceSlug: 'paver-patios',
    category: 'hardscaping',
  },
  {
    title: 'Backyard Patio & Irrigation',
    description:
      'Custom backyard patio installation with integrated irrigation system, creating a functional outdoor living space with proper water management for surrounding plants.',
    src: 'https://i.imgur.com/9sFpPqq.jpg',
    tags: ['Patio Design', 'Irrigation', 'Outdoor Space'],
    serviceSlug: 'paver-patios',
    category: 'hardscaping',
  },
  {
    title: 'Modern Stepping Stone Pathway',
    description:
      'Elegant rectangular concrete stepping stones precisely installed along the driveway edge. Set in dark crushed rock, this modern pathway creates a functional connection while preventing soil erosion and enhancing curb appeal with its clean, contemporary design.',
    src: 'https://i.imgur.com/Vopbikr.jpg',
    tags: ['Stepping Stones', 'Driveway Enhancement', 'Modern Design', 'Functional Pathway'],
    serviceSlug: 'walkways',
    category: 'hardscaping',
  },
  {
    title: 'Sod Installation & Landscape Lighting',
    description:
      'Professional sod installation paired with strategic landscape lighting to transform your yard. Fresh, premium-grade turf provides an instant green lawn, while energy-efficient lighting enhances nighttime visibility and curb appeal, highlighting your property\'s best features.',
    src: 'https://i.imgur.com/EceZEhi.jpg',
    tags: ['Sod Installation', 'Landscape Lighting', 'Lawn Renovation', 'Curb Appeal'],
    serviceSlug: 'sod-installation',
    category: 'landscaping',
  },
  {
    title: 'Custom Entry Design',
    description:
      'Architectural entry design combining hardscaping and landscaping elements for a welcoming approach to your home.',
    src: 'https://i.imgur.com/5IdRLFZ.jpg',
    tags: ['Entry Design', 'Hardscaping', 'Landscaping'],
    serviceSlug: 'walkways',
    category: 'hardscaping',
  },
  {
    title: 'Stone Retaining Wall',
    description:
      'Expertly crafted stone retaining wall with proper drainage and engineering for both function and beauty.',
    src: 'https://i.imgur.com/8oL7rQO.jpg',
    tags: ['Stone Work', 'Retaining Wall', 'Drainage'],
    serviceSlug: 'retaining-walls',
    category: 'hardscaping',
  },
  {
    title: 'Professional Irrigation System',
    description:
      'Custom irrigation system design and installation to efficiently deliver water to your plants and lawn. Features precision sprinkler placement, programmable timer controls, and water-conserving technology to keep your landscape healthy while reducing water usage.',
    src: 'https://i.imgur.com/90HMYen.jpg',
    tags: ['Irrigation', 'Water Conservation', 'Landscape Maintenance', 'Sprinkler Systems'],
    serviceSlug: 'sprinkler-installation',
    category: 'irrigation',
  },
  {
    title: 'Contemporary Driveway Pathway',
    description:
      'Meticulously installed rectangular stepping stones along a residential driveway, creating a functional pathway that enhances curb appeal. Dark crushed rock provides contrast while allowing proper drainage, complemented by a lush, manicured lawn and thoughtfully placed plantings near the home.',
    src: 'https://i.imgur.com/Bn1312V.jpg',
    tags: ['Driveway Design', 'Stepping Stones', 'Modern Landscaping', 'Residential Access'],
    serviceSlug: 'driveways',
    category: 'hardscaping',
  },
  {
    title: 'Modern Planting Design',
    description:
      'Contemporary planting design with drought-tolerant plants, decorative mulch, and clean architectural lines for a stunning front yard.',
    src: 'https://i.imgur.com/JKm4ubP.jpg',
    tags: ['Modern Design', 'Drought Tolerant', 'Low Maintenance'],
    serviceSlug: 'planting-design',
    category: 'landscaping',
  },
  {
    title: 'Modern Gate Installation',
    description:
      'Custom designed gate with horizontal wood slats and decorative grid pattern, complemented by vertical fencing and integrated landscaping.',
    src: 'https://i.imgur.com/4lAfc27.jpg',
    tags: ['Custom Gate', 'Modern Design', 'Landscaping'],
    serviceSlug: 'fencing',
    category: 'landscaping',
  },
  {
    title: 'Custom Deck Stairs',
    description:
      'Professional deck stair installation with non-slip treads, sturdy construction, and integrated railing system for safe and stylish access.',
    src: 'https://i.imgur.com/QF7kFKc.jpg',
    tags: ['Deck Stairs', 'Custom Design', 'Safety'],
    serviceSlug: 'outdoor-steps',
    category: 'hardscaping',
  },
  {
    title: 'Luxury Outdoor Kitchen',
    description:
      'Custom outdoor kitchen featuring premium appliances, natural stone countertops, and integrated lighting for the ultimate outdoor cooking and entertaining experience.',
    src: 'https://i.imgur.com/HMtM9HV.jpg',
    tags: ['Outdoor Kitchen', 'Custom Design', 'Entertainment'],
    serviceSlug: 'paver-patios',
    category: 'hardscaping',
  },
  {
    title: 'Custom Planting Design',
    description:
      'Professional planting bed installation with carefully selected plants for year-round color and texture, featuring drought-resistant varieties.',
    src: 'https://i.imgur.com/fGbXlwy.jpg',
    tags: ['Plant Design', 'Drought Resistant', 'Low Maintenance'],
    serviceSlug: 'planting-design',
    category: 'landscaping',
  },
];

const hardscapingGallery = [
  'https://i.imgur.com/gNOWitQ.jpg',
  'https://i.imgur.com/S0SCwEP.jpg',
  'https://i.imgur.com/rONx6pN.jpg',
  'https://i.imgur.com/krNpok4.jpg',
  'https://i.imgur.com/WxjPT00.jpg',
  'https://i.imgur.com/ihMJotj.jpg',
  'https://i.imgur.com/IM63yVK.jpg',
  'https://i.imgur.com/WalHE5M.jpg',
  'https://i.imgur.com/iuOTAoq.jpg',
  'https://i.imgur.com/wDBAf8S.jpg',
  'https://i.imgur.com/lK3DW9m.jpg',
  'https://i.imgur.com/vaAE2xG.jpg',
  'https://i.imgur.com/IbU3PZH.jpg',
  'https://i.imgur.com/tlBRoZQ.jpg',
  'https://i.imgur.com/Vn4NTeS.jpg',
  'https://i.imgur.com/01wyJYX.jpg',
  'https://i.imgur.com/iI4T9B9.jpg',
  'https://i.imgur.com/xrJCGj8.jpg',
  'https://i.imgur.com/beK9wHi.jpg',
  'https://i.imgur.com/IE7g7jQ.jpg',
  'https://i.imgur.com/xlGUzbO.jpg',
  'https://i.imgur.com/Z1fqC0W.jpg',
  'https://i.imgur.com/3YCtVmB.jpg',
  'https://i.imgur.com/W4rJQVT.jpg',
  'https://i.imgur.com/kZT1SN0.jpg',
  'https://i.imgur.com/HsOg2ir.jpg',
  'https://i.imgur.com/Kg5cNlS.jpg',
  'https://i.imgur.com/aAuWL1A.jpg',
  'https://i.imgur.com/pzVfDKZ.jpg',
  'https://i.imgur.com/Ie2Az1m.jpg',
  'https://i.imgur.com/8pQpJzJ.jpg',
  'https://i.imgur.com/1LbzU5m.jpg',
  'https://i.imgur.com/fqpLd95.jpg',
  'https://i.imgur.com/JMydFBT.jpg',
  'https://i.imgur.com/meLTFWW.jpg',
  'https://i.imgur.com/IhXP84p.jpg',
  'https://i.imgur.com/ieMuskv.jpg',
  'https://i.imgur.com/zM33JVe.jpg',
  'https://i.imgur.com/Ti3plls.jpg',
  'https://i.imgur.com/cYefFPu.jpg',
  'https://i.imgur.com/pMywawC.jpg',
  'https://i.imgur.com/p5jQQCe.jpg',
  'https://i.imgur.com/YAIIZ80.jpg',
  'https://i.imgur.com/pDES5RU.jpg',
  'https://i.imgur.com/Q9tSlNG.jpg',
  'https://i.imgur.com/nxGpCQx.jpg',
];

const irrigationGallery = [
  'https://i.imgur.com/jzBsjww.jpg',
  'https://i.imgur.com/KP4cslY.jpg',
  'https://i.imgur.com/LkN1m9v.jpg',
  'https://i.imgur.com/CYMUEYS.jpg',
  'https://i.imgur.com/AKFKlal.jpg',
  'https://i.imgur.com/DMC2c2v.jpg',
  'https://i.imgur.com/9rWWTOJ.jpg',
  'https://i.imgur.com/UPQn98E.jpg',
  'https://i.imgur.com/EZEIB0b.jpg',
  'https://i.imgur.com/y17JRRL.jpg',
  'https://i.imgur.com/8Kk2pvf.jpg',
  'https://i.imgur.com/oH7Zioq.jpg',
  'https://i.imgur.com/SXby7oE.jpg',
  'https://i.imgur.com/H90g2lh.jpg',
  'https://i.imgur.com/1W7h4KQ.jpg',
  'https://i.imgur.com/Q1ITpfM.jpg',
  'https://i.imgur.com/emc78kf.jpg',
  'https://i.imgur.com/9xXwPeo.jpg',
  'https://i.imgur.com/p4pchFK.jpg',
];

const landscapingGallery = [
  'https://i.imgur.com/ac5J7DP.jpg',
  'https://i.imgur.com/TRSuzIt.jpg',
  'https://i.imgur.com/PwTnP1V.jpg',
  'https://i.imgur.com/fcuXlOI.jpg',
  'https://i.imgur.com/TrOMn93.jpg',
  'https://i.imgur.com/Gp7p8rn.jpg',
  'https://i.imgur.com/bXUelJe.jpg',
  'https://i.imgur.com/4rQXFgr.jpg',
  'https://i.imgur.com/QkYDlxb.jpg',
  'https://i.imgur.com/cW5U6SQ.jpg',
  'https://i.imgur.com/0yszzEK.jpg',
  'https://i.imgur.com/9iTCouu.jpg',
  'https://i.imgur.com/Z4FDFMh.jpg',
  'https://i.imgur.com/fLtQURL.jpg',
  'https://i.imgur.com/30vqK2G.jpg',
  'https://i.imgur.com/9mAnZGw.jpg',
  'https://i.imgur.com/CqckNYx.jpg',
  'https://i.imgur.com/1hZGbAl.jpg',
  'https://i.imgur.com/MRdn7QA.jpg',
  'https://i.imgur.com/xPoK3O9.jpg',
  'https://i.imgur.com/u0ngIw5.jpg',
  'https://i.imgur.com/haU73uK.jpg',
  'https://i.imgur.com/oQaMbnI.jpg',
  'https://i.imgur.com/u3SGBMG.jpg',
  'https://i.imgur.com/Oh7X8e3.jpg',
  'https://i.imgur.com/qKo8vfZ.jpg',
  'https://i.imgur.com/YsV0DLp.jpg',
  'https://i.imgur.com/hqSfibV.jpg',
  'https://i.imgur.com/gG5h7Zu.jpg',
  'https://i.imgur.com/62hxRnY.jpg',
  'https://i.imgur.com/KGYTzxd.jpg',
  'https://i.imgur.com/TkQ9QVb.jpg',
  'https://i.imgur.com/s85ERoS.jpg',
  'https://i.imgur.com/6ufmNMb.jpg',
  'https://i.imgur.com/vLoG0qT.jpg',
  'https://i.imgur.com/vekuodq.jpg',
  'https://i.imgur.com/8ZePdi5.jpg',
  'https://i.imgur.com/LkWTnyz.jpg',
  'https://i.imgur.com/v9ZdiZx.jpg',
  'https://i.imgur.com/PCWNVxb.jpg',
  'https://i.imgur.com/oGHOa8b.jpg',
  'https://i.imgur.com/BzVWsTq.jpg',
  'https://i.imgur.com/TKANgyr.jpg',
  'https://i.imgur.com/cXTjSEa.jpg',
  'https://i.imgur.com/BtR9L5l.jpg',
  'https://i.imgur.com/567ip1q.jpg',
  'https://i.imgur.com/LxTuww5.jpg',
  'https://i.imgur.com/WLxRsiB.jpg',
];

/**
 * Category galleries. Alt text is written per category rather than per photo:
 * these are undescribed job shots, and a made-up caption on each one would be
 * worse than an honest generic description.
 */
const ALT: Record<CategorySlug, string> = {
  hardscaping: 'Completed hardscaping work by Blue Landscaping Services',
  irrigation: 'Irrigation system installed by Blue Landscaping Services',
  landscaping: 'Completed landscaping work by Blue Landscaping Services',
};

function toPhotos(urls: string[], category: CategorySlug): GalleryPhoto[] {
  return urls.map((src, i) => ({ src, alt: `${ALT[category]} (${i + 1} of ${urls.length})` }));
}

export const galleries: Record<CategorySlug, GalleryPhoto[]> = {
  hardscaping: toPhotos(hardscapingGallery, 'hardscaping'),
  irrigation: toPhotos(irrigationGallery, 'irrigation'),
  landscaping: toPhotos(landscapingGallery, 'landscaping'),
};

/** Everything, for the portfolio page's "all work" view. */
export const allGalleryPhotos: GalleryPhoto[] = [
  ...galleries.hardscaping,
  ...galleries.irrigation,
  ...galleries.landscaping,
];

export const PHOTO_COUNT =
  allGalleryPhotos.length + featuredProjects.length + beforeAfterPairs.length * 2 + 1;

/**
 * The photograph that heads a service card or a service page.
 *
 * Two tiers, in order:
 *
 *  1. A titled project that IS this service — the best case, because it comes
 *     with a real description and the alt text can name what is in the frame.
 *  2. Otherwise a stable pick from the service's category gallery. These are
 *     real Blue Landscaping jobs in that discipline, and the alt text says
 *     exactly that rather than claiming the photo shows the specific service.
 *     The index is derived from the slug so the same card always gets the same
 *     photo across builds — a service page whose header image shuffles on every
 *     deploy looks broken, not lively.
 */
export function serviceHeroPhoto(
  slug: string,
  category: CategorySlug,
): GalleryPhoto | null {
  const titled = featuredProjects.find((p) => p.serviceSlug === slug);
  if (titled) return { src: titled.src, alt: `${titled.title} — Blue Landscaping Services` };

  const pool = galleries[category];
  if (!pool.length) return null;

  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}
