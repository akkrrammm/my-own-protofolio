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
| Site URL (canonical, hreflang, sitemap, robots, JSON-LD) | `NEXT_PUBLIC_SITE_URL` — defaults to `https://my-own-protofolio.vercel.app` |
| Social card (Open Graph / Twitter), 1200×630 | `public/og-image.png` — replace the file to change it |
| Projects (Selected Works + case-study pages + sitemap) | `data/projects.ts` |
| Skills & technologies | `data/skills.ts` |
| All interface copy, About text, stats labels, process steps | `i18n/dictionaries/en.ts` and `ar.ts` |
| Colours, fonts, animation tokens | `app/globals.css` |

## Adding a project

1. Put screenshots in `public/images/projects/<slug>/` (16:10 works best, e.g. 1920×1200), plus a 1200×630 `og.jpg` crop of the cover for social sharing (optional — the cover is used without it).
2. Add one object to the `projects` array in `data/projects.ts`:

```ts
{
  id: "my-site",
  slug: "my-site",                       // → /en/work/my-site
  title: "My Site",
  category: { en: "E-commerce", ar: "متجر إلكتروني" },
  industry: "industrial",                // healthcare | industrial | construction — drives the filter chips
  client: { en: "Who it was for", ar: "لمن صُمّم" },        // optional
  description: { en: "One or two sentences.", ar: "جملة أو جملتان." },
  coverImage: "/images/projects/my-site/cover.webp",
  galleryImages: [{ src: "/images/projects/my-site/home.webp", label: { en: "products page", ar: "صفحة المنتجات" } }], // optional; label → alt text
  technologies: ["Next.js", "Tailwind CSS"],
  liveUrl: "https://my-site.com",        // optional
  githubUrl: "https://github.com/me/my-site", // optional
  featured: true,                        // large editorial row
  displayOrder: 1,
  caseStudy: { challenge: { en, ar }, solution: { en, ar }, features: { en: [...], ar: [...] } }, // optional
}
```

Any optional field can be left out — the layout adapts, and case-study sections without content are not rendered. To remove a project, delete its object and its image folder. `featured: true` projects get the large alternating rows; the rest fill the offset grid below them. The home-page stats count projects and industries from this file. Mark placeholder content with `sample: true` to show a "Sample" badge and keep it out of search engines.

## Contact form

The form is sent to Formspree (`https://formspree.io/f/mvkkdwpl`, set in `config/site.ts` and overridable with `NEXT_PUBLIC_CONTACT_ENDPOINT`). It validates on the client, then `fetch`es a POST of the form's fields — `name`, `email`, `projectType`, `message`, plus `_subject`, `language` and the `_gotcha` honeypot — with `Accept: application/json`. Success clears the form and shows a confirmation; a failure shows an error. Neither reloads the page. Messages arrive in the inbox of the Formspree account that owns the form.

## Languages

Every page lives under `/en` or `/ar`. `proxy.ts` sends unprefixed URLs to the visitor's saved language (the `NEXT_LOCALE` cookie set by the switcher) or English.
