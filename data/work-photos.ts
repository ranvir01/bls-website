import type { CategorySlug, ImageAsset } from '@/data/types';

/**
 * The job photography.
 *
 * ONE ENTRY PER PHOTOGRAPH, ONE PHOTOGRAPH PER JOB VIEW
 * -----------------------------------------------------
 * These three arrays are concatenated into `allWorkPhotos` for /portfolio, so
 * a photograph filed under two categories appeared twice in the same grid. That
 * had happened to seventeen of the fifty-eight entries — the same yard showing
 * up two and three times on the page whose entire job is proving the work is
 * real, and the same photo captioned as irrigation on one service page and
 * hardscaping on another, where at most one of those can be true.
 *
 * Byte-comparison only caught part of it: several of the repeats were the same
 * shot re-encoded, identical to the eye and different on disk. What is here now
 * is one entry per distinct scene, each filed under the trade the photograph
 * actually shows.
 *
 * WHY THERE ARE ONLY TWO IRRIGATION PHOTOS
 * ----------------------------------------
 * Because there are only two. The array used to hold ten, but eight of those
 * were either duplicates of hardscaping shots or stock sprinkler renders of a
 * park that is not in Washington. Two real ones is the honest number, and the
 * fix is a camera on the next sprinkler job, not a replacement image.
 *
 * ALT TEXT IS THE PHOTOGRAPH, NOT THE COMPANY
 * -------------------------------------------
 * Every entry used to read "Blue Landscaping Services completed work in Greater
 * Seattle" — the same sentence fifty-eight times, which tells a screen reader
 * nothing and tells a search engine less. Each one now says what is in the
 * frame: the material, the structure, the plant. No city unless the photo shows
 * one, and no claim the picture does not support.
 */

export const hardscapingPhotos: ImageAsset[] = [
  { src: '/images/work/hardscaping/02.jpg', width: 1400, height: 1867, alt: "Curved grey block retaining wall holding a bark bed of sedge and hakone grass beside a gravel path, with a lace-leaf maple against a modern house", assetType: 'photo' },
  { src: '/images/work/hardscaping/04.jpg', width: 1400, height: 1050, alt: "Curved flagstone walkway running from a back porch across new sod to a cedar fence and a raised garden bed", assetType: 'photo' },
  { src: '/images/work/hardscaping/05.jpg', width: 1400, height: 1050, alt: "Large-format concrete pavers laid in a staggered grid through black mulch, blue star juniper planted between them and a steel-edged gravel band along the drive", assetType: 'photo' },
  { src: '/images/work/hardscaping/16.jpg', width: 1400, height: 1867, alt: "Flagstone stepping stones set in fresh bark down a narrow side yard beside a new deck frame, boulders lining the fence and a pop-up sprinkler head at the edge", assetType: 'photo' },
  { src: '/images/work/hardscaping/17.jpg', width: 1400, height: 1867, alt: "Rectangular concrete pavers set in pea gravel forming a front walk from the driveway to the door, with steel edging holding the lawn back", assetType: 'photo' },
  { src: '/images/work/hardscaping/18.jpg', width: 1400, height: 1050, alt: "Flagstone path set through fresh bark and low groundcover past a red lace-leaf maple, leading to the porch of a green Seattle house, with an exposed-aggregate patio under the tree", assetType: 'photo' },
  { src: '/images/work/hardscaping/19.jpg', width: 1400, height: 1050, alt: "Oval exposed-aggregate patio poured under a Japanese maple, edged by a boxwood hedge, with a flagstone path curving past it to the street", assetType: 'photo' },
  { src: '/images/work/hardscaping/21.jpg', width: 1400, height: 1867, alt: "Composite deck with a built-in bench running its length, looking across a gravel bed to a small block fire-pit ring and firs beyond", assetType: 'photo' },
  { src: '/images/work/hardscaping/22.jpg', width: 1400, height: 1050, alt: "New broom-finished concrete drive beside a fresh bark bed with round stepping stones and low junipers, under a cedar and wire-mesh fence", assetType: 'photo' },
  { src: '/images/work/hardscaping/23.jpg', width: 1400, height: 1050, alt: "Bluestone paver walk down a narrow side yard with a new cedar and wire-mesh gate, star jasmine climbing the trellis beside it", assetType: 'photo' },
  { src: '/images/work/hardscaping/26.jpg', width: 1400, height: 1050, alt: "Wide cedar deck stairs with a matching handrail and cedar planter boxes, leading down from an existing deck", assetType: 'photo' },
  { src: '/images/work/hardscaping/27.jpg', width: 1400, height: 1867, alt: "Grey paver patio and paver steps built under a raised deck, running back to the landing beneath the stairs", assetType: 'photo' },
  { src: '/images/work/hardscaping/29.jpg', width: 1400, height: 1050, alt: "New cedar deck railing and stair rail on a hillside side yard, apple tree and heat pump beside it", assetType: 'photo' },
  { src: '/images/work/hardscaping/30.jpg', width: 1400, height: 1050, alt: "Two of the crew standing on a tiered block retaining wall they built, the upper wall carrying a horizontal cedar fence and the lower one holding a new planting bed", assetType: 'photo' },
  { src: '/images/work/hardscaping/38.jpg', width: 1400, height: 1050, alt: "Grey paver patio with a charcoal border course, running up to a block seating wall with a bullnose cap planted with daylilies", assetType: 'photo' },
  { src: '/images/work/hardscaping/39.jpg', width: 1400, height: 1867, alt: "Two-tier grey block retaining wall stepping down a back slope, graded and ready for topsoil", assetType: 'photo' },
  { src: '/images/work/landscaping/01.jpg', width: 1400, height: 1050, alt: "Cedar picket fence with a pergola-style top rail running along a back property line, taller solid cedar panels behind it", assetType: 'photo' },
  { src: '/images/work/landscaping/02.jpg', width: 1400, height: 1050, alt: "Horizontal cedar fence built around a mature tree, enclosing a gravel garden of ornamental grasses and cedar raised beds", assetType: 'photo' },
  { src: '/images/work/landscaping/03.jpg', width: 1400, height: 1050, alt: "Cedar privacy fence with a pergola top, wrapping the corner of a back yard with a matching gate on black strap hinges", assetType: 'photo' },
  { src: '/images/work/landscaping/04.jpg', width: 1400, height: 1050, alt: "The same cedar fence and pergola run seen down its length from the alley, posts set and capped", assetType: 'photo' },
  { src: '/images/work/landscaping/05.jpg', width: 1400, height: 1050, alt: "Cedar privacy fence turning the corner of a house, pergola top rail continuing over the gate", assetType: 'photo' },
  { src: '/images/work/landscaping/48.jpg', width: 1400, height: 1050, alt: "Paver patio and matching walkway wrapping a grey shingled house, with a circular seating area, a flower bed and a block retaining wall along the lawn", assetType: 'photo' },
  { src: '/images/work/irrigation/10.jpg', width: 1400, height: 1050, alt: "Back yard mid-job: a square paver patio laid, a crushed-gravel path run to the alley and the rest graded flat for sod, inside a new cedar fence", assetType: 'photo' },
];

export const irrigationPhotos: ImageAsset[] = [
  { src: '/images/work/irrigation/02.jpg', width: 1400, height: 1867, alt: "Spray heads running along a newly planted street strip, wetting fresh bark, young shrubs and ornamental grasses beside the sidewalk", assetType: 'photo' },
  { src: '/images/work/irrigation/14.jpg', width: 1400, height: 1867, alt: "Sprinkler zone under test on a long planting strip, spray arcs reaching across the new bark bed and wetting the sidewalk", assetType: 'photo' },
];

export const landscapingPhotos: ImageAsset[] = [
  { src: '/images/work/hardscaping/03.jpg', width: 1400, height: 1867, alt: "Fresh sod laid across a front yard up to the sidewalk, weeping Japanese maple in the corner and a stump ground out at the parking strip", assetType: 'photo' },
  { src: '/images/work/hardscaping/20.jpg', width: 1400, height: 1050, alt: "New planting beds either side of the front steps of a blue craftsman, hydrangeas and sedum in fresh bark and black mondo grass in the parking strip", assetType: 'photo' },
  { src: '/images/work/hardscaping/40.jpg', width: 1400, height: 1050, alt: "Front bed planted along a driveway with variegated carex, coneflower, salvia and low shrubs in fresh bark", assetType: 'photo' },
  { src: '/images/work/irrigation/03.jpg', width: 1400, height: 1050, alt: "Rockery bed rebuilt across the front of a green craftsman and replanted with roses, hosta, brunnera and perennials in fresh bark", assetType: 'photo' },
  { src: '/images/work/landscaping/19.jpg', width: 1400, height: 1050, alt: "New sod filling a back yard between a cedar fence and the house, with a flagstone landing at the back steps and bark beds along the edges", assetType: 'photo' },
  { src: '/images/work/landscaping/34.jpg', width: 1400, height: 1867, alt: "Mown lawn and mulched shrub beds curving around a back garden, with a blue sport court in the foreground", assetType: 'photo' },
  { src: '/images/work/landscaping/36.jpg', width: 1400, height: 1867, alt: "Established back lawn running to a timber retaining wall and older cedar fence, hose still out from watering in", assetType: 'photo' },
];

export const workPhotosByCategory: Record<CategorySlug, ImageAsset[]> = {
  hardscaping: hardscapingPhotos,
  irrigation: irrigationPhotos,
  landscaping: landscapingPhotos,
};

export const allWorkPhotos: ImageAsset[] = [
  ...hardscapingPhotos,
  ...irrigationPhotos,
  ...landscapingPhotos,
];

/** Homepage strip. Weighted to hardscaping because that is most of the work. */
export const featuredWorkPhotos: ImageAsset[] = [
  ...hardscapingPhotos.slice(0, 6),
  ...irrigationPhotos.slice(0, 2),
  ...landscapingPhotos.slice(0, 4),
];

export const teamPhoto: ImageAsset = {
  src: '/images/team.jpg',
  width: 1400,
  height: 1050,
  alt: 'Jose Oliva and a member of the Blue Landscaping Services crew standing on a tiered block retaining wall they built in Seattle',
  assetType: 'photo',
};

/**
 * Before-and-after pairs.
 *
 * Empty, and correctly so. The seven pairs that used to live here were not
 * photographs of any job — the "before" frames were illustrations and the
 * "after" frames were renders, sitting on /portfolio under the heading "a few
 * yards before we started and after we finished". BeforeAfterShowcase returns
 * null on an empty array and both callers hide their section header, so the
 * slider simply does not appear until there is a real pair to put in it.
 *
 * To fill it: shoot the same yard from the same spot before the crew starts and
 * again when they finish, drop both in public/images/before-after/, and add the
 * pair here.
 */
export const beforeAfterPairs: { before: ImageAsset; after: ImageAsset }[] = [];
