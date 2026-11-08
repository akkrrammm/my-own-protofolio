import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, splitLocale } from "@/i18n/config";

/**
 * Every page lives under /en or /ar. Requests without a language prefix —
 * the bare domain, or a shared link such as /work/x — are redirected to the
 * same path in the visitor's saved language (the cookie written by the
 * language switcher), or English by default. Query strings are kept;
 * browsers carry the #fragment over to the new URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (splitLocale(pathname).locale) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const target = isLocale(saved) ? saved : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${target}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, API routes and files (anything with a dot:
  // /sitemap.xml, /robots.txt, /icon1.png, /images/…).
  matcher: ["/((?!_next|__next|api/|.*\\..*).*)"],
};
