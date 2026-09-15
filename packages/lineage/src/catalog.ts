import type { DesignAxes, LineageChannel } from "@creative-ui/core";
import type { ReferenceCategory, ReferenceProfileId, VisualReference } from "./types.js";

type Profile = {
  principles: string[];
  translation: Partial<Record<LineageChannel, string[]>>;
  primaryChannels: LineageChannel[];
  avoid: string[];
  affinity: Partial<DesignAxes>;
};

type Seed = {
  id: string;
  name: string;
  category: ReferenceCategory;
  profile: ReferenceProfileId;
  period?: string;
  regions?: string[];
  tags?: string[];
};

const profiles: Record<ReferenceProfileId, Profile> = {
  "geometric-discipline": {
    principles: ["clear geometric relationships", "deliberate proportion", "shape as structural logic", "controlled negative space"],
    translation: { composition: ["build visible alignment systems", "let large masses create hierarchy"], geometry: ["use a small family of strong geometric primitives", "prefer precise edges and ratios"], typography: ["align type to the geometric system rather than centering by default"], interaction: ["make states feel systematic and rule-based"] },
    primaryChannels: ["composition", "geometry", "typography"],
    avoid: ["copying signature shapes as decoration", "reducing the reference to primary colors"],
    affinity: { asymmetry: 0.48, contrast: 0.82, rawness: 0.2, layering: 0.38, experimentation: 0.62 },
  },
  "ornamental-organic": {
    principles: ["continuous organic rhythm", "ornament integrated with structure", "curvilinear framing", "nature-derived repetition"],
    translation: { composition: ["allow edges, frames and dividers to carry rhythm"], geometry: ["use non-mechanical curves and tapering forms"], texture: ["introduce crafted surface detail selectively"], imagery: ["integrate imagery with framing rather than placing it inside generic cards"] },
    primaryChannels: ["geometry", "texture", "imagery"],
    avoid: ["turning every border into floral decoration", "using antique-looking ornament with no relationship to content"],
    affinity: { physicality: 0.72, texture: 0.78, layering: 0.62, typographicExpression: 0.72, experimentation: 0.58 },
  },
  "expressive-raw": {
    principles: ["visible process", "controlled imperfection", "urgent hierarchy", "material evidence"],
    translation: { composition: ["permit off-grid interruption and abrupt scale shifts"], typography: ["treat type as an active mark, not neutral labeling"], texture: ["retain grain, registration error, tearing, ink or scan character where useful"], imagery: ["crop aggressively and tolerate partial obstruction"] },
    primaryChannels: ["composition", "typography", "texture", "imagery"],
    avoid: ["adding fake distress uniformly", "making illegibility the only sign of rebellion"],
    affinity: { rawness: 0.88, experimentation: 0.82, asymmetry: 0.78, texture: 0.86, physicality: 0.8 },
  },
  "editorial-system": {
    principles: ["hierarchy through scale and spacing", "repeatable information grammar", "marginal information", "disciplined rhythm"],
    translation: { composition: ["use column logic, running edges, captions and marginalia"], typography: ["create explicit display, body, metadata and annotation roles"], imagery: ["use crops and captions as structural devices"], interaction: ["let content order remain obvious even when composition is asymmetric"] },
    primaryChannels: ["composition", "typography", "imagery"],
    avoid: ["confusing editorial discipline with sterile minimalism", "using identical section wrappers"],
    affinity: { density: 0.62, contrast: 0.76, typographicExpression: 0.78, asymmetry: 0.55, experimentation: 0.52 },
  },
  "spatial-monumental": {
    principles: ["mass and void", "structural honesty", "processional sequencing", "scale contrast"],
    translation: { composition: ["treat sections as spatial masses with distinct weight", "use full-bleed and narrow zones deliberately"], geometry: ["make structural edges visible", "prefer bold load-bearing shapes"], motion: ["use scroll transitions as spatial movement, not decoration"] },
    primaryChannels: ["composition", "geometry", "motion"],
    avoid: ["making everything oversized", "using concrete textures as a literal shortcut"],
    affinity: { contrast: 0.85, layering: 0.58, asymmetry: 0.64, density: 0.5, physicality: 0.7 },
  },
  "material-craft": {
    principles: ["surface carries history", "small variation proves materiality", "joins and edges matter", "repetition includes human difference"],
    translation: { texture: ["use surface variation sparingly and at meaningful scales"], geometry: ["let seams, joins and boundaries be visible"], imagery: ["favor close material details and process evidence"], interaction: ["microinteractions can mimic folding, layering, stamping or revealing"] },
    primaryChannels: ["texture", "geometry", "imagery", "interaction"],
    avoid: ["slapping a paper texture over the entire UI", "simulating craft without respecting readability"],
    affinity: { physicality: 0.9, texture: 0.9, rawness: 0.58, experimentation: 0.55, layering: 0.52 },
  },
  "image-narrative": {
    principles: ["framing changes meaning", "cropping creates tension", "sequence builds narrative", "foreground/background relationships matter"],
    translation: { composition: ["let image placement determine page rhythm"], imagery: ["use framing, crop, scale and sequence as storytelling tools"], motion: ["animate reveals according to narrative order"] },
    primaryChannels: ["imagery", "composition", "motion"],
    avoid: ["treating every image as a centered hero", "copying iconic subject matter from the reference"],
    affinity: { layering: 0.7, asymmetry: 0.62, kinetic: 0.48, typographicExpression: 0.48, experimentation: 0.58 },
  },
  "digital-retro": {
    principles: ["visible computational constraints", "low-resolution rhythm", "interface language as visual identity", "technical feedback loops"],
    translation: { geometry: ["use pixel, terminal, window or grid logic selectively"], typography: ["reserve mono or bitmap-like roles for system information"], interaction: ["surface status, focus, progress and command feedback explicitly"], motion: ["prefer stateful, stepped or scan-like transitions over generic easing everywhere"] },
    primaryChannels: ["interaction", "typography", "geometry", "motion"],
    avoid: ["turning the whole interface into a fake terminal", "using neon just because the reference is digital"],
    affinity: { experimentation: 0.72, rawness: 0.42, kinetic: 0.64, typographicExpression: 0.66, contrast: 0.72 },
  },
  "symbolic-sacred": {
    principles: ["hierarchy encoded through placement", "repetition carries symbolic weight", "centrality and border systems can signal importance", "ornament may have meaning beyond decoration"],
    translation: { composition: ["use nested hierarchy and deliberate focal placement"], symbolism: ["only borrow symbolic structures when context is appropriate and understood"], geometry: ["use repeated ratios, radial systems or border logic without copying sacred signs"] },
    primaryChannels: ["composition", "symbolism", "geometry"],
    avoid: ["copying sacred symbols out of context", "flattening a living tradition into an exotic aesthetic"],
    affinity: { contrast: 0.7, layering: 0.66, texture: 0.6, physicality: 0.64, experimentation: 0.5 },
  },
  "kinetic-optical": {
    principles: ["perception changes through repetition", "directional force", "rhythm creates movement", "pattern can produce depth"],
    translation: { geometry: ["build repeated elements whose spacing or scale changes systematically"], motion: ["let animation reveal optical logic rather than adding independent effects"], composition: ["use directional vectors and progressive rhythm"] },
    primaryChannels: ["geometry", "motion", "composition"],
    avoid: ["causing nausea or compromising readability", "animating every pattern continuously"],
    affinity: { kinetic: 0.92, contrast: 0.84, experimentation: 0.8, density: 0.68, texture: 0.48 },
  },
  "color-emotive": {
    principles: ["color carries emotional hierarchy", "large fields can shape spatial perception", "temperature creates tension", "palette relationships matter more than individual swatches"],
    translation: { color: ["assign semantic and emotional roles to color fields", "use contrast by relationship, not isolated hex values"], composition: ["let color blocks define spatial zones"], imagery: ["allow image treatment to participate in the palette system"] },
    primaryChannels: ["color", "composition", "imagery"],
    avoid: ["copying a famous palette", "using saturated color everywhere without hierarchy"],
    affinity: { contrast: 0.8, experimentation: 0.68, layering: 0.5, typographicExpression: 0.58, rawness: 0.28 },
  },
  "conceptual-reductive": {
    principles: ["remove non-essential signals", "concept defines form", "serial structure", "absence can be active"],
    translation: { composition: ["make one organizing idea legible across the page"], geometry: ["use reduction and repetition to clarify the system"], interaction: ["prefer simple, explicit behaviors unless complexity serves the concept"] },
    primaryChannels: ["composition", "geometry", "interaction"],
    avoid: ["equating reduction with generic SaaS minimalism", "removing personality along with clutter"],
    affinity: { density: 0.25, experimentation: 0.42, rawness: 0.18, contrast: 0.58, asymmetry: 0.35 },
  },
};

const S = (id: string, name: string, category: ReferenceCategory, profile: ReferenceProfileId, period?: string, regions?: string[], tags: string[] = []): Seed => ({ id, name, category, profile, period, regions, tags });

const seeds: Seed[] = [
  S("renaissance", "Renaissance", "art-movement", "editorial-system", "14th–17th c.", ["Europe"], ["proportion", "perspective", "humanism"]),
  S("mannerism", "Mannerism", "art-movement", "image-narrative", "16th c.", ["Europe"], ["elongation", "tension", "artifice"]),
  S("baroque", "Baroque", "art-movement", "spatial-monumental", "17th c.", ["Europe", "Latin America"], ["drama", "chiaroscuro", "movement"]),
  S("rococo", "Rococo", "art-movement", "ornamental-organic", "18th c.", ["Europe"], ["ornament", "asymmetry", "lightness"]),
  S("neoclassicism", "Neoclassicism", "art-movement", "geometric-discipline", "18th–19th c.", ["Europe", "Americas"], ["order", "clarity", "monumentality"]),
  S("romanticism", "Romanticism", "art-movement", "color-emotive", "18th–19th c.", ["Europe"], ["sublime", "emotion", "atmosphere"]),
  S("realism", "Realism", "art-movement", "image-narrative", "19th c.", ["Europe"], ["observation", "ordinary-life", "directness"]),
  S("impressionism", "Impressionism", "art-movement", "color-emotive", "19th c.", ["France"], ["light", "optical-color", "atmosphere"]),
  S("post-impressionism", "Post-Impressionism", "art-movement", "color-emotive", "19th c.", ["Europe"], ["structure", "subjective-color", "rhythm"]),
  S("symbolism", "Symbolism", "art-movement", "symbolic-sacred", "19th c.", ["Europe"], ["metaphor", "dream", "mysticism"]),
  S("art-nouveau", "Art Nouveau", "art-movement", "ornamental-organic", "1890s–1910s", ["Europe", "Americas"], ["whiplash-line", "integrated-ornament", "botanical"]),
  S("fauvism", "Fauvism", "art-movement", "color-emotive", "1900s", ["France"], ["saturated-color", "simplification", "expressive"]),
  S("expressionism", "Expressionism", "art-movement", "expressive-raw", "1900s–1920s", ["Europe"], ["distortion", "emotion", "angularity"]),
  S("cubism", "Cubism", "art-movement", "geometric-discipline", "1907–1910s", ["Europe"], ["fragmentation", "multiple-viewpoints", "planes"]),
  S("futurism", "Futurism", "art-movement", "kinetic-optical", "1909–1940s", ["Italy"], ["speed", "diagonal", "mechanical-rhythm"]),
  S("dada", "Dada", "art-movement", "expressive-raw", "1910s–1920s", ["Europe", "USA"], ["anti-art", "collage", "disruption"]),
  S("surrealism", "Surrealism", "art-movement", "image-narrative", "1920s–1950s", ["Europe", "Americas"], ["dream-logic", "juxtaposition", "uncanny"]),
  S("suprematism", "Suprematism", "art-movement", "geometric-discipline", "1910s–1920s", ["Russia"], ["pure-form", "floating-geometry", "reduction"]),
  S("constructivism", "Russian Constructivism", "art-movement", "geometric-discipline", "1910s–1930s", ["Russia", "USSR"], ["diagonal", "mass", "typographic-force"]),
  S("de-stijl", "De Stijl", "art-movement", "geometric-discipline", "1917–1930s", ["Netherlands"], ["orthogonal", "reduction", "modular"]),
  S("bauhaus", "Bauhaus", "art-movement", "geometric-discipline", "1919–1933", ["Germany"], ["function", "workshop", "system"]),
  S("art-deco", "Art Deco", "art-movement", "geometric-discipline", "1920s–1940s", ["Global"], ["luxury", "symmetry", "streamlined-geometry"]),
  S("abstract-expressionism", "Abstract Expressionism", "art-movement", "expressive-raw", "1940s–1960s", ["USA"], ["gesture", "scale", "process"]),
  S("color-field", "Color Field", "art-movement", "color-emotive", "1940s–1960s", ["USA"], ["large-color-fields", "atmosphere", "reduction"]),
  S("pop-art", "Pop Art", "art-movement", "image-narrative", "1950s–1970s", ["UK", "USA"], ["mass-media", "repetition", "high-low"]),
  S("op-art", "Op Art", "art-movement", "kinetic-optical", "1960s", ["Global"], ["optical", "repetition", "perception"]),
  S("minimal-art", "Minimal Art", "art-movement", "conceptual-reductive", "1960s–1970s", ["USA"], ["seriality", "reduction", "objecthood"]),
  S("conceptual-art", "Conceptual Art", "art-movement", "conceptual-reductive", "1960s–1970s", ["Global"], ["idea-first", "systems", "language"]),
  S("fluxus", "Fluxus", "art-movement", "expressive-raw", "1960s–1970s", ["Global"], ["event", "play", "anti-commodity"]),
  S("arte-povera", "Arte Povera", "art-movement", "material-craft", "1960s–1970s", ["Italy"], ["ordinary-materials", "process", "tactile"]),
  S("neo-expressionism", "Neo-Expressionism", "art-movement", "expressive-raw", "1970s–1980s", ["Europe", "USA"], ["gesture", "figuration", "intensity"]),
  S("memphis", "Memphis Group", "graphic-design", "color-emotive", "1980s", ["Italy"], ["postmodern", "pattern", "playful-geometry"]),
  S("postmodern-graphic", "Postmodern Graphic Design", "graphic-design", "expressive-raw", "1970s–1990s", ["Global"], ["quotation", "layering", "rule-breaking"]),
  S("ukiyo-e", "Ukiyo-e", "regional-tradition", "image-narrative", "17th–19th c.", ["Japan"], ["cropping", "flat-depth", "negative-space"]),
  S("nihonga", "Nihonga", "regional-tradition", "material-craft", "19th c.–present", ["Japan"], ["mineral-pigment", "flatness", "material"]),
  S("sumi-e", "Sumi-e", "regional-tradition", "conceptual-reductive", "historic–present", ["East Asia"], ["ink", "negative-space", "gesture"]),
  S("rinpa", "Rinpa School", "regional-tradition", "ornamental-organic", "17th–19th c.", ["Japan"], ["pattern", "gold-ground", "nature"]),
  S("shan-shui", "Shan Shui Landscape", "regional-tradition", "image-narrative", "historic", ["China"], ["layered-depth", "void", "journey"]),
  S("minhwa", "Korean Minhwa", "regional-tradition", "color-emotive", "Joseon era", ["Korea"], ["folk", "symbolic-color", "flatness"]),
  S("persian-miniature", "Persian Miniature", "regional-tradition", "symbolic-sacred", "13th–17th c.", ["Iran", "Central Asia"], ["dense-detail", "flat-space", "pattern"]),
  S("mughal-miniature", "Mughal Miniature", "regional-tradition", "image-narrative", "16th–18th c.", ["South Asia"], ["detail", "narrative", "borders"]),
  S("ottoman-miniature", "Ottoman Miniature", "regional-tradition", "image-narrative", "15th–18th c.", ["Ottoman Empire"], ["narrative", "flat-perspective", "annotation"]),
  S("islamic-geometric", "Islamic Geometric Art", "regional-tradition", "symbolic-sacred", "historic–present", ["Middle East", "North Africa", "Central Asia", "South Asia"], ["tessellation", "symmetry", "ratio"]),
  S("arabesque", "Arabesque Ornament", "regional-tradition", "ornamental-organic", "historic–present", ["Middle East", "North Africa", "Mediterranean"], ["interlace", "vegetal", "continuity"]),
  S("byzantine-mosaic", "Byzantine Mosaic", "regional-tradition", "symbolic-sacred", "4th–15th c.", ["Eastern Mediterranean"], ["gold", "hierarchy", "frontal"]),
  S("ethiopian-manuscript", "Ethiopian Illuminated Manuscript", "regional-tradition", "symbolic-sacred", "historic", ["Ethiopia"], ["frontal", "pattern", "manuscript"]),
  S("tibetan-thangka", "Tibetan Thangka", "regional-tradition", "symbolic-sacred", "historic–present", ["Tibet", "Himalayas"], ["radial", "hierarchy", "sacred"]),
  S("madhubani", "Madhubani Painting", "regional-tradition", "ornamental-organic", "historic–present", ["India", "Nepal"], ["dense-pattern", "line", "folk"]),
  S("warli", "Warli Painting", "regional-tradition", "geometric-discipline", "historic–present", ["India"], ["figure-geometry", "rhythm", "narrative"]),
  S("gond", "Gond Painting", "regional-tradition", "ornamental-organic", "historic–present", ["India"], ["pattern-fill", "nature", "rhythm"]),
  S("mexican-muralism", "Mexican Muralism", "regional-tradition", "spatial-monumental", "1920s–1950s", ["Mexico"], ["public-scale", "narrative", "social"]),
  S("brazilian-modernism", "Brazilian Modernism", "art-movement", "color-emotive", "1920s–1940s", ["Brazil"], ["modernism", "vernacular", "color"]),
  S("brazilian-concretism", "Brazilian Concretism", "art-movement", "geometric-discipline", "1950s–1960s", ["Brazil"], ["grid", "optical", "rational"]),
  S("neoconcretism", "Brazilian Neoconcretism", "art-movement", "material-craft", "1959–1960s", ["Brazil"], ["participation", "body", "spatial"]),
  S("tropicalia-graphic", "Tropicália Graphic Language", "graphic-design", "expressive-raw", "1960s–1970s", ["Brazil"], ["collage", "popular-culture", "psychedelic"]),
  S("cordel-woodcut", "Brazilian Cordel Woodcut", "regional-tradition", "expressive-raw", "historic–present", ["Brazil"], ["woodcut", "narrative", "high-contrast"]),
  S("armorial", "Movimento Armorial", "regional-tradition", "material-craft", "1970s–present", ["Brazil"], ["northeast-brazil", "engraving", "heraldic"]),
  S("marajoara-ceramics", "Marajoara Ceramic Geometry", "regional-tradition", "geometric-discipline", "pre-Columbian", ["Brazil"], ["ceramic", "incised-geometry", "pattern"]),
  S("new-typography", "The New Typography", "graphic-design", "editorial-system", "1920s–1930s", ["Europe"], ["asymmetry", "sans-serif", "functional"]),
  S("swiss-style", "Swiss / International Typographic Style", "graphic-design", "editorial-system", "1950s–1970s", ["Switzerland", "Global"], ["grid", "sans-serif", "photography"]),
  S("polish-poster", "Polish Poster School", "graphic-design", "expressive-raw", "1950s–1980s", ["Poland"], ["metaphor", "handmade", "poster"]),
  S("czech-poster", "Czech Poster Design", "graphic-design", "image-narrative", "1960s–1980s", ["Czechoslovakia"], ["surreal-collage", "film", "photomontage"]),
  S("psychedelic-poster", "Psychedelic Poster", "graphic-design", "kinetic-optical", "1960s–1970s", ["USA", "UK"], ["distorted-type", "optical", "saturated"]),
  S("punk-xerox", "Punk Xerox", "graphic-design", "expressive-raw", "1970s–1980s", ["UK", "USA"], ["photocopy", "cut-paste", "DIY"]),
  S("new-wave-typography", "New Wave Typography", "graphic-design", "editorial-system", "1970s–1980s", ["Europe", "USA"], ["layered-type", "grid-breaking", "expressive"]),
  S("grunge-graphic", "Grunge Graphic Design", "graphic-design", "expressive-raw", "1990s", ["USA", "Global"], ["distress", "layering", "anti-clean"]),
  S("rave-flyer", "Underground Rave Flyer", "graphic-design", "digital-retro", "1980s–2000s", ["Europe", "Americas"], ["dense", "techno", "photocopy", "3d-type"]),
  S("editorial-magazine-90s", "1990s Experimental Editorial", "graphic-design", "editorial-system", "1990s", ["Global"], ["magazine", "type-over-image", "cropping"]),
  S("wayfinding-modernism", "Modernist Wayfinding", "graphic-design", "editorial-system", "1950s–present", ["Global"], ["signage", "pictogram", "clarity"]),
  S("metro-diagram", "Transit Diagram Language", "graphic-design", "geometric-discipline", "20th c.–present", ["Global"], ["network", "diagram", "color-coding"]),
  S("corporate-identity-modernism", "Modernist Corporate Identity Systems", "graphic-design", "geometric-discipline", "1950s–1980s", ["Global"], ["identity-system", "modular", "standards"]),
  S("data-ink", "Information Design / Data-Ink", "scientific-visualization", "editorial-system", "20th c.–present", ["Global"], ["data", "annotation", "clarity"]),
  S("woodcut", "Woodcut", "print-technique", "material-craft", "historic–present", ["Global"], ["carved-line", "ink", "high-contrast"]),
  S("linocut", "Linocut", "print-technique", "material-craft", "20th c.–present", ["Global"], ["bold-cut", "ink", "flat"]),
  S("engraving", "Metal Engraving", "print-technique", "material-craft", "historic–present", ["Global"], ["fine-line", "hatching", "precision"]),
  S("etching", "Etching", "print-technique", "material-craft", "historic–present", ["Global"], ["line", "plate", "tone"]),
  S("aquatint", "Aquatint", "print-technique", "material-craft", "18th c.–present", ["Global"], ["tone", "grain", "plate"]),
  S("lithography", "Lithography", "print-technique", "material-craft", "19th c.–present", ["Global"], ["stone", "drawn-mark", "print"]),
  S("screenprint", "Screen Printing", "print-technique", "color-emotive", "20th c.–present", ["Global"], ["spot-color", "registration", "layers"]),
  S("risograph", "Risograph", "print-technique", "material-craft", "20th c.–present", ["Global"], ["spot-color", "misregistration", "grain"]),
  S("letterpress", "Letterpress", "print-technique", "material-craft", "historic–present", ["Global"], ["impression", "type", "paper"]),
  S("cyanotype", "Cyanotype", "print-technique", "material-craft", "19th c.–present", ["Global"], ["blueprint", "photogram", "chemical"]),
  S("photomontage", "Photomontage", "craft-technique", "expressive-raw", "20th c.–present", ["Global"], ["cut", "juxtaposition", "photography"]),
  S("analog-collage", "Analog Collage", "craft-technique", "expressive-raw", "20th c.–present", ["Global"], ["cut-paper", "layer", "found-image"]),
  S("paper-cut", "Paper Cutting", "craft-technique", "geometric-discipline", "historic–present", ["Global"], ["negative-space", "silhouette", "cut"]),
  S("stained-glass", "Stained Glass", "craft-technique", "symbolic-sacred", "historic–present", ["Global"], ["lead-lines", "color-light", "panel"]),
  S("mosaic", "Mosaic", "craft-technique", "material-craft", "historic–present", ["Global"], ["tesserae", "modular", "surface"]),
  S("embroidery", "Embroidery", "craft-technique", "material-craft", "historic–present", ["Global"], ["thread", "stitch", "surface"]),
  S("tapestry", "Tapestry", "craft-technique", "material-craft", "historic–present", ["Global"], ["woven", "large-surface", "narrative"]),
  S("blueprint", "Blueprint / Technical Drawing", "scientific-visualization", "editorial-system", "19th–20th c.", ["Global"], ["diagram", "measurement", "annotation"]),
  S("scientific-engraving", "Scientific Engraving", "scientific-visualization", "editorial-system", "17th–19th c.", ["Global"], ["specimen", "labels", "hatching"]),
  S("natural-history-plate", "Natural History Plate", "scientific-visualization", "image-narrative", "18th–19th c.", ["Global"], ["specimen", "annotation", "plate"]),
  S("medical-atlas", "Medical Atlas Illustration", "scientific-visualization", "editorial-system", "19th–20th c.", ["Global"], ["layers", "labels", "anatomy"]),
  S("gothic-architecture", "Gothic Architecture", "architecture", "spatial-monumental", "12th–16th c.", ["Europe"], ["verticality", "structure", "light"]),
  S("baroque-architecture", "Baroque Architecture", "architecture", "spatial-monumental", "17th–18th c.", ["Europe", "Latin America"], ["sequence", "drama", "curve"]),
  S("modernist-architecture", "Modernist Architecture", "architecture", "geometric-discipline", "20th c.", ["Global"], ["volume", "grid", "function"]),
  S("brutalism", "Brutalist Architecture", "architecture", "spatial-monumental", "1950s–1970s", ["Global"], ["mass", "structure", "raw-material"]),
  S("metabolism", "Japanese Metabolism", "architecture", "spatial-monumental", "1960s–1970s", ["Japan"], ["module", "megastucture", "growth"]),
  S("high-tech-architecture", "High-Tech Architecture", "architecture", "spatial-monumental", "1970s–present", ["Global"], ["exposed-system", "infrastructure", "technical"]),
  S("postmodern-architecture", "Postmodern Architecture", "architecture", "color-emotive", "1970s–1990s", ["Global"], ["quotation", "symbol", "play"]),
  S("deconstructivism", "Deconstructivist Architecture", "architecture", "spatial-monumental", "1980s–present", ["Global"], ["fragment", "collision", "non-orthogonal"]),
  S("googie", "Googie Architecture", "architecture", "kinetic-optical", "1940s–1960s", ["USA"], ["space-age", "diagonal", "signage"]),
  S("streamline-moderne", "Streamline Moderne", "architecture", "geometric-discipline", "1930s–1940s", ["Global"], ["horizontal", "aerodynamic", "rounded"]),
  S("soviet-modernism", "Soviet Modernism", "architecture", "spatial-monumental", "1955–1991", ["USSR"], ["monumental", "experimental-structure", "civic"]),
  S("xerox-star", "Xerox Star Interface", "interface-era", "editorial-system", "1980s", ["USA"], ["desktop-metaphor", "icons", "system"]),
  S("classic-mac", "Classic Macintosh UI", "interface-era", "digital-retro", "1980s–1990s", ["Global"], ["1-bit", "windows", "pixel"]),
  S("dos-tui", "DOS / Text User Interface", "interface-era", "digital-retro", "1980s–1990s", ["Global"], ["terminal", "keyboard", "grid"]),
  S("amiga-workbench", "Amiga Workbench", "interface-era", "digital-retro", "1980s–1990s", ["Global"], ["desktop", "pixel", "color"]),
  S("early-web", "Early Web", "interface-era", "digital-retro", "1990s", ["Global"], ["hypertext", "browser-defaults", "tables"]),
  S("web-1-personal", "Web 1.0 Personal Homepage", "interface-era", "expressive-raw", "1990s", ["Global"], ["personal", "animated-gif", "dense"]),
  S("y2k-web", "Y2K Web Interface", "interface-era", "digital-retro", "1998–2005", ["Global"], ["chrome", "gel", "futurist"]),
  S("flash-era", "Flash-Era Web", "interface-era", "kinetic-optical", "1998–2010", ["Global"], ["motion", "sound", "nonlinear"]),
  S("skeuomorphism", "Skeuomorphic UI", "interface-era", "material-craft", "2000s–2010s", ["Global"], ["material-metaphor", "depth", "texture"]),
  S("metro-ui", "Metro / Modern UI", "interface-era", "geometric-discipline", "2010s", ["Global"], ["tiles", "type", "flat"]),
  S("material-design", "Material Design", "interface-era", "geometric-discipline", "2010s–present", ["Global"], ["elevation", "motion", "system"]),
  S("demoscene", "Demoscene Graphics", "interface-era", "digital-retro", "1980s–present", ["Global"], ["realtime", "technical", "procedural"]),
  S("pixel-art-ui", "Pixel-Art Interface Language", "interface-era", "digital-retro", "1980s–present", ["Global"], ["pixel", "sprite", "limited-palette"]),
  S("crt-terminal", "CRT Terminal Language", "interface-era", "digital-retro", "1960s–1980s", ["Global"], ["scanline", "phosphor", "mono"]),
  S("cyberdelia", "Cyberdelic Web", "interface-era", "kinetic-optical", "1990s–2000s", ["Global"], ["psychedelic", "digital", "immersive"]),
  S("vaporwave", "Vaporwave", "graphic-design", "digital-retro", "2010s", ["Global"], ["nostalgia", "glitch", "consumer-imagery"]),
  S("brutalist-web", "Web Brutalism", "interface-era", "expressive-raw", "2010s–present", ["Global"], ["browser-native", "raw", "anti-polish"]),
];

function materialize(seed: Seed): VisualReference {
  const p = profiles[seed.profile];
  return {
    id: seed.id,
    name: seed.name,
    category: seed.category,
    profile: seed.profile,
    period: seed.period,
    regions: seed.regions,
    tags: [...(seed.tags ?? []), seed.profile, seed.category],
    principles: [...p.principles],
    designTranslation: Object.fromEntries(Object.entries(p.translation).map(([key, value]) => [key, value ? [...value] : []])) as VisualReference["designTranslation"],
    primaryChannels: [...p.primaryChannels],
    avoidLiteralization: [...p.avoid],
    affinity: { ...p.affinity },
  };
}

export const visualReferenceCatalog: VisualReference[] = seeds.map(materialize);
export const visualReferenceById = new Map(visualReferenceCatalog.map((reference) => [reference.id, reference]));

export function searchVisualReferences(query: string): VisualReference[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return visualReferenceCatalog;
  return visualReferenceCatalog
    .map((reference) => {
      const haystack = [reference.id, reference.name, reference.category, reference.profile, ...(reference.regions ?? []), ...reference.tags].join(" ").toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { reference, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.reference.name.localeCompare(b.reference.name))
    .map((item) => item.reference);
}
