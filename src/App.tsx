import React, { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  RefreshCcw, 
  Layout, 
  Users, 
  Palette, 
  Type, 
  FileImage, 
  History, 
  CheckCircle, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  Target, 
  Lightbulb, 
  Feather, 
  Upload, 
  Image as ImageIcon,
  Camera,
  Layers,
  UserCheck,
  Hash,
  AlignLeft,
  ListOrdered
} from 'lucide-react';

// --- DATA KONSTANTA ---

const MASTER_STYLES = [
  { id: '1', label: '1. EDU-PROVOCATIVE VISUAL METAPHOR', idealSlides: 7 },
  { id: '2', label: '2. MYTH-BUSTING / ANTI-BELIEF DESIGN', idealSlides: 5 },
  { id: '3', label: '3. BRUTAL TRUTH POSTER', idealSlides: 5 },
  { id: '4', label: '4. FAILURE HIGHLIGHT DESIGN', idealSlides: 5 },
  { id: '5', label: '5. IRONY & SATIRICAL DESIGN', idealSlides: 7 },
  { id: '6', label: '6. BEFORE–AFTER COGNITIVE GAP', idealSlides: 5 },
];

// DATA INTEGRASI FOTO
const PHOTO_INTEGRATION_RULES = {
  '1': "PHOTO INTEGRATION [STYLE 1 - SILHOUETTE WITNESS]: Use a SEMI-REALISTIC FACELESS FIGURE. The face and parts of the upper body must be completely obscured by deep environmental shadows or dramatically blocked by objects. The shadow must look like a natural volume cast onto the person (NO plain smooth skin faces, NO eyes/nose/mouth). View: Side profile or Back view (never facing camera directly). Proportion: Character occupies max 30% of frame. Posture: Passive, witness-like, shoulders slightly down. Lighting: Hard shadows, thin rim light, cinematic noise. CRITICAL: If original photo has GLASSES, the faceless silhouette MUST wear glasses.",
  '2': "PHOTO INTEGRATION [STYLE 2 - FLAT ABSTRACT]: Use an ABSTRACT / FLAT FACELESS HUMAN (2D Style). Head shape: Covered by shadow, overlaid by a graphic shape, or blurred out seamlessly into the body. Texture: Minimal, solid colors. Posture: Neutral, non-threatening, hands pointing or crossing. Effects: Surrounded by correction lines or Cross/Check marks. CRITICAL: If original photo has GLASSES, represent them as simple vector outlines.",
  '3': "PHOTO INTEGRATION [STYLE 3 - REALISTIC TENSION]: Use a REALISTIC FACELESS PORTRAIT. The face and chest MUST be naturally obscured by heavy pitch-black shadow falling across the body, or hidden by a large object (book, cloth, smoke). Color: Black & White or Desaturated. Shot: Medium or Bust shot. Posture: Body facing camera, straight or slumped. Effects: High contrast, gritty texture, raw vibe. CRITICAL: If original photo has GLASSES, keep them opaque/reflective on the shadowed face.",
  '4': "PHOTO INTEGRATION [STYLE 4 - CROPPED VICTIM]: Use a FACELESS SILHOUETTE or CROPPED HUMAN. Character often cut off by frame edges. Head: No face, or heavily obscured by environmental lighting/shadows cast across the body. Posture: Slumping, hands open/dropping, body leaning down. Effects: Motion blur, red warning glow, glitch/cracks. CRITICAL: If original photo has GLASSES, include them in the silhouette.",
  '5': "PHOTO INTEGRATION [STYLE 5 - SATIRICAL CARTOON]: Use a 2D / 2.5D FACELESS CARTOON. Head: Plain or obscured by a massive shadow or odd shape (box, balloon). Proportions: Exaggerated/Unrealistic. Posture: OVER-ACTING, wide arms, extreme lean. Effects: Funny contrast elements, stickers, absurd shapes. CRITICAL: If original photo has GLASSES, make them thick/bold lines.",
  '6': "PHOTO INTEGRATION [STYLE 6 - DUAL STATE]: Use the SAME FACELESS CHARACTER in TWO STATES side-by-side. BEFORE SIDE: Slumping posture, closed body, dull/dark lighting, noise. AFTER SIDE: Upright posture, open body, bright/clean lighting. The character design must be identical, only posture/lighting changes. CRITICAL: If original photo has GLASSES, keep them on both sides."
};

// DATA GAYA BAHASA & VISUAL TULISAN
const STYLE_TEXT_GUIDELINES = {
  '1': { // EDU-PROVOCATIVE
    tone: "Tone: Quiet but piercing, disappointing not angry.",
    visuals: "TEXT VISUALS: Use BOLD font for bad consequences. Hand-drawn CIRCLES around mistakes. Use DUCT TAPE textures for 'harsh reality'. Focus on visual metaphors, minimal graffiti."
  },
  '2': { // MYTH-BUSTING
    tone: "Tone: Corrective, calm, rational. 'Wait a minute' vibe.",
    visuals: "TEXT VISUALS: Use STRIKETHROUGH (coret) for myths. BOLD for new reality. Use 'X' marks. Clean and rational look, NO rough graffiti."
  },
  '3': { // BRUTAL TRUTH
    tone: "Tone: Direct, unapologetic, honest friend. No fluff.",
    visuals: "TEXT VISUALS: SUPER BOLD headlines. Rough GRAFFITI/SPRAY textures. NO circles (direct hit). High impact, raw aesthetic."
  },
  '4': { // FAILURE HIGHLIGHT
    tone: "Tone: Urgent, warning a friend. 'This is leaking, fix it'.",
    visuals: "TEXT VISUALS: BOLD Numbers. RED CIRCLES highlighting leak points. ARROWS/LINES showing flow of loss. Realistic urgency, not exaggerated."
  },
  '5': { // IRONY
    tone: "Tone: Sarcastic, bitter laugh. 'Funny but true'.",
    visuals: "TEXT VISUALS: Playful GRAFFITI, funny STICKERS, small EMOJIS (optional). Visual contrast between 'Expectation' and 'Reality'."
  },
  '6': { // BEFORE-AFTER
    tone: "Tone: Neutral, comparative, objective.",
    visuals: "TEXT VISUALS: 'BEFORE' text in Dull/Grey/Thin Strikethrough. 'AFTER' text in BOLD/Clean/Sharp. No rough graffiti, clear separation."
  }
};

// DATA GAYA VISUAL (SUB-STYLES)
const VISUAL_STYLE_OPTIONS = {
  '1': [
    { id: 'A', label: 'A. Conceptual Photography', prompt: 'Style: Conceptual Photography. Characteristics: Single isolated object, dark/plain background, dramatic lighting, serious high-value metaphor.' },
    { id: 'B', label: 'B. 3D Surreal Object', prompt: 'Style: 3D Surreal Object. Characteristics: Realistic rendering but absurd logic, focus on a single symbol, attention-grabbing oddity.' },
    { id: 'C', label: 'C. Cinematic Still Frame', prompt: 'Style: Cinematic Still Frame. Characteristics: Film look, strong depth of field, dark tone, serious "big problem" atmosphere.' }
  ],
  '2': [
    { id: 'A', label: 'A. Minimalist Typographic Poster', prompt: 'Style: Minimalist Typographic Poster. Characteristics: Almost no images, heavy focus on bold text layout, clean, certain and final feel.' },
    { id: 'B', label: 'B. Symbolic Flat Illustration', prompt: 'Style: Symbolic Flat Illustration. Characteristics: Icons like cross marks (X), exclamation marks, stamps. Simple, clean, easy to accept correction.' },
    { id: 'C', label: 'C. Editorial Clean Layout', prompt: 'Style: Editorial Clean Layout. Characteristics: Lots of white space, strict grid system, clarification vibe rather than attack.' }
  ],
  '3': [
    { id: 'A', label: 'A. Pure Typography / Text-Only', prompt: 'Style: Pure Typography. Characteristics: All caps, extreme bold fonts, no visual distractions, direct-to-brain messaging.' },
    { id: 'B', label: 'B. Raw Editorial Photo', prompt: 'Style: Raw Editorial Photo. Characteristics: Black and white, serious facial expressions, raw emotion without dramatization.' },
    { id: 'C', label: 'C. Monochrome Contrast Design', prompt: 'Style: Monochrome Contrast. Characteristics: Strict 1-2 color palette, high contrast, firm and final look, no debate.' }
  ],
  '4': [
    { id: 'A', label: 'A. Data-Driven Visual', prompt: 'Style: Data-Driven Visual. Characteristics: Downward graphs, leaking diagrams, visual representation of real loss.' },
    { id: 'B', label: 'B. Warning System Visual', prompt: 'Style: Warning System Visual. Characteristics: Alert elements, danger icons, hazard aesthetics, triggering urgency.' },
    { id: 'C', label: 'C. Degraded / Broken Visual', prompt: 'Style: Degraded / Broken Visual. Characteristics: Cracked elements, noise, glitch effects, showing "already broken" state.' }
  ],
  '5': [
    { id: 'A', label: 'A. Playful Illustration / Dark Meaning', prompt: 'Style: Playful Illustration with Dark Meaning. Characteristics: Cute or funny visuals juxtaposed with a bitter message, lowering ego resistance.' },
    { id: 'B', label: 'B. Visual Juxtaposition', prompt: 'Style: Visual Juxtaposition. Characteristics: Two colliding elements, contradictory imagery, instant irony.' },
    { id: 'C', label: 'C. Meme-Inspired Editorial', prompt: 'Style: Meme-Inspired Editorial. Characteristics: Meme structure but high-quality visual execution, shareable, relatable.' }
  ],
  '6': [
    { id: 'A', label: 'A. Split-Screen Comparison', prompt: 'Style: Split-Screen Comparison. Characteristics: Left vs Right, clear division, visual gap between states.' },
    { id: 'B', label: 'B. Transformation Sequence', prompt: 'Style: Transformation Sequence. Characteristics: Gradual visual steps, showing the process from chaos to order, not magic.' },
    { id: 'C', label: 'C. Color Psychology Contrast', prompt: 'Style: Color Psychology Contrast. Characteristics: Dull/Grey to Bright/Vibrant transition, emotional shift through color.' }
  ]
};

const CONTENT_PURPOSES = [
  { id: 'AWARENESS', label: '1. AWARENESS (Problem Recognition)', desc: 'Membuat audiens sadar mereka punya masalah.', recommendedStyles: ['1', '4', '5'], idealSlideCount: 3, range: [3] },
  { id: 'ENGAGEMENT', label: '2. ENGAGEMENT (Reaction)', desc: 'Memancing komentar, diskusi, pro-kontra.', recommendedStyles: ['5', '2', '3'], idealSlideCount: 3, range: [3, 5] },
  { id: 'BRANDING', label: '3. BRANDING (Positioning)', desc: 'Dikenal beda, punya sudut pandang kuat.', recommendedStyles: ['1', '2', '5'], idealSlideCount: 5, range: [5] },
  { id: 'EDUKASI', label: '4. EDUKASI (Mindset Shift)', desc: 'Mengubah cara berpikir, insight baru.', recommendedStyles: ['1', '2', '6'], idealSlideCount: 5, range: [5, 7] },
  { id: 'AUTHORITY', label: '5. AUTHORITY (Thought Leadership)', desc: 'Membangun kesan berpengalaman.', recommendedStyles: ['3', '1', '2'], idealSlideCount: 7, range: [7] },
  { id: 'STORYTELLING', label: '6. STORYTELLING (Koneksi Emosional)', desc: 'Relate, dipahami, dan dirasakan secara personal.', recommendedStyles: ['5', '1', '6'], idealSlideCount: 7, range: [7] },
  { id: 'MARKETING', label: '7. MARKETING (Value Delivery)', desc: 'Menyampaikan value tanpa terasa jualan.', recommendedStyles: ['2', '4', '1'], idealSlideCount: 7, range: [7, 10] },
  { id: 'SALES', label: '8. SALES (Decision Making)', desc: 'Menciptakan urgensi, kejelasan, dan tindakan segera.', recommendedStyles: ['4', '3', '6'], idealSlideCount: 10, range: [10] },
  { id: 'SOFT_SELLING', label: '9. SOFT PERSONAL SELLING (Trust)', desc: 'Jualan diri tanpa teriak. Konversi hangat.', recommendedStyles: ['6', '1', '5'], idealSlideCount: 10, range: [7, 10] }
];

const SLIDE_COUNTS = [3, 5, 7, 9, 10]; 

const CHARACTER_TYPES = [
  'Tak ada Karakter',
  'Pria Dewasa',
  'Wanita Dewasa',
  'Anak Laki-Laki',
  'Anak Perempuan'
];

const FACELESS_STYLES = [
  'Hand Model', 'Partial Body', 'Back/Side View', 'Action-Based',
  'Silhouette / Shadow', 'Cropped Face (Cut-off)', 'Hands + Partial Body Combo',
  'Object Interaction (Cermin/Tas)', 'Environmental Presence (Bayangan)',
  'Motion Blur Human', 'Reflection Model (Refleksi)', 'Wardrobe-Based (Outfit Only)',
  'POV (Point of View)', 'Multi Human (Faceless Grup)', 'Abstract Human Form'
];

const RATIOS = ['1:1', '2:3', '4:5', '9:16', '16:9'];

const CHARACTER_RECOMMENDATIONS = {
  '1_A': {
    style: "Symbolic Human Faceless",
    description: "Karakter realistis, wajah tertutup bayangan, penuh simbol, emotional posing.",
    atmosphere: "Filosofis, reflective, deep meaning.",
    lighting: "Dramatic spotlight, moody shadows.",
    color: "Dark tones, subtle metallic or skin contrast.",
    symbolicObject: "Hourglass, broken mirror, chains, floating geometric shapes.",
    promptInjection: "Symbolic Human Faceless character, realistic, face covered in deep shadow, full of symbols, emotional pose, philosophical reflective deep meaning atmosphere, dramatic spotlight, dark tones"
  },
  '1_B': {
    style: "Surreal 3D Faceless Avatar",
    description: "Manusia 3D, kepala abstrak, tubuh clean, surreal composition.",
    atmosphere: "Futuristic, premium, bizarre.",
    lighting: "Studio softbox, clean highlights, cinematic rim light.",
    color: "Vibrant neon accents on clean matte background.",
    symbolicObject: "Floating spheres, impossible stairs, abstract metallic shapes.",
    promptInjection: "Surreal 3D Faceless Avatar, 3D human body, abstract head, clean minimal body, surreal composition, futuristic bizarre premium atmosphere, softbox lighting, vibrant accents"
  },
  '1_C': {
    style: "Cinematic Lonely Faceless",
    description: "Siluet manusia, lonely atmosphere, dramatic lighting, realistic cinematic frame.",
    atmosphere: "Emotional, dark, introspective.",
    lighting: "Moody cinematic, thick volumetric fog, hard backlight.",
    color: "Desaturated cool colors, deep black shadows.",
    symbolicObject: "Empty chair, glowing window, far away light source.",
    promptInjection: "Cinematic Lonely Faceless, human silhouette, dramatic realistic cinematic frame, lonely introspective emotional atmosphere, moody cinematic lighting, thick volumetric fog"
  },
  '2_A': {
    style: "Minimal Silhouette Faceless",
    description: "Simple silhouette, minimal shape, negative space composition.",
    atmosphere: "Premium, clean, elegant.",
    lighting: "Flat minimal lighting, high contrast cut-out.",
    color: "Black and white or duotone elegant contrast.",
    symbolicObject: "Minimalist lines, simple geometric boundaries, oversized typography symbols.",
    promptInjection: "Minimal Silhouette Faceless, simple silhouette, minimal abstract shape, negative space composition, premium elegant clean atmosphere, flat minimal lighting"
  },
  '2_B': {
    style: "Flat Vector Faceless",
    description: "Flat illustration, simple geometric, no facial detail, symbolic object integration.",
    atmosphere: "Educational, modern, clean.",
    lighting: "Uniform vector lighting, no harsh shadows.",
    color: "Soft corporate or pastel colors, high legibility.",
    symbolicObject: "Checkmarks, oversized magnifying glass, flat geometric charts.",
    promptInjection: "Flat Vector Faceless, flat vector illustration, simple geometric body, no facial details, modern clean educational atmosphere, uniform vector lighting"
  },
  '2_C': {
    style: "Fashion Editorial Faceless",
    description: "Magazine style, fashion pose, hidden face, premium framing.",
    atmosphere: "Luxury, modern, classy.",
    lighting: "High-end studio flash, soft umbrella lighting.",
    color: "Muted luxury tones, beige, cream, onyx.",
    symbolicObject: "Designer props, sleek aesthetic furniture, silk drapes.",
    promptInjection: "Fashion Editorial Faceless, magazine editorial style, fashion pose, hidden face, premium luxury modern classy atmosphere, high-end studio lighting"
  },
  '3_A': {
    style: "Invisible Emotional Presence",
    description: "Tidak tampil penuh, hanya shadow, body fragment, implied human presence.",
    atmosphere: "Psychological, intimate, emotional.",
    lighting: "Harsh chiaroscuro, pure shadow projection.",
    color: "Monochrome, high contrast black text and white space.",
    symbolicObject: "Large bold typography pushing against the shadow, heavy textures.",
    promptInjection: "Invisible Emotional Presence, showing only shadow or body fragment, implied human presence, deep psychological intimate emotional atmosphere, harsh chiaroscuro lighting"
  },
  '3_B': {
    style: "Documentary Faceless",
    description: "Candid realism, raw atmosphere, imperfect human posture.",
    atmosphere: "Authentic, relatable, human.",
    lighting: "Natural available light, gritty harsh realistic lighting.",
    color: "Desaturated natural, slight film grain.",
    symbolicObject: "Everyday objects, messy desk, worn out tools.",
    promptInjection: "Documentary Faceless, candid realism portrait style, imperfect human posture, raw authentic relatable human atmosphere, natural gritty lighting, film grain"
  },
  '3_C': {
    style: "High Contrast Shadow Faceless",
    description: "Black & white, heavy shadows, hidden face.",
    atmosphere: "Mysterious, brutal, dramatic.",
    lighting: "Extreme high contrast, hard directional light.",
    color: "Pure Black and White.",
    symbolicObject: "Sharp architectural angles, concrete textures, metallic edges.",
    promptInjection: "High Contrast Shadow Faceless, pure black and white photography, heavy shadows concealing identity, hidden face, mysterious brutal dramatic atmosphere, hard directional light"
  },
  '4_A': {
    style: "Analytical Faceless Figure",
    description: "Surrounded by data, modern UI atmosphere, analytical body language.",
    atmosphere: "Smart, strategic, authority.",
    lighting: "Glowing screen light, blue-ish digital rim lighting.",
    color: "Tech blue, glowing cyan, dark background.",
    symbolicObject: "Floating holograms, downward graphs, HUD elements.",
    promptInjection: "Analytical Faceless Figure, character surrounded by data holograms, modern UI atmosphere, analytical posture, smart strategic authority atmosphere, glowing digital lighting"
  },
  '4_B': {
    style: "Hazard Faceless Character",
    description: "Industrial warning vibe, caution tape, danger composition.",
    atmosphere: "Urgency, tension, alert.",
    lighting: "Flashing red light, harsh emergency lighting.",
    color: "Danger red, hazard yellow, pitch black.",
    symbolicObject: "Caution tape, warning signs, broken glass, sirens.",
    promptInjection: "Hazard Faceless Character, industrial warning vibe, danger composition, urgent tense alert atmosphere, harsh emergency red lighting, caution elements"
  },
  '4_C': {
    style: "Glitch Faceless Human",
    description: "Distorted body, fragmented visual, glitch effect.",
    atmosphere: "Chaos, burnout, psychological pressure.",
    lighting: "Flickering neon, RGB split chromatic aberration.",
    color: "Digital glitch colors, magenta, cyan, abrasive contrast.",
    symbolicObject: "Corrupted files, static noise screens, broken digital glass.",
    promptInjection: "Glitch Faceless Human, distorted fragmented body, intense glitch effect, chaos burnout psychological pressure atmosphere, chromatic aberration, flickering light"
  },
  '5_A': {
    style: "Cute-but-Disturbing Faceless",
    description: "Cute appearance, dark symbolism, unsettling composition.",
    atmosphere: "Ironic, disturbing, satirical.",
    lighting: "Deceptively bright and cheerful softbox lighting.",
    color: "Pastel colors but slightly off, toxic candy palette.",
    symbolicObject: "Smiling masks with crying eyes, poisoned apples, cute bombs.",
    promptInjection: "Cute-but-Disturbing Faceless, cute appearance but dark symbolism, unsettling eerie composition, ironic satirical disturbing atmosphere, deceptively bright cheerful lighting"
  },
  '5_B': {
    style: "Duality Faceless Character",
    description: "Split identity, contrasting symbolism, opposing visual states.",
    atmosphere: "Cognitive dissonance, internal conflict.",
    lighting: "Split lighting, warm light on one side, cold light on the other.",
    color: "Complementary clashing colors.",
    symbolicObject: "Two-faced masks, mirrors showing different reflections.",
    promptInjection: "Duality Faceless Character, split identity representation, contrasting opposing visual states, cognitive dissonance internal conflict atmosphere, split lighting warm and cold"
  },
  '5_C': {
    style: "Deadpan Faceless Figure",
    description: "Awkward pose, absurd realism, internet meme energy.",
    atmosphere: "Sarcastic, relatable, viral.",
    lighting: "Direct flash photography, unpolished raw lighting.",
    color: "Flash-washed vivid colors.",
    symbolicObject: "Absurd mundane objects used wrongly.",
    promptInjection: "Deadpan Faceless Figure, awkward unnatural pose, absurd realism, internet meme energy, sarcastic relatable viral atmosphere, direct camera flash lighting, raw unpolished"
  },
  '6_A': {
    style: "Before–After Faceless",
    description: "Old self vs new self, split identity transformation.",
    atmosphere: "Contrast, transformation, emotional comparison.",
    lighting: "Dull/flat lighting left, glowing radiant light right.",
    color: "Desaturated transitioning to vibrant tones.",
    symbolicObject: "Broken chains vs flying birds.",
    promptInjection: "Before-After Faceless Character, split identity transformation, old self vs new self, emotional comparison contrast atmosphere, left side dull lighting, right side glowing lighting"
  },
  '6_B': {
    style: "Evolution Faceless Character",
    description: "Progressive transformation, multiple stages, cinematic evolution.",
    atmosphere: "Motivational, empowering, aspirational.",
    lighting: "Dynamic lighting sweeping across frame, rays of light.",
    color: "Gold, warm sunrise tones.",
    symbolicObject: "Steps, ascending arrows, glowing pathways.",
    promptInjection: "Evolution Faceless Character, progressive transformation motion, cinematic evolution, motivational empowering aspirational atmosphere, dynamic sweeping rays of light"
  },
  '6_C': {
    style: "Emotion-Based Faceless Character",
    description: "Emotional color symbolism, color-based mood identity.",
    atmosphere: "Emotional immersion, subconscious impact.",
    lighting: "Heavy color grading, entirely washed in expressive light.",
    color: "Monochromatic tinting depending on emotion.",
    symbolicObject: "Aura, floating particles, liquid color drips.",
    promptInjection: "Emotion-Based Faceless Character, emotional color symbolism, color-based mood identity, deep emotional immersion subconscious impact atmosphere, heavy monochromatic color grading light"
  }
};

const generateCopywritingText = (styleId, topic) => {
  const cleanTopic = topic.trim() || 'Topik Ini';
  const lowerTopic = cleanTopic.toLowerCase().replace(/\s+/g, '');
  const baseHashtags = `#${lowerTopic} #edukasi #pengembangandiri #bisnis #karir #mindset`;
  let styleHashtags = "";
  let headline = ""; let body = ""; let closing = "";

  switch (styleId) {
    case '1':
      styleHashtags = "#hardtruth #realita #stopbeingaverage";
      headline = `🤔 Pernah ngerasa udah capek di ${cleanTopic.toUpperCase()} tapi hasilnya segitu-gitu aja?`;
      body = `Masalahnya bukan di seberapa keras usaha lo...\n\nTapi mungkin di cara pikir yang selama ini lo anggap bener.\n\nAda satu lubang kecil yang bikin semua effort lo bocor sia-sia. Liat visual di slide, relate gak?`;
      closing = `Geser sampai abis. Lo ngerasa "tertampar" di bagian mana? 👇`;
      break;
    case '2':
      styleHashtags = "#mitosfakta #debunked #faktasebenarnya";
      headline = `🚫 Banyak yang percaya kalau ${cleanTopic.toUpperCase()} itu kuncinya di X...`;
      body = `Padahal, realitanya jauh beda.\n\nKalau selama ini lo masih mikir begitu, pantesan aja sering mentok.\n\nBukan salah lo sepenuhnya sih, karena emang ini yang sering diulang-ulang. Tapi fakta sebenarnya ada di slide.`;
      closing = `Cek slide terakhir. Masih mau percaya mitos lama? 👇`;
      break;
    case '3':
      styleHashtags = "#brutaltruth #jujurly #selfreflection";
      headline = `⚠️ Konten ini gak bakal ramah buat ego lo.`;
      body = `Bukan buat yang suka cari pembenaran.\n\nMasalah lo di ${cleanTopic} itu sebenernya simpel: Lo belum siap nerima fakta pahitnya.\n\nIni bukan soal teknis, ini soal mental. Baca kalau berani jujur.`;
      closing = `Gimana? Panas? Atau malah sadar? Komen di bawah. 🔥`;
      break;
    case '4':
      styleHashtags = "#kerugian #antisipasi #strategi";
      headline = `📉 Tanpa sadar lo kehilangan potensi besar di ${cleanTopic.toUpperCase()} setiap hari.`;
      body = `Coba hitung berapa peluang yang lewat cuma gara-gara satu hal sepele ini.\n\nKalau diterusin, bukan cuma waktu yang abis, tapi momentum lo juga ilang.\n\nLiat grafiknya, pahami kebocorannya.`;
      closing = `Simpan postingan ini sebelum lo lupa dan rugi lagi! 📌`;
      break;
    case '5':
      styleHashtags = "#ironi #lucutapinyata #sarkas";
      headline = `😅 Lucu ya, teorinya sih ${cleanTopic.toUpperCase()}, tapi prakteknya...`;
      body = `Niat hati mau profesional, eh malah kejadian kayak di slide 2.\n\nSiapa nih yang sering begini? Ngaku aja, kita semua pernah kok (gue juga).\n\nTapi ya kali mau gini terus?`;
      closing = `Tag temen lo yang kelakuannya persis kayak gini! 🤣`;
      break;
    case '6':
      styleHashtags = "#transformasi #beforeafter #growth";
      headline = `🔄 Dulu mikirnya ${cleanTopic.toUpperCase()} itu soal alat. Sekarang baru sadar...`;
      body = `Ternyata bedanya bukan di tools, bukan di budget.\n\nLiat perbandingannya di slide.\n\nKiri itu gue yang dulu (stuck). Kanan itu gue yang sekarang (jalan). Kelihatan kan gap-nya?`;
      closing = `Lo sekarang lagi di fase kiri atau kanan? Jawab jujur di komen 👇`;
      break;
    default:
      headline = `💡 INSIGHT BARU TENTANG ${cleanTopic.toUpperCase()}`;
      body = `Simak pembahasan lengkap di slide. Semoga bermanfaat buat journey lo.`;
      closing = `Jangan lupa share!`;
  }
  return `${headline}\n\n${body}\n\n${closing}\n\n.\n.\n${baseHashtags} ${styleHashtags} #indonesia`;
};

const getSlideStructure = (count, topic) => {
  const structureMap = {
    3: [
      { role: "HOOK (STOP SCROLL)", content: `SCENE PART 1: Provocative visual metaphor representing misconception about '${topic}'.` },
      { role: "REALITA (KONFLIK)", content: `SCENE PART 2: Depiction of messy reality or struggle regarding '${topic}'.` },
      { role: "OPEN LOOP (CTA)", content: `SCENE PART 3: Open-ended visual symbol inviting discussion on '${topic}'.` }
    ],
    5: [
      { role: "HOOK (TAMPARAN AWAL)", content: `SCENE PART 1: Sharp visual metaphor related to '${topic}' challenging status quo.` },
      { role: "MASALAH UTAMA", content: `SCENE PART 2: Visualizing core pain point preventing success in '${topic}'.` },
      { role: "KESALAHAN UMUM", content: `SCENE PART 3: Illustration of a bad habit regarding '${topic}'.` },
      { role: "ARAH SOLUSI", content: `SCENE PART 4: A shift in perspective for handling '${topic}'.` },
      { role: "CTA EDUKATIF", content: `SCENE PART 5: Trust-building visual offering help regarding '${topic}'.` }
    ],
    7: [
      { role: "HOOK KERAS", content: `SCENE PART 1: Authoritative statement disrupting belief about '${topic}'.` },
      { role: "KONDISI IDEAL", content: `SCENE PART 2: Visualizing the dream outcome regarding '${topic}'.` },
      { role: "REALITA PAHIT", content: `SCENE PART 3: Contrast showing gap between reality vs the dream.` },
      { role: "KESALAHAN BERULANG", content: `SCENE PART 4: Cyclic symbol showing why they keep failing at '${topic}'.` },
      { role: "PEMBONGKARAN LOGIKA", content: `SCENE PART 5: Breaking the loop. Revealing truth about '${topic}'.` },
      { role: "ARAH SOLUSI", content: `SCENE PART 6: Strategic path forward.` },
      { role: "CTA POSITIONING", content: `SCENE PART 7: Strong authority anchor guiding the viewer.` }
    ],
    10: [
      { role: "HOOK", content: `SCENE 1: Highly emotional scene regarding '${topic}'.` },
      { role: "MASALAH BESAR", content: `SCENE 2: Magnifying problem of '${topic}'.` },
      { role: "KERUGIAN", content: `SCENE 3: Visualizing specific loss.` },
      { role: "PENYEBAB", content: `SCENE 4: X-Ray view of the problem.` },
      { role: "CARA LAMA", content: `SCENE 5: The 'Old Way' represented as rusty machinery.` },
      { role: "CARA BARU", content: `SCENE 6: The 'New Way' represented as efficient.` },
      { role: "KONSEP", content: `SCENE 7: Abstract diagram of solution.` },
      { role: "BUKTI", content: `SCENE 8: Successful outcome visualization.` },
      { role: "BRIDGE", content: `SCENE 9: Bridging advice to offer.` },
      { role: "CTA", content: `SCENE 10: Closing scene.` }
    ]
  };

  if (structureMap[count]) return structureMap[count];
  const genericSlides = [{ role: "HOOK", content: `SCENE 1: hook for '${topic}'.` }];
  for (let i = 0; i < count - 2; i++) genericSlides.push({ role: "ISI", content: `SCENE ${i + 2}: narrative step ${i + 1}.` });
  genericSlides.push({ role: "CTA", content: `SCENE ${count}: Conclusion.` });
  return genericSlides;
};

const getStyleSpecifics = (styleId, topic, slideCount, contentPurposeIds, includePhoto) => {
  let visualStyle = ""; let mood = ""; let moodCondition = ""; let textHierarchy = ""; let colorGuideline = "";
  
  const slideStructure = getSlideStructure(slideCount, topic);
  const textGuideline = STYLE_TEXT_GUIDELINES[styleId] || { tone: "", visuals: "" };
  const photoIntegrationRule = includePhoto ? (PHOTO_INTEGRATION_RULES[styleId] || "PHOTO INTEGRATION: Faceless subject.") : "";

  const purposeObjs = (contentPurposeIds && Array.isArray(contentPurposeIds)) ? CONTENT_PURPOSES.filter(p => contentPurposeIds.includes(p.id)) : [];
  const purposeContext = purposeObjs.length > 0 ? `CONTENT GOAL: ${purposeObjs.map(p => p.label).join(', ')}.` : "";

  switch (styleId) {
    case '1':
      visualStyle = "Edu-Provocative Metaphor"; moodCondition = "MOOD RULES: Confrontational.";
      colorGuideline = "Dark Blue or Black. RED for danger."; textHierarchy = "HOOK (Big), Sub (Medium)."; break;
    case '2':
      visualStyle = "Myth-Busting"; moodCondition = "MOOD RULES: Correcting.";
      colorGuideline = "White/Light Grey. RED for 'Myth'."; textHierarchy = "Myth (Big), Correction (Medium)."; break;
    case '3':
      visualStyle = "Brutal Truth"; moodCondition = "MOOD RULES: Direct ego attack.";
      colorGuideline = "Black/Dark Grey. Text: White."; textHierarchy = "Headline (Dominant 80%)."; break;
    case '4':
      visualStyle = "Failure Highlight"; moodCondition = "MOOD RULES: Fear of loss.";
      colorGuideline = "RED dominant. Black/Dark."; textHierarchy = "Big Number/Data (Dominant)."; break;
    case '5':
      visualStyle = "Irony & Satirical"; moodCondition = "MOOD RULES: Bitter laugh.";
      colorGuideline = "Playful Contrast."; textHierarchy = "Ironic Headline (Dominant)."; break;
    case '6':
      visualStyle = "Before-After Gap"; moodCondition = "MOOD RULES: Split composition.";
      colorGuideline = "Before: Dull/Dark. After: Bright."; textHierarchy = "Labels, Headline."; break;
    default:
      visualStyle = "Standard Professional";
  }

  const generatedSlides = slideStructure.map((slide, index) => ({ idx: index + 1, ...slide }));
  return { visualStyle, moodCondition, textHierarchy, purposeContext, slides: generatedSlides, colorGuideline, textGuideline, photoIntegrationRule };
};

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

const extractDominantColors = (imgElement, maxColors = 5) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = 100;
  const height = (imgElement.height / imgElement.width) * width;
  canvas.width = width; canvas.height = height;
  ctx.drawImage(imgElement, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const colorCounts = {};
  for (let i = 0; i < imageData.length; i += 20) {
    const r = imageData[i], g = imageData[i + 1], b = imageData[i + 2], a = imageData[i + 3];
    if (a < 128) continue;
    const rR = Math.round(r / 32) * 32, gR = Math.round(g / 32) * 32, bR = Math.round(b / 32) * 32;
    const key = `${rR},${gR},${bR}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }
  return Object.entries(colorCounts).sort((a, b) => b[1] - a[1])
    .map(entry => rgbToHex(...entry[0].split(',').map(Number))).slice(0, maxColors);
};

export default function App() {
  const [topic, setTopic] = useState('');
  const [productName, setProductName] = useState(() => {
    try { return localStorage.getItem('productName') || ''; } catch(e) { return ''; }
  });
  const [productDesc, setProductDesc] = useState(() => {
    try { return localStorage.getItem('productDesc') || ''; } catch(e) { return ''; }
  });
  const [contentPurpose, setContentPurpose] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(MASTER_STYLES[0].id);
  const [selectedSubStyle, setSelectedSubStyle] = useState('A'); 
  const [slideCount, setSlideCount] = useState(5);
  const [colorContext, setColorContext] = useState('');
  const [selectedCharTypes, setSelectedCharTypes] = useState([]);
  const [selectedFacelessStyle, setSelectedFacelessStyle] = useState(FACELESS_STYLES[2]);
  const [ratio, setRatio] = useState('1:1');
  const [useText, setUseText] = useState(true);
  const [slideTexts, setSlideTexts] = useState(Array(5).fill(''));
  const [slideVisuals, setSlideVisuals] = useState(Array(5).fill(''));
  const [inputMode, setInputMode] = useState('satuan');
  const [bulkInput, setBulkInput] = useState('');
  const [includePhoto, setIncludePhoto] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('prompt_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load history', e);
    }
    return [];
  });
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [captionCopied, setCaptionCopied] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('productName', productName); } catch(e) {}
  }, [productName]);

  useEffect(() => {
    try { localStorage.setItem('productDesc', productDesc); } catch(e) {}
  }, [productDesc]);

  const currentPurposeObjs = CONTENT_PURPOSES.filter(p => contentPurpose.includes(p.id));
  const recommendedStyleIds = new Set(currentPurposeObjs.flatMap(p => p.recommendedStyles));
  const visibleStyles = contentPurpose.length > 0 ? MASTER_STYLES.filter(s => recommendedStyleIds.has(s.id)) : MASTER_STYLES;

  useEffect(() => {
    setSlideTexts(prev => {
      const newTexts = [...prev];
      if (slideCount > prev.length) return [...newTexts, ...Array(slideCount - prev.length).fill('')];
      return newTexts.slice(0, slideCount);
    });
    setSlideVisuals(prev => {
      const newVisuals = [...prev];
      if (slideCount > prev.length) return [...newVisuals, ...Array(slideCount - prev.length).fill('')];
      return newVisuals.slice(0, slideCount);
    });
  }, [slideCount]);

  useEffect(() => {
    if (inputMode === 'sekaligus' && (!bulkInput || bulkInput.trim() === '')) {
      setBulkInput(Array.from({length: slideCount}).map((_, i) => `SLIDE ${i+1}\nHEADLINE: \nSUBTEXT: \nVISUAL: `).join('\n\n'));
    }
  }, [inputMode, slideCount, bulkInput]);

  useEffect(() => { setSelectedSubStyle('A'); }, [selectedStyle]);

  useEffect(() => {
    if (contentPurpose.length > 0 && currentPurposeObjs.length > 0) {
      if (!recommendedStyleIds.has(selectedStyle)) {
        setSelectedStyle(currentPurposeObjs[0].recommendedStyles[0]);
      }
      const idealSlides = currentPurposeObjs.find(p => p.idealSlideCount)?.idealSlideCount;
      if (idealSlides) setSlideCount(idealSlides);
    }
  }, [contentPurpose]);

  const currentStyleObj = MASTER_STYLES.find(s => s.id === selectedStyle);

  const handlePurposeToggle = (id) => {
    setContentPurpose(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleSetRecommendedSlides = () => {
    const idealSlides = currentPurposeObjs.find(p => p.idealSlideCount)?.idealSlideCount;
    if (idealSlides) setSlideCount(idealSlides);
    else if (currentStyleObj) setSlideCount(currentStyleObj.idealSlides);
  };

  const handleCharTypeToggle = (type) => {
    if (type === 'Tak ada Karakter') { setSelectedCharTypes(['Tak ada Karakter']); return; }
    let newTypes = [...selectedCharTypes];
    if (newTypes.includes('Tak ada Karakter')) newTypes = [];
    if (newTypes.includes(type)) newTypes = newTypes.filter(t => t !== type);
    else newTypes.push(type);
    setSelectedCharTypes(newTypes);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target.result;
        setUploadedImage(imgUrl);
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          const colors = extractDominantColors(img, 5);
          setExtractedColors(colors); setColorContext(colors.join(', '));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePrompt = () => {
    if (!topic) return alert("Mohon isi Topik terlebih dahulu.");

    let finalHeadlines = Array(slideCount).fill('');
    let finalSubtexts = Array(slideCount).fill('');
    let finalVisuals = [...slideVisuals];

    if (inputMode === 'sekaligus') {
      let blocks = [];
      if (/SLIDE\s*\d+/i.test(bulkInput)) {
        const matches = Array.from(bulkInput.matchAll(/(?:^|\n)SLIDE\s*\d+\s*([\s\S]*?)(?=(?:\nSLIDE\s*\d+|$))/gi));
        blocks = matches.map(m => m[1]);
      } else {
        blocks = bulkInput.split(/\n\s*\n/);
      }
      
      blocks.forEach((block, index) => {
        if (index < slideCount) {
           const tMatch1 = block.match(/(?:HEADLINE|Teks|Text)\s*:\s*([\s\S]*?)(?=(?:SUBTEXT|CTA|Visual|Gambar|IDE VISUAL|CHARACTER|MOOD|BACKGROUND)\s*:|$)/i);
           const tMatch2 = block.match(/(?:SUBTEXT|CTA)\s*:\s*([\s\S]*?)(?=(?:Visual|Gambar|IDE VISUAL|CHARACTER|MOOD|BACKGROUND)\s*:|$)/i);
           const vMatch = block.match(/(?:Visual|Gambar|IDE VISUAL)\s*:\s*([\s\S]*?)(?=(?:CHARACTER|MOOD|BACKGROUND|HEADLINE|SUBTEXT|Teks|Text)\s*:|$)/i);
           
           if (tMatch1 || tMatch2 || vMatch) {
             finalHeadlines[index] = tMatch1 ? tMatch1[1].trim() : '';
             finalSubtexts[index] = tMatch2 ? tMatch2[1].trim() : '';
             finalVisuals[index] = vMatch ? vMatch[1].trim() : '';
           } else {
             const lines = block.split('\n').filter(l => l.trim() && !l.toLowerCase().startsWith('slide'));
             finalHeadlines[index] = lines.length > 0 ? lines[0] : '';
             finalSubtexts[index] = lines.length > 1 ? lines[1] : ''; 
             finalVisuals[index] = lines.length > 2 ? lines.slice(2).join(' ') : '';
           }
        }
      });
    } else {
      slideTexts.forEach((text, index) => {
           if (/HEADLINE:/i.test(text) || /SUBTEXT:/i.test(text)) {
               const hMatch = text.match(/HEADLINE:\s*([\s\S]*?)(?=SUBTEXT:|$)/i);
               const sMatch = text.match(/SUBTEXT:\s*([\s\S]*?)$/i);
               finalHeadlines[index] = hMatch ? hMatch[1].trim() : '';
               finalSubtexts[index] = sMatch ? sMatch[1].trim() : '';
           } else {
               const lines = text.split('\n').filter(l => l.trim());
               finalHeadlines[index] = lines.length > 0 ? lines[0].trim() : '';
               finalSubtexts[index] = lines.length > 1 ? lines.slice(1).join(' ').trim() : '';
           }
      });
    }

    const styleData = getStyleSpecifics(selectedStyle, topic, slideCount, contentPurpose, includePhoto);
    const subStyleOptions = VISUAL_STYLE_OPTIONS[selectedStyle];
    const selectedSubStyleObj = subStyleOptions ? subStyleOptions.find(s => s.id === selectedSubStyle) : null;
    const specificVisualPrompt = selectedSubStyleObj ? selectedSubStyleObj.prompt : styleData.visualStyle;

    const recommendationKey = `${selectedStyle}_${selectedSubStyle}`;
    const characterRec = CHARACTER_RECOMMENDATIONS[recommendationKey] || CHARACTER_RECOMMENDATIONS['1_A'];

    let charDescription = includePhoto ? `SUBJECT: Use the attached photo as the core character reference. CRITICAL CHARACTER DIRECTIVE: 1. You MUST retain the subject's exact hair style, facial hair (beard/goatee), glasses, and body type from the reference photo. 2. FACELESS RULE: The character's face AND parts of their body MUST be naturally obscured by deep shadows cast by environmental objects, atmospheric elements (like smoke/fog), or creative framing. The shadow/obscuration should flow naturally across the upper body and face, not just an unnatural mask over the face. DO NOT use smooth featureless blank skin. 3. MAINTAIN EXACT IDENTICAL CHARACTER DESIGN, APPAREL, AND FEATURES ACROSS ALL SCENES. AI CHARACTER DIRECTIVE: Create a ${characterRec.style} look.` :
      (selectedCharTypes.includes('Tak ada Karakter') || selectedCharTypes.length === 0) ? "NO HUMAN CHARACTERS." :
      `CHARACTERS: ${selectedCharTypes.join(', ')}. STYLE: ${selectedFacelessStyle}. AI CHARACTER DIRECTIVE: ${characterRec.promptInjection}. CRITICAL RULE: Maintain EXACT identical character appearance (same clothing, hair, body) consistently across all slides. FACELESS RULES: The character's face and parts of their body MUST be completely obscured by deep shadows, covered by objects, or heavily blurred out naturally (strictly NO plain/smooth featureless skin faces). The shadow must look like a natural cast shadow.`;

    let textRule = useText ? "TEXT RENDERING: Create clear typographic hierarchy. MUST USE UNIQUE TEXT PER SLIDE. STRICT RULE: DO NOT render structural labels (like 'Headline:', 'Subtext:', 'Slide 1', 'CTA') inside the image layout." : "NO TEXT within the image.";
    const usedColorRule = colorContext ? `Colors: ${colorContext}` : styleData.colorGuideline;
    const colorRecommendation = colorContext ? `Custom: ${colorContext}` : characterRec.color;
    const generatedCaption = generateCopywritingText(selectedStyle, topic);

    let promptList = styleData.slides.map((slide, index) => {
      const isSlide1 = slide.idx === 1;
      const slideLayoutConstraint = isSlide1 ? "LAYOUT: SINGLE COVER POSTER IMAGE." : `LAYOUT: CAROUSEL SLIDE ${slide.idx}.`;
      
      let headline = finalHeadlines[index]?.trim() || '';
      let subtext = finalSubtexts[index]?.trim() || '';

      // CLEAN UP STRUCTURAL LABELS FROM TEXT
      headline = headline.replace(/(?:HEADLINE|SUBTEXT|CTA|TEKS|TEXT|VISUAL|GAMBAR|IDE VISUAL|CHARACTER|BACKGROUND|TYPOGRAPHY|MOOD|SLIDE(?:\s+\d+)?)\s*:/gi, '')
                 .replace(/"/g, "'").replace(/\n+/g, ' ').trim();
      subtext = subtext.replace(/(?:HEADLINE|SUBTEXT|CTA|TEKS|TEXT|VISUAL|GAMBAR|IDE VISUAL|CHARACTER|BACKGROUND|TYPOGRAPHY|MOOD|SLIDE(?:\s+\d+)?)\s*:/gi, '')
                 .replace(/"/g, "'").replace(/\n+/g, ' ').trim();

      let textInstruction = "";
      if (headline || subtext) {
          textInstruction += `UNIQUE TEXT FOR THIS SLIDE: `;
          if (headline && subtext) {
              textInstruction += `TYPOGRAPHY HIERARCHY: Render the HEADLINE "${headline}" in a massive, bold, dominant font. Render the SUBTEXT "${subtext}" in a smaller, secondary font below it.`;
          } else if (headline) {
              textInstruction += `TYPOGRAPHY: Render the text "${headline}" in a massive, bold, prominent font.`;
          } else if (subtext) {
              textInstruction += `TYPOGRAPHY: Render the text "${subtext}" in a clean, legible font.`;
          }
          textInstruction += ` EXACT SPELLING REQUIRED. DO NOT copy text from other slides. DO NOT include structural words like 'headline' or 'subtext'.`;
      }
      
      const userVisualForSlide = finalVisuals[index]?.trim();
      const visualInstruction = userVisualForSlide ? `UNIQUE SCENE COMPOSITION FOR THIS SLIDE: ${userVisualForSlide}. (Make it distinct from previous slides in the sequence).` : `UNIQUE SCENE COMPOSITION FOR THIS SLIDE: ${slide.content}. (Ensure visual progression, distinct from other slides).`;

      const negativePrompt = useText ? "--no corrupted text, misspelled words, extra letters, distorted text, signature, watermark, structural labels, word headline, word subtext, word slide, word cta" : "--no text, letters, words, typography, signature, watermark";

      const promptJson = {
        "ai_role": {
          "description": "Expert AI Carousel & Poster Image Generator"
        },
        "task_definition": {
           "slide_type": isSlide1 ? "SINGLE COVER POSTER IMAGE" : `CAROUSEL SLIDE ${slide.idx}` 
        },
        "slide_information": {
          "index": slide.idx,
          "total_slides": slideCount,
          "subject_context": topic
        },
        "content_goal": {
          "purpose": styleData.purposeContext
        },
        "storytelling_flow": {
           "instruction": "Ensure visual progression, distinct from other slides."
        },
        "headline": {
          "text": headline
        },
        "subtext": {
           "text": subtext
        },
        "scene_composition": {
          "rules": visualInstruction,
          "style": specificVisualPrompt
        },
        "human_character": {
          "design": charDescription
        },
        "visual_style": {
          "guidelines": styleData.photoIntegrationRule,
          "colors": usedColorRule
        },
        "emotional_trigger": {
           "mood": styleData.moodCondition
        },
        "typography_rules": {
          "instruction": textInstruction,
          "system": textRule
        },
        "text_parsing_rules": {
          "instruction": "DO NOT render structural labels inside the image layout. ONLY render the exact text in 'headline' and 'subtext' fields."
        },
        "slide_memory_rules": {
           "instruction": "MUST USE UNIQUE TEXT PER SLIDE. DO NOT copy text or identical visual composition from previous slides."
        },
        "visual_metaphor_rules": {
          "caption": generatedCaption
        },
        "brand_identity": {
           ...(productName && { "name": productName }),
           ...(productDesc && { "description": productDesc }),
           "recommendation": colorRecommendation
        },
        "technical_render": {
           "aspect_ratio": ratio,
           "quality": "8k",
           "render_engine": "v6.0",
           "style_mode": "raw"
        },
        "negative_prompt": useText ? [
             "corrupted text", "misspelled words", "extra letters", "distorted text", 
             "signature", "watermark", "structural labels", "word headline", 
             "word subtext", "word slide", "word cta"
        ] : [
             "text", "letters", "words", "typography", "signature", "watermark"
        ]
      };

      const fullPrompt = JSON.stringify(promptJson, null, 2);

      return { label: `${slide.role} (Slide ${slide.idx})`, text: fullPrompt };
    });

    const resultObj = {
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      summary: {
        topic, productName, productDesc, purpose: currentPurposeObjs.length > 0 ? currentPurposeObjs.map(p => p.label).join(', ') : "General",
        style: currentStyleObj ? currentStyleObj.label : "Custom", subStyle: selectedSubStyleObj ? selectedSubStyleObj.label : "Default",
        photoIncluded: includePhoto ? "Yes (Faceless)" : "No", slideCount, copywritingMode: "Manual Text Per Slide",
      },
      prompts: promptList, caption: generatedCaption,
      recommendation: characterRec,
      colorRecommendation: colorRecommendation,
      notes: ["Teks dikustomisasi.", includePhoto ? "Mode Foto." : "Ilustrasi Murni.", "Karakter direkomendasikan otomatis via AI Visual Director."]
    };

    setGeneratedResult(resultObj);
    const newHistory = [resultObj, ...history].slice(0, 10);
    setHistory(newHistory);
    try {
      localStorage.setItem('prompt_history', JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  const copyToClipboard = (text, index) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text; textArea.style.position = "fixed"; textArea.style.left = "-9999px"; textArea.style.top = "0";
      document.body.appendChild(textArea); textArea.focus(); textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        if (index === 'caption') { setCaptionCopied(true); setTimeout(() => setCaptionCopied(false), 2000); }
        else { setCopiedIndex(index); setTimeout(() => setCopiedIndex(null), 2000); }
      }
    } catch (err) { console.error('Failed to copy: ', err); }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white/90 font-sans p-4 md:p-8 relative overflow-x-hidden">
      {/* Mesh Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-pink-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* HEADER */}
        <div className="lg:col-span-12 mb-4">
           <h1 className="text-3xl font-bold text-white flex items-center gap-2">
             <Sparkles className="w-8 h-8 text-indigo-400" />
             CARPROGEN
           </h1>
           <p className="text-white/50 mt-1">Carousel Prompt Generator & Architect</p>
        </div>

        {/* KOLOM KIRI: INPUT FORM */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <Layout className="w-5 h-5 text-indigo-400" /> Konfigurasi Konten
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-1">Topik / Niche <span className="text-red-400">*</span></label>
              <input 
                type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Tips Keuangan..."
                className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition placeholder-white/30"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-1">Nama Produk / Brand</label>
              <input 
                type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                placeholder="Contoh: Kopi Janji Jiwa"
                className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-white/30"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-1">Deskripsi Singkat Produk</label>
              <textarea 
                value={productDesc} onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Deskripsi singkat produk yang ditawarkan..."
                className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-white/30 h-20"
              />
            </div>

            <div className="mb-4 bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
              <label className="block text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> Tujuan Konten
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {CONTENT_PURPOSES.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => handlePurposeToggle(p.id)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition text-left ${contentPurpose.includes(p.id) ? 'bg-indigo-500/50 border-indigo-400 text-indigo-100' : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {currentPurposeObjs.length > 0 && <div className="text-xs text-indigo-300 italic flex gap-1 flex-col">{currentPurposeObjs.map((p) => <div key={p.id}>• {p.desc}</div>)}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                Master Style {contentPurpose.length > 0 && <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Rekomendasi Aktif</span>}
              </label>
              <select 
                value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm"
              >
                {visibleStyles.map(s => <option key={s.id} value={s.id} className="text-black">{s.label}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                <Camera className="w-4 h-4 text-indigo-400" /> Fitur Gaya Visual (Opsional)
              </label>
              <select 
                value={selectedSubStyle} onChange={(e) => setSelectedSubStyle(e.target.value)}
                className="w-full px-4 py-2 border border-white/10 bg-indigo-500/10 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm"
              >
                {VISUAL_STYLE_OPTIONS[selectedStyle]?.map(sub => <option key={sub.id} value={sub.id} className="text-black">{sub.label}</option>)}
              </select>
            </div>

             <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Jumlah Slide</label>
                {currentStyleObj && slideCount !== currentStyleObj.idealSlides && (
                  <div className="mb-2 flex items-center gap-2 bg-amber-500/10 text-amber-300 text-xs p-2 rounded border border-amber-500/20">
                    <AlertCircle className="w-3 h-3" />
                    <span>Ideal: <strong>{currentPurposeObjs.find(p => p.idealSlideCount)?.idealSlideCount || currentStyleObj.idealSlides} Slide</strong></span>
                    <button onClick={handleSetRecommendedSlides} className="ml-auto underline font-bold hover:text-white">Set</button>
                  </div>
                )}
                <div className="flex gap-2 flex-wrap">
                  {SLIDE_COUNTS.map(count => (
                    <button key={count} onClick={() => setSlideCount(count)}
                      className={`flex-1 py-2 px-1 rounded-lg text-sm font-medium transition border border-white/10 ${slideCount === count ? 'bg-indigo-500/50 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}>
                      {count}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Rasio</label>
                <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white">
                  {RATIOS.map(r => <option key={r} value={r} className="text-black">{r}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-6 space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-indigo-400" /> Konten & Visual per Slide
                </label>
                <div className="flex bg-black/30 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setInputMode('satuan')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition ${inputMode === 'satuan' ? 'bg-indigo-500 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    Satuan
                  </button>
                  <button
                    onClick={() => setInputMode('sekaligus')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition ${inputMode === 'sekaligus' ? 'bg-indigo-500 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    Sekaligus
                  </button>
                </div>
              </div>

              {inputMode === 'satuan' ? (
                Array.from({ length: slideCount }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/10 text-white/90 font-bold px-3 py-1 rounded-lg text-sm border border-white/10">Slide {i + 1}</span>
                    </div>
                    <textarea
                      value={slideTexts[i] || ''} onChange={(e) => { const newTexts = [...slideTexts]; newTexts[i] = e.target.value; setSlideTexts(newTexts); }}
                      placeholder={`Teks untuk Slide ${i + 1}...`}
                      className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm h-16 placeholder-white/30"
                    />
                    <input
                      type="text"
                      value={slideVisuals[i] || ''} onChange={(e) => { const newVisuals = [...slideVisuals]; newVisuals[i] = e.target.value; setSlideVisuals(newVisuals); }}
                      placeholder={`Ide Visual/Gambar (Opsional)...`}
                      className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm placeholder-white/30"
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-2 relative mt-2">
                  <p className="text-xs text-white/50 mb-1">
                    Gunakan format <strong>SLIDE X</strong>, <strong>HEADLINE:</strong>, <strong>SUBTEXT:</strong>, dan <strong>VISUAL:</strong>. Jangan dicampur aduk agar teks terpisah sempurna.
                  </p>
                  <textarea
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    className="w-full h-80 p-4 text-sm text-white/90 bg-black/20 border border-white/10 rounded-lg font-mono focus:ring-2 focus:ring-indigo-500 outline-none resize-y placeholder-white/30"
                    placeholder={`SLIDE 1\nHEADLINE: Headline Anda\nSUBTEXT: Sub-headline/Teks pendukung\nVISUAL: Ide gambar...\n\nSLIDE 2\nHEADLINE: Headline slide 2\nSUBTEXT: Teks kecil\nVISUAL: Grafik...`}
                  />
                  <button
                    onClick={() => {
                      setBulkInput(Array.from({length: slideCount}).map((_, i) => `SLIDE ${i+1}\nHEADLINE: \nSUBTEXT: \nVISUAL: `).join('\n\n'));
                    }}
                    className="absolute right-3 top-[52px] text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1.5 rounded border border-white/20 transition flex items-center"
                  >
                    <RefreshCcw className="w-3 h-3 mr-1" /> Template
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                <Palette className="w-4 h-4" /> Warna / Ekstrak
              </label>
              <div className="flex gap-2 mb-2">
                <input type="text" value={colorContext} onChange={(e) => setColorContext(e.target.value)} placeholder="Hex/Nama" className="flex-1 px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white outline-none text-sm placeholder-white/30" />
                <label className="flex items-center justify-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition">
                  <Upload className="w-4 h-4 text-white/70" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              {extractedColors.length > 0 && (
                <div className="flex gap-2 mt-2 p-2 bg-white/5 rounded border border-white/10">
                  {extractedColors.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={() => setColorContext(extractedColors.join(', '))}>
                      <div className="w-8 h-8 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color }}></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-indigo-400" /> Karakter & Visual
            </h2>

            <div className="mb-6 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-start gap-3">
              <div className="p-2 bg-black/30 rounded-lg text-indigo-300 border border-white/10">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-indigo-200">Foto Produk / Profil?</label>
                  <div onClick={() => setIncludePhoto(!includePhoto)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${includePhoto ? 'bg-indigo-500' : 'bg-white/20 border border-white/10'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${includePhoto ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {!includePhoto && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-2">Tipe Karakter</label>
                <div className="flex flex-wrap gap-2">
                  {CHARACTER_TYPES.map(type => (
                    <button key={type} onClick={() => handleCharTypeToggle(type)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition ${selectedCharTypes.includes(type) ? 'bg-indigo-500/30 border-indigo-400 text-indigo-200' : 'bg-black/20 border-white/10 text-white/70 hover:bg-white/10'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!includePhoto && !selectedCharTypes.includes('Tak ada Karakter') && selectedCharTypes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-1">Gaya Faceless</label>
                <select value={selectedFacelessStyle} onChange={(e) => setSelectedFacelessStyle(e.target.value)} className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/20 text-white">
                  {FACELESS_STYLES.map(s => <option key={s} value={s} className="text-black">{s}</option>)}
                </select>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 mt-4">
              <Type className="w-5 h-5 text-white/50" />
              <label className="flex-1 text-sm font-medium text-white/80">Teks & UI Overlay?</label>
              <div onClick={() => setUseText(!useText)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${useText ? 'bg-indigo-500' : 'bg-white/20 border border-white/10'}`}>
                <div className={`bg-white w-4 h-4 rounded-full transition-transform ${useText ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>

          <button onClick={generatePrompt} className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] transition transform hover:-translate-y-1 flex justify-center items-center gap-2 border border-white/10">
            <Sparkles className="w-5 h-5" /> GENERATE PROMPT
          </button>
        </div>

        {/* KOLOM KANAN: OUTPUT */}
        <div className="lg:col-span-7 space-y-6">
          {generatedResult ? (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 p-6 mb-6">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">A. Ringkasan Proyek</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="block text-white/50 text-xs">Topik</span><span className="font-semibold text-white/90">{generatedResult.summary.topic}</span></div>
                  <div><span className="block text-white/50 text-xs">Tujuan</span><span className="font-semibold text-indigo-400">{generatedResult.summary.purpose}</span></div>
                  {generatedResult.summary.productName && (
                    <div className="col-span-2"><span className="block text-white/50 text-xs">Nama Produk / Brand</span><span className="font-semibold text-white/90">{generatedResult.summary.productName}</span></div>
                  )}
                  {generatedResult.summary.productDesc && (
                    <div className="col-span-2"><span className="block text-white/50 text-xs">Deskripsi Produk</span><span className="font-semibold text-white/90 text-sm">{generatedResult.summary.productDesc}</span></div>
                  )}
                  <div><span className="block text-white/50 text-xs">Gaya Visual</span><span className="font-semibold text-white/90">{generatedResult.summary.style}</span></div>
                  <div><span className="block text-white/50 text-xs">Sub-Style</span><span className="font-semibold text-indigo-400">{generatedResult.summary.subStyle}</span></div>
                  <div><span className="block text-white/50 text-xs">Slide</span><span className="font-semibold text-white/90">{generatedResult.summary.slideCount} Slide</span></div>
                </div>
              </div>

              {/* D. AI VISUAL CHARACTER RECOMMENDATION */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-800/10 backdrop-blur-xl rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.1)] border border-indigo-500/30 overflow-hidden mb-6">
                <div className="bg-indigo-500/20 px-6 py-4 border-b border-indigo-500/30 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> B. AI Visual & Character Recommendation
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs text-indigo-400 mb-1 font-bold">1. RECOMMENDED CHARACTER STYLE</h4>
                    <p className="text-white font-semibold text-lg">{generatedResult.recommendation.style}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-indigo-400 mb-1 font-bold">2. VISUAL DESCRIPTION</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{generatedResult.recommendation.description}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-indigo-400 mb-1 font-bold">3. EMOTIONAL ATMOSPHERE</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{generatedResult.recommendation.atmosphere}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-indigo-400 mb-1 font-bold">4. LIGHTING STYLE</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{generatedResult.recommendation.lighting}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-indigo-400 mb-1 font-bold">5. COLOR PSYCHOLOGY</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{generatedResult.colorRecommendation}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-indigo-400 mb-1 font-bold">6. SYMBOLIC OBJECT</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{generatedResult.recommendation.symbolicObject}</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 overflow-hidden mb-6">
                <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">C. Prompt Desain</h3>
                </div>
                <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                  {generatedResult.prompts.map((slide, idx) => (
                    <div key={idx} className="p-6 hover:bg-white/5 transition relative group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded border border-indigo-500/30">{slide.label}</span>
                        <button onClick={() => copyToClipboard(slide.text, idx)} className="text-white/60 hover:text-white transition flex items-center gap-1 text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                          {copiedIndex === idx ? <CheckCircle className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          {copiedIndex === idx ? 'Disalin' : 'Salin'}
                        </button>
                      </div>
                      <p className="text-sm text-purple-300/80 font-mono leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5 whitespace-pre-wrap select-all">
                        {slide.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider flex items-center gap-2"><AlignLeft className="w-4 h-4 text-indigo-400" /> D. Caption & Hashtag</h3>
                  <button onClick={() => copyToClipboard(generatedResult.caption, 'caption')} className="text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm bg-white/10 text-white/90 hover:bg-white/20 border border-white/20 flex items-center gap-1">
                    {captionCopied ? <CheckCircle className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {captionCopied ? 'Tersalin' : 'Salin Semua'}
                  </button>
                </div>
                <div className="p-6">
                  <textarea readOnly value={generatedResult.caption} className="w-full h-48 p-4 text-sm text-white/80 bg-black/20 border border-white/10 rounded-lg font-sans leading-relaxed outline-none resize-none" />
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-white/40 border-2 border-dashed border-white/20 rounded-xl bg-white/5">
              <Layout className="w-16 h-16 mb-4 opacity-30" />
              <p className="font-medium">Prompt belum dihasilkan</p>
              <p className="text-sm">Isi formulir di sebelah kiri untuk memulai.</p>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold text-white/80 flex items-center gap-2"><History className="w-4 h-4" /> 10 Riwayat Terakhir</h3>
                <button onClick={() => {
                  setHistory([]);
                  try { localStorage.removeItem('prompt_history'); } catch(e) {}
                }} className="text-red-400 hover:text-red-300 text-xs font-medium flex items-center gap-1 transition-colors">
                  <Trash2 className="w-3 h-3" /> Hapus Riwayat
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {history.map((item) => (
                  <div key={item.id} className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center text-sm hover:border-indigo-500/50 hover:bg-white/10 transition cursor-pointer" onClick={() => setGeneratedResult(item)}>
                    <div><span className="font-semibold text-white/90 block">{item.summary.topic}</span><span className="text-white/50 text-xs">{item.date} • {item.summary.purpose}</span></div>
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">Load</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
