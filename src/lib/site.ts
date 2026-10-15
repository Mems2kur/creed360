// ─── All website copy in one place (from "Creed 360 Complete Website Copy") ──
// Edit text here and every page that uses it updates.

export const SITE = {
  name: "Creed 360 Limited",
  short: "Creed 360",
  rc: "RC 7649484",
  tagline: "Seamless. Smart. Innovative.",
  trust: "We verify before you buy or build.",
  promise: "Clarity before commitment.",
  phone: "+234 808 001 0001",
  phoneHref: "tel:+2348080010001",
  whatsapp: "https://wa.me/2348080010001",
  email: "creed360ltd@gmail.com",
  address: "No. 4 Chukwudi Okoro Street, UE Sangotedo, Eti-Osa LGA, Lagos",
  credentials: "Creed 360 Limited · RC 7649484 · Registered Surveying & Geospatial Intelligence · Lagos",
  positioning: "Property Search & Advisory · Verification · Surveying · Geospatial Intelligence",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/palmora-roots", label: "Palmora Roots" },
];

export const PILLARS = [
  { title: "Find", body: "Discover property opportunities that align with your needs, budget and goals." },
  { title: "Verify", body: "Check the relevant property, documentation, location and spatial information before you commit." },
  { title: "Understand", body: "Turn technical and property information into clear, useful insight." },
  { title: "Decide", body: "Move forward with greater clarity and confidence." },
];

export const SERVICES = [
  {
    slug: "property-search",
    title: "Property Search & Advisory",
    lead: "Find the right property. Start with the right information.",
    body: "We help you identify suitable houses and land based on your budget, location and goals. Our guidance is tailored to your preferred way of buying — whether outright, through a payment plan, or via mortgage.",
    cta: "Explore Property Search",
    href: "/properties",
  },
  {
    slug: "verification",
    title: "Property Verification",
    lead: "Know what you’re buying before you commit.",
    body: "We conduct relevant checks on ownership claims, documentation, location and title status to help you understand the property before making a commitment.",
    cta: "Book a Verification",
    href: "/book-verification?service=Property%20Verification",
  },
  {
    slug: "surveying",
    title: "Professional Surveying & Geospatial Intelligence",
    lead: "See property differently.",
    body: "Registered surveying and spatial analysis help confirm boundaries, dimensions and accurate land information — giving you technical insight for better property decisions.",
    cta: "Request a Survey",
    href: "/book-verification?service=Surveying%20%26%20Geospatial%20Intelligence",
  },
  {
    slug: "purchase-support",
    title: "Purchase Support",
    lead: "The right property. The right way to acquire it.",
    body: "We provide practical guidance across different property acquisition options, including:",
    bullets: ["Outright purchase", "Developer payment plans", "Mortgage and government-backed schemes"],
    cta: "Talk to an Advisor",
    href: "/book-verification?service=Purchase%20Support",
  },
  {
    slug: "development-support",
    title: "Development Support",
    lead: "Build with better information from the start.",
    body: "We provide technical and advisory support from initial property assessment through planning and delivery for clients who are building.",
    cta: "Discuss Your Project",
    href: "/book-verification?service=Development%20Support",
  },
  {
    slug: "structured-investments",
    title: "Structured Investments — Palmora Roots",
    lead: "Land that works twice.",
    body: "Verified land-based agricultural opportunities underpinned by the same verification, surveying and advisory standards.",
    cta: "Explore Palmora Roots",
    href: "/palmora-roots",
  },
];

export const VERIFY_STEPS = [
  { title: "Property", lead: "Understand what is being offered.", body: "We begin by establishing what property is being presented and what you are being asked to acquire." },
  { title: "Location", lead: "Confirm where it actually is.", body: "We examine the location and relevant spatial information associated with the property." },
  { title: "Documentation", lead: "Review the information behind the ownership claim.", body: "Relevant ownership and title documentation is reviewed as part of the verification process." },
  { title: "Survey", lead: "Understand the land accurately.", body: "Where applicable, surveying helps establish boundaries, dimensions and accurate land information." },
  { title: "Advisory", lead: "Understand what the findings mean.", body: "We translate relevant findings into clear guidance shaped around your objective." },
  { title: "Decision", lead: "Move forward with better information.", body: "The goal is simple: help you understand what you are considering before deciding your next step." },
];

export const DISCLAIMER =
  "Verification improves the quality of information available to you. It does not constitute a guarantee of ownership or the elimination of every possible property risk.";

export const FIELD_CAPTIONS = ["Field inspection", "Boundary confirmation", "Surveying", "Spatial analysis", "Site assessment"];

export const SMART_POINTS = [
  { title: "Data", body: "Relevant property and documentation information." },
  { title: "Location", body: "Accurate spatial and site information." },
  { title: "Insight", body: "Professional interpretation that helps you understand the bigger picture." },
];

export const WHY_POINTS = [
  { title: "Verification-first", body: "We encourage clients to understand the property before commitment." },
  { title: "Technical expertise", body: "Professional surveying and geospatial intelligence support our work." },
  { title: "Field-based", body: "We understand that property must be examined beyond paperwork." },
  { title: "Advisory-led", body: "We help translate information into practical guidance." },
  { title: "Technology-driven", body: "We use spatial information and data to support clearer property decisions." },
  { title: "Client-focused", body: "We begin with your objective and tailor our guidance around it." },
];

export const TEAM = {
  lead: {
    name: "Mr. E. E Henry (Surv.)",
    title: "Founder & Lead Advisor",
    profile:
      "Henry leads Creed 360’s property verification, advisory and structured investment work. With hands-on experience across Lagos real estate transactions, he oversees client engagements from initial review through to final recommendation.",
  },
  technical: {
    title: "Technical Team",
    lead: "Registered surveyors and geospatial professionals based in Lagos.",
    body: "They handle fieldwork, boundary confirmation, survey validation and spatial intelligence that underpin every verified recommendation.",
  },
};

export const RESULTS = [
  {
    name: "Adaeze O.",
    role: "Land Buyer, Epe",
    summary: "On-site boundary confirmation revealed a significant discrepancy with the seller’s survey plan before any payment was made.",
    outcome: "Adaeze avoided a costly mistake.",
    quote: "Creed 360 confirmed the boundary was wrong before we signed anything. That single check changed our decision.",
  },
  {
    name: "Tunde F.",
    role: "Developer, Lekki",
    summary: "Professional survey and site report provided the contractor with accurate boundaries and dimensions, allowing construction to start correctly and reducing later dispute risk.",
    quote: "The survey and site report gave our contractor everything needed to start on the right footing.",
  },
  {
    name: "Grace N.",
    role: "Palmora Roots Investor",
    summary: "Full verification of land documentation, spatial checks and a site inspection gave clear visibility into what was being verified and how the project is managed.",
    quote: "I invested in Palmora Roots knowing exactly what was being verified and managed. That clarity mattered.",
  },
];

export const FAQS = [
  { q: "What does property verification involve?", a: "Property verification involves relevant checks around the property, documentation, location and other applicable information to help you make a better-informed decision." },
  { q: "Can Creed 360 verify a property before I make payment?", a: "Yes. Verification can be undertaken before commitment, subject to the scope of the engagement." },
  { q: "Can you help me find a property?", a: "Yes. Our Property Search & Advisory service helps clients identify suitable houses and land based on their needs, budget, location and objectives." },
  { q: "Do you provide surveying services?", a: "Yes. Creed 360 provides professional surveying and geospatial intelligence services." },
  { q: "Can you verify land bought from another developer or agent?", a: "Yes. You can engage Creed 360 to review and verify relevant information about a property you are considering." },
  { q: "What happens after verification?", a: "We help you understand the relevant findings and provide guidance shaped around your objective." },
  { q: "Does verification guarantee ownership?", a: "No. Verification improves the quality of information available to you. It does not constitute a guarantee of ownership or the elimination of every possible property risk." },
];

export const PALMORA = {
  eyebrow: "A Creed 360 Structured Investment",
  heading: "Land That Works Twice.",
  sub: "Best of Rural Luxury, Rooted in African Soil.",
  body: "Palmora Roots is a premium agrotourism estate in Kobape, Ogun State, evolving from a productive oil palm estate into a destination where land, agriculture and lifestyle come together.",
  idea: "Own the Land. Grow the Wealth. Harvest the Future.",
  supporting: "A place where land can hold value while creating value through agricultural productivity and a developing lifestyle experience.",
  legacy: "Rooted in Africa. Built for generations.",
  packages: [
    { name: "Agro ½ Acre", trees: 30, price: 2_500_000, deposit: 500_000 },
    { name: "Agro 1 Acre", trees: 60, price: 4_500_000, deposit: 750_000 },
    { name: "Agro 1 Hectare", trees: 145, price: 9_000_000, deposit: 1_500_000 },
  ],
};
