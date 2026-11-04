# Akram Ayman — Portfolio

Bilingual (English / Arabic RTL) developer portfolio built with Next.js 16, React 19, Tailwind CSS 4 and Motion.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run build      # production build
npm run lint
npm run typecheck
```

## Where to edit

| What | File |
| --- | --- |
| Name, role, email, WhatsApp, phone, LinkedIn, GitHub, availability, portrait | `config/site.ts` |
| Projects (Selected Works + case-study pages + sitemap) | `data/projects.ts` |
| Skills & technologies | `data/skills.ts` |
| All interface copy, About text, process steps | `i18n/dictionaries/en.ts` and `ar.ts` |
| Colours, fonts, animation tokens | `app/globals.css` |

Lines marked ✏️ in those files are placeholders written for you to replace.

## Adding a project

1. Put screenshots in `public/images/projects/<slug>/` (16:10 works best, e.g. 1600×1000).
2. Add one object to the `projects` array in `data/projects.ts`:

```ts
{
  id: "my-site",
  slug: "my-site",                       // → /en/work/my-site
  title: "My Site",
  category: { en: "E-commerce", ar: "متجر إلكتروني" },
  description: { en: "One or two sentences.", ar: "جملة أو جملتان." },
  coverImage: "/images/projects/my-site/cover.png",
  galleryImages: ["/images/projects/my-site/home.png"], // optional
  technologies: ["Next.js", "Tailwind CSS"],
  liveUrl: "https://my-site.com",        // optional
  githubUrl: "https://github.com/me/my-site", // optional
  featured: true,                        // large editorial row
  displayOrder: 1,
  caseStudy: { overview: "...", challenge: "...", approach: "...", outcome: "..." }, // optional
}
```

Any optional field can be left out — the layout adapts. To remove a project, delete its object and its image folder. `featured: true` projects get the large alternating rows; the rest fill the offset grid below them. Mark placeholder content with `sample: true` to show a "Sample" badge and keep it out of search engines.

## Contact form

Without configuration the form validates the message and then opens the visitor's email app with everything pre-filled (nothing is faked or stored). To receive submissions directly, set `NEXT_PUBLIC_CONTACT_ENDPOINT` (see `.env.example`) to any endpoint that accepts a JSON POST of `{ name, email, projectType, message, locale }`.

## Languages

Every page lives under `/en` or `/ar`. `proxy.ts` sends unprefixed URLs to the visitor's saved language (the `NEXT_LOCALE` cookie set by the switcher) or English.
