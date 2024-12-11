import { NextResponse, NextRequest } from "next/server";
import { i18nConfig } from "@docs-config";

// Routes in this list will be redirected to a prefixed route
const NON_LOCALE_ROUTES = ["/network/faucet"];

function getCookie(cookies, key) {
  if (typeof cookies.get === "function") {
    const cookie = cookies.get(key);
    if (cookie && typeof cookie === "object") {
      return cookie.value;
    }
    return cookie;
  }
  return cookies[key];
}

function getLocaleFromHeader(headerValue: string | null) {
  const allowedLocales = Object.keys(i18nConfig);
  const possibleLocales = (headerValue || "").split(/[;,]/).map(s => s.trim()).map(s => s.split('-')[0])
  return possibleLocales.find(locale => allowedLocales.includes(locale)) || null;
}

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  if (!NON_LOCALE_ROUTES.includes(nextUrl.pathname)) {
    return;
  }

  let locale: string | null = null;
  // If there is a locale cookie, we try to use it.
  try {
    locale = getCookie(request.cookies, "NEXT_LOCALE");
  } catch {
    // The locale from the cookie isn't valid.
    // https://github.com/vercel/next.js/blob/e5dee17f776dcc79ebb269f7b7341fa6e2b6c3f1/packages/next/server/web/next-url.ts#L122-L129
  }

  // Otherwise, try to figure it out via the `accept-languages` header.
  if (!locale) {
    const headerLocale = getLocaleFromHeader(request.headers.get("accept-language"))
    locale = headerLocale ?? "en";
  }

  return NextResponse.redirect(
    new URL(
      `/${locale || "en"}${nextUrl.pathname}${nextUrl.search}`,
      request.url,
    ),
  );
}
