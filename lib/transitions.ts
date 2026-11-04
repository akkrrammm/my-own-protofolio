/**
 * Page-level view transition: links tagged "page-forward" (into a case
 * study) or "page-back" (back to the list) cross-fade with a short rise;
 * untagged navigations (browser back, refresh) swap instantly.
 * The matching CSS lives in app/globals.css.
 */
export const pageTransition = {
  enter: { "page-forward": "page-forward", "page-back": "page-back", default: "none" },
  exit: { "page-forward": "page-forward", "page-back": "page-back", default: "none" },
  default: "none",
} as const;
