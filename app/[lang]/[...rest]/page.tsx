import { notFound } from "next/navigation";

/** Any unknown URL under /en or /ar renders the branded 404 (app/[lang]/not-found.tsx). */
export default function CatchAll() {
  notFound();
}
