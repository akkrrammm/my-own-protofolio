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
 *  Each gallery image has a `label` saying what it shows; it becomes the
 *  image's alt text ("<title> website — <label>").
 *
 *  Content below was taken from each live site (November 2026); the stacks
 *  were confirmed on the live builds and in the project sources. Case-study
 *  text only restates what each site actually contains — no invented
 *  results, metrics or quotes.
 */

/** Drives the industry filter on the home page. */
export type Industry = "healthcare" | "industrial" | "construction";

export interface CaseStudy {
  /** What the website had to solve for the client. */
  challenge?: Localized;
  /** How the website answers it. */
  solution?: Localized;
  /** The main features, as short phrases. */
  features?: Localized<string[]>;
}

export interface GalleryImage {
  src: string;
  /** What the screenshot shows, e.g. "products page". */
  label: Localized;
}

export interface Project {
  id: string;
  /** URL segment: /en/work/<slug>. Lowercase letters, numbers and dashes. */
  slug: string;
  title: Localized;
  /** One or two sentences shown on the card. */
  description: Localized;
  category: Localized;
  industry: Industry;
  /** Who the site was built for, shown in the case-study overview. */
  client?: Localized;
  /** Path under /public, e.g. "/images/projects/my-site/cover.png". */
  coverImage: string;
  galleryImages?: GalleryImage[];
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
const shot = (slug: string, file: string, en: string, ar: string): GalleryImage => ({ src: img(slug, file), label: { en, ar } });

export const projects: Project[] = [
  {
    id: "gaint-storage",
    slug: "gaint-storage",
    title: { en: "Gaint Storage", ar: "جاينت ستوريدج" },
    category: { en: "Industrial · Manufacturing", ar: "صناعي · تصنيع" },
    industry: "industrial",
    client: { en: "Gaint Storage — plastic pallet manufacturer, Egypt", ar: "جاينت ستوريدج — مصنع بالتات بلاستيكية، مصر" },
    description: {
      en: "Bilingual corporate website for an Egyptian manufacturer of plastic pallets for storage and logistics, featuring a product catalog with detail pages, industries served, a project gallery, a blog, and a multi-step quote request form.",
      ar: "موقع ثنائي اللغة لمصنع مصري للبالتات البلاستيكية لحلول التخزين والخدمات اللوجستية، يضم كتالوج منتجات بصفحات تفصيلية، والقطاعات التي يخدمها، ومعرض أعمال، ومدونة، ونموذج طلب عرض سعر متعدد الخطوات.",
    },
    coverImage: img("gaint-storage", "cover"),
    galleryImages: [
      shot("gaint-storage", "products", "products page", "صفحة المنتجات"),
      shot("gaint-storage", "industries", "industries page", "صفحة القطاعات"),
      shot("gaint-storage", "request-quote", "quote request form", "نموذج طلب عرض السعر"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "next-intl", "Framer Motion"],
    liveUrl: "https://gaintstorage.com/",
    featured: true,
    displayOrder: 1,
    accent: "#1f6b3a",
    caseStudy: {
      challenge: {
        en: "An Egyptian manufacturer of plastic pallets needed one bilingual website that presents its full product range to storage and logistics buyers, shows the industries it serves, and turns visitor interest into structured quote requests.",
        ar: "احتاج مصنع مصري للبالتات البلاستيكية إلى موقع واحد بلغتين يعرض مجموعة منتجاته كاملة لمشتري حلول التخزين والخدمات اللوجستية، ويوضح القطاعات التي يخدمها، ويحوّل اهتمام الزائر إلى طلبات عروض أسعار منظّمة.",
      },
      solution: {
        en: "A bilingual corporate site built around a product catalog with a detail page for every product, pages for the industries served, a project gallery and a blog — plus a multi-step quote request form that guides buyers through their request one step at a time.",
        ar: "موقع مؤسسي ثنائي اللغة مبني حول كتالوج منتجات بصفحة تفصيلية لكل منتج، وصفحات للقطاعات التي يخدمها المصنع، ومعرض أعمال ومدونة — مع نموذج طلب عرض سعر متعدد الخطوات يرشد المشتري خطوة بخطوة.",
      },
      features: {
        en: ["Arabic & English", "Product catalog with detail pages", "Industries served", "Project gallery", "Blog", "Multi-step quote request"],
        ar: ["عربي وإنجليزي", "كتالوج منتجات بصفحات تفصيلية", "القطاعات التي يخدمها", "معرض الأعمال", "مدونة", "طلب عرض سعر متعدد الخطوات"],
      },
    },
  },
  {
    id: "dr-doaa-samy",
    slug: "dr-doaa-samy",
    title: { en: "Dr. Doaa Samy", ar: "د. دعاء سامي" },
    category: { en: "Medical · Dermatology & Aesthetics", ar: "طبي · جلدية وتجميل" },
    industry: "healthcare",
    client: { en: "Dr. Doaa Samy — consultant dermatologist & aesthetic physician", ar: "د. دعاء سامي — استشارية الأمراض الجلدية والتجميل" },
    description: {
      en: "Bilingual website for a consultant dermatologist and aesthetic physician, with treatments organised by category, before-and-after results, patient reviews, videos, and articles, plus booking by phone and WhatsApp.",
      ar: "موقع ثنائي اللغة لاستشارية الأمراض الجلدية والتجميل، يعرض العلاجات مقسّمة حسب الفئة، ونتائج قبل وبعد، وآراء المرضى، والفيديوهات والمقالات، مع الحجز عبر الهاتف وواتساب.",
    },
    coverImage: img("dr-doaa-samy", "cover"),
    galleryImages: [
      shot("dr-doaa-samy", "treatments", "treatments section", "قسم العلاجات"),
      shot("dr-doaa-samy", "why-choose", "“why choose” section", "قسم «لماذا تختارنا»"),
      shot("dr-doaa-samy", "videos", "videos section", "قسم الفيديوهات"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Motion"],
    liveUrl: "https://dr-doaasamy.com/",
    featured: true,
    displayOrder: 2,
    accent: "#c98a7a",
    caseStudy: {
      challenge: {
        en: "A consultant dermatologist and aesthetic physician needed a site that explains a wide range of treatments clearly in two languages, builds trust before the first visit, and makes booking effortless.",
        ar: "احتاجت استشارية الأمراض الجلدية والتجميل إلى موقع يشرح مجموعة كبيرة من العلاجات بوضوح وبلغتين، ويبني الثقة قبل الزيارة الأولى، ويجعل الحجز سهلًا.",
      },
      solution: {
        en: "Treatments are organised by category, with before-and-after results, patient reviews, videos and articles alongside them, so patients can learn and compare in one place. Booking is one tap away by phone or WhatsApp.",
        ar: "قُسّمت العلاجات حسب الفئة، وإلى جانبها نتائج قبل وبعد وآراء المرضى والفيديوهات والمقالات، ليتعرّف المريض ويقارن في مكان واحد، والحجز على بُعد لمسة عبر الهاتف أو واتساب.",
      },
      features: {
        en: ["Arabic & English", "Treatments by category", "Before & after results", "Patient reviews", "Videos & articles", "Phone & WhatsApp booking"],
        ar: ["عربي وإنجليزي", "العلاجات حسب الفئة", "نتائج قبل وبعد", "آراء المرضى", "فيديوهات ومقالات", "الحجز عبر الهاتف وواتساب"],
      },
    },
  },
  {
    id: "al-fisal-construction",
    slug: "al-fisal-construction",
    title: "Al Fisal for Construction",
    category: { en: "Corporate · Construction", ar: "شركات · مقاولات وإنشاءات" },
    industry: "construction",
    client: { en: "Al Fisal for Construction — architecture & construction company", ar: "Al Fisal for Construction — شركة عمارة ومقاولات" },
    description: {
      en: "Editorial-style website for an architecture and construction company, with an interactive before-and-after construction slider, a filterable project archive, service pages, and a start-a-project inquiry flow, in English and Arabic.",
      ar: "موقع بطابع تحريري لشركة عمارة ومقاولات، يتضمن مقارنة تفاعلية قبل وبعد التنفيذ، وأرشيف مشاريع قابلًا للتصفية، وصفحات للخدمات، ومسارًا لبدء مشروع جديد، بالعربية والإنجليزية.",
    },
    coverImage: img("al-fisal-construction", "cover"),
    galleryImages: [
      shot("al-fisal-construction", "projects", "projects archive", "أرشيف المشاريع"),
      shot("al-fisal-construction", "services", "services page", "صفحة الخدمات"),
      shot("al-fisal-construction", "about", "about page", "صفحة «من نحن»"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    liveUrl: "https://alfisalcon.com/",
    featured: true,
    displayOrder: 3,
    accent: "#3a4a63",
    caseStudy: {
      challenge: {
        en: "An architecture and construction company needed to show the quality of its built work and make it easy for prospective clients to find relevant projects and start a conversation — in English and Arabic.",
        ar: "احتاجت شركة عمارة ومقاولات إلى إبراز جودة أعمالها المنفّذة، وتسهيل وصول العملاء المحتملين إلى المشاريع التي تهمهم وبدء التواصل — بالعربية والإنجليزية.",
      },
      solution: {
        en: "An editorial-style site where an interactive before-and-after slider shows construction progress, a filterable archive lets visitors browse projects, dedicated pages explain each service, and a start-a-project flow guides new inquiries.",
        ar: "موقع بطابع تحريري يعرض تقدّم التنفيذ عبر مقارنة تفاعلية قبل وبعد، مع أرشيف مشاريع قابل للتصفية، وصفحات تشرح كل خدمة، ومسار «ابدأ مشروعك» يوجّه الاستفسارات الجديدة.",
      },
      features: {
        en: ["English & Arabic", "Before & after construction slider", "Filterable project archive", "Service pages", "Start-a-project inquiry flow"],
        ar: ["إنجليزي وعربي", "مقارنة تفاعلية قبل وبعد التنفيذ", "أرشيف مشاريع قابل للتصفية", "صفحات الخدمات", "مسار بدء مشروع جديد"],
      },
    },
  },
  {
    id: "dr-islam-mousa",
    slug: "dr-islam-mousa",
    title: { en: "Dr. Islam Mousa", ar: "د. إسلام موسى" },
    category: { en: "Medical · Orthopedics", ar: "طبي · جراحة العظام" },
    industry: "healthcare",
    client: { en: "Dr. Islam Mousa — orthopedic & joint-replacement surgeon", ar: "د. إسلام موسى — استشاري جراحة العظام والمفاصل" },
    description: {
      en: "Bilingual website for an orthopedic and joint-replacement surgeon, covering his surgical specialties and the conditions he treats, with a video library, educational articles, FAQs, and appointment booking.",
      ar: "موقع ثنائي اللغة لاستشاري جراحة العظام والمفاصل، يستعرض تخصصاته الجراحية والحالات التي يعالجها، مع مكتبة فيديوهات ومقالات توعوية وأسئلة شائعة وحجز المواعيد.",
    },
    coverImage: img("dr-islam-mousa", "cover"),
    galleryImages: [
      shot("dr-islam-mousa", "specialties", "specialties section", "قسم التخصصات"),
      shot("dr-islam-mousa", "why-choose", "“why choose” section", "قسم «لماذا تختارنا»"),
      shot("dr-islam-mousa", "articles", "articles section", "قسم المقالات"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    liveUrl: "https://dr-islammousa.com/",
    displayOrder: 4,
    accent: "#4c4fd6",
    caseStudy: {
      challenge: {
        en: "An orthopedic and joint-replacement surgeon needed a bilingual site that explains his surgical specialties and the conditions he treats in plain language, and helps patients take the next step.",
        ar: "احتاج استشاري جراحة العظام والمفاصل إلى موقع ثنائي اللغة يشرح تخصصاته الجراحية والحالات التي يعالجها بلغة بسيطة، ويساعد المرضى على اتخاذ الخطوة التالية.",
      },
      solution: {
        en: "Specialties and conditions each get a clear section, supported by a video library, educational articles and answers to common questions, with appointment booking for patients who are ready to visit.",
        ar: "لكل تخصص وحالة قسم واضح، تدعمه مكتبة فيديوهات ومقالات توعوية وإجابات عن الأسئلة الشائعة، مع حجز المواعيد للمرضى المستعدين للزيارة.",
      },
      features: {
        en: ["Arabic & English", "Surgical specialties", "Conditions treated", "Video library", "Educational articles", "FAQs", "Appointment booking"],
        ar: ["عربي وإنجليزي", "التخصصات الجراحية", "الحالات التي يعالجها", "مكتبة فيديوهات", "مقالات توعوية", "الأسئلة الشائعة", "حجز المواعيد"],
      },
    },
  },
  {
    id: "dr-ayman-tarek",
    slug: "dr-ayman-tarek",
    title: { en: "Dr. Ayman Tarek", ar: "د. أيمن طارق" },
    category: { en: "Medical · Neurosurgery", ar: "طبي · جراحة المخ والأعصاب" },
    industry: "healthcare",
    client: { en: "Dr. Ayman Tarek — neurosurgeon", ar: "د. أيمن طارق — جرّاح مخ وأعصاب" },
    description: {
      en: "Bilingual website for a neurosurgeon specialising in brain, spine, and pediatric neurosurgery, with a bold futuristic identity, patient reviews, a medical blog, surgery videos, and FAQs.",
      ar: "موقع ثنائي اللغة لجرّاح مخ وأعصاب متخصص في جراحات المخ والعمود الفقري وجراحات الأطفال، بهوية بصرية جريئة، مع آراء المرضى ومدونة طبية وفيديوهات للعمليات وأسئلة شائعة.",
    },
    coverImage: img("dr-ayman-tarek", "cover"),
    galleryImages: [
      shot("dr-ayman-tarek", "services", "services page", "صفحة الخدمات"),
      shot("dr-ayman-tarek", "about", "about page", "صفحة «عن الطبيب»"),
      shot("dr-ayman-tarek", "blog", "blog page", "صفحة المدونة"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
    liveUrl: "https://dr-aymantarek.com/",
    displayOrder: 5,
    accent: "#b14ef0",
    caseStudy: {
      challenge: {
        en: "A neurosurgeon covering brain, spine and pediatric neurosurgery needed a bilingual site with a distinctive identity that still explains complex surgery clearly.",
        ar: "احتاج جرّاح مخ وأعصاب متخصص في جراحات المخ والعمود الفقري وجراحات الأطفال إلى موقع ثنائي اللغة بهوية مميزة، يشرح الجراحات المعقدة بوضوح.",
      },
      solution: {
        en: "A bold, futuristic visual identity carries the site, while patient reviews, a medical blog, surgery videos and FAQs give patients the information they need.",
        ar: "هوية بصرية جريئة بطابع مستقبلي تقود الموقع، بينما تمنح آراء المرضى والمدونة الطبية وفيديوهات العمليات والأسئلة الشائعة المرضى المعلومات التي يحتاجونها.",
      },
      features: {
        en: ["Arabic & English", "Bold futuristic identity", "Patient reviews", "Medical blog", "Surgery videos", "FAQs"],
        ar: ["عربي وإنجليزي", "هوية بصرية مستقبلية", "آراء المرضى", "مدونة طبية", "فيديوهات العمليات", "الأسئلة الشائعة"],
      },
    },
  },
  {
    id: "dr-osama-mowafy",
    slug: "dr-osama-mowafy",
    title: { en: "Dr. Osama Mowafy", ar: "د. أسامة موافي" },
    category: { en: "Medical · Neurosurgery & Spine", ar: "طبي · جراحة المخ والعمود الفقري" },
    industry: "healthcare",
    client: { en: "Dr. Osama Mowafy — consultant neurosurgeon & spine surgeon", ar: "د. أسامة موافي — استشاري جراحة المخ والأعصاب والعمود الفقري" },
    description: {
      en: "English–Arabic website for a consultant neurosurgeon and spine surgeon, presenting key specialties, conditions treated, accreditations, videos, articles, and clinic details with appointment booking.",
      ar: "موقع بالإنجليزية والعربية لاستشاري جراحة المخ والأعصاب والعمود الفقري، يعرض التخصصات الرئيسية والحالات التي يعالجها والاعتمادات والفيديوهات والمقالات وبيانات العيادة مع حجز المواعيد.",
    },
    coverImage: img("dr-osama-mowafy", "cover"),
    galleryImages: [
      shot("dr-osama-mowafy", "services", "services page", "صفحة الخدمات"),
      shot("dr-osama-mowafy", "about", "about page", "صفحة «عن الطبيب»"),
      shot("dr-osama-mowafy", "blog", "articles page", "صفحة المقالات"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "next-intl", "Framer Motion"],
    liveUrl: "https://dr-osamamowafi.com/en",
    displayOrder: 6,
    accent: "#0f8a8a",
    caseStudy: {
      challenge: {
        en: "A consultant neurosurgeon and spine surgeon needed an English–Arabic site that presents his specialties and credentials clearly and gives patients the clinic details they need to book.",
        ar: "احتاج استشاري جراحة المخ والأعصاب والعمود الفقري إلى موقع بالإنجليزية والعربية يعرض تخصصاته واعتماداته بوضوح، ويمنح المرضى بيانات العيادة التي يحتاجونها للحجز.",
      },
      solution: {
        en: "Key specialties and the conditions treated lead the site, backed by accreditations, videos and articles, with clinic details and appointment booking close at hand.",
        ar: "تتصدّر الموقعَ التخصصاتُ الرئيسية والحالات التي يعالجها، مدعومةً بالاعتمادات والفيديوهات والمقالات، مع بيانات العيادة وحجز المواعيد في متناول اليد.",
      },
      features: {
        en: ["English & Arabic", "Key specialties", "Conditions treated", "Accreditations", "Videos & articles", "Clinic details & booking"],
        ar: ["إنجليزي وعربي", "التخصصات الرئيسية", "الحالات التي يعالجها", "الاعتمادات", "فيديوهات ومقالات", "بيانات العيادة والحجز"],
      },
    },
  },
  {
    id: "dr-ahmed-wagih",
    slug: "dr-ahmed-wagih",
    title: { en: "Dr. Ahmed Wagih", ar: "د. أحمد وجيه" },
    category: { en: "Medical · Pain Management", ar: "طبي · علاج الألم" },
    industry: "healthcare",
    client: { en: "Dr. Ahmed Wagih — pain management consultant, Alexandria", ar: "د. أحمد وجيه — استشاري علاج الألم، الإسكندرية" },
    description: {
      en: "Bilingual website for a pain management consultant in Alexandria, explaining the conditions he treats, a step-by-step treatment roadmap, and non-surgical options, alongside patient reviews, videos, articles, and FAQs.",
      ar: "موقع ثنائي اللغة لاستشاري علاج الألم في الإسكندرية، يشرح الحالات التي يعالجها وخريطة العلاج خطوة بخطوة وطرق العلاج غير الجراحية، مع آراء المرضى والفيديوهات والمقالات والأسئلة الشائعة.",
    },
    coverImage: img("dr-ahmed-wagih", "cover"),
    galleryImages: [
      shot("dr-ahmed-wagih", "about", "about section", "قسم «عن الطبيب»"),
      shot("dr-ahmed-wagih", "conditions", "conditions section", "قسم الحالات المرضية"),
      shot("dr-ahmed-wagih", "treatment-roadmap", "treatment roadmap section", "قسم خريطة العلاج"),
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Prisma", "next-intl"],
    liveUrl: "https://dr-ahmedwagih.com/",
    displayOrder: 7,
    accent: "#2f6fd6",
    caseStudy: {
      challenge: {
        en: "A pain management consultant in Alexandria needed a bilingual site that explains the conditions he treats and what non-surgical treatment involves, step by step.",
        ar: "احتاج استشاري علاج الألم في الإسكندرية إلى موقع ثنائي اللغة يشرح الحالات التي يعالجها وما يتضمنه العلاج غير الجراحي خطوة بخطوة.",
      },
      solution: {
        en: "The site walks patients through the conditions he treats, a step-by-step treatment roadmap and the non-surgical options available, alongside patient reviews, videos, articles and FAQs.",
        ar: "يأخذ الموقع المريض عبر الحالات التي يعالجها، وخريطة علاج خطوة بخطوة، وخيارات العلاج غير الجراحية، إلى جانب آراء المرضى والفيديوهات والمقالات والأسئلة الشائعة.",
      },
      features: {
        en: ["Arabic & English", "Conditions treated", "Step-by-step treatment roadmap", "Non-surgical options", "Patient reviews", "Videos, articles & FAQs"],
        ar: ["عربي وإنجليزي", "الحالات التي يعالجها", "خريطة علاج خطوة بخطوة", "خيارات العلاج غير الجراحية", "آراء المرضى", "فيديوهات ومقالات وأسئلة شائعة"],
      },
    },
  },
];
