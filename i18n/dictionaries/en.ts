/**
 * English interface copy. `{braces}` mark the accent words that render in
 * the orange italic serif (see components/ui/Accent.tsx).
 *
 * Lines marked ✏️ are placeholders written for you to replace with your
 * own words — keep ar.ts in step when you edit them.
 */
const en = {
  meta: {
    title: "Web Developer — Digital Experiences",
    description:
      "Portfolio of a web developer building modern, high-performance websites that combine thoughtful design, smooth interactions, and powerful technology.",
  },
  skipToContent: "Skip to content",

  nav: {
    label: "Main",
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    cta: "Let's Work Together",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Navigation",
    switchLanguage: "Switch language to",
    sayHello: "Say hello",
  },

  hero: {
    available: "Available for new projects",
    unavailable: "Booked — new projects soon",
    titleLines: ["Turning Ideas", "Into {Digital}", "Experiences."],
    lead: "I build modern, high-performance websites that combine thoughtful design, smooth interactions, and powerful technology.",
    primaryCta: "Explore My Work",
    secondaryCta: "Let's Talk",
    scroll: "Scroll",
    portraitAlt: "Illustrated portrait of {name}",
    stamp: "Web Developer ✦ Creative Coder ✦ ",
    outline: "Developer",
    index: "Portfolio",
  },

  marquee: ["Design", "Develop", "Deploy", "Performance", "Accessibility", "Motion", "Details"],

  about: {
    label: "About",
    titleLines: ["More Than Just", "Writing {Code.}"],
    // ✏️ Your introduction.
    intro:
      "I'm {firstName} — a web developer who enjoys transforming ideas into visually engaging, functional digital experiences.",
    blocks: [
      {
        label: "Background",
        // ✏️ Your professional background.
        text: "Add your story here: where you started, what you have worked on, and the kind of projects you focus on today.",
      },
      {
        label: "Approach",
        // ✏️ Your approach to development.
        text: "I treat every website as a product, not a page. I start from what it needs to achieve, design the experience around it, then build it to be fast, accessible, and easy to grow.",
      },
      {
        label: "Philosophy",
        // ✏️ Your working philosophy.
        text: "Good work is a conversation. I keep clients close to the process, explain the trade-offs, and sweat the small details people feel but rarely notice.",
      },
    ],
    principles: [
      { title: "Crafted, not templated", text: "Every interface starts from your idea, not from a theme." },
      { title: "Performance is a feature", text: "Fast loading and smooth motion are part of the design." },
      { title: "Details carry the feeling", text: "Spacing, timing, and type are where quality shows." },
    ],
    quote: "I don't just build websites. I create {digital experiences.}",
    portraitCaption: "The person behind the pixels",
  },

  work: {
    label: "Selected Works",
    titleLines: ["Selected", "{Works.}"],
    lead: "Digital experiences built with purpose, precision, and personality.",
    countLabel: "Projects",
    sample: "Sample",
    sampleNote: "Projects marked “Sample” are placeholders used to preview this layout — they are not real client work.",
    view: "View",
    live: "Live site",
    code: "Code",
    caseStudy: "Case study",
    details: "Project details",
    moreTitle: "More Projects",
    empty: "New work is on the way — check back soon.",
  },

  project: {
    back: "All works",
    overviewLabel: "Overview",
    challenge: "The Challenge",
    approach: "The Approach",
    outcome: "The Outcome",
    role: "Role",
    year: "Year",
    category: "Category",
    stack: "Stack",
    links: "Links",
    gallery: "Gallery",
    next: "Next project",
    visit: "Visit website",
    sampleBanner:
      "This is a sample project used to preview the case-study layout. Its name, content, and images are placeholders, not real client work.",
    of: "of",
  },

  skills: {
    label: "Toolkit",
    titleLines: ["Tools I", "Build {With.}"],
    lead: "A periodic table of the technologies I reach for, grouped by where they live in a project. No made-up percentages, just the stack.",
    categories: {
      frontend: { name: "Frontend Development", blurb: "Interfaces, motion, and everything the visitor touches." },
      backend: { name: "Backend Development", blurb: "APIs, server logic, and the plumbing behind the scenes." },
      databases: { name: "Databases", blurb: "Where content and data live, safely and fast." },
      tools: { name: "Design & Tools", blurb: "From the first sketch to the final deploy." },
    },
  },

  process: {
    label: "Process",
    titleLines: ["How Ideas", "Become {Real.}"],
    lead: "A clear, collaborative path from the first conversation to launch day — and beyond.",
    steps: [
      {
        title: "Discover",
        text: "Understanding the idea and requirements: goals, audience, content, and what success looks like.",
        items: ["Goals & audience", "Scope & priorities", "Content plan"],
      },
      {
        title: "Design",
        text: "Building the visual direction and user experience, from structure and flows to type, colour, and motion.",
        items: ["Visual direction", "User flows", "Responsive layouts"],
      },
      {
        title: "Develop",
        text: "Turning designs into responsive, functional websites with clean, maintainable code.",
        items: ["Component system", "Interactions", "CMS & integrations"],
      },
      {
        title: "Launch",
        text: "Testing, optimizing, and deploying the final experience — then making sure it stays fast.",
        items: ["QA & accessibility", "Performance & SEO", "Deployment"],
      },
    ],
  },

  contact: {
    label: "Contact",
    titleLines: ["Have an Idea?", "Let's Build", "Something {Great.}"],
    lead: "Tell me about your project, timeline, and goals. I'll get back to you with next steps.",
    direct: "Prefer a direct line?",
    channels: {
      email: "Email",
      whatsapp: "WhatsApp",
      phone: "Phone",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    copy: "Copy email",
    copied: "Copied!",
    form: {
      title: "Start a project",
      name: "Your name",
      namePlaceholder: "Jane Doe",
      email: "Email address",
      emailPlaceholder: "jane@company.com",
      type: "What do you need?",
      types: ["Website", "Web app", "E-commerce", "Landing page", "Something else"],
      message: "Project details",
      messagePlaceholder: "A few lines about the idea, goals, and timeline…",
      submit: "Send message",
      submitMail: "Continue in email app",
      sending: "Sending…",
      mailNote: "This opens your email app with the message ready — nothing is stored on this site.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Please add a little more detail (at least 20 characters).",
        summary: "Please fix the highlighted fields.",
      },
      success: {
        title: "Message sent.",
        text: "Thank you! I'll reply as soon as I can.",
      },
      mailSuccess: {
        title: "Your email app should be open.",
        text: "Your message is ready to send. If nothing opened, email me directly at {email}.",
      },
      failure: {
        title: "That didn't go through.",
        text: "Something went wrong while sending. Please try again, or email me directly at {email}.",
      },
      again: "Send another message",
      retry: "Try again",
    },
  },

  footer: {
    statement: "Crafted line by line — with intention.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    navLabel: "Footer",
    social: "Elsewhere",
    menu: "Menu",
  },

  notFound: {
    title: "Lost in the {void.}",
    text: "This page doesn't exist — or it moved somewhere better.",
    back: "Back to home",
  },
};

export type Dictionary = typeof en;
export default en;
