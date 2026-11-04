/**
 * ✏️ Your toolkit — the "Skills & Technologies" section reads only this file.
 *
 * A starter list: add, remove or reorder freely. `symbol` is the one- or
 * two-letter mark drawn on the tile (periodic-table style); keep it short.
 * Category titles and descriptions live in the dictionaries (i18n/).
 */

export type SkillCategoryId = "frontend" | "backend" | "databases" | "tools";

export interface Skill {
  name: string;
  symbol: string;
}

export const skillCategories: { id: SkillCategoryId; code: string; skills: Skill[] }[] = [
  {
    id: "frontend",
    code: "FE",
    skills: [
      { name: "HTML5", symbol: "Ht" },
      { name: "CSS3", symbol: "Cs" },
      { name: "JavaScript", symbol: "Js" },
      { name: "TypeScript", symbol: "Ts" },
      { name: "React", symbol: "Re" },
      { name: "Next.js", symbol: "Nx" },
      { name: "Tailwind CSS", symbol: "Tw" },
      { name: "Motion", symbol: "Mo" },
    ],
  },
  {
    id: "backend",
    code: "BE",
    skills: [
      { name: "Node.js", symbol: "Nd" },
      { name: "REST APIs", symbol: "Ap" },
      { name: "Server Actions", symbol: "Sa" },
      { name: "Authentication", symbol: "Au" },
    ],
  },
  {
    id: "databases",
    code: "DB",
    skills: [
      { name: "PostgreSQL", symbol: "Pg" },
      { name: "Supabase", symbol: "Sb" },
      { name: "MongoDB", symbol: "Mg" },
    ],
  },
  {
    id: "tools",
    code: "DT",
    skills: [
      { name: "Figma", symbol: "Fg" },
      { name: "Git", symbol: "Gt" },
      { name: "GitHub", symbol: "Gh" },
      { name: "VS Code", symbol: "Vs" },
      { name: "Vercel", symbol: "Vc" },
    ],
  },
];
