import type { CategorySlug, ImageAsset } from '@/data/types';

/**
 * The job photography.
 *
 * ONE ENTRY PER PHOTOGRAPH, ONE PHOTOGRAPH PER JOB VIEW
 * -----------------------------------------------------
 * These three arrays are concatenated into `allWorkPhotos` for /portfolio, so a
 * photograph filed under two categories appears twice in the same grid. That had
 * happened to seventeen of the original fifty-eight entries. Byte-comparison
 * caught only part of it — several repeats were the same shot re-encoded,
 * identical to the eye and different on disk — so what is here is one entry per
 * distinct scene, each filed under the trade the photograph actually shows.
 *
 * WHERE THE LATER ENTRIES CAME FROM
 * ---------------------------------
 * Forty-eight of these were already in public/images and referenced by nothing:
 * the owner's own job photos, downloaded from the original site's galleries and
 * then left out of the rebuild. Every one was opened and looked at, and every
 * one was read a second time by a different reviewer specifically to catch the
 * failure mode this file is prone to — alt text naming a structure that is not
 * in the picture. That second pass corrected fourteen of them, including a
 * "concrete retaining wall" under a fence that has no wall, hostas that are
 * kale, and an established lawn described as freshly laid sod.
 *
 * They are smaller than the rest — roughly 420 to 640 pixels, and several carry
 * the company's own logo watermark — because that is the size the originals
 * survive at. They read fine as grid thumbnails; components/work-gallery.tsx
 * caps how far the lightbox will enlarge one so the upscaling never becomes the
 * subject. Full-resolution versions exist only on the owner's phone.
 *
 * WHY THERE ARE STILL ONLY TWO IRRIGATION PHOTOS
 * ----------------------------------------------
 * Because there are still only two. All forty-eight of the recovered photos were
 * checked against this gap and none of them shows a sprinkler head, drip line or
 * spray. The closest is the boulder-step garden filed under hardscaping, where a
 * valve box lid and a yard hydrant are visible off to one side — real, but the
 * picture is about the steps. Two is the honest number, and the fix is a camera
 * on the next sprinkler job.
 *
 * ALT TEXT IS THE PHOTOGRAPH, NOT THE COMPANY
 * -------------------------------------------
 * Every entry once read "Blue Landscaping Services completed work in Greater
 * Seattle" — the same sentence fifty-eight times. Each now says what is in the
 * frame: the material, the structure, the plant. No city unless the photo shows
 * one, no species the resolution cannot support, and no claim the picture does
 * not carry. Two lawns here are artificial turf and are described as such.
 */

export const hardscapingPhotos: ImageAsset[] = [
  // Strongest framing first. Nothing here is deleted or hidden: the grid collapses
  // at 40 tiles, so this ordering decides which photographs a visitor sees before
  // clicking. The ones at the tail are real jobs with ordinary job-site framing —
  // flat overcast light, a tilted phone, a busy background, the photographer's
  // shadow across the lawn. New photos appended to the end land in the tail,
  // which is the right default until someone has looked at them.
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
  { src: '/images/work/hardscaping/09.jpg', width: 556, height: 313, alt: "Irregular flagstone walkway in grey and rust-toned stone, wet from rain, running between mulched planting beds with sword ferns, a dwarf conifer, and ornamental grasses toward the street", assetType: 'photo' },
  { src: '/images/work/hardscaping/10.jpg', width: 556, height: 313, alt: "Compacted crushed-gravel side path edged with grey concrete blocks, bordered by fresh dark mulch beds, a wood-and-wire fence on one side and block steps up to a shrub bed on the other", assetType: 'photo' },
  { src: '/images/work/hardscaping/11.jpg', width: 556, height: 313, alt: "Curved grey concrete walkway with a textured slate-look finish leading past clipped boxwood and a mulched bed toward a white wooden gate, with a garden hose lying across the lawn", assetType: 'photo' },
  { src: '/images/services/seating-walls.jpg', width: 900, height: 669, alt: "Tiered concrete block walls with broad flat cap slabs step across freshly mulched beds planted with small yellow-green shrubs, a variegated strappy plant", assetType: 'photo' },
  { src: '/images/services/water-features.jpg', width: 900, height: 676, alt: "Boulder-and-river-rock pondless waterfall mid-build, water spilling over a stacked stone spillway into a cobble basin", assetType: 'photo' },
  { src: '/images/work/hardscaping/07.jpg', width: 556, height: 313, alt: "Irregular flagstone slabs set as a stepping-stone path in dark mulch with small mossy groundcover plugs in the joints", assetType: 'photo' },
  { src: '/images/work/hardscaping/12.jpg', width: 556, height: 313, alt: "Irregular flagstone set in dark mulch with small ferns, hostas and low shrubs between a concrete walk and a cedar fence", assetType: 'photo' },
  { src: '/images/work/hardscaping/13.jpg', width: 420, height: 312, alt: "Gray rectangular concrete paver walkway running along the side of a dark-painted house, edged with fieldstone, bare soil and a row of young evergreen shrubs", assetType: 'photo' },
  { src: '/images/work/hardscaping/14.jpg', width: 420, height: 312, alt: "Flagstone stepping stones laid in fresh dark mulch in a narrow side yard between a new cedar board fence with gate and a wood deck with cable railing", assetType: 'photo' },
  { src: '/images/work/hardscaping/24.jpg', width: 417, height: 313, alt: "Tiered stacked-stone retaining walls wrapping a circular flagstone landing and curved stone steps, with freshly mulched planting beds and conifers behind", assetType: 'photo' },
  { src: '/images/work/hardscaping/31.jpg', width: 417, height: 313, alt: "Two-course dry-stacked concrete block retaining wall stepping up at its left end and running the width of a yard", assetType: 'photo' },
  { src: '/images/work/hardscaping/33.jpg', width: 556, height: 313, alt: "Dry-stacked block retaining wall capped with a long stone slab, enclosing a compacted gravel patio base edged with charcoal pavers, with a level and hose left in the bare soil", assetType: 'photo' },
  { src: '/images/work/hardscaping/34.jpg', width: 417, height: 313, alt: "Curved gray split-face block retaining wall holding back a mound of soil under a wood deck frame, with concrete steps and a coiled hose alongside", assetType: 'photo' },
  { src: '/images/work/hardscaping/37.jpg', width: 420, height: 312, alt: "Terraced cut-stone retaining walls with concrete steps and black metal handrails between modern townhouses, the beds planted with ornamental grasses and low shrubs above a trimmed hedge", assetType: 'photo' },
  { src: '/images/work/irrigation/18.jpg', width: 640, height: 481, alt: "Cut stone slab steps climbing between a mossy block retaining wall and a boulder rockery, with fresh dark mulch, young ornamental grasses, bark chips, and a red Japanese maple", assetType: 'photo' },
  { src: '/images/work/landscaping/11.jpg', width: 420, height: 312, alt: "Cedar privacy fence with capped posts and a top cap rail built above a dark rock wall, with red-leaved shrubs in the bed below", assetType: 'photo' },
  { src: '/images/work/landscaping/12.jpg', width: 420, height: 312, alt: "Run of new cedar fence with capped posts receding along a yard edge, young shrubs and bare soil in the bed in front of it, conifers and utility lines beyond", assetType: 'photo' },
  { src: '/images/work/landscaping/13.jpg', width: 420, height: 312, alt: "Corner of a cedar fence with a matching gate, lattice inset panel and pergola-style top beams, running up against the siding of a house", assetType: 'photo' },
  { src: '/images/work/landscaping/14.jpg', width: 420, height: 312, alt: "Newly built cedar board fence with a flat cap rail running the length of a gravel alley, with power lines and houses behind it under an overcast sky", assetType: 'photo' },
  { src: '/images/work/landscaping/15.jpg', width: 420, height: 312, alt: "Horizontal wood board fence with a weathered gray cap rail turning an inside corner around a bare gravel yard, with weeds and one leafy shrub sprouting along its base and a large tree", assetType: 'photo' },
  { src: '/images/work/landscaping/07.jpg', width: 556, height: 313, alt: "Newly built cedar board fence with capped posts and a trim rail along a back property line, with a young tree, wire garden hoops and lawn in front of it", assetType: 'photo' },
  { src: '/images/work/landscaping/09.jpg', width: 556, height: 313, alt: "New cedar board fence with a cap rail built along the top of a dry-stacked stone retaining wall, with flowering shrubs at the wall base and a large mature tree behind", assetType: 'photo' },
  { src: '/images/work/hardscaping/08.jpg', width: 417, height: 313, alt: "Stacked landscape-timber retaining wall and bolted pressure-treated posts on round concrete footings beneath an elevated deck", assetType: 'photo' },
  { src: '/images/work/hardscaping/06.jpg', width: 556, height: 313, alt: "Charcoal segmental block retaining wall running behind a crushed-gravel walkway with two block steps, flanked by mulch beds of newly planted shrubs", assetType: 'photo' },
  { src: '/images/work/hardscaping/25.jpg', width: 420, height: 312, alt: "A fenced backyard filled with a compacted crushed-gravel base, dimensional lumber laid out as forms in the foreground, a stone border and newly planted young tree along the right side", assetType: 'photo' },
  { src: '/images/work/hardscaping/35.jpg', width: 417, height: 313, alt: "Two courses of split-face concrete block retaining wall with flat cap units staged unset along the top, dark soil backfilled behind it, a stepped wood board fence running above", assetType: 'photo' },
  { src: '/images/work/landscaping/10.jpg', width: 420, height: 312, alt: "Stained cedar board fence with an open pergola-style top rail running along the back of a yard, with a planting bed at its base and a wheelbarrow and cut branch left on the grass", assetType: 'photo' },
  { src: '/images/work/irrigation/19.jpg', width: 481, height: 640, alt: "Flagstone slab patio and stepping-stone path running through a dark mulch bed with ornamental grasses, boulders and staked path lights, with a bark-covered area and cedar fence behind", assetType: 'photo' },
];

export const irrigationPhotos: ImageAsset[] = [
  // Strongest framing first. Nothing here is deleted or hidden: the grid collapses
  // at 40 tiles, so this ordering decides which photographs a visitor sees before
  // clicking. The ones at the tail are real jobs with ordinary job-site framing —
  // flat overcast light, a tilted phone, a busy background, the photographer's
  // shadow across the lawn. New photos appended to the end land in the tail,
  // which is the right default until someone has looked at them.
  { src: '/images/work/irrigation/02.jpg', width: 1400, height: 1867, alt: "Spray heads running along a newly planted street strip, wetting fresh bark, young shrubs and ornamental grasses beside the sidewalk", assetType: 'photo' },
  { src: '/images/work/irrigation/14.jpg', width: 1400, height: 1867, alt: "Sprinkler zone under test on a long planting strip, spray arcs reaching across the new bark bed and wetting the sidewalk", assetType: 'photo' },
];

export const landscapingPhotos: ImageAsset[] = [
  // Strongest framing first. Nothing here is deleted or hidden: the grid collapses
  // at 40 tiles, so this ordering decides which photographs a visitor sees before
  // clicking. The ones at the tail are real jobs with ordinary job-site framing —
  // flat overcast light, a tilted phone, a busy background, the photographer's
  // shadow across the lawn. New photos appended to the end land in the tail,
  // which is the right default until someone has looked at them.
  { src: '/images/work/hardscaping/03.jpg', width: 1400, height: 1867, alt: "Fresh sod laid across a front yard up to the sidewalk, weeping Japanese maple in the corner and a stump ground out at the parking strip", assetType: 'photo' },
  { src: '/images/work/hardscaping/20.jpg', width: 1400, height: 1050, alt: "New planting beds either side of the front steps of a blue craftsman, hydrangeas and sedum in fresh bark and black mondo grass in the parking strip", assetType: 'photo' },
  { src: '/images/work/hardscaping/40.jpg', width: 1400, height: 1050, alt: "Front bed planted along a driveway with variegated carex, coneflower, salvia and low shrubs in fresh bark", assetType: 'photo' },
  { src: '/images/work/irrigation/03.jpg', width: 1400, height: 1050, alt: "Rockery bed rebuilt across the front of a green craftsman and replanted with roses, hosta, brunnera and perennials in fresh bark", assetType: 'photo' },
  { src: '/images/work/landscaping/19.jpg', width: 1400, height: 1050, alt: "New sod filling a back yard between a cedar fence and the house, with a flagstone landing at the back steps and bark beds along the edges", assetType: 'photo' },
  { src: '/images/work/landscaping/34.jpg', width: 1400, height: 1867, alt: "Mown lawn and mulched shrub beds curving around a back garden, with a blue sport court in the foreground", assetType: 'photo' },
  { src: '/images/work/landscaping/36.jpg', width: 1400, height: 1867, alt: "Established back lawn running to a timber retaining wall and older cedar fence, hose still out from watering in", assetType: 'photo' },
  { src: '/images/work/hardscaping/15.jpg', width: 420, height: 312, alt: "Freshly laid sod lawn in a fenced back yard behind a shingled house, with a small paver landing and wood steps at the back door and a cedar fence along the property line", assetType: 'photo' },
  { src: '/images/work/hardscaping/32.jpg', width: 417, height: 313, alt: "Strip of freshly laid sod running between a brick house and a poured concrete curb, edged by a mulched planting bed with low shrubs and a black nursery pot", assetType: 'photo' },
  { src: '/images/work/irrigation/06.jpg', width: 417, height: 313, alt: "Blue and lavender mophead hydrangeas in beds along the white stucco arcade of a brick house, edging a walkway of large gray stone slabs, with a round metal cafe table", assetType: 'photo' },
  { src: '/images/work/landscaping/20.jpg', width: 417, height: 313, alt: "Long bed of blue mophead hydrangeas backed by a purple-leaf tree and a chartreuse shrub, edged by a strip of mown lawn", assetType: 'photo' },
  { src: '/images/work/landscaping/08.jpg', width: 556, height: 313, alt: "Strip of fresh red-dyed bark mulch along a white vinyl privacy fence, separated from a house foundation by a band of gray river rock and edged with tan concrete blocks", assetType: 'photo' },
  { src: '/images/work/landscaping/22.jpg', width: 417, height: 313, alt: "Rectangular green lawn in a fenced backyard beside a brick house, bordered by a mulched bed of agave and yucca in the foreground and shrubs along the fence line", assetType: 'photo' },
  { src: '/images/work/landscaping/23.jpg', width: 417, height: 313, alt: "Mowed backyard lawn with scattered yellow-brown patches, edged by dark mulch beds of hostas and low shrubs, a weathered grey board fence along the back", assetType: 'photo' },
  { src: '/images/work/landscaping/30.jpg', width: 313, height: 417, alt: "Two workers kneeling in fresh soil to set a tall purple-leaf columnar tree in a front-yard bed, with a wheelbarrow, potted shrubs waiting to go in, and a white flatbed pickup in the driveway", assetType: 'photo' },
  { src: '/images/work/landscaping/39.jpg', width: 417, height: 313, alt: "Curved bed of fresh dark mulch cut around an established tree and edged against a green lawn in a wood-fenced backyard, with several shrubs still in black nursery pots, a rounded boulder", assetType: 'photo' },
  { src: '/images/work/landscaping/44.jpg', width: 556, height: 313, alt: "Wide back lawn of dense artificial turf running up to a stucco house with an arched covered walkway, bordered by clipped hedging under bare winter trees", assetType: 'photo' },
  { src: '/images/work/landscaping/47.jpg', width: 556, height: 313, alt: "Long rectangle of artificial turf beside a stone paver terrace, with hydrangeas in a raised border along the house and mature trees behind", assetType: 'photo' },
  { src: '/images/work/irrigation/07.jpg', width: 417, height: 313, alt: "Boxwood hedge pruned into rounded forms against a gray stucco wall, next to a young broad-leaved shrub, a red-leaved Japanese maple, and a concrete walkway scattered with clippings", assetType: 'photo' },
  { src: '/images/work/irrigation/08.jpg', width: 417, height: 313, alt: "Freshly laid sod wrapping a curved mulch bed of low flowering annuals, edged by a paver patio with a coiled garden hose, and a light block retaining wall along the back of the yard", assetType: 'photo' },
  { src: '/images/work/landscaping/21.jpg', width: 556, height: 313, alt: "Flat green lawn with blue layout lines marked across it, running from a concrete walkway to a grey screen hung along the back fence, with a ladder leaning against the house", assetType: 'photo' },
  { src: '/images/work/landscaping/28.jpg', width: 417, height: 313, alt: "Curbside bed with a windmill palm and clumps of arching New Zealand flax being cut back, trimmed leaves and a red fan rake left on the grass strip", assetType: 'photo' },
  { src: '/images/work/landscaping/32.jpg', width: 420, height: 312, alt: "Terraced beds of fresh dark mulch planted with ornamental grasses and clipped shrubs, stepped between capped block retaining walls beside a concrete stairway with a black metal railing", assetType: 'photo' },
  { src: '/images/work/landscaping/38.jpg', width: 556, height: 313, alt: "Mown lawn with mower stripes photographed at dusk in front of a brick house, with the white arched porch columns behind it lit from below by ground uplights", assetType: 'photo' },
  { src: '/images/work/landscaping/43.jpg', width: 417, height: 313, alt: "Freshly laid sod lawn curving around a bare soil bed with a dark curved edging strip, seen past a weathered wood fence in the foreground", assetType: 'photo' },
  { src: '/images/work/landscaping/45.jpg', width: 417, height: 313, alt: "Freshly laid sod with the seams between rolls still visible, filling a small back yard enclosed by a weathered cedar board fence, with a wooden deck along one side", assetType: 'photo' },
  { src: '/images/work/landscaping/46.jpg', width: 417, height: 313, alt: "Newly laid sod strips covering a back yard in front of a wooden deck with lattice skirting and stairs, with potted plants on the deck, a tool leaning against the house at left", assetType: 'photo' },
];

export const workPhotosByCategory: Record<CategorySlug, ImageAsset[]> = {
  hardscaping: hardscapingPhotos,
  irrigation: irrigationPhotos,
  landscaping: landscapingPhotos,
};

/**
 * Round-robin across the three trades rather than one array after another.
 *
 * /portfolio renders this as a single grid. Concatenated, it played as fifty-one
 * walls and patios, then two sprinklers, then twenty-seven lawns — and the last
 * six rows were nothing but green rectangles, which reads as one job
 * photographed repeatedly rather than as the range of work it is. Dealing the
 * three arrays out in turn mixes the trades the whole way down.
 */
function interleave(...lists: ImageAsset[][]): ImageAsset[] {
  const out: ImageAsset[] = [];
  const longest = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < longest; i += 1) {
    for (const list of lists) if (list[i]) out.push(list[i]);
  }
  return out;
}

export const allWorkPhotos: ImageAsset[] = interleave(
  hardscapingPhotos,
  landscapingPhotos,
  irrigationPhotos,
);

/**
 * Homepage strip candidates, weighted to hardscaping because that is most of
 * the work. This is a pool, not the strip: the homepage drops any that are
 * already on it as a project card (lib/photo-identity.ts) and shows the first
 * twelve that remain, so there are more than twelve here on purpose.
 */
export const featuredWorkPhotos: ImageAsset[] = [
  ...hardscapingPhotos.slice(0, 9),
  ...irrigationPhotos.slice(0, 2),
  ...landscapingPhotos.slice(0, 6),
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
 * "after" frames renders, sitting on /portfolio under the heading "a few yards
 * before we started and after we finished".
 *
 * All 113 job photos in this library were then searched for a genuine
 * replacement pair and there is not one. Every photo is either finished work or
 * work in progress; there is no untouched yard that also has a matching finished
 * shot of the same address. A during-shot paired with an after-shot is not a
 * before-and-after, so the section stays hidden.
 *
 * To fill it: shoot the same yard from the same spot before the crew starts and
 * again when they finish, drop both in public/images/before-after/, and add the
 * pair here.
 */
export const beforeAfterPairs: { before: ImageAsset; after: ImageAsset }[] = [];
