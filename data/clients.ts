import clientsData from "./clients.json";

type ServiceDetail = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

type IntroStat = {
  value: string;
  label: string;
};

type FullBleed = {
  label: string;
  quote: string;
  imageIndex: number;
};

export type Client = {
  id: number;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  accentColor: string;
  column: "left" | "right";
  year: string;
  tagline: string;
  brief: string;
  stat: string;
  statLabel: string;
  services: string[];
  process: {
    number: string;
    title: string;
    description: string;
  }[];
  images: {
    src: string;
    alt: string;
  }[];
  metrics: {
    icon: string;
    value: number;
    label: string;
    suffix?: string;
    decimals?: number;
  }[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  introStatement: string;
  introStat: IntroStat;
  briefHeading: string;
  briefParagraphs: string[];
  servicesDetailed: ServiceDetail[];
  fullBleed: FullBleed;
  imageStackCaption: string;
  imageStackIndex: string;
  processHeading: string;
  photoGridLabel: string;
  photoGridNote: string;
};

const clientPageContent: Record<
  string,
  Omit<
    Client,
    | "id"
    | "slug"
    | "name"
    | "description"
    | "tags"
    | "accentColor"
    | "column"
    | "year"
    | "tagline"
    | "brief"
    | "stat"
    | "statLabel"
    | "services"
    | "process"
    | "images"
    | "metrics"
    | "testimonial"
  >
> = {
  noize: {
    introStatement:
      "We took a name on a napkin and turned it into a brand that sells out in minutes.",
    introStat: {
      value: "47",
      label: "Logo concepts explored",
    },
    briefHeading: "A brand with no rules, built for people who make them.",
    briefParagraphs: [
      "Noize came to us as a collective of musicians and creatives with a clear vision: build a brand that their community would wear with pride. Not just a logo. A movement. We spent three weeks embedded with the team - attending gigs, listening sessions, and visiting studios - before we touched a single design tool.",
      "The strategy that emerged was simple: Noize should feel like it was made by the community, not for them. The visual language had to live equally on a vinyl sleeve, a hoodie, a phone screen, and a billboard. Every element had to earn its place.",
      "What followed was 47 logo concepts, three rounds of refinement with the full Noize crew, and one final mark that the founding members reportedly tattooed on launch day. We will not confirm or deny.",
    ],
    servicesDetailed: [
      {
        number: "01",
        title: "Wordmark & Symbol Design",
        description: "A custom letterform system built to scale from 16px favicon to 10ft mural.",
        icon: "N",
      },
      {
        number: "02",
        title: "Brand Guidelines",
        description: "120-page document covering voice, color, type, photography, and motion.",
        icon: "G",
      },
      {
        number: "03",
        title: "Apparel Packaging",
        description: "Hangtags, boxes, tissue paper, and sticker sheets - all brand coherent.",
        icon: "P",
      },
      {
        number: "04",
        title: "E-commerce Platform",
        description: "Custom Shopify theme built from brand system. Zero templates used.",
        icon: "W",
      },
      {
        number: "05",
        title: "Campaign Motion",
        description: "Social-first motion graphics for launch campaign across four platforms.",
        icon: "M",
      },
      {
        number: "06",
        title: "Design System",
        description: "Component library handed to the internal team for ongoing use.",
        icon: "D",
      },
    ],
    fullBleed: {
      label: "Launch Campaign",
      quote: "The night we launched, we sold out in 4 minutes.",
      imageIndex: 0,
    },
    imageStackCaption: "Project photography - 2023",
    imageStackIndex: "01 - 04",
    processHeading: "How we got there.",
    photoGridLabel: "More from the Noize universe",
    photoGridNote: "Streetwear texture, venue energy, and product atmosphere built into one visual system.",
  },
  "tattoo-collective": {
    introStatement:
      "We made the studio feel as personal online as it does in the chair.",
    introStat: {
      value: "24",
      label: "Artists unified on one platform",
    },
    briefHeading: "An online studio that respects the craft before the software.",
    briefParagraphs: [
      "Tattoo Collective brought together twenty four sought-after artists, but the booking experience still depended on scattered DMs, email chains, and manually updated calendars. The work felt premium. The administration did not.",
      "We treated the product like an extension of the studio itself: intimate, atmospheric, highly personal, and never louder than the art. Portfolio storytelling came first. Admin became invisible. Clients could finally browse, trust, and commit without friction.",
      "The launch changed the studio rhythm immediately. Artists had clearer schedules, clients had confidence in the process, and the platform became a new part of the brand - not just a utility tucked behind it.",
    ],
    servicesDetailed: [
      {
        number: "01",
        title: "Research & Journey Mapping",
        description: "Mapped every friction point from discovery to confirmed session across artists and clients.",
        icon: "R",
      },
      {
        number: "02",
        title: "Artist Portfolio System",
        description: "A modular showcase structure that lets each artist feel distinct without breaking cohesion.",
        icon: "A",
      },
      {
        number: "03",
        title: "Booking Platform",
        description: "Availability, deposits, and scheduling designed to feel precise, not clinical.",
        icon: "B",
      },
      {
        number: "04",
        title: "Client Profiles",
        description: "History, preferences, and references surfaced at the right moment for smoother bookings.",
        icon: "C",
      },
      {
        number: "05",
        title: "Studio Identity",
        description: "A digital expression of the studio atmosphere, rooted in craft and quiet confidence.",
        icon: "I",
      },
      {
        number: "06",
        title: "Mobile-first Web App",
        description: "Built for clients who discover an artist on social and book from their phone immediately.",
        icon: "M",
      },
    ],
    fullBleed: {
      label: "Studio Atmosphere",
      quote: "The platform feels like the studio sounds: calm, focused, and unmistakably ours.",
      imageIndex: 2,
    },
    imageStackCaption: "Studio documentation - Cape Town",
    imageStackIndex: "01 - 04",
    processHeading: "How we shaped the studio online.",
    photoGridLabel: "Inside the craft",
    photoGridNote: "Material detail, artist energy, and the quiet rituals around every appointment.",
  },
  "company-one": {
    introStatement:
      "Trust is not copy. It is interface discipline made visible at every step.",
    introStat: {
      value: "200+",
      label: "Reusable components shipped",
    },
    briefHeading: "A banking dashboard that earns belief before the first tap.",
    briefParagraphs: [
      "Company One was entering a crowded market with strong investors, serious product ambition, and a trust problem every fintech faces at launch. The experience had to look established before the brand actually was.",
      "We focused on hierarchy, rhythm, and restraint. Every screen needed to feel exacting without becoming sterile. Dense information became readable through spacing, stronger grouping, and a component system designed around confidence.",
      "The final product shipped with a visual language that felt both immediate and scalable. It helped the product team move faster internally while reassuring users that their money was in careful hands.",
    ],
    servicesDetailed: [
      {
        number: "01",
        title: "Product Design",
        description: "End-to-end flows for onboarding, account management, transfers, and investment touchpoints.",
        icon: "P",
      },
      {
        number: "02",
        title: "Design System",
        description: "A disciplined component library built to keep data-heavy screens calm and consistent.",
        icon: "S",
      },
      {
        number: "03",
        title: "Data Visualisation",
        description: "Charts and summaries tuned for speed of comprehension under real financial pressure.",
        icon: "D",
      },
      {
        number: "04",
        title: "Onboarding Flow",
        description: "Trust-building first-run experience that reduces hesitation and accelerates completion.",
        icon: "O",
      },
      {
        number: "05",
        title: "Theme Modes",
        description: "Dark and light presentation tuned for both premium feel and long-session usability.",
        icon: "T",
      },
      {
        number: "06",
        title: "Accessibility QA",
        description: "Contrast, keyboard, and assistive-support standards baked in from system level upward.",
        icon: "A",
      },
    ],
    fullBleed: {
      label: "Product Launch",
      quote: "The interface needed to feel proven on day one. That was the design brief in one sentence.",
      imageIndex: 2,
    },
    imageStackCaption: "Product stills - launch cycle",
    imageStackIndex: "01 - 04",
    processHeading: "How trust became the interface.",
    photoGridLabel: "Data, product, precision",
    photoGridNote: "Each image supports the sense of clarity, confidence, and financial fluency behind the product.",
  },
  "company-two": {
    introStatement:
      "We turned property search from a chore into a calm, high-intent ritual.",
    introStat: {
      value: "61%",
      label: "Search-to-enquiry drop-off reduced",
    },
    briefHeading: "A real estate experience that sells the feeling, not just the floorplan.",
    briefParagraphs: [
      "Company Two came to us with a familiar platform problem: users wanted to browse aspirational homes, but the product experience made that feel transactional, fragmented, and strangely exhausting.",
      "We restructured the journey around emotional momentum. Search became simpler, filters became more human, and listings finally had space to create desire before demanding action. Maps, saved homes, and enquiry states all worked together instead of competing.",
      "The result made buyers stay longer and act sooner. The platform felt premium without becoming precious, and practical without ever feeling cold.",
    ],
    servicesDetailed: [
      {
        number: "01",
        title: "Buyer Research",
        description: "Persona and journey work focused on where confidence disappeared in the property search flow.",
        icon: "R",
      },
      {
        number: "02",
        title: "Search & Filters",
        description: "Criteria and sorting rebuilt around real decision habits, not legacy CMS constraints.",
        icon: "F",
      },
      {
        number: "03",
        title: "Map Experience",
        description: "A more usable geographic layer that keeps search context visible while exploring listings.",
        icon: "M",
      },
      {
        number: "04",
        title: "Listing Design",
        description: "Detail pages built to balance emotional imagery with practical next-step information.",
        icon: "L",
      },
      {
        number: "05",
        title: "Saved Homes",
        description: "Comparison and revisit patterns designed for buyers making careful long-cycle decisions.",
        icon: "S",
      },
      {
        number: "06",
        title: "Agent Contact Flow",
        description: "Enquiry states and forms streamlined to reduce hesitation at the moment of intent.",
        icon: "C",
      },
    ],
    fullBleed: {
      label: "Premium discovery",
      quote: "Good real-estate UX makes the decision feel calmer before it makes it faster.",
      imageIndex: 0,
    },
    imageStackCaption: "Location and lifestyle imagery",
    imageStackIndex: "01 - 04",
    processHeading: "How we rebuilt the search experience.",
    photoGridLabel: "Living inside the platform",
    photoGridNote: "Architecture, interiors, and the premium atmosphere that shaped every interaction choice.",
  },
  "company-three": {
    introStatement:
      "We reduced anxiety before we reduced clicks, and that changed everything.",
    introStat: {
      value: "14 to 4",
      label: "Minutes trimmed from patient onboarding",
    },
    briefHeading: "A healthcare product designed to feel calm before it feels clever.",
    briefParagraphs: [
      "Healthcare journeys break when the interface ignores emotional context. Company Three needed to simplify booking, records, and communication, but the deeper challenge was helping patients feel supported while they used the system.",
      "We designed the product around reassurance. Language softened. Priority states became clearer. Accessibility moved from a checklist to a design principle. Every flow was tuned to reduce cognitive load and create steadier momentum.",
      "The final product did not just perform better. It felt better. That distinction mattered to patients, staff, and stakeholders in equal measure.",
    ],
    servicesDetailed: [
      {
        number: "01",
        title: "Journey Mapping",
        description: "Patient and staff pathways mapped end to end to expose hidden anxiety points in the service flow.",
        icon: "J",
      },
      {
        number: "02",
        title: "Booking Experience",
        description: "Appointments redesigned around clarity, reassurance, and lower effort at each step.",
        icon: "B",
      },
      {
        number: "03",
        title: "Records Access",
        description: "Health information structured to feel navigable and understandable without losing rigor.",
        icon: "R",
      },
      {
        number: "04",
        title: "Accessibility QA",
        description: "Contrast, focus, semantics, and support patterns tested against real accessibility requirements.",
        icon: "A",
      },
      {
        number: "05",
        title: "Notification Design",
        description: "Reminder and status systems designed to be calm, useful, and never alarming without reason.",
        icon: "N",
      },
      {
        number: "06",
        title: "Usability Testing",
        description: "Iterative validation with staff and patients to tune the emotional feel as much as task speed.",
        icon: "U",
      },
    ],
    fullBleed: {
      label: "Care journey",
      quote: "The best healthcare interfaces make people feel looked after before they even meet a person.",
      imageIndex: 3,
    },
    imageStackCaption: "Care, clarity, and reassurance",
    imageStackIndex: "01 - 04",
    processHeading: "How we made care feel calmer.",
    photoGridLabel: "Moments of care",
    photoGridNote: "Bright clinical calm, human warmth, and tools designed to lower stress at every stage.",
  },
  "company-four": {
    introStatement:
      "We rebuilt momentum into the product, so learning finally felt alive again.",
    introStat: {
      value: "2.1x",
      label: "Daily active usage after relaunch",
    },
    briefHeading: "A learning platform designed for progress you can actually feel.",
    briefParagraphs: [
      "Company Four asked a brutally honest question: why were students paying for courses and then disappearing? The answer was not content quality. It was product energy - or rather, the lack of it.",
      "We redesigned the platform around motivation. Progress became visible. Course architecture became lighter. Reward patterns, milestones, and content rhythm worked together to keep learners moving forward without turning the experience into a game for its own sake.",
      "The relaunch proved the hypothesis quickly. Students returned more often, stayed longer, and completed more. The platform finally behaved like it wanted them to succeed.",
    ],
    servicesDetailed: [
      {
        number: "01",
        title: "Learning Experience UX",
        description: "Core course journeys rebuilt around attention, reward, and reduced drop-off.",
        icon: "L",
      },
      {
        number: "02",
        title: "Course Card System",
        description: "A modular visual system that makes content variety feel exciting instead of overwhelming.",
        icon: "C",
      },
      {
        number: "03",
        title: "Progress Tracking",
        description: "Milestones and momentum states designed to make advancement legible at a glance.",
        icon: "P",
      },
      {
        number: "04",
        title: "Gamification Patterns",
        description: "Motivational interactions that support learning discipline without cheapening the product.",
        icon: "G",
      },
      {
        number: "05",
        title: "Brand Refresh",
        description: "A brighter, bolder visual tone aligned with a more encouraging learning culture.",
        icon: "B",
      },
      {
        number: "06",
        title: "Content Design",
        description: "Microcopy and structural guidance that keeps learners moving instead of second-guessing.",
        icon: "D",
      },
    ],
    fullBleed: {
      label: "Learning momentum",
      quote: "The redesign did not just look better. It made students come back tomorrow.",
      imageIndex: 0,
    },
    imageStackCaption: "Classroom energy and study rituals",
    imageStackIndex: "01 - 04",
    processHeading: "How we made learning stick.",
    photoGridLabel: "Motivation, visualized",
    photoGridNote: "Collaboration, study environments, and the emotional cues that keep a learner engaged.",
  },
};

export const clients = (clientsData as Omit<
  Client,
  | "introStatement"
  | "introStat"
  | "briefHeading"
  | "briefParagraphs"
  | "servicesDetailed"
  | "fullBleed"
  | "imageStackCaption"
  | "imageStackIndex"
  | "processHeading"
  | "photoGridLabel"
  | "photoGridNote"
>[]).map((client) => ({
  ...client,
  ...clientPageContent[client.slug],
})) as Client[];

export function getClientBySlug(slug: string) {
  return clients.find((client) => client.slug === slug);
}

export function getNextClient(slug: string) {
  const index = clients.findIndex((client) => client.slug === slug);

  if (index === -1) {
    return undefined;
  }

  return clients[(index + 1) % clients.length];
}
