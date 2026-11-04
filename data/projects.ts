import type { Localized } from "@/i18n/config";

/**
 * ============================================================================
 *  PROJECTS — the single source of truth for the "Selected Works" section,
 *  the case-study pages (/en/work/[slug]) and the sitemap.
 * ============================================================================
 *
 *  To add a website, copy one object below, give it a unique `id` and
 *  `slug`, drop its screenshots in /public/images/projects/<slug>/, and
 *  you're done — no component needs editing. To remove one, delete its
 *  object (and its image folder).
 *
 *  Text fields accept a plain string (used for both languages) or
 *  { en: "...", ar: "..." }. Every field marked optional can be left out:
 *  the layout adapts (no empty buttons, no broken sections).
 *
 *  Screenshots: 16:10 works best (e.g. 1920×1200). PNG, JPG, WebP or SVG.
 *  The first gallery image spans the full width on the case-study page;
 *  three images make a balanced layout.
 *
 *  Content below was taken from each live site (November 2026); the stacks
 *  were confirmed on the live builds and in the project sources.
 */

export interface CaseStudy {
  /** What you did on the project, e.g. "Design & development". */
  role?: Localized;
  overview?: Localized;
  challenge?: Localized;
  approach?: Localized;
  outcome?: Localized;
}

export interface Project {
  id: string;
  /** URL segment: /en/work/<slug>. Lowercase letters, numbers and dashes. */
  slug: string;
  title: Localized;
  /** One or two sentences shown on the card. */
  description: Localized;
  category: Localized;
  /** Path under /public, e.g. "/images/projects/my-site/cover.png". */
  coverImage: string;
  galleryImages?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Featured projects get the large, full-width editorial treatment. */
  featured?: boolean;
  /** Lower numbers come first. */
  displayOrder: number;
  year?: string;
  /** The cover's dominant colour — tints the glow behind the preview. */
  accent?: string;
  /** Marks placeholder content: shows a "Sample" badge and a notice. */
  sample?: boolean;
  caseStudy?: CaseStudy;
}

const img = (slug: string, file: string) => `/images/projects/${slug}/${file}.webp`;

export const projects: Project[] = [
  {
    id: "dr-doaa-samy",
    slug: "dr-doaa-samy",
    title: { en: "Dr. Doaa Samy", ar: "د. دعاء سامي" },
    category: { en: "Medical · Dermatology & Aesthetics", ar: "طبي · جلدية وتجميل" },
    description: {
      en: "Bilingual website for a consultant dermatologist and aesthetic physician, with treatments organised by category, before-and-after results, patient reviews, videos, and articles, plus booking by phone and WhatsApp.",
      ar: "موقع ثنائي اللغة لاستشارية الأمراض الجلدية والتجميل، يعرض العلاجات مقسّمة حسب الفئة، ونتائج قبل وبعد، وآراء المرضى، والفيديوهات والمقالات، مع الحجز عبر الهاتف وواتساب.",
    },
    coverImage: img("dr-doaa-samy", "cover"),
    galleryImages: [img("dr-doaa-samy", "treatments"), img("dr-doaa-samy", "why-choose"), img("dr-doaa-samy", "videos")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Motion"],
    liveUrl: "https://dr-doaasamy.com/",
    featured: true,
    displayOrder: 1,
    accent: "#c98a7a",
  },
  {
    id: "gaint-storage",
    slug: "gaint-storage",
    title: { en: "Gaint Storage", ar: "جاينت ستوريدج" },
    category: { en: "Industrial · Manufacturing", ar: "صناعي · تصنيع" },
    description: {
      en: "Bilingual corporate website for an Egyptian manufacturer of plastic pallets for storage and logistics, featuring a product catalog with detail pages, industries served, a project gallery, a blog, and a multi-step quote request form.",
      ar: "موقع ثنائي اللغة لمصنع مصري للبالتات البلاستيكية لحلول التخزين والخدمات اللوجستية، يضم كتالوج منتجات بصفحات تفصيلية، والقطاعات التي يخدمها، ومعرض أعمال، ومدونة، ونموذج طلب عرض سعر متعدد الخطوات.",
    },
    coverImage: img("gaint-storage", "cover"),
    galleryImages: [img("gaint-storage", "products"), img("gaint-storage", "industries"), img("gaint-storage", "request-quote")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "next-intl", "Framer Motion"],
    liveUrl: "https://gaintstorage.com/",
    featured: true,
    displayOrder: 2,
    accent: "#1f6b3a",
  },
  {
    id: "al-fisal-construction",
    slug: "al-fisal-construction",
    title: "Al Fisal for Construction",
    category: { en: "Corporate · Construction", ar: "شركات · مقاولات وإنشاءات" },
    description: {
      en: "Editorial-style website for an architecture and construction company, with an interactive before-and-after construction slider, a filterable project archive, service pages, and a start-a-project inquiry flow, in English and Arabic.",
      ar: "موقع بطابع تحريري لشركة عمارة ومقاولات، يتضمن مقارنة تفاعلية قبل وبعد التنفيذ، وأرشيف مشاريع قابلًا للتصفية، وصفحات للخدمات، ومسارًا لبدء مشروع جديد، بالعربية والإنجليزية.",
    },
    coverImage: img("al-fisal-construction", "cover"),
    galleryImages: [img("al-fisal-construction", "projects"), img("al-fisal-construction", "services"), img("al-fisal-construction", "about")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    liveUrl: "https://alfisalcon.com/",
    featured: true,
    displayOrder: 3,
    accent: "#3a4a63",
  },
  {
    id: "dr-islam-mousa",
    slug: "dr-islam-mousa",
    title: { en: "Dr. Islam Mousa", ar: "د. إسلام موسى" },
    category: { en: "Medical · Orthopedics", ar: "طبي · جراحة العظام" },
    description: {
      en: "Bilingual website for an orthopedic and joint-replacement surgeon, covering his surgical specialties and the conditions he treats, with a video library, educational articles, FAQs, and appointment booking.",
      ar: "موقع ثنائي اللغة لاستشاري جراحة العظام والمفاصل، يستعرض تخصصاته الجراحية والحالات التي يعالجها، مع مكتبة فيديوهات ومقالات توعوية وأسئلة شائعة وحجز المواعيد.",
    },
    coverImage: img("dr-islam-mousa", "cover"),
    galleryImages: [img("dr-islam-mousa", "specialties"), img("dr-islam-mousa", "why-choose"), img("dr-islam-mousa", "articles")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    liveUrl: "https://dr-islammousa.com/",
    displayOrder: 4,
    accent: "#4c4fd6",
  },
  {
    id: "dr-ayman-tarek",
    slug: "dr-ayman-tarek",
    title: { en: "Dr. Ayman Tarek", ar: "د. أيمن طارق" },
    category: { en: "Medical · Neurosurgery", ar: "طبي · جراحة المخ والأعصاب" },
    description: {
      en: "Bilingual website for a neurosurgeon specialising in brain, spine, and pediatric neurosurgery, with a bold futuristic identity, patient reviews, a medical blog, surgery videos, and FAQs.",
      ar: "موقع ثنائي اللغة لجرّاح مخ وأعصاب متخصص في جراحات المخ والعمود الفقري وجراحات الأطفال، بهوية بصرية جريئة، مع آراء المرضى ومدونة طبية وفيديوهات للعمليات وأسئلة شائعة.",
    },
    coverImage: img("dr-ayman-tarek", "cover"),
    galleryImages: [img("dr-ayman-tarek", "services"), img("dr-ayman-tarek", "about"), img("dr-ayman-tarek", "blog")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    liveUrl: "https://dr-aymantarek.com/",
    displayOrder: 5,
    accent: "#b14ef0",
  },
  {
    id: "dr-osama-mowafy",
    slug: "dr-osama-mowafy",
    title: { en: "Dr. Osama Mowafy", ar: "د. أسامة موافي" },
    category: { en: "Medical · Neurosurgery & Spine", ar: "طبي · جراحة المخ والعمود الفقري" },
    description: {
      en: "English–Arabic website for a consultant neurosurgeon and spine surgeon, presenting key specialties, conditions treated, accreditations, videos, articles, and clinic details with appointment booking.",
      ar: "موقع بالإنجليزية والعربية لاستشاري جراحة المخ والأعصاب والعمود الفقري، يعرض التخصصات الرئيسية والحالات التي يعالجها والاعتمادات والفيديوهات والمقالات وبيانات العيادة مع حجز المواعيد.",
    },
    coverImage: img("dr-osama-mowafy", "cover"),
    galleryImages: [img("dr-osama-mowafy", "services"), img("dr-osama-mowafy", "about"), img("dr-osama-mowafy", "blog")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "next-intl", "Framer Motion"],
    liveUrl: "https://dr-osamamowafi.com/en",
    displayOrder: 6,
    accent: "#0f8a8a",
  },
  {
    id: "dr-ahmed-wagih",
    slug: "dr-ahmed-wagih",
    title: { en: "Dr. Ahmed Wagih", ar: "د. أحمد وجيه" },
    category: { en: "Medical · Pain Management", ar: "طبي · علاج الألم" },
    description: {
      en: "Bilingual website for a pain management consultant in Alexandria, explaining the conditions he treats, a step-by-step treatment roadmap, and non-surgical options, alongside patient reviews, videos, articles, and FAQs.",
      ar: "موقع ثنائي اللغة لاستشاري علاج الألم في الإسكندرية، يشرح الحالات التي يعالجها وخريطة العلاج خطوة بخطوة وطرق العلاج غير الجراحية، مع آراء المرضى والفيديوهات والمقالات والأسئلة الشائعة.",
    },
    coverImage: img("dr-ahmed-wagih", "cover"),
    galleryImages: [img("dr-ahmed-wagih", "about"), img("dr-ahmed-wagih", "conditions"), img("dr-ahmed-wagih", "treatment-roadmap")],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Prisma", "next-intl"],
    liveUrl: "https://dr-ahmedwagih.com/",
    displayOrder: 7,
    accent: "#2f6fd6",
  },
];
